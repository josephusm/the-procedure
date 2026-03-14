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

// Returns how many options to show for a given case.
// At low compliance: all options. At high compliance: fewer.
export function filterOptions(options) {
  const s = score;
  if (s < 20) return options;
  if (s < 40) return options.slice(0, Math.max(2, options.length - 1));
  if (s < 65) return options.slice(0, Math.max(2, options.length - 1));
  if (s < 85) return options.slice(0, Math.min(2, options.length));
  return options.slice(0, 1); // late game: one path
}

// Returns the tone suffix for end-of-day messages.
export function eodTone() {
  if (score < 25) return 'standard';
  if (score < 55) return 'affirming';
  if (score < 80) return 'seamless';
  return 'complete';
}
