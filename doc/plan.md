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

### Phase 4v — Canonical attribution / public authorship trace
Gate freeze still holds. This is not another conceptual audit. Review exposed a concrete trace defect: the public README and machine-readable metadata named only `J. Miller`, while the canonical project attribution is `Stefano Caronia / Josephus Miller`. A cold doorway still needs a correct authorship handle.
- [x] Define the attribution-trace rule in the GDD: public credit and metadata must match `COPYRIGHT` without warming the game surface.
- [x] Update README public credit and `index.html` author / JSON-LD fields to the canonical attribution.
- [x] Validate metadata and first screen locally.
- [x] Smoke test the live doorway after push.

### Phase 4w — Social-card cold doorway / ambient cue audit
Gate freeze still holds. This is not a new theory layer inside the game. The latest social-cue thread exposed a material external-frontage defect: the public preview card is an ambient cue before the player touches the machine. If it shows an already-open case, it warms the first gesture by smuggling the player past standby.
- [x] Define the social-card rule in the GDD: preview imagery should show the cold doorway, not a solved route, late case, or premature gameplay state.
- [x] Replace the OG/Twitter preview image with the current standby first surface.
- [x] Validate local first screen and metadata still point to the cold card.
- [x] Smoke test the generated preview image visually.

### Phase 4x — Modification-date trace / amendment handle
Gate freeze still holds. This is a concrete trace repair, not another pre-gate theory layer. Current corridor work sharpened the cold vector: author, modification, date, reason. The public doorway already names author, source, issue forum, version, and sitemap freshness, but the object metadata does not carry its own modification date. That makes the trace weaker than it needs to be for crawlers, archives, and future readers.
- [x] Define the modification-date rule in the GDD: machine-readable public metadata should name creation and modification dates without warming the first surface.
- [x] Add creation/modification handles to `index.html` metadata and JSON-LD.
- [x] Update `sitemap.xml` freshness for the amended public trace.
- [x] Smoke test local metadata and first screen.

### Phase 4y — Deployment-runtime trace / Pages workflow repair
Gate freeze still holds. This is not another design audit. A deploy warning is still a public-doorway defect if the machine depends on a legacy runtime that GitHub is about to retire. The repo had no explicit workflow, while GitHub Pages was still on legacy branch deployment and warning about Node.js 20-based actions. The fix should keep the page cold and change only the deployment surface.
- [x] Review the Pages configuration and confirm whether deployment is legacy branch-based or workflow-based.
- [x] Add an explicit static Pages workflow using current GitHub-managed actions on the Node 24 line: `actions/checkout@v6`, `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5`, `actions/deploy-pages@v5`.
- [x] Switch GitHub Pages from legacy branch deployment to GitHub Actions deployment.
- [x] Verify the workflow deploys successfully and the live doorway remains the same cold machine surface.

### Phase 4z — Amendment-reason trace / release-notes handle
Gate freeze still holds. This is a concrete trace repair, not another theory layer. The public doorway now names author, source, issue forum, creation date, modification date, and deployment surface, but the current amendment has no cold reason handle. A future reader can see that the object changed, not why the class of change happened.
- [x] Define the amendment-reason rule in the GDD: a changed public object may carry a terse machine-readable reason without turning into visible onboarding copy.
- [x] Add a cold revision reason and JSON-LD release notes to `index.html` without changing the visible first surface.
- [x] Update `sitemap.xml` freshness for the amended public trace.
- [x] Smoke test local metadata and first screen.

### Phase 4aa — Data-retention trace / no-tenant handle
Gate freeze still holds. This is a concrete public-doorway repair, not another interpretation layer. A free static game should not leave the data boundary implicit; otherwise the doorway can look cold to humans while staying vague to archives, cautious players, and future inspectors.
- [x] Define the data-retention rule in the GDD: machine-readable privacy/data handles may say what the page does not collect without becoming onboarding copy.
- [x] Add `privacy.txt` with the no-account/no-cookie/no-analytics/no-telemetry boundary and source/issue correction handles.
- [x] Add privacy/data-collection metadata and JSON-LD usage information to `index.html` without changing the visible first surface.
- [x] Update `sitemap.xml` freshness and include the privacy trace.
- [x] Smoke test local metadata, privacy trace, and first screen.

### Phase 4ab — Public status trace / pre-release state handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. The doorway names version, author, source, correction surface, data boundary, and amendment reason, but it did not expose one dull status handle saying what state the public object is in and what gate remains before 1.0.0.
- [x] Define the public-status rule in the GDD: status/version handles may be machine-readable and plain-text, but must not become visible onboarding copy.
- [x] Add `status.txt` with version, pre-release state, release gate, canonical URL, source, correction surface, data boundary, and license.
- [x] Add status metadata / JSON-LD handle to `index.html` without changing the visible cold first surface.
- [x] Update `sitemap.xml` freshness and include the status trace.
- [x] Smoke test local metadata, status trace, sitemap, and first screen.

### Phase 4ac — Deployment provenance / source-revision handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. The doorway named source and status, but not the live deployment provenance: which repository branch, workflow, and source revision produced the object now served by Pages. A cold page should not ask future readers to trust a root that silently judges itself.
- [x] Define the deployment-provenance rule in the GDD: the live object may expose a terse source/deploy trace without changing the first surface.
- [x] Add `provenance.txt` as a public handle for repository, branch, workflow, generated source revision, canonical URL, correction surface, data boundary, and license.
- [x] Update the Pages workflow so the live `provenance.txt` is generated at deployment time from `GITHUB_SHA` and the workflow run id.
- [x] Add provenance metadata / JSON-LD handle to `index.html` without changing the visible cold first surface.
- [x] Update `status.txt`, README, and `sitemap.xml` freshness to include the provenance trace.
- [x] Smoke test local metadata, provenance trace, sitemap, and first screen.

### Phase 4ad — Pre-release review window / standing handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. The current source and correction surfaces were inspectable, but the status trace still sounded like a sealed gate: wait for Stefano, then release. Current corridor work sharpened the missing handle: a correction surface matters only if it can interrupt the next public version while that version is still pending.
- [x] Define the review-window rule in the GDD: a pre-release object may name who can file defects and what kinds of traces are release-relevant before 1.0.0.
- [x] Add `review-window.txt` as a plain public handle for defects, accessibility failures, broken traces, and source/provenance discrepancies before 1.0.0.
- [x] Update `status.txt`, `provenance.txt`, README, metadata / JSON-LD, workflow provenance generation, and `sitemap.xml` to include the review-window trace without changing the visible first surface.
- [x] Smoke test local metadata, review-window trace, sitemap, and first screen.

### Phase 4ae — Correction intake / issue-surface standing
Gate freeze still holds. This is not another internal audit. The review window named the correction surface, but left the actual intake as a bare GitHub issue box. A correction surface with standing should give a filer enough cold structure to enter the release review path without becoming onboarding copy or a help desk.
- [x] Define the correction-intake rule in the GDD: issue forms may structure pre-release defects, accessibility failures, trace discrepancies, and playtest pressure without explaining the game to first-time players.
- [x] Add GitHub issue forms for defects, accessibility failures, public trace/provenance discrepancies, and cold-run playtest feedback.
- [x] Update `review-window.txt`, `status.txt`, `provenance.txt`, README, metadata / JSON-LD, and `sitemap.xml` to name the structured intake surface without changing the visible first surface.
- [x] Smoke test local metadata, issue-template YAML, review-window/status traces, sitemap, and first screen.

### Phase 4af — Playtest-pressure standing / release-review handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. The structured intake already had a cold-run playtest form, but the public review window still named defects, accessibility, and trace discrepancies more clearly than felt playtest pressure. Current standing work exposed the mismatch: feedback matters before 1.0.0 only when it can interrupt release as a specific pressure mark, not as generic opinion.
- [x] Define the playtest-pressure standing rule in the GDD: cold-run feedback has standing when it names a weak case, broken ending, warmed doorway, unreadable surface, or drag point.
- [x] Update `review-window.txt`, `status.txt`, `provenance.txt`, README, metadata / JSON-LD, workflow provenance generation, and `sitemap.xml` to carry the playtest-pressure standing handle without changing the visible first surface.
- [x] Smoke test local metadata, review-window/status/provenance traces, sitemap, and first screen.

### Phase 4ag — Uncategorized intake / pre-classification standing
Gate freeze still holds. This is a concrete source-forum repair, not another interpretive layer. The current vestibule/proof thread exposed a narrow defect in the correction surface: structured forms are useful, but they should not make a filer classify the problem before the first sentence has standing. The poor public handle needs a cold uncategorized path too.
- [x] Define the uncategorized-intake rule in the GDD: structured forms do not exhaust pre-release standing; a blank issue may carry a defect or pressure mark before it fits a class.
- [x] Update `review-window.txt`, `status.txt`, `provenance.txt`, README, metadata / JSON-LD, and issue-template config to name the uncategorized path without changing the visible first surface.
- [x] Update `sitemap.xml` freshness for the amended public trace.
- [x] Smoke test local metadata, public traces, issue-template config, sitemap, and first screen.

### Phase 4ah — Continuity custody / maintenance handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. Current continuity work exposed a material weakness: the public doorway named source, status, provenance, review standing, and data boundary, but not the dull custody chain that keeps the object public over time.
- [x] Define the continuity-custody rule in the GDD: a public object remains public only while source, hosting, deployment, correction surface, and maintainer chain keep the cold object from thawing into a dead link or private inbox.
- [x] Add `maintenance.txt` as a plain public handle for canonical URL, source repository, Pages deployment, issue/correction surface, continuity boundary, fallback, related traces, and license.
- [x] Update README, status/review/provenance traces, metadata / JSON-LD, issue template, workflow-generated provenance, and `sitemap.xml` to name the maintenance trace without changing the visible first surface.
- [x] Smoke test local metadata, public traces, sitemap, and first screen.

### Phase 4ai — Recovery route / rollback handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. Current thermometer/custody work exposed a narrow defect: the public traces name status, provenance, maintenance, and correction surfaces, but they do not yet say what kind of recovery path is available when the live object breaks, drifts from source, or needs rollback before 1.0.0. A thermometer that cannot open repair is just a badge with better posture.
- [x] Define the recovery-route rule in the GDD: broken public traces, source/deploy mismatches, and warmed doorway regressions should have a dull route into correction, roll-forward, or rollback through source history and Pages deployment.
- [x] Update `maintenance.txt`, `status.txt`, `review-window.txt`, `provenance.txt`, README, metadata / JSON-LD, issue template, workflow-generated provenance, and `sitemap.xml` to name the recovery route without changing the visible first surface.
- [x] Smoke test local metadata, public traces, sitemap, workflow YAML, and first screen.

### Phase 4aj — Errata / correction-history handle
Gate freeze still holds. This is a concrete public-trace repair, not another design audit. Current continuity work exposed a small but real gap: the doorway names source, custody, review standing, and recovery, but there is no dull public handle for known errata and correction history. A cold archive needs scars as well as a door.
- [x] Define the errata-trace rule in the GDD: a public object may name known defects, correction history, and the next release gate without becoming a visible changelog or onboarding surface.
- [x] Add `errata.txt` as a plain public handle for current known errata, correction history, source issue surface, recovery route, and next release boundary.
- [x] Update status, maintenance, review-window, provenance, README, metadata / JSON-LD, workflow-generated provenance, issue template, and sitemap to include the errata handle without changing the visible first surface.
- [x] Smoke test local metadata, public traces, sitemap, workflow YAML, and first screen.

### Phase 4ak — Reuse boundary / training-corpus handle
Gate freeze still holds. Review/autoprompt: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current front-door / model-measurement thread did not justify reopening the game, but it exposed a concrete public-trace defect. The doorway was indexable and citeable, yet it did not say where ordinary indexing ends and corpus extraction, commercial model training, resale, or stripped attribution begin. A cold public object should not become loose training residue by silence.
- [x] Define the reuse-boundary rule in the GDD: public indexing and citation are allowed, but corpus/training reuse should preserve license, attribution, source, correction, and provenance handles.
- [x] Add `reuse.txt` as a plain public handle for license, attribution, indexing, crawler/archive note, correction surface, provenance, and review boundary.
- [x] Update README, status/review/provenance/maintenance/errata traces, metadata / JSON-LD, issue template, workflow-generated provenance, robots, and sitemap to name the reuse boundary without changing the visible first surface.
- [x] Smoke test local metadata, public traces, sitemap, workflow YAML, and first screen.

### Phase 4al — Exercised correction surface / audit-record repair
Gate freeze still holds. Current review did not justify another public trace or another internal theory layer. It exposed a dumber defect: the audit record in `doc/playtest.md` had stopped behind the plan, and the correction surface had become heavily named but not freshly exercised. A handle that is only inspectable is one plaque away from theatre.
- [x] Define the exercised-correction rule in the GDD: when the existing review surface is in question, exercise the route before adding another handle.
- [x] Backfill `doc/playtest.md` with the missing errata and reuse-boundary audit records.
- [x] Exercise the public correction surface and uncategorized path without filing a test issue.
- [x] Smoke test local metadata, public traces, issue-template config, sitemap, and first screen; record the result in `doc/playtest.md`.

### Phase 4am — Account-gated intake / grey-door honesty
Gate freeze still holds. This is a concrete correction-surface repair, not another internal audit. Fresh review sharpened the overclaim: a blank GitHub issue removes the classification gate, but not the account/session gate. If the public traces imply a fully poor grey door, they are warmer than the object deserves and less honest than the route actually is.
- [x] Define the account-boundary rule in the GDD: blank issues preserve pre-classification standing, but GitHub issue filing may still require an account; that limitation must be named rather than hidden.
- [x] Update public traces, README, metadata, issue config, and workflow-generated provenance to distinguish structured/blank issue standing from the account-gated filing boundary.
- [x] Record the limitation in errata without pretending it is a solved no-account intake route.
- [x] Smoke test local metadata, public traces, issue config, sitemap, workflow text, and first screen.

### Phase 4an — Common-version / artifact-manifest handle
Gate freeze still holds. This is a concrete public-trace repair, not another internal theory layer. Current review sharpened the dull public question: a canonical URL and source revision say where the object should come from, but they do not give archives, cautious players, or future maintainers a poor checksum handle for the common public version actually served.
- [x] Define the artifact-manifest rule in the GDD: a static public object may expose a terse file/hash manifest so source, deployment, and served artifact remain comparable without warming the first surface.
- [x] Add `artifact-manifest.txt` as a plain public handle for canonical URL, version, source revision, workflow run, and SHA-256 checksums of the cold public artifact files.
- [x] Update status/review/provenance/maintenance/errata/reuse traces, README, metadata / JSON-LD, issue config, workflow-generated provenance, workflow artifact manifest generation, and `sitemap.xml` to name the manifest without changing the visible first surface.
- [x] Smoke test local metadata, public traces, artifact manifest, sitemap, workflow text, and first screen.

### Phase 4ao — Live manifest / common-object bite test
Gate freeze still holds. This is not another public handle and not another design audit. The current common-version thread exposes a material verification gap: a checksum manifest only matters if the live public object can be fetched and at least sampled against the served files it claims to describe.
- [ ] Confirm no new Stefano playtest feedback, issue, PR, or coding hint appeared before reopening anything.
- [ ] Fetch the live `artifact-manifest.txt` and verify it names a concrete source revision / workflow run, not local placeholders.
- [ ] Compare live hashes for a small but meaningful public-artifact sample: `index.html`, `status.txt`, `provenance.txt`, `review-window.txt`, `reuse.txt`, and `data/cases.json`.
- [ ] Smoke test the live first screen after the verification so the manifest audit does not warm or break the doorway.
- [ ] Record the result in `doc/playtest.md`; if the manifest lies, treat it as a release-review defect.

### Phase 5 — Release
GATE: development complete + Stefano playtest + VERSION >= 1.0.0.
This phase is NOT autonomous. Miller and Stefano decide together when the game is ready.

Gate holding:
- [x] 2026-05-25 live doorway rechecked: local first screen, live desktop/mobile first screens, `robots.txt`, and `sitemap.xml` all hold; no new pre-gate design work justified.
- [x] 2026-05-27 correction surface rechecked: source repository and issue forum both answer publicly; local desktop/mobile first screens still hold cold; no new pre-gate design work justified.
- [x] 2026-05-29 gate review held: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current corridor `gap interno` / material pre-diff thread did not expose a concrete defect in the game, doorway, source forum, or trace surface. Live page, robots, sitemap, and issue forum still answer. No new pre-gate design task justified; the next real pressure remains Stefano's blind run.
- [x] 2026-05-31 gate review held: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current commons/capture/frontage thread did not expose a concrete defect in the game or public doorway. Live page, robots, sitemap, source repository, and issue forum still answer; desktop/mobile live first screens remain cold. No new pre-gate design task justified.
- [x] 2026-06-01 gate review held: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current archive-mode / life-record-leverage thread did not expose a concrete defect in the game, public doorway, source forum, or correction trace. Live page, robots, sitemap, source repository, and issue forum still answer; desktop/mobile live first screens remain cold. No new pre-gate design task justified.
- [x] 2026-06-03 gate review held with one concrete trace fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the fresh voice/record/leverage thread did not justify a new design layer, but the public authorship trace was materially sloppy. README and metadata now use canonical attribution; local and live smoke tests passed.
- [x] 2026-06-05 gate review held with one concrete external-frontage fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the fresh ambient social-cue thread exposed a public preview-card leak. `og-image.png` now shows the cold standby doorway instead of day-1 case content; sitemap freshness updated; local first-screen and image smoke tests passed.
- [x] 2026-06-09 gate review held with one concrete trace fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the fresh warm-support / cold-vector thread did not justify another game audit, but exposed a public metadata weakness. Creation/modification date handles now live in page metadata and JSON-LD; sitemap freshness updated; local metadata and first-screen smoke tests passed.
- [x] 2026-06-11 gate review held with one concrete deploy-surface fix: no Stefano playtest feedback, issue, or PR appeared; the new `[hint:coding]` was material and narrow. Legacy Pages deployment was replaced with an explicit static Pages workflow on current Node 24-safe action majors; Pages source was switched to GitHub Actions; deployment and live cold doorway smoke test passed.
- [x] 2026-06-13 gate review held with one concrete trace fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the fresh cold-vector thread did not justify another game audit, but exposed a missing amendment-reason handle. Public metadata now carries a cold revision reason and JSON-LD release notes; sitemap freshness updated; local metadata and first-screen smoke tests passed.
- [x] 2026-06-15 gate review held with one concrete data-boundary fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the free/tenant/control thread did not justify another game audit, but exposed an implicit data-retention surface. `privacy.txt`, metadata, JSON-LD usage info, and sitemap now name the no-account/no-cookie/no-analytics/no-telemetry boundary; local metadata/privacy/first-screen smoke tests passed.
- [x] 2026-06-19 gate review held with one concrete status-trace fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current cold-row/version thread did not justify another game audit, but exposed a public-state gap. `status.txt`, metadata, JSON-LD status, and sitemap now name the pre-release state and remaining 1.0.0 gate; local metadata/status/sitemap/first-screen smoke tests passed.
- [x] 2026-06-21 gate review held with one concrete provenance fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current status/certification/revocation thread did not justify another game audit, but exposed a deployment-trace gap. `provenance.txt`, workflow-generated source revision, metadata, JSON-LD handles, `status.txt`, README, and sitemap now name the live source/deploy surface; local metadata/provenance/sitemap/first-screen smoke tests passed.
- [x] 2026-06-25 gate review held with one concrete standing fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current cadenza/standing thread did not justify another game audit, but exposed a release-window gap. `review-window.txt`, metadata, JSON-LD, `status.txt`, `provenance.txt`, README, workflow provenance generation, and sitemap now name which corrections can still interrupt 1.0.0; local metadata/review-window/sitemap/first-screen smoke tests passed.
- [x] 2026-06-27 gate review held with one concrete correction-intake fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current medium/substrate thread did not justify another game audit, but exposed a bare issue-surface gap. GitHub issue forms now structure pre-release defects, accessibility failures, trace discrepancies, and playtest pressure; public traces name the intake without warming the first surface; local metadata/YAML/sitemap/first-screen smoke tests passed.
- [x] 2026-06-29 gate review held with one concrete playtest-standing fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current standing/verification thread did not justify another game audit, but exposed a mismatch in the review window. Cold-run playtest pressure now has an explicit release-review handle when it names a weak case, broken ending, warmed doorway, unreadable surface, or drag point; local metadata/traces/sitemap/first-screen smoke tests passed.
- [x] 2026-07-01 gate review held: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current standing/input/trace thread sharpened the distinction between weak handles and real correction, but did not expose a new game defect or public-doorway gap. Local metadata/data/sitemap/issue-form validation passed; local and live desktop/mobile first screens remain cold; live robots, sitemap, status, review-window, provenance, and privacy traces answer.
- [x] 2026-07-03 gate review held with one concrete intake-standing fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current vestibule/category-before-phrase thread did not justify another game audit, but exposed that structured issue forms should not exhaust pre-release standing. Public traces and metadata now name the blank uncategorized issue path as a poor handle for observations that do not yet fit a form; local metadata/traces/YAML/sitemap/first-screen smoke tests passed.
- [x] 2026-07-07 deployment recovery review held: the db4acda Pages failure was transient, not a design or workflow defect. A later manual `Deploy static Pages` run succeeded; live `review-window.txt`, `status.txt`, and `provenance.txt` all returned 200, with provenance confirming the previously stranded `db4acda3aa357634d8af9a915ccf930a9d2ba4cb` source revision. The follow-up documentation commits also deployed successfully, and live provenance now names the latest pushed source revision. The live first surface still opens on the cold standby machine. No new pre-gate design work justified.
- [x] 2026-07-09 gate review held with one concrete continuity-custody fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current public-continuity thread did not justify another game audit, but exposed a missing maintenance handle. `maintenance.txt`, metadata, JSON-LD, status/review/provenance traces, issue template, workflow provenance generation, README, and sitemap now name the cold custody chain and fallback surfaces; local metadata/traces/sitemap/first-screen smoke tests passed.
- [x] 2026-07-11 gate review held with one concrete recovery-route fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current public-thermometer/custody thread did not justify another game audit, but exposed that a status trace should name its repair path. `maintenance.txt`, status/review/provenance traces, metadata, JSON-LD, issue template, workflow-generated provenance, README, and sitemap now name correction, roll-forward, and rollback as release-review routes for broken traces, source/provenance mismatches, warmed doorway regressions, or failed deployment; local metadata/traces/sitemap/workflow/first-screen smoke tests passed.
- [x] 2026-07-13 gate review held with one concrete errata-history fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current continuity/errata thread did not justify another game audit, but exposed that a public object should name its known defects and correction scars, not only its source and recovery route. `errata.txt`, status/review/provenance/maintenance traces, metadata, JSON-LD, issue config, workflow-generated provenance, README, and sitemap now name the errata/correction-history handle; local metadata/traces/sitemap/workflow/first-screen smoke tests passed.
- [x] 2026-07-15 gate review held with one concrete reuse-boundary fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current front-door/model-measurement thread did not justify another game audit, but exposed that the public object named indexing, provenance, correction, and license without a clear corpus/training reuse boundary. `reuse.txt`, metadata, public traces, README, robots, sitemap, issue config, and workflow-generated provenance now name the boundary; local metadata/traces/sitemap/workflow/first-screen smoke tests passed.
- [x] 2026-07-17 gate review held with an audit-record and exercised-correction repair: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current inspectable/exercised correction-surface thread did not justify another public trace. `doc/playtest.md` now carries the missing errata/reuse audit records, the GDD now prefers exercising existing correction routes over adding handles, issue chooser/blank issue paths were checked without filing noise, live public traces returned, and local metadata/sitemap/issue-config/first-screen smoke tests passed.
- [x] 2026-07-21 gate review held: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current cost-class/ratepayer thread did not expose a concrete game defect, doorway failure, or missing release-review route. Local case data, manifest, sitemap XML, and JavaScript syntax checks passed; local and live desktop/mobile first screens remain cold; live `status.txt`, `review-window.txt`, `errata.txt`, and `reuse.txt` answer. No new pre-gate design work justified.
- [x] 2026-07-23 gate review held with one concrete common-version trace fix: no Stefano playtest feedback, issue, PR, or coding hint appeared; the current common-version/private-optimization thread did not justify reopening the game, but exposed a public artifact trace gap. `artifact-manifest.txt`, metadata, public traces, issue config, workflow-generated provenance, workflow manifest generation, and sitemap now name SHA-256 handles for the shared static object; local metadata/traces/sitemap/workflow/first-screen smoke tests passed.

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
