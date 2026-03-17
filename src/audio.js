// audio.js — CRT boot and UI sounds via Web Audio API

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

// Ensure AudioContext is resumed (browsers require user gesture)
export function unlock() {
  const ac = getCtx();
  if (ac.state === 'suspended') ac.resume();
}

// POST beep — single tone, like a BIOS self-test
export function beep(freq = 800, duration = 0.12) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

// Floppy drive noise — filtered white noise with a rhythmic flutter
export function driveNoise(duration = 1.5) {
  const ac = getCtx();
  const bufferSize = ac.sampleRate * duration;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);

  // White noise with rhythmic amplitude modulation (drive head stepping)
  const stepFreq = 18; // ~18 steps/sec like a 3.5" floppy
  for (let i = 0; i < bufferSize; i++) {
    const t = i / ac.sampleRate;
    const envelope = 0.5 + 0.5 * Math.sin(2 * Math.PI * stepFreq * t);
    data[i] = (Math.random() * 2 - 1) * envelope * 0.3;
  }

  const source = ac.createBufferSource();
  source.buffer = buffer;

  // Bandpass filter — sounds like mechanical noise, not hiss
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 600;
  filter.Q.value = 2;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.12, ac.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, ac.currentTime + duration * 0.8);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  source.start(ac.currentTime);
  source.stop(ac.currentTime + duration);
}

// Keystroke click — very short noise burst
export function keystroke() {
  const ac = getCtx();
  const bufferSize = Math.floor(ac.sampleRate * 0.015);
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }
  const source = ac.createBufferSource();
  source.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1500;

  const gain = ac.createGain();
  gain.gain.value = 0.06;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  source.start();
}

// Confirmation tone — soft dual-tone on routing selection
export function confirmTone() {
  const ac = getCtx();
  [440, 554].forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime + i * 0.08);
    osc.stop(ac.currentTime + 0.4);
  });
}

// End tone — lower, more final
export function endTone() {
  const ac = getCtx();
  [330, 262].forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.08, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(ac.currentTime + i * 0.15);
    osc.stop(ac.currentTime + 0.6);
  });
}

// Ambient hum — very low electrical hum, continuous
export function startHum() {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.value = 50; // mains hum
  gain.gain.value = 0.015;
  osc.connect(gain);
  gain.connect(ac.destination);
  osc.start();
  return { osc, gain }; // caller can stop later
}
