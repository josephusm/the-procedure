// engine.js — game loop and state

import { print, printBlock, clear, clearOptions, showOptions, setDate, delay, abort, resetAbort, isAborted } from './renderer.js';
import { loadCases, getCaseForDay, getAvailableOptions } from './cases.js';
import { add as addCompliance, get as getCompliance, set as setCompliance, eodTone } from './compliance.js';
import { unlock, beep, driveNoise, confirmTone, endTone, startHum, powerClick } from './audio.js';

const TOTAL_DAYS = 16;
const SAVE_KEY = 'the-procedure-save';

const EOD_MESSAGES = {
  standard: 'All cases for today have been processed. Your work is appreciated.',
  affirming: 'Processing complete. Your throughput today was within acceptable parameters.',
  seamless:  'Daily routing cycle complete. No irregularities recorded.',
  complete:  'Cycle complete.',
};

let hum = null;

let state = {
  day: 1,
  phase: 'off',
};

function formatDate(day) {
  const base = new Date(2026, 0, 5);
  const d = new Date(base);
  d.setDate(base.getDate() + day - 1);
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-GB', opts).toUpperCase();
}

// ── Persistence ──

function saveState() {
  const data = { day: state.day, compliance: getCompliance() };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data && typeof data.day === 'number' && typeof data.compliance === 'number') {
      return data;
    }
  } catch(e) {}
  return null;
}

function clearSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch(e) {}
}

// ── Shutdown ──

async function shutdown() {
  if (state.phase === 'off' || state.phase === 'shutdown') return;
  state.phase = 'shutdown';

  const btn = document.getElementById('power-btn');
  const screen = document.getElementById('crt-screen');
  const app = document.getElementById('app');

  // Abort any running print/animation sequences
  abort();

  // Save current progress before shutting down
  saveState();

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

  state.phase = 'off';
}

// ── Power on: button click → audio unlock → boot ──
function initPowerButton() {
  const btn = document.getElementById('power-btn');
  const screen = document.getElementById('crt-screen');

  // Start with screen off
  screen.classList.add('off');

  btn.addEventListener('click', async () => {
    if (state.phase === 'off') {
      // ── Power ON ──
      state.phase = 'boot';
      resetAbort();

      // Check for saved state
      const saved = loadState();
      if (saved) {
        state.day = saved.day;
        setCompliance(saved.compliance);
      }

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

      await crtBoot(!!saved);
      await runDay();

    } else if (state.phase === 'reading' || state.phase === 'routing' || state.phase === 'eod' || state.phase === 'end') {
      // ── Power OFF ──
      await shutdown();
    }
    // During 'boot', 'shutdown' — ignore clicks
  });
}

// ── CRT Boot sequence ──
async function crtBoot(resumed) {
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

  if (resumed) {
    await printBlock([
      ['Session restored.', 'dim'],
      ['Your queue is waiting.', 'dim'],
      ['', ''],
    ]);
  } else {
    await printBlock([
      ['Good morning.', 'dim'],
      ['Your queue has been updated.', 'dim'],
      ['', ''],
    ]);
  }

  await delay(800);
}

async function runDay() {
  state.phase = 'reading';
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
    clearSave(); // game complete — no save to restore
    await finalScreen(c);
    return;
  }

  await printBlock([
    ['', ''],
    [`> ${chosen.label}`, 'dim'],
    ['', ''],
    [chosen.outcome, 'faint'],
  ]);

  await delay(2500);
  if (isAborted()) return;

  clear();
  setDate(formatDate(state.day));

  const tone = eodTone();
  await printBlock([
    ['END OF DAY', 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [EOD_MESSAGES[tone], 'dim'],
    ['', ''],
  ]);

  if (isAborted()) return;
  await delay(2000);
  if (isAborted()) return;

  state.day++;
  saveState(); // persist progress before next day

  if (state.day > TOTAL_DAYS) {
    clearSave();
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
  initPowerButton();
})();
