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

// Power button click — a physical mechanical thunk
export function powerClick() {
  const ac = getCtx();

  // Low thud: short burst of noise through low-pass
  const bufLen = Math.floor(ac.sampleRate * 0.04);
  const buf = ac.createBuffer(1, bufLen, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < bufLen; i++) {
    d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.15));
  }

  const src = ac.createBufferSource();
  src.buffer = buf;

  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 400;
  lp.Q.value = 1;

  const gain = ac.createGain();
  gain.gain.value = 0.25;

  src.connect(lp);
  lp.connect(gain);
  gain.connect(ac.destination);
  src.start();
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

// Ambient hum — electrical mains hum with harmonics, continuous
export function startHum() {
  const ac = getCtx();
  const master = ac.createGain();
  master.gain.value = 0.06;
  master.connect(ac.destination);

  // Fundamental 50Hz + 2nd and 3rd harmonics for richer transformer hum
  const harmonics = [
    { freq: 50,  gain: 1.0  },
    { freq: 100, gain: 0.5  },
    { freq: 150, gain: 0.25 },
  ];

  const oscs = harmonics.map(h => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = 'sine';
    osc.frequency.value = h.freq;
    g.gain.value = h.gain;
    osc.connect(g);
    g.connect(master);
    osc.start();
    return osc;
  });

  // Slow LFO modulating master volume — the hum breathes
  const lfo = ac.createOscillator();
  const lfoGain = ac.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 0.015;
  lfo.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfo.start();

  return { oscs, lfo, gain: master };
}
