// engine.js — game loop and state

import { print, printBlock, clear, clearOptions, showOptions, setDate, delay } from './renderer.js';
import { loadCases, getCaseForDay, getAvailableOptions } from './cases.js';
import { add as addCompliance, eodTone } from './compliance.js';
import { unlock, beep, driveNoise, confirmTone, endTone, startHum } from './audio.js';

const TOTAL_DAYS = 16;

const EOD_MESSAGES = {
  standard: 'All cases for today have been processed. Your work is appreciated.',
  affirming: 'Processing complete. Your throughput today was within acceptable parameters.',
  seamless:  'Daily routing cycle complete. No irregularities recorded.',
  complete:  'Cycle complete.',
};

let hum = null;
let audioUnlocked = false;

let state = {
  day: 1,
  phase: 'boot',
};

function formatDate(day) {
  const base = new Date(2026, 0, 5);
  const d = new Date(base);
  d.setDate(base.getDate() + day - 1);
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-GB', opts).toUpperCase();
}

function tryUnlockAudio() {
  if (audioUnlocked) return;
  unlock();
  audioUnlocked = true;
  // Play boot sounds
  beep(800, 0.12);
  setTimeout(() => driveNoise(1.5), 300);
  setTimeout(() => { hum = startHum(); }, 1800);
}

// Unlock audio on first user interaction
document.addEventListener('click', tryUnlockAudio, { once: false });
document.addEventListener('keydown', tryUnlockAudio, { once: false });

// ── CRT Boot sequence (visual only — audio plays when user interacts) ──
async function crtBoot() {
  const screen = document.getElementById('crt-screen');
  const app = document.getElementById('app');

  // Phase 0: black screen
  app.style.opacity = '0';
  await delay(800);

  // Phase 1: screen flicker — CRT warming up
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

  await delay(2000);

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
    hum.gain.gain.exponentialRampToValueAtTime(0.001, hum.gain.context.currentTime + 2);
    setTimeout(() => hum.osc.stop(), 2100);
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
  await crtBoot();
  await runDay();
})();
