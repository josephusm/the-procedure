// renderer.js — terminal output, options, keyboard input

import { click as audioClick } from './audio.js';

const terminal = document.getElementById('terminal');
const optionsPanel = document.getElementById('options-panel');
const dateDisplay = document.getElementById('date-display');
const inputLine = document.getElementById('input-line');
const inputText = inputLine.querySelector('.input-text');

const CHAR_DELAY = 12;
const LINE_DELAY = 60;

let activeCallback = null;
let activeOptions = [];

// ── Keyboard input ──
document.addEventListener('keydown', (e) => {
  if (!activeCallback) return;

  if (e.key >= '1' && e.key <= '9') {
    const idx = parseInt(e.key) - 1;
    if (idx < activeOptions.length) {
      inputText.textContent = e.key;
      // Highlight the matching option
      document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === idx);
      });
    }
  } else if (e.key === 'Backspace') {
    inputText.textContent = '';
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
  } else if (e.key === 'Enter') {
    const val = inputText.textContent.trim();
    if (val === '') return;
    const idx = parseInt(val) - 1;
    if (idx >= 0 && idx < activeOptions.length) {
      submit(idx);
    }
  }
});

function submit(idx) {
  const cb = activeCallback;
  const opt = activeOptions[idx];
  activeCallback = null;
  activeOptions = [];
  inputText.textContent = '';
  disableOptions();
  cb(opt, idx);
}

// ── Output ──
export function setDate(text) {
  dateDisplay.textContent = text;
}

export function print(text, cls = '') {
  return new Promise(resolve => {
    const span = document.createElement('span');
    span.className = 'line' + (cls ? ' ' + cls : '');
    terminal.appendChild(span);
    scrollBottom();

    if (!text || text === '') {
      span.className = 'line empty';
      resolve();
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      span.textContent += text[i];
      // Keystroke click on ~every 3rd character (not every one — subtlety)
      if (i % 3 === 0) audioClick();
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        scrollBottom();
        resolve();
      }
    }, CHAR_DELAY);
  });
}

export async function printBlock(lines) {
  for (const [text, cls] of lines) {
    await print(text, cls);
    await delay(LINE_DELAY);
  }
}

export function clear() {
  terminal.innerHTML = '';
  clearOptions();
  inputText.textContent = '';
}

export function clearOptions() {
  optionsPanel.innerHTML = '';
  activeCallback = null;
  activeOptions = [];
  inputText.textContent = '';
}

export function showOptions(options, callback) {
  clearOptions();
  activeOptions = options;
  activeCallback = callback;

  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `[${i + 1}]  ${opt.label}`;
    btn.addEventListener('click', () => {
      submit(i);
    });
    optionsPanel.appendChild(btn);
  });
}

function disableOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('selected');
  });
}

function scrollBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
