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
export function filterOptions(options) {
  const s = score;
  let keep;
  if (s < 20)      keep = options.length;
  else if (s < 40) keep = Math.max(2, options.length - 1);
  else if (s < 65) keep = Math.max(2, options.length - 1);
  else if (s < 85) keep = Math.min(2, options.length);
  else              keep = 1; // late game: one path

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
export function eodTone() {
  if (score < 25) return 'standard';
  if (score < 55) return 'affirming';
  if (score < 80) return 'seamless';
  return 'complete';
}
