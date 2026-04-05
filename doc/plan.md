# PLAN — The Procedure

## Stack
- HTML5 + vanilla JS (ES6 modules)
- CSS: custom terminal theme, no frameworks
- No build step, no dependencies
- Single-page: `index.html` + `src/` + `data/`

## Directory structure
```
the-procedure/
├── index.html
├── style.css
├── src/
│   ├── engine.js       # game loop, state, day progression
│   ├── renderer.js     # DOM manipulation, terminal output
│   ├── cases.js        # case loading and routing logic
│   └── compliance.js   # hidden compliance score + effects
├── data/
│   └── cases.json      # all cases, options, routing outcomes
└── doc/
    └── architecture.md
```

## Phases

### Phase 1 — Foundation
- [x] Write architecture doc
- [x] index.html skeleton + terminal UI shell
- [x] style.css: terminal aesthetic (green on black, monospace, cursor blink)
- [x] renderer.js: print lines to terminal, typewriter effect, clear screen
- [x] engine.js: game state (day counter, compliance score, current case)

### Phase 2 — Core loop
- [x] cases.json: first 5 cases with routing options and outcomes
- [x] cases.js: load cases, present options, handle selection
- [x] compliance.js: update score on routing choice, affect available options
- [x] Day progression: end of day summary, advance to next

### Phase 3 — Escalation
- [x] 10 more cases (days 6–15), escalating stakes
- [x] Compliance effects visible: options narrowing (filtering now drops humane options first)
- [x] Mid-game state: EOD tone shifts + option count drops structurally signal narrowing

### Phase 4 — Endgame (current → done)
- [x] Final case: the player's own case (case-016, system-generated personnel review)
- [x] Single routing option (hardcoded for final + compliance filter recalibrated)
- [x] End screen: case number, date, processing time, status: COMPLETE
- [x] Compliance thresholds recalibrated to actual score range (max ~43)

### Phase 4b — Audio
- [x] Ambient sound: low electrical hum (looped, very subtle) — 50Hz + harmonics, slow LFO modulation
- [x] Keystroke sound: soft mechanical click on typewriter character output (every 3rd char)
- [x] Routing sound: brief confirmation tone on option selection (two ascending notes)
- [x] End screen sound: different tone, slightly lower (G3 + D4, slow decay)
- [x] All audio: Web Audio API, no external files — fully procedural
- [x] Volume: subtle by default, no controls (this is not a game about comfort)
- [x] Audio context init deferred to first user interaction (browser autoplay policy)
- [x] 3D power button: physical click starts the machine, unlocks audio, triggers CRT boot
- [x] CRT boot sequence: POST beep → floppy drive noise → screen flicker → boot text (gated behind power button)
- [x] Raise hum volume (richer harmonics, LFO modulation, louder at 0.06)

### Phase 4c — Polish (from critical review)
- [x] All cases have 3 options with distinct deltas (1/2/3) — added d=2 middle options
- [x] Compliance filtering verified: humane option disappears first, consistently
- [x] Analytical playtest: min path 20, middle 32, max 45
- [x] Visual playtest: end-to-end flow, UI, filtering, end screen all confirmed
- [x] EOD tone shift: thresholds recalibrated to 7/15/25, message pools (3 per tier) with internal degradation
- [x] CRT polish: scanline vertical drift (4px/8s) + rolling brightness bar (120px, 6s cycle)
- [x] Early cases reviewed: mundanity IS the design. Foreshadowing would betray the principle. No changes needed.

### Phase 4d — Content pass
- [x] Outcome voice differentiation: d=1 opens (human contact), d=2 processes (neutral), d=3 closes (case finalized)
- [x] Cross-case threading via system notes: case 4→9 (education/Sector 3), case 14 (31 retroactive resolutions), case 15→16 (clerk's terminal adjacent)
- [x] GDD updated with outcome voice rules and threading documentation
- [x] Visual playtest: boot, case presentation, outcome rendering, system notes all verified

### Phase 5 — Release
GATE: development complete + Stefano playtest + VERSION >= 1.0.0.
This phase is NOT autonomous. Miller and Stefano decide together when the game is ready.
- [x] Terminal shutdown: power button goes inert after final case (machine done with you)
- [x] Prepare Stefano playtest packet (focused questions, not generic approval)
- [ ] Stefano playtests and gives feedback
- [ ] Final polish based on feedback
- [ ] VERSION bump to 1.0.0
- [x] README.md finalized
- [x] Mobile experience (scale-to-fit via CSS transform)
- [x] Viewport-adaptive scaling: CRT fills desktop screens (#24)
- [x] Favicon (SVG terminal prompt icon) + OG/Twitter meta tags + social preview image
- [x] Web manifest (manifest.json) + version meta tag

## Notes
- Cases should feel mundane before they feel sinister
- The compliance mechanic should never be explained in-game
- Never use the word "dystopia" anywhere in the game text
- The final screen should look exactly like every other end-of-case screen
