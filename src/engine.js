// engine.js — game loop and state

import { printBlock, clear, clearOptions, showOptions, showContinue, setDate, delay, abort, resetAbort, isAborted, setTimingProfile } from './renderer.js';
import { loadCases, getCaseForSequence, getAvailableOptions, recordRoute } from './cases.js';
import { add as addCompliance, proceduralTone } from './compliance.js';
import { unlock, beep, driveNoise, confirmTone, endTone, startHum, powerClick } from './audio.js';
import { initScale } from './scale.js';

const TOTAL_CASES = 16;
const CASES_PER_SHIFT = 4;
const TOTAL_SHIFTS = Math.ceil(TOTAL_CASES / CASES_PER_SHIFT);

// Each tier has a pool of messages. The shift number selects one
// deterministically (mod pool length). Within each tier the wording
// degrades subtly — the system becomes more concise, more certain,
// less interested in the operator as a person.
const SHIFT_POOLS = {
  standard: [
    'Shift queue complete. Your work is appreciated.',
    'Queue clear. Processing was within normal range.',
    'Shift complete. Please remain available at the designated time.',
  ],
  affirming: [
    'Shift processing complete. Your throughput was within acceptable parameters.',
    'Your routing accuracy continues to meet expectations. Shift closed.',
    'Shift output verified. No corrections needed. Good.',
  ],
  seamless: [
    'Shift routing cycle complete. No irregularities recorded.',
    'All items routed. System confirms: no deviations.',
    'Queue closed. Metrics nominal.',
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
  standard: { charDelay: 12, lineDelay: 60, afterimageDelay: 800 },
  affirming: { charDelay: 11, lineDelay: 55, afterimageDelay: 720 },
  seamless: { charDelay: 10, lineDelay: 50, afterimageDelay: 640 },
  complete: { charDelay: 9, lineDelay: 45, afterimageDelay: 560 },
};

let hum = null;

let state = {
  caseNumber: 1,
  phase: 'off',
  machineDone: false,
};

function shiftForCase(caseNumber = state.caseNumber) {
  return Math.ceil(caseNumber / CASES_PER_SHIFT);
}

function slotForCase(caseNumber = state.caseNumber) {
  return ((caseNumber - 1) % CASES_PER_SHIFT) + 1;
}

function formatDate(shift) {
  const base = new Date(2026, 0, 5);
  const d = new Date(base);
  d.setDate(base.getDate() + shift - 1);
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-GB', opts).toUpperCase();
}

function routeStamp(tone, caseNumber) {
  const pool = ROUTE_POOLS[tone] ?? ROUTE_POOLS.standard;
  return pool[(caseNumber - 1) % pool.length];
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

  // If the game reached the final route, the machine is done with you.
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

      // The switch moves before the monitor wakes.
      unlock();
      powerClick();
      btn.classList.add('on');

      // Electrical life begins behind dark glass: transformer hum,
      // POST confirmation, then drive activity. Text comes later.
      await delay(180);
      hum = startHum();
      beep(800, 0.12);

      await delay(260);
      driveNoise(1.4);

      await delay(520);
      screen.classList.remove('off');
      screen.classList.add('warming');

      await crtBoot();
      await runCase();

    } else if (['reading', 'routing', 'consequence', 'shift-end', 'end'].includes(state.phase)) {
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
  const screen = document.getElementById('crt-screen');

  // Phase 0: the tube blooms, but still has nothing readable to say.
  app.style.opacity = '0';
  await delay(600);
  screen.classList.remove('warming');

  // Phase 1: unstable video lock
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
  setDate(formatDate(shiftForCase()));

  await printBlock([
    ['PROCESSING SYSTEM v4.1.2', 'system'],
    ['Initializing session...', 'system'],
    ['', ''],
  ]);

  await delay(1000);

  await printBlock([
    ['Good morning.', 'dim'],
    ['Your shift queue has been updated.', 'dim'],
    ['', ''],
  ]);

  await delay(800);
}

async function runCase() {
  state.phase = 'reading';
  applyTimbre(proceduralTone());
  const c = getCaseForSequence(state.caseNumber);

  if (!c) {
    await endGame();
    return;
  }

  const shift = shiftForCase();
  const slot = slotForCase();

  clear();
  setDate(formatDate(shift));

  await printBlock([
    [`SHIFT ${shift}  ·  CASE ${slot}/${CASES_PER_SHIFT}`, 'system'],
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
    recordRoute(c, chosen);
    addCompliance(chosen.compliance_delta);
    await onRouted(c, chosen);
  });
}

async function onRouted(c, chosen) {
  clearOptions();
  state.phase = 'consequence';

  const tone = c.final ? 'complete' : proceduralTone();
  const routeStatus = routeStamp(tone, state.caseNumber);
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

  if (isAborted()) return;

  if (c.final) {
    state.machineDone = true;
    showContinue('COMPLETE SHIFT', async () => {
      await finalScreen(c);
    });
    return;
  }

  const closesShift = slotForCase() === CASES_PER_SHIFT;
  showContinue(closesShift ? 'CLOSE SHIFT' : 'CONTINUE QUEUE', async () => {
    if (closesShift) {
      await closeShift();
    } else {
      state.caseNumber++;
      await runCase();
    }
  });
}

async function closeShift() {
  const completedShift = shiftForCase();
  const tone = proceduralTone();
  const pool = SHIFT_POOLS[tone] ?? SHIFT_POOLS.standard;
  const shiftMessage = pool[(completedShift - 1) % pool.length];

  state.phase = 'shift-end';
  clear();
  setDate(formatDate(completedShift));

  await printBlock([
    [`END OF SHIFT ${completedShift}`, 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [shiftMessage, 'dim'],
    ['', ''],
    [`CASES PROCESSED:  ${CASES_PER_SHIFT}`, 'faint'],
    [`QUEUE POSITION:   ${state.caseNumber}/${TOTAL_CASES}`, 'faint'],
    ['', ''],
  ]);

  if (isAborted()) return;

  showContinue(`BEGIN SHIFT ${completedShift + 1}`, async () => {
    state.caseNumber++;
    await runCase();
  });
}

async function finalScreen(c) {
  clear();
  setDate(formatDate(shiftForCase()));

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
    [`DATE:             ${formatDate(shiftForCase())}`, 'dim'],
    [`PROCESSING TIME:  ${TOTAL_SHIFTS} SHIFTS`, 'dim'],
    [`CASES PROCESSED:  ${TOTAL_CASES}`, 'dim'],
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
    ['You have processed all cases in your current shift record.', 'dim'],
    ['', ''],
    ['New cases will be assigned at the start of the next cycle.', 'faint'],
    ['', ''],
    ['Thank you for your service to the system.', 'faint'],
    ['', ''],
  ]);
  state.phase = 'end';
}

// Entry point: place the inert hardware before waiting on game data.
(async () => {
  initScale();
  await loadCases();
  initPowerButton();
})();
