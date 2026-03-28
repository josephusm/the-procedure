// scale.js — viewport-adaptive CRT scaling
// Preserves the exact 800×600 layout by applying CSS transform.
// Scales DOWN on small viewports (mobile/tablet), UP on large ones (desktop).
// The terminal never reflows — it just gets physically bigger or smaller.
//
// Layout approach: the bezel is centered in the viewport using translate(-50%,-50%)
// combined with left/top 50%, then scale() is applied on top. This sidesteps
// the problem where flex centering ignores transformed dimensions.

const BEZEL_W = 856;   // 800 + 56px bezel padding
const BEZEL_H = 700;   // screen + bottom bar approximate height
const MARGIN = 24;      // breathing room around the CRT (px per side)

let bezel = null;

function applyScale() {
  if (!bezel) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const scaleW = (vw - MARGIN * 2) / BEZEL_W;
  const scaleH = (vh - MARGIN * 2) / BEZEL_H;
  const scale = Math.min(scaleW, scaleH);

  bezel.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

export function initScale() {
  bezel = document.getElementById('crt-bezel');
  if (!bezel) return;

  applyScale();
  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', () => {
    setTimeout(applyScale, 100);
  });
}
