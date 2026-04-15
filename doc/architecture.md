# Architecture — The Procedure

## Overview

Single-page web application. No server, no backend, no build step.
Load `index.html` in a browser and the game runs.

## Game loop

```
boot → day N begins → case loads → player reads → player routes → outcome logged → optional afterimage lands → day N ends → day N+1
```

State lives in a plain JS object (`engine.js`). No localStorage — the game is not meant to be saved. It is meant to be completed in one sitting, like a shift.

## State shape

```js
{
  day: 1,                    // current day (1-indexed)
  compliance: 0,             // hidden score, 0–100
  log: [],                   // array of processed case summaries
  currentCase: null,         // active case object
  phase: "boot"|"reading"|"routing"|"eod"|"end"
}
```

## Compliance

The compliance score is never displayed. It influences:
- Which cases appear (high compliance → cases become more systemic, less personal)
- Which routing options are available (high compliance → fewer, more automatic)
- EOD (end of day) summary tone — imperceptibly shifts over time

Compliance increases on "correct" routing choices. Every choice is technically correct. Some choices increase compliance faster.

## Cases

Cases are defined in `data/cases.json` as an array of objects:

```json
{
  "id": "case-001",
  "day": 1,
  "subject": "Noise Complaint — Sector 4",
  "body": "...",
  "options": [
    {
      "label": "Route to Residential Disturbance Register",
      "compliance_delta": 2,
      "outcome": "Your routing has been logged. Processing time: 6–8 weeks.",
      "afterimage": "The file remains in the register until inspection capacity is available."
    },
    {
      "label": "Route to Community Relations Office",
      "compliance_delta": 1,
      "outcome": "A liaison will be assigned. Expected contact: 30–45 days."
    }
  ]
}
```

`afterimage` is optional. When present, it prints after the selected outcome with a short delay, before the end-of-day screen. It is not commentary. It is the routed channel completing its thought one beat too late for the operator to stay innocent.

## Renderer

All output is printed line-by-line to a terminal `<div>`. 
Typewriter effect: each character appended with a small delay.
The cursor blinks. Nothing else moves.

`renderer.js` exposes:
- `print(text, cls)` — append a line with optional CSS class
- `printBlock(lines)` — print multiple lines sequentially
- `clear()` — clear the terminal
- `showOptions(options, callback)` — render routing buttons, call callback on selection

## Audio

All sound is procedural via Web Audio API. No external files.

`audio.js` exposes:
- `init()` — create AudioContext (must be called from user gesture)
- `startHum()` — ambient electrical hum (50Hz + harmonics, LFO-modulated)
- `click()` — short noise burst for typewriter keystrokes (fired every 3rd char)
- `routingTone()` — two ascending notes on option selection
- `endTone()` — low, slow-decay tone on final screen

Audio context is deferred to first interaction (browser autoplay policy). The hum starts on the player's first routing choice. The click sounds fire during typewriter output — throttled to avoid density. Everything is subtle. The system does not draw attention to itself.
