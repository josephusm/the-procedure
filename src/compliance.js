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

// How many options to show for a given case.
// At low compliance: all options. As it rises, fewer.
// The system keeps the *most compliant* options and drops the rest.
// Thresholds calibrated so that even "resistant" players (always picking
// lowest-compliance option) see the corridor close by day 14–15.
// Max-compliance players hit single-option around day 9.
export function filterOptions(options) {
  const s = score;
  let keep;
  if (s < 8)       keep = options.length;         // early: full choice
  else if (s < 15) keep = Math.max(2, options.length - 1); // mid: one drops
  else if (s < 22) keep = Math.min(2, options.length);     // late-mid: at most 2
  else              keep = 1;                      // late: one path

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
// Calibrated to the actual score range (max ~43, min ~24).
export function eodTone() {
  if (score < 10) return 'standard';
  if (score < 20) return 'affirming';
  if (score < 30) return 'seamless';
  return 'complete';
}
