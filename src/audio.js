// audio.js — procedural sound design
// All sounds generated via Web Audio API. No external files.
// Volume: subtle. No controls. This is not a game about comfort.

let ctx = null;
let masterGain = null;
let humGain = null;
let humActive = false;

const MASTER_VOLUME = 0.35;
const HUM_VOLUME = 0.06;
const CLICK_VOLUME = 0.08;
const TONE_VOLUME = 0.12;

// ── Init (requires user gesture) ──

function ensureContext() {
  if (ctx) return true;
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = ctx.createGain();
    masterGain.gain.value = MASTER_VOLUME;
    masterGain.connect(ctx.destination);
    return true;
  } catch (e) {
    return false;
  }
}

export function init() {
  return ensureContext();
}

// ── Ambient hum ──
// Electrical mains hum: 50Hz fundamental + harmonics.
// The kind of sound a fluorescent tube makes in a government office
// that nobody has renovated since the 1970s.

export function startHum() {
  if (!ensureContext() || humActive) return;
  humActive = true;

  humGain = ctx.createGain();
  humGain.gain.value = HUM_VOLUME;
  humGain.connect(masterGain);

  // 50Hz fundamental
  const osc1 = ctx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 50;
  const g1 = ctx.createGain();
  g1.gain.value = 1.0;
  osc1.connect(g1);
  g1.connect(humGain);
  osc1.start();

  // 100Hz second harmonic (louder — this is the "buzz")
  const osc2 = ctx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.value = 100;
  const g2 = ctx.createGain();
  g2.gain.value = 0.6;
  osc2.connect(g2);
  g2.connect(humGain);
  osc2.start();

  // 150Hz third harmonic (subtle)
  const osc3 = ctx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.value = 150;
  const g3 = ctx.createGain();
  g3.gain.value = 0.15;
  osc3.connect(g3);
  g3.connect(humGain);
  osc3.start();

  // Slow amplitude modulation — the hum breathes slightly
  const lfo = ctx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.15; // very slow
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = HUM_VOLUME * 0.3; // modulation depth
  lfo.connect(lfoGain);
  lfoGain.connect(humGain.gain);
  lfo.start();
}

export function stopHum() {
  // Not called in normal play — the hum persists like the system does
  if (humGain) {
    humGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
    humActive = false;
  }
}

// ── Keystroke click ──
// Short noise burst through a bandpass filter.
// The mechanical intimacy of a terminal that registers each character.

export function click() {
  if (!ctx) return;

  const now = ctx.currentTime;
  const dur = 0.015; // very short

  // White noise burst
  const bufferSize = Math.ceil(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1);
  }

  const src = ctx.createBufferSource();
  src.buffer = buffer;

  // Bandpass to shape the click — mid-high, like a key striking
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 3200;
  filter.Q.value = 1.5;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(CLICK_VOLUME, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  src.connect(filter);
  filter.connect(gain);
  gain.connect(masterGain);
  src.start(now);
  src.stop(now + dur);
}

// ── Routing confirmation tone ──
// A brief, clean tone. The system acknowledging your input.
// Two ascending notes — optimistic in a way that should feel wrong.

export function routingTone() {
  if (!ctx) return;

  const now = ctx.currentTime;

  // First note
  playTone(440, now, 0.08, TONE_VOLUME);
  // Second note — a minor third up
  playTone(523.25, now + 0.1, 0.12, TONE_VOLUME * 0.8);
}

// ── End screen tone ──
// Lower. Longer. A single frequency that decays slowly.
// Not dramatic — just final. The way a file closes.

export function endTone() {
  if (!ctx) return;

  const now = ctx.currentTime;

  // Low fundamental
  playTone(196, now, 1.5, TONE_VOLUME * 0.7); // G3
  // Faint fifth above, delayed
  playTone(293.66, now + 0.3, 1.2, TONE_VOLUME * 0.25); // D4
}

// ── Helpers ──

function playTone(freq, startTime, duration, volume) {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(masterGain);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}
