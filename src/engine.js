// engine.js — game loop and state

import { print, printBlock, clear, clearOptions, showOptions, setDate, delay } from './renderer.js';
import { loadCases, getCaseForDay, getAvailableOptions } from './cases.js';
import { add as addCompliance, eodTone } from './compliance.js';

const TOTAL_DAYS = 15; // Phase 3: days 1–15

const EOD_MESSAGES = {
  standard: 'All cases for today have been processed. Your work is appreciated.',
  affirming: 'Processing complete. Your throughput today was within acceptable parameters.',
  seamless:  'Daily routing cycle complete. No irregularities recorded.',
  complete:  'Cycle complete.',
};

const BOOT_LINES = [
  ['PROCESSING SYSTEM v4.1.2', 'system'],
  ['Initializing session...', 'system'],
  ['', ''],
  ['Good morning.', 'dim'],
  ['Your queue has been updated.', 'dim'],
  ['', ''],
];

let state = {
  day: 1,
  phase: 'boot',
};

function formatDate(day) {
  // Fictional date, starting from a Monday
  const base = new Date(2026, 0, 5); // Mon 5 Jan 2026
  const d = new Date(base);
  d.setDate(base.getDate() + day - 1);
  const opts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return d.toLocaleDateString('en-GB', opts).toUpperCase();
}

async function boot() {
  setDate(formatDate(state.day));
  await delay(400);
  await printBlock(BOOT_LINES);
  await runDay();
}

async function runDay() {
  state.phase = 'reading';
  const c = getCaseForDay(state.day);

  if (!c) {
    await endGame();
    return;
  }

  setDate(formatDate(state.day));

  await printBlock([
    ['━'.repeat(60), 'sep'],
    [`DAY ${state.day}  ·  INCOMING CASE`, 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
    [`CASE REF:  ${c.ref}`, 'dim'],
    [`SUBJECT:   ${c.subject}`, 'bright'],
    ['', ''],
    [c.body, ''],
    ['', ''],
    ['Route this case to:', 'faint'],
    ['', ''],
  ]);

  const options = getAvailableOptions(c);
  state.phase = 'routing';

  showOptions(options, async (chosen) => {
    addCompliance(chosen.compliance_delta);
    await onRouted(c, chosen);
  });
}

async function onRouted(c, chosen) {
  clearOptions();
  state.phase = 'eod';

  await printBlock([
    ['', ''],
    [`> ${chosen.label}`, 'dim'],
    ['', ''],
    [chosen.outcome, 'faint'],
    ['', ''],
  ]);

  await delay(800);

  const tone = eodTone();
  await printBlock([
    ['━'.repeat(60), 'sep'],
    [EOD_MESSAGES[tone], 'system'],
    ['━'.repeat(60), 'sep'],
    ['', ''],
  ]);

  await delay(1200);

  state.day++;
  if (state.day > TOTAL_DAYS) {
    await endGame();
  } else {
    await runDay();
  }
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
  await boot();
})();
