// scale.js — scale-to-fit for small viewports
// Preserves the exact 800×600 CRT layout by applying CSS transform

const BEZEL_W = 856;   // 800 + 56 (padding)
const BEZEL_H = 700;   // approximate total height including bottom bar
const PADDING = 16;     // minimum breathing room on mobile (px)

let bezel = null;

function applyScale() {
  if (!bezel) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw >= BEZEL_W + 64) {
    // Desktop: no scaling needed
    bezel.style.transform = '';
    bezel.style.marginTop = '';
    document.body.classList.remove('scaled');
    return;
  }

  // Mobile/tablet: scale to fit width (with padding)
  const scaleW = (vw - PADDING) / BEZEL_W;
  const scaleH = (vh - PADDING) / BEZEL_H;
  const scale = Math.min(scaleW, scaleH, 1);

  bezel.style.transform = `scale(${scale})`;
  // Offset negative margin to remove gap left by scaling
  const actualH = BEZEL_H * scale;
  const originalH = bezel.offsetHeight;
  bezel.style.marginBottom = `${actualH - originalH}px`;
  document.body.classList.add('scaled');
}

export function initScale() {
  bezel = document.getElementById('crt-bezel');
  if (!bezel) return;

  applyScale();
  window.addEventListener('resize', applyScale);
  window.addEventListener('orientationchange', () => {
    // Delay slightly — some browsers report old dimensions immediately
    setTimeout(applyScale, 100);
  });
}
