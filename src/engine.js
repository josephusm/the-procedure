// engine.js — game loop and state

import { printBlock, clear, clearOptions, showOptions, setDate, delay, abort, resetAbort, isAborted, setTimingProfile } from './renderer.js';
import { loadCases, getCaseForDay, getAvailableOptions } from './cases.js';
import { add as addCompliance, eodTone } from './compliance.js';
import { unlock, beep, driveNoise, confirmTone, endTone, startHum, powerClick } from './audio.js';
import { initScale } from './scale.js';

const TOTAL_DAYS = 16;
// Each tier has a pool of messages. The day number selects one
// deterministically (mod pool length). Within each tier the wording
// degrades subtly — the system becomes more concise, more certain,
// less interested in the operator as a person.
const EOD_POOLS = {
  standard: [
    'All cases for today have been processed. Your work is appreciated.',
    'Today\'s queue is clear. Processing was within normal range.',
    'Queue complete. Your shift has ended. Please log out at the designated time.',
  ],
  affirming: [
    'Processing complete. Your throughput today was within acceptable parameters.',
    'Your routing accuracy continues to meet expectations. End of day.',
    'Daily output verified. No corrections needed. Good.',
  ],
  seamless: [
    'Daily routing cycle complete. No irregularities recorded.',
    'All items routed. System confirms: no deviations.',
    'Cycle closed. Metrics nominal.',
  ],
  complete: [
    'Cycle complete.',
    'Complete.',
    'Done.',
  ],
};

const ROUTE_POOLS = {
  standard: [
    'Routing entry accepted.',
    'Selected channel recorded.',
    'Route acknowledged.',
  ],
  affirming: [
    'Routing verified.',
    'Channel accepted.',
    'Procedure confirmed.',
  ],
  seamless: [
    'Channel confirmed.',
    'Routing complete.',
    'Standard channel.',
  ],
  complete: [
    'Processed.',
    'Complete.',
    'Done.',
  ],
};

const TIMING_PROFILES = {
  standard: { charDelay: 12, lineDelay: 60, afterimageDelay: 800, settleDelay: 2200 },
  affirming: { charDelay: 11, lineDelay: 55, afterimageDelay: 720, settleDelay: 2000 },
  seamless: { charDelay: 10, lineDelay: 50, afterimageDelay: 640, settleDelay: 1800 },
  complete: { charDelay: 9, lineDelay: 45, afterimageDelay: 560, settleDelay: 1600 },
};

let hum = null;

let state = {
  day: 1,
  phase: 'off',
  machineDone: false,
};

function formatDate(day) {
  const base = new Date(2026, 0, 5);
  const d = new Date(base);
  d.setDate(base.getDate() + day - 1);
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-GB', opts).toUpperCase();
}

function routeStamp(tone, day) {
  const pool = ROUTE_POOLS[tone] ?? ROUTE_POOLS.standard;
  return pool[(day - 1) % pool.length];
}

function applyTimbre(tone) {
  setTimingProfile(TIMING_PROFILES[tone] ?? TIMING_PROFILES.standard);
}

function timbreProfile(tone) {
  return TIMING_PROFILES[tone] ?? TIMING_PROFILES.standard;
}

// ── Shutdown ──

async function shutdown() {
  if (state.phase === 'off' || state.phase === 'shutdown' || state.phase === 'done') return;

  const wasEnd = state.phase === 'end' || state.machineDone;
  state.phase = 'shutdown';

  const btn = document.getElementById('power-btn');
  const screen = document.getElementById('crt-screen');
  const app = document.getElementById('app');

  // Abort any running print/animation sequences
  abort();

  // Power click sound
  powerClick();

  // Stop the hum
  if (hum) {
    const ac = hum.gain.context;
    hum.gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
    setTimeout(() => {
      hum.oscs.forEach(o => o.stop());
      hum.lfo.stop();
      hum = null;
    }, 350);
  }

  // CRT shutdown: collapse to horizontal line, then off
  clearOptions();

  // Quick fade
  app.style.transition = 'opacity 0.15s';
  app.style.opacity = '0';
  await delay(200);

  // Screen off
  screen.classList.add('off');
  app.style.transition = '';
  btn.classList.remove('on');

  // If the game reached the final screen (case-016), the machine is done with you.
  // The power button goes inert. The screen stays dark. Refresh to restart.
  if (wasEnd) {
    state.phase = 'done';
    btn.classList.add('dead');
    screen.classList.add('done');
  } else {
    state.phase = 'off';
    screen.classList.remove('done');
  }
}

// ── Power on: button click → audio unlock → boot ──
function initPowerButton() {
  const btn = document.getElementById('power-btn');
  const screen = document.getElementById('crt-screen');

  // Screen starts off (class="off" set in HTML to avoid FOUC)

  btn.addEventListener('click', async () => {
    if (state.phase === 'off') {
      // ── Power ON ──
      state.phase = 'boot';
      resetAbort();
      screen.classList.remove('done');

      // Audio unlock + power click
      unlock();
      powerClick();

      // Button lights up
      btn.classList.add('on');

      // Screen wakes up
      screen.classList.remove('off');

      // Boot sounds (staggered)
      setTimeout(() => beep(800, 0.12), 150);
      setTimeout(() => driveNoise(1.5), 450);
      setTimeout(() => { hum = startHum(); }, 1900);

      await crtBoot();
      await runDay();

    } else if (state.phase === 'reading' || state.phase === 'routing' || state.phase === 'eod' || state.phase === 'end') {
      // ── Power OFF ──
      await shutdown();
    }
    // During 'boot', 'shutdown', 'done' — ignore clicks
  });

  document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (state.phase !== 'off') return;
    if (btn.classList.contains('dead')) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();
    btn.click();
  });
}

// ── CRT Boot sequence ──
async function crtBoot() {
  const app = document.getElementById('app');

  // Phase 0: black screen, CRT warming up
  app.style.opacity = '0';
  await delay(600);

  // Phase 1: screen flicker
  for (let i = 0; i < 3; i++) {
    app.style.opacity = '0.6';
    await delay(50);
    app.style.opacity = '0';
    await delay(120 + Math.random() * 80);
  }

  // Phase 2: screen on
  app.style.opacity = '1';
  await delay(300);

  // Phase 3: boot text
  setDate(formatDate(state.day));

  await printBlock([
    ['PROCESSING SYSTEM v4.1.2', 'system'],
    ['Initializing session...', 'system'],
    ['', ''],
  ]);

  await delay(1000);

  await printBlock([
    ['Good morning.', 'dim'],
    ['Your queue has been updated.', 'dim'],
    ['', ''],
  ]);

  await delay(800);
}

async function runDay() {
  state.phase = 'reading';
  applyTimbre(eodTone());
  const c = getCaseForDay(state.day);

  if (!c) {
    await endGame();
    return;
  }

  clear();
  setDate(formatDate(state.day));

  await printBlock([
    [`DAY ${state.day}  ·  INCOMING CASE`, 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [`CASE REF:  ${c.ref}`, 'dim'],
    [`SUBJECT:   ${c.subject}`, 'bright'],
    ['', ''],
    [c.body, ''],
    ['', ''],
  ]);

  if (isAborted()) return; // shutdown happened during text output

  const options = getAvailableOptions(c);
  state.phase = 'routing';

  showOptions(options, async (chosen) => {
    confirmTone();
    addCompliance(chosen.compliance_delta);
    await onRouted(c, chosen);
  });
}

async function onRouted(c, chosen) {
  clearOptions();
  state.phase = 'eod';

  if (c.final) {
    state.machineDone = true;
    await finalScreen(c);
    return;
  }

  const tone = eodTone();
  const routeStatus = routeStamp(tone, state.day);
  const timing = timbreProfile(tone);
  applyTimbre(tone);

  await printBlock([
    ['', ''],
    [`> ${chosen.label}`, 'dim'],
    [routeStatus, 'system'],
    ['', ''],
    [chosen.outcome, 'faint'],
  ]);

  if (chosen.afterimage) {
    await delay(timing.afterimageDelay);
    if (isAborted()) return;

    await printBlock([
      ['', ''],
      [chosen.afterimage, 'dim'],
    ]);
  }

  await delay(timing.settleDelay);
  if (isAborted()) return;

  clear();
  setDate(formatDate(state.day));

  const pool = EOD_POOLS[tone];
  const eodMsg = pool[(state.day - 1) % pool.length];
  await printBlock([
    ['END OF DAY', 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [eodMsg, 'dim'],
    ['', ''],
  ]);

  if (isAborted()) return;
  await delay(2000);
  if (isAborted()) return;

  state.day++;

  if (state.day > TOTAL_DAYS) {
    await endGame();
  } else {
    await runDay();
  }
}

async function finalScreen(c) {
  await delay(2000);

  clear();
  setDate(formatDate(state.day));

  await delay(800);
  endTone();

  await printBlock([
    ['', ''],
    ['', ''],
    ['━'.repeat(60), 'sep'],
    ['PROCESSING COMPLETE', 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [`CASE REF:         ${c.ref}`, 'dim'],
    [`DATE:             ${formatDate(state.day)}`, 'dim'],
    [`PROCESSING TIME:  ${TOTAL_DAYS} DAYS`, 'dim'],
    [`STATUS:           COMPLETE`, 'dim'],
    ['', ''],
    ['━'.repeat(60), 'sep'],
    ['', ''],
  ]);

  // Stop the hum — the machine is done with you
  if (hum) {
    const ac = hum.gain.context;
    hum.gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 2);
    setTimeout(() => {
      hum.oscs.forEach(o => o.stop());
      hum.lfo.stop();
      hum = null;
    }, 2100);
  }

  state.phase = 'end';
}

async function endGame() {
  await printBlock([
    ['', ''],
    ['━'.repeat(60), 'sep'],
    ['END OF QUEUE', 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    ['You have processed all cases in your current queue.', 'dim'],
    ['', ''],
    ['New cases will be assigned at the start of the next cycle.', 'faint'],
    ['', ''],
    ['Thank you for your service to the system.', 'faint'],
    ['', ''],
  ]);
  state.phase = 'end';
}

// Entry point
(async () => {
  await loadCases();
  initScale();
  initPowerButton();
})();
