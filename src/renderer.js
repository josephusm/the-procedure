// renderer.js — terminal output and UI

const terminal = document.getElementById('terminal');
const optionsPanel = document.getElementById('options-panel');
const dateDisplay = document.getElementById('date-display');

const CHAR_DELAY = 12;   // ms per character for typewriter
const LINE_DELAY = 60;   // ms between lines in a block

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
}

export function clearOptions() {
  optionsPanel.innerHTML = '';
}

export function showOptions(options, callback) {
  clearOptions();
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = `[${i + 1}]  ${opt.label}`;
    btn.addEventListener('click', () => {
      disableOptions();
      callback(opt, i);
    });
    optionsPanel.appendChild(btn);
  });
}

function disableOptions() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
  });
}

function scrollBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
