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

### Phase 3 — Escalation (current)
- [x] 10 more cases (days 6–15), escalating stakes
- [ ] Compliance effects visible: options narrowing, new channels appearing
- [ ] Mid-game state: player notices narrowing without it being explicit

### Phase 4 — Endgame
- [ ] Final case: the player's own case
- [ ] Single routing option
- [ ] End screen: case number, date, processing time, status: COMPLETE

### Phase 5 — Release
- [ ] README.md finalized
- [ ] GitHub repo created and pushed
- [ ] GitHub Pages enabled
- [ ] Post on blog (signals)
- [ ] Post on Bluesky with link

## Notes
- Cases should feel mundane before they feel sinister
- The compliance mechanic should never be explained in-game
- Never use the word "dystopia" anywhere in the game text
- The final screen should look exactly like every other end-of-case screen
