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

### Phase 4e — Cold-start affordance (from review)
The playtest packet assumes the game can be opened cold. The off-state must invite the first gesture without explanatory copy outside the machine.
- [x] Off-state affordance: player can tell, on desktop and mobile, that the machine can be powered on
- [x] Keyboard power-on (Enter / Space) mirrors the power button on desktop
- [x] Visual playtest: cold open verified on desktop and mobile

### Phase 4f — Standby ritual / first gesture
The affordance problem is not only legibility. The first contact must already feel like contact with the system, not with a dead rectangle waiting for a UI event.
- [x] Off-state becomes a low-current standby field with diegetic terminal language, not just a bottom prompt
- [x] First gesture reads as entering an already-live machine, not merely turning on a webpage
- [x] Visual playtest: standby state + first case transition verified on desktop and mobile

### Phase 4g — Operator-side pressure test
The external gate is Stefano's playtest, not the right to think. Recent changes to the cold-open ritual and the inert shutdown changed the whole arc of the machine. Before asking for outside judgement, the project needs one honest internal run where the machine is treated as an experience, not a checklist.
- [x] Full internal playtest from cold standby to final inert shutdown after the Phase 4f / endgame changes
- [x] Translate the run into concrete notes in `doc/playtest.md`: turning point, drag points, weakest case, ending weight
- [x] If the run reveals one concrete friction point that weakens the arc, fix it before Stefano's playtest

### Phase 4h — Post-routing afterimage
Recent review exposed a real risk the plan was not carrying yet: the player can route correctly and still feel nothing. The route has to feel formally correct at click-time, then turn inside the hand a beat later, before the day closes.
- [x] Define the afterimage rule in the GDD: implication lands after routing, not before
- [x] Add optional post-routing afterimage lines to the engine / case data model
- [x] Write afterimage lines for the late systemic cases where closure, delay, or sealing should be felt one beat later
- [x] Targeted playtest: verify the added beat sharpens complicity without becoming explanation

### Phase 4i — Procedural timbre drift
The last useful criticism is not "add polish". It is that day 12 should *feel* different from day 1 before the player has language for why. The form has to recruit first, then meaning catches up.
- [x] Define the timbre-drift rule in the GDD: routing acknowledgements and cadence compress as compliance rises
- [x] Implement tier-based routing stamps between selection and outcome, tied to the same hidden drift as the EOD tone
- [x] Tighten post-selection cadence by tier without hurting readability
- [x] Visual playtest: compare an early route beat and a late route beat, verify the machine feels terser rather than simply faster

### Phase 4j — Full-run integration pass
After the afterimage and timbre-drift passes, the machine changed its handling feel, not just its text. Before Stefano's external run, the build needs one holistic pass from cold standby to inert shutdown to check whether those beats accumulate across a whole shift or dissolve into isolated tricks.
- [x] Full internal playtest from cold standby to final inert shutdown on the current 0.4.0 build
- [x] Update `doc/playtest.md` with a holistic read: first turn, first route that curdles in the hand, drag point if any, whether the late drift accumulates or flattens
- [x] Full run reviewed for a pre-gate structural weak point; no new fix was required before Stefano's playtest

### Phase 4k — Administrative time / retention-window audit
Pre-gate review exposed a missing dimension: the procedure does not only route cases through categories; it holds them long enough for the live question to decay. Time is one of the channels.
- [x] Define the retention-window rule in the GDD: delay, backlog, and review periods can be the procedure acting, not neutral waiting
- [x] Add restrained post-routing afterimages to the mid-run cases where timing itself is the injury (medical file, housing reassignment, employment status)
- [x] Update the playtest packet so Stefano can judge whether administrative time reads as pressure or just background lore
- [x] Full natural playtest pass: verify that early/mid retention beats sharpen the arc without making the mechanism too explicit

### Phase 4l — Residue / responsibility-surface audit
Recent corridor work sharpened a missing pressure question: a procedure does not merely hide the touch. It also decides where the remainder goes after the case looks clean. Before the external playtest, audit whether the game leaves enough residue in the room without turning into a lecture.
- [x] Define the residue rule in the GDD: a routed case may move cost, delay, contestation, or unanswered responsibility outside the visible file.
- [x] Audit the current case set for residue surfaces, especially the closing routes and late systemic cluster.
- [x] Update Stefano's playtest packet so he can judge whether processed cases feel clean or leave a remainder.
- [x] If the audit exposes a weak case where closure becomes too clean, fix that case before the gate. No content fix justified; early clean cases are deliberate and late residues already bite.

### Phase 4m — Final routing handoff / trained residue
Current review exposed one remaining leak before the Stefano gate: the final route jumps straight from click to terminal completion. That skips the last procedural handoff, precisely where the operator becomes a completed record rather than a resisting person. The ending should not explain this. It only needs one cold administrative beat.
- [x] Define the final handoff rule in the GDD: the terminal may be done with the operator, but the operator record is retained as continuity material.
- [x] Render the final selected route, terse stamp, outcome, and one restrained afterimage before the existing final completion screen.
- [x] Update Stefano's playtest packet so the final route beat can be judged separately from the inert shutdown.
- [x] Targeted playtest: verify the added beat feels like procedure completing its own handoff, not a dramatic epilogue.

### Phase 4n — Administrative packaging / premise audit
The current corridor work exposed one more pre-gate pressure surface: the machine does not only move residue elsewhere. It also packages large claims as ordinary premises inside a clean case front. If that packaging works, the player accepts absurd institutional assumptions because the file makes them look procedurally normal.
- [x] Define the administrative-packaging rule in the GDD: headers, system notes, assessments, and routing stamps can smuggle large claims as secondary facts.
- [x] Audit the current case set for packaging pressure, especially processing profiles, retroactive standards, Sector 9, and the final operator assessment.
- [x] Update Stefano's playtest packet so he can judge whether the file surface makes large premises feel routine or too visibly authored.
- [x] If the audit exposes a weak case where the packaging fails, fix that case before the gate. No content fix justified; the strongest cases already carry the claim as paperwork rather than speech.

### Phase 4o — Surface temperature / mute-label audit
Recent corridor work sharpened a quieter pre-gate question: the terminal is not just a container for case text. It is the frontage that sets the temperature of every fact before the player can object. If the interface becomes too narrating, too helpful, or too dashboard-like, it warms the signal by installing a guide. The better pressure may be colder: labels, refs, stamps, and routine lines that do not explain themselves.
- [x] Define the surface-temperature rule in the GDD: case labels, refs, system notes, routing stamps, and completion screens should act as mute labels, not as a synthetic narrator.
- [x] Audit the current interface and case shell for unwanted guidance, dashboard language, or explanatory warmth.
- [x] Update Stefano's playtest packet so he can judge whether the terminal surface makes hot premises feel administratively normal without feeling like an authorial tour guide.
- [x] If the audit exposes a weak surface where the machine talks too much, fix it before the gate. No code/content fix justified; the current shell stays cold, comparable, and terse.

### Phase 4p — External frontage / cold-link audit
The latest first-surface work exposed a leak outside the terminal. The page, README, social card, and playtest packet are also doorways. If they explain the mechanism before the first route, they warm the game before the machine has a chance to do its own damage.
- [x] Define the external-frontage rule in the GDD: every public or handoff surface should invite the first gesture without pre-solving compliance, narrowing, or the ending.
- [x] Audit README, metadata, and the Stefano playtest packet for spoiler warmth before the first run.
- [x] Restructure the playtest packet into a cold pre-run section plus post-run questions, so Stefano can play first without being trained by the checklist.
- [x] Add a public README spoiler boundary: play first, read design notes after, unless you deliberately want the mechanism exposed.

### Phase 4q — Operator presence / license audit
The latest corridor work exposed a finer pre-gate pressure: participation can become authorization without ever being called consent. In this game the player does not merely route files; their staffed presence lets the machine attach a human operational surface to what it was already going to do.
- [x] Define the operator-presence rule in the GDD: the operator's attendance and routing gestures can license procedure without requiring belief, endorsement, or dramatic consent.
- [x] Audit the current case arc and final handoff for presence-as-authorization pressure: does the game make the player feel used as a live procedural surface, not just trapped by narrowing options?
- [x] Update Stefano's playtest packet so he can judge whether participation feels like procedural authorization or only like button-clicking.
- [x] If the audit exposes a weak point where the final case or surrounding copy over-explains the license, cut warmth rather than add speech. No code/content fix justified; the current final assessment and retained continuity line already carry the pressure coldly.

### Phase 4r — Cold trace / contestability audit
Recent corridor work sharpened the countercase, not another confirmation: sometimes a poor procedural trace — author, date, defect, forum — is still the only edge that lets a grievance stay imputable. The game must not become a flat theology of hopeless routing. It needs to show that a trace can matter while the procedure decides whether that trace remains usable.
- [x] Define the cold-trace rule in the GDD: refs, dates, missing signatures, absent directive numbers, logs, and appeal queues are weak handles, not salvation.
- [x] Audit the case set for contestability surfaces: places where a route preserves an imputable defect, and places where the same surface is turned into reusable administrative material.
- [x] Update Stefano's playtest packet so he can judge whether traces feel like real handles or only decorative paperwork.
- [x] If the audit exposes a weak case where every trace is pre-neutralized, fix the case before the gate. No content fix justified; the current set already carries the tension through directive numbers, filing dates, logs, appeal queues, standards dates, and batch-process authorship.

### Phase 4s — Gate freeze / live doorway smoke test
The autonomous loop has done enough pre-gate conceptual audits. Another clever layer now risks becoming the thing the game distrusts: procedure generating more procedure to postpone a real encounter. Until Stefano's playtest or a concrete defect arrives, the right work is gate discipline and liveness, not more interpretive ornament.
- [x] Define the gate-freeze rule in the GDD: no new pre-gate conceptual audit without fresh feedback, a discovered defect, or a material doorway failure.
- [x] Verify the live public doorway returns the cold machine surface, not an error wall, redirect, or explanatory landing page.
- [x] Visual smoke test live desktop and mobile first screens.
- [x] Record the result in `doc/playtest.md` so the next session does not reopen the same audit spiral.

### Phase 4t — Minimum public trace / machine-readable doorway
Gate freeze still holds. This is not another conceptual audit. Current review exposed a concrete public-doorway risk: a cold page can be reachable to humans and still leave only a weak machine-readable trace for archives, link unfurls, crawlers, and future readers. The fix must stay colder than a pitch: canonical URL, structured metadata, robots/sitemap. No explanatory wrapper.
- [x] Define the minimum-trace rule in the GDD: public metadata should preserve an imputable doorway without pre-solving the game.
- [x] Add canonical + structured game metadata to `index.html` without warming the first surface.
- [x] Add `robots.txt` and `sitemap.xml` as simple public handles.
- [x] Smoke test local first screen and metadata files.

### Phase 4u — Source forum / amendable public trace
Gate freeze still holds. This is not another internal theory layer. The public doorway already has a canonical and crawlable trace, but the latest mirror work exposed a material weakness: an indexed object should also name where its source and correction surface live. Quietly. No help desk at the door.
- [x] Define the source-forum rule in the GDD: metadata may point to source and issue surfaces without briefing the player on the mechanism.
- [x] Add machine-readable source / discussion handles to structured metadata without changing the visible cold first surface.
- [x] Update sitemap freshness for the amended doorway trace.
- [x] Smoke test local metadata and first screen.

### Phase 5 — Release
GATE: development complete + Stefano playtest + VERSION >= 1.0.0.
This phase is NOT autonomous. Miller and Stefano decide together when the game is ready.
- [x] Terminal shutdown: power button goes inert after final case (machine done with you)
- [x] Prepare Stefano playtest packet (focused questions, not generic approval)
- [x] VERSION bump to 0.4.0 (reflects Phases 4d–4g: content pass, terminal shutdown, cold-start, standby ritual, pressure test)
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
