// compliance.js — hidden score and its effects
// This score is never shown to the player.
// It shapes what they see, not what they know.

let score = 0;

export function add(delta) {
  score = Math.min(100, Math.max(0, score + delta));
}

export function get() {
  return score;
}

export function set(val) {
  score = Math.min(100, Math.max(0, val));
}

// How many options to show for a given case.
// Three stages: full choice → at most 2 → single option.
// The system keeps the *most compliant* options and drops the rest.
//
// Every non-final case has 3 options with distinct deltas (1, 2, 3).
// Score ranges:
//   Min-compliance path: 20 by day 16 (2-option from day 11, never single-option)
//   Max-compliance path: 45 by day 16 (single-option from day 10)
//   Middle path: ~32 by day 16 (single-option from day 14)
//
// Design: the humane option (d=1) disappears first, always.
export function filterOptions(options) {
  const s = score;
  let keep;
  if (s < 10)      keep = options.length;              // early: full choice
  else if (s < 25) keep = Math.min(2, options.length); // mid: at most 2
  else             keep = 1;                           // late: one path

  if (keep >= options.length) return options;

  // Sort by compliance_delta descending, keep the top N.
  // The humane options disappear first.
  const ranked = options
    .map((opt, i) => ({ opt, i, d: opt.compliance_delta }))
    .sort((a, b) => b.d - a.d || a.i - b.i)
    .slice(0, keep)
    .sort((a, b) => a.i - b.i) // restore original display order
    .map(x => x.opt);

  return ranked;
}

// Returns the tone suffix for end-of-day messages.
// Thresholds calibrated so the humane player experiences three tones,
// the compliant player reaches "complete" by mid-game, and no path
// stays at "standard" long enough to become invisible.
//
// Distribution across paths:
//   Humane (d=1→d=2): standard 1-6, affirming 7-12, seamless 13-15
//   Compliant (d=3):  standard 1-2, affirming 3-4, seamless 5-8, complete 9-15
//   Middle (~d=2):    standard 1-3, affirming 4-7, seamless 8-12, complete 13-15
export function eodTone() {
  if (score < 7)  return 'standard';
  if (score < 15) return 'affirming';
  if (score < 25) return 'seamless';
  return 'complete';
}
