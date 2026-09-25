# Architecture — The Procedure

## Overview

Single-page web application. No server, no backend, no build step.
Load `index.html` in a browser and the game runs.

The bezel is positioned and scaled before it becomes visible, so the first painted machine is already at its final viewport scale. The monitor starts genuinely off; only the hardware shell and power control are visible. Power-on unlocks audio, starts hardware sound behind dark glass, wakes the CRT, and only then renders text.

## Game loop

```
boot → shift N begins → case 1/4 loads → player reads → player routes → outcome + optional afterimage remain visible → player continues → case 2/4 … → player closes shift → shift N+1
```

State lives in a plain JS object (`engine.js`). No localStorage — the game is not meant to be saved. It is meant to be completed in one sitting, like a shift.

## State shape

```js
{
  caseNumber: 1,             // current case in the 16-case sequence
  compliance: 0,             // hidden score, 0–100
  machineDone: false,        // final route has been submitted
  phase: "off"|"boot"|"reading"|"routing"|"consequence"|"shift-end"|"end"|"done"
}
```

## Compliance

The compliance score is never displayed. It influences:
- Which routing options are available (high compliance → fewer, more automatic)
- Routing acknowledgements and shift-close summary tone — imperceptibly shift over time

The case sequence is fixed. Escalation comes from the authored order; compliance changes how much room the operator still has when each case arrives.

Compliance increases on "correct" routing choices. Every choice is technically correct. Some choices increase compliance faster.

## Cases

Cases are defined in `data/cases.json` as an array of objects:

```json
{
  "id": "case-001",
  "sequence": 1,
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

`afterimage` is optional. When present, it prints after the selected outcome with a short delay, before the continuation control. It is not commentary. It is the routed channel completing its thought one beat too late for the operator to stay innocent. The result remains visible until the operator explicitly continues or closes the shift.

## Route history and recurrence

`cases.js` keeps an in-memory map from case id to the chosen compliance delta. It is session state, not a dossier: refresh the page and it is gone.

A later case may declare a data-driven recurrence:

```json
{
  "recurrence": {
    "from_case": "case-004",
    "variants": {
      "1": {
        "note": "The earlier contact remains open.",
        "option_overrides": {
          "3": {
            "label": "Route to ...",
            "outcome": "...",
            "afterimage": "..."
          }
        }
      }
    }
  }
}
```

Before a case is displayed, `cases.js` looks up the recorded source route, appends one cold `Prior route update:`, and merges the matching option overrides. Compliance filtering runs afterward. Every variant overrides the d=3 route so recurrence still changes the visible routing surface under maximum narrowing; lower-delta overrides may preserve a more specific live handle while those channels remain available.

The authored case order and ending remain fixed. Route history changes how three later files return, not whether the player escapes the procedure.

## Renderer

All output is printed line-by-line to a terminal `<div>`. 
Typewriter effect: each character appended with a small delay.
The cursor blinks. Nothing else moves.

`renderer.js` exposes:
- `print(text, cls)` — append a line with optional CSS class
- `printBlock(lines)` — print multiple lines sequentially
- `setTimingProfile(profile)` — adjust character / line pacing for the current procedural tone
- `clear()` — clear the terminal
- `showOptions(options, callback)` — render routing buttons, call callback on selection
- `showContinue(label, callback)` — render one explicit continuation control; Enter/Space mirrors the button

The renderer timing is not globally fixed. The engine can tighten or relax the terminal cadence based on the current procedural tone, so the machine gradually becomes terser as compliance rises.

## Audio

All sound is procedural via Web Audio API. No external files.

`audio.js` exposes:
- `init()` — create AudioContext (must be called from user gesture)
- `startHum()` — ambient electrical hum (50Hz + harmonics, LFO-modulated)
- `click()` — short noise burst for typewriter keystrokes (fired every 3rd char)
- `routingTone()` — two ascending notes on option selection
- `endTone()` — low, slow-decay tone on final screen

Audio context is deferred to the physical power gesture (browser autoplay policy). The power thunk comes first; transformer hum, POST beep, and drive activity begin while the glass is still dark. The click sounds fire during typewriter output — throttled to avoid density. Everything is subtle. The system does not draw attention to itself.
