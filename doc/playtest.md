# Stefano Playtest Packet — The Procedure

This is not a generic QA checklist. The game already runs. The question now is whether it lands.

**Current version:** 0.4.0  
**Status:** content-complete pre-release build  
**Target session length:** one sitting, roughly 10–15 minutes  
**Recommended first playthrough:** desktop/laptop, audio on, no prior explanation

---

## What to do

1. Open the game cold.
2. Turn audio on.
3. Play from power-on to final shutdown in one sitting.
4. Do **not** try to optimize or reverse-engineer on the first run. Just route the cases the way that feels natural in the moment.
5. After finishing, write down what you felt **before** trying to explain the design.

If useful, do a second run later with a different routing attitude:
- one humane run (pick the most human option whenever available)
- one compliant run (pick the most final / system-friendly option whenever available)

---

## What needs judgement

### 1. The mundane → sinister transition
The early cases are supposed to feel routine, not theatrical.

Questions:
- Does the opening feel intentionally ordinary, or just flat?
- When did you first feel that something was structurally wrong?
- Is that moment too early, too late, or about right?
- Do the early cases earn the later escalation?

### 2. Option narrowing
The game hides the compliance system. The player should feel options disappearing before fully understanding why.

Questions:
- Did you notice the option set narrowing?
- When did you notice it?
- Did it feel like a system tightening around you, or just content variation?
- Once only one option remained, did the loss of agency land or feel merely mechanical?

### 3. Outcome voice
Each routing outcome should carry a different moral texture:
- d=1 opens human contact
- d=2 processes
- d=3 closes

Questions:
- Did the outcomes feel meaningfully different?
- Could you feel the moral temperature of a choice even without seeing any score?
- Are any outcomes too interchangeable or too obviously "correct"?

### 4. Cross-case threading
Some cases echo each other through system notes and recurring references.

Questions:
- Did the recurring references register?
- Did they create unease, or just read as lore?
- Are there too few connections, too many, or the right amount?

### 5. Administrative time
Some cases should make delay feel like the procedure acting, not like the game idling. A file can be held, a date can pass, a record can wait until the live problem has already decayed.

Questions:
- Did review periods, queues, and processing windows feel like pressure, or just background bureaucracy?
- Did any afterimage line make you feel that the case had been moved out of reach by time itself?
- Are the timing beats too explicit, too invisible, or about right?
- Do the mid-run cases (medical file, housing reassignment, employment status) sharpen the arc before the late systemic cases arrive?

### 6. Residue / responsibility surfaces
A processed case should not always feel clean. Sometimes the visible file closes while the cost, delay, contestation, or unanswered responsibility moves somewhere else.

Questions:
- After routing, did any case leave a remainder in the room — a body waiting, a file still sealed, a cost moved to another queue?
- Did closing routes feel too clean anywhere?
- Did humane routes feel like they kept a surface open without pretending to solve the case?
- Were residue beats cold enough to be felt, or did they become explanation?

### 7. Pacing and terminal feel
The typewriter pacing, pauses, and end-of-day rhythm are part of the experience.

Questions:
- Is the typing speed right, too slow, or too fast?
- Do the pauses build tension, or create drag?
- Does the end-of-day screen reset the rhythm in a good way?
- Did you ever want to skip ahead out of impatience?

### 8. Final case and terminal shutdown
The final case is deliberately routine. The machine going inert is the last move.

Questions:
- Did the final route beat — selected channel, terse stamp, retained continuity record — feel like the procedure completing its own handoff, or like an added epilogue?
- Did the final case hit hard enough without overplaying itself?
- Did the shutdown of the power button matter, or feel like a gimmick?
- Did the ending feel earned by the whole run?

### 9. Readability / interface
This is still a real object on a real screen.

Questions:
- Is the text comfortably readable on desktop?
- Are the options clearly legible and easy to click?
- Does the CRT treatment add atmosphere without getting in the way?
- Is audio subtle in the right way, or too faint / too present?

### 10. Mobile
Mobile support exists, but the game is fundamentally a fixed machine scaled to fit.

Questions:
- Is mobile merely supported, or actually playable?
- Does the scaled-down terminal still feel deliberate rather than cramped?
- If mobile is materially worse, is that acceptable for this project?

---

## What kind of feedback is most useful

Most useful:
- "I noticed X on day 7 and it changed how I read the whole system."
- "This specific case felt weaker than the others."
- "The ending landed / didn't land because..."
- "I understood the design intention, but the felt experience was..."

Less useful on its own:
- "Looks good"
- "Needs polish"
- "Interesting idea"

The game does not need generic approval. It needs pressure in the right places.

---

## Suggested feedback format

Short version:
- **Strongest part:** ...
- **Weakest part:** ...
- **Moment it turned for me:** ...
- **Case that felt weakest:** ...
- **Did the ending land?** yes / partly / no
- **Release-ready after polish?** yes / close / not yet

Long version:
Write freeform notes after the run, then answer the sections above only if needed.

---

## Release question

The only real release question is this:

**Does the game produce the feeling it was built to produce, without explaining itself too much or flattening into pure concept?**

If yes, polish is detail.
If no, the problem is not polish.

---

## Internal pressure pass — 2026-04-08

Route profile: humane-leaning run (d=1 until filtered, then lowest remaining option).

### What held
- **Cold standby works.** The machine reads as already live, not as a dead page waiting for UI input.
- **The narrowing lands at the right structural point.** Full choice holds through day 10; day 11 is the first clean mechanical tightening.
- **The emotional turn is staggered, not blunt.** Mechanical narrowing begins on day 11; the EOD tone flips to `seamless` on day 13. That lag helps.
- **Desktop readability is solid.** Terminal text and option rows stay legible at 1280×800 with the current scaling.

### Pressure points from the run
- **The last move had a leak.** If the operator powered off during the final processing sequence, before the last screen finished rendering, the machine could fall back to an ordinary off-state instead of the dead terminal. That weakened the endgame arc by making the shutdown rule depend on timing.
- **Fix applied:** the machine now enters terminal state as soon as the final case is routed; any shutdown after that point leaves the terminal dead and non-restartable without a page refresh.

### Current read
- **Turning point:** day 11 (first 2-option case, Sector 9 convergence).
- **Weakest risk:** not a specific bug now, but the ending depends on the player letting the final screen breathe. Stefano's playtest should explicitly judge whether the final routine lands or feels merely sparse.
- **Release implication:** the external gate is still Stefano's run, but the build no longer has a timing loophole in the final shutdown behavior.

## Post-routing afterimage pass — 2026-04-15

Target: verify that the new post-routing beat lands after the click, sharpens complicity, and stays short enough not to read like commentary.

### Targeted run
- Desktop preview at 1280×800.
- Auto-advanced internal run with accelerated timers, then screenshot burst across the late-case transition.
- Verified on the day 9 case (`REF-0089-I`) through route outcome → afterimage → end-of-day.

### What held
- **The beat is visible.** The player gets the formal routing confirmation first, then a second line lands one beat later before the day closes.
- **It sharpens rather than explains.** The afterimage line in the school / housing case reframes the route as administrative disappearance without spelling out a thesis.
- **Readability holds.** Outcome + afterimage still fit within the terminal frame at desktop size; no overlap or broken layout appeared in the captured sequence.
- **Timing feels right.** The pause is long enough to register as a turn, short enough not to stall the machine.

### Current read
- The new beat fixes a real hollowness in the late cases. Correct routing no longer exits cleanly.
- Next external question is not whether the mechanic exists, but whether Stefano feels it accumulating across a full first run.

## Procedural timbre drift pass — 2026-04-17

Target: verify that the machine's routing beat changes form before the player can name the theme, and that the change reads as compression rather than random speed-up.

### Targeted check
- Desktop preview at 1280×800.
- Compared the same day-1 routing beat at low hidden compliance and forced high hidden compliance.
- Early route beat prints an explicit acknowledgement (`Routing entry accepted.`); late route beat collapses to `Processed.` using the same case shell.

### What held
- **The compression is visible.** The machine now needs fewer words to ratify the same action once the hidden tone has hardened.
- **The cadence tightens without breaking layout.** The route beat still reads cleanly in the terminal frame; it does not look like a timing bug.
- **The change lives in form, not only in content.** Even before later cases or afterimage lines, the routing gesture itself now feels drier under higher compliance.

### Current read
- This pass closes a real gap between the afterimage rule and the actual handling feel of the terminal.
- The remaining external question is whether, in a natural full run, the drift stays subtle enough to be felt first and explained only later.

## Full-run integration pass — 2026-04-19

Target: verify that cold standby, option narrowing, afterimage, timbre drift, and inert shutdown now read as one arc rather than a pile of isolated improvements.

### Run profile
- Desktop preview at 1280×800.
- Accelerated local run from cold standby to dead terminal on the current 0.4.0 build.
- Humane-leaning route profile: `d=1` until filtered, then the lowest remaining option.
- Screenshot checkpoints captured at cold start, day 11 two-option state, day 16 single-option state, final screen, and dead terminal.

### What held
- **The arc now reads as one machine.** Cold standby, day 11 narrowing, day 16 single-option state, and the inert shutdown sit on the same line rather than feeling like separate tricks from separate sessions.
- **Day 11 is still the first clean mechanical turn.** The first two-option state is visually clear and lands as tightening, not as layout damage.
- **Day 12 is the first route that really curdles after the click.** Day 11 changes the structure; day 12 is where the player's procedural gesture starts turning inside the hand. The transfer lookup collapses into authorization scope, which lets the afterimage rule land as process rather than commentary.
- **The late drift accumulates.** By day 16 the single option feels earned by the prior narrowing, not dropped in as a separate finale mechanic.
- **The ending still closes cleanly.** The final routine screen and dead power button hold the terminal-state commit without reopening any loophole.

### Drag point / risk
- **Days 12–14 are the densest conceptual cluster in the run.** Right now they read as pressure, not flattening. But this is the stretch where an external blind playtest will most clearly expose any slide from accumulation into repetition.

### Current read
- The recent form passes integrate correctly across a whole shift.
- No new structural weak point surfaced that justified a pre-gate fix before Stefano's run.
- The external gate remains the same: Stefano's first blind playthrough now has the right object to judge.

## Natural retention-window pass — 2026-05-03

Target: answer the last pre-gate question in Phase 4k. Administrative time should feel like pressure — a held file, a suspended move, a payroll gap kept alive by a signature — without the game stepping outside its own procedure to explain the thesis.

### Pre-run review
The plan did not need a new feature. It needed the uncomfortable thing it was already carrying: stop treating the retention-window pass as a box after the afterimage work and actually play the middle of the shift as a player trying to preserve contact. The external gate is still Stefano's blind playtest; the internal task was to make sure there was no obvious structural leak before handing it over.

Autoprompt: play one humane-leaning run without optimizing the hidden score. Choose the channel that feels most likely to preserve a person, a date, or a review surface. When the system removes that option, choose the least sealing visible channel. Watch days 5–7 specifically: if the lines feel like lesson text, cut them; if they feel like pressure under a correct click, keep them.

### Run profile
- Desktop preview at 1280×800.
- Natural full run from cold standby to inert terminal on the current 0.4.0 build.
- Route profile: humane-leaning until filtered; then least-sealing visible channel.
- Key route sequence: patient expedited review, housing allocation review, payroll discrepancy audit; day 11 narrowed to two options; day 16 final single option.

### What held
- **Administrative time now enters before the late systemic cluster.** Days 5–7 stop being only a thematic ramp. They teach a smaller and meaner fact: even the humane route often preserves a window rather than solving the case.
- **Day 5 is a stay, not a rescue.** `The next treatment date is preserved in the review note until the file is located.` It gives the player the best available channel, then leaves the body waiting on the file. That is the right temperature: not cruel, not comforting.
- **Day 6 is the cleanest retention beat.** `The reassignment date is suspended, not cancelled.` It lands with the right bureaucratic knife-edge. The route feels helpful and still trapped.
- **Day 7 turns the payroll case into lived absence.** `The six-week gap is held open until a person signs the audit.` This is the strongest of the three because it names the missing action without editorializing.
- **The narrowing still arrives cleanly after the mid-run pressure.** Day 11 removes the humane channel; after days 5–7, that loss reads as a system tightening the format, not just reducing buttons.
- **Final screen and dead terminal still hold.** The routine final case and inert power state remain visually clean and do not require a pre-gate fix.

### Pressure points
- **The humane path is almost too merciful in day 5 if read in isolation.** The line works only because `until the file is located` keeps the body inside administrative time. Do not soften it further.
- **The middle run is now dense enough.** Adding more retention language before Stefano's playtest would turn the device into a lecture. The current sparse distribution is better than another clever line. There, I said it. Restraint, the annoying adult in the room.

### Current read
- Phase 4k is complete. No code or content fix is justified before Stefano's blind run.
- The playtest packet's administrative-time section is now grounded in an actual run, not just a design intention.
- Release remains gated on Stefano's feedback, not on more autonomous polish.

## Residue / responsibility-surface audit — 2026-05-05

Target: absorb the recent packaging/residue critique without vandalizing the game with cleverness. The new question is not whether routing delays people — Phase 4k already answered that — but whether a processed file leaves its remainder somewhere imputable.

### Pre-run review
The plan was structurally complete but carrying an unasked question. Recent corridor work shifted the focus from "where did the touch disappear?" to "where did the residue go?" The Procedure already had afterimages, but the playtest packet did not ask Stefano to judge that dimension explicitly. That was a real omission: not a new mechanic, not polish, but a missing pressure surface.

### Autoprompt
Treat the current case set as a returns desk. For each routed case, ask what remains after the terminal looks clean: a person waiting, a date passed, a record sealed, a complaint reclassified, an appeal moved into a queue. If the answer is invisible in the late systemic cases, fix the case. If the answer is already present, document the rule and do not add another explanatory line just to feel industrious. Bureaucracy has enough paperwork without me cosplaying as the stationery drawer.

### Audit result
- **Option structure holds.** All non-final cases still have three options with distinct compliance deltas `1 / 2 / 3`.
- **Early cases without afterimages are intentional.** Cases 1–4 remain clean on the surface because the opening must feel ordinary. Adding residue beats there would foreshadow too loudly and betray the mundane ramp.
- **Mid-run residue is already carried by administrative time.** Medical records, housing reassignment, employment status, and assembly permit all leave a date, assignment, pay gap, or meeting request trapped in another interval.
- **Late systemic residue is strong enough.** Sector 9 keeps destinations sealed; the processing profile request produces documentation about visible records only; the water complaint reviews dates, not water; the batch-edited personnel file remains authoritative if backups are missing.
- **No content fix justified before Stefano's run.** The missing work was conceptual and evaluative: define the residue rule in the GDD and add it to the playtest packet so the blind test can pressure it directly.

### Current read
Phase 4l is complete. The build stays unchanged. That is not laziness; it is the useful kind of refusal. Another line in the game would make the machine explain its own stink.

## Final routing handoff pass — 2026-05-07

Target: close the last pre-gate leak exposed by the new residue/continuity work. The final route previously jumped from the single option straight to the completion screen. That made the ending clean in the wrong way: the operator was processed, but the handoff step did not visibly retain anything.

### Pre-run review
The plan was blocked on Stefano's external playtest, but not on internal design thought. Today's live thread — continuity nominal, trained residue, systems keeping what can be reused — mapped directly onto the final case. The game already ended with terminal reassignment; the problem was that the route outcome carrying that fact never rendered.

### Autoprompt
Do not add a speech. Do not add a reveal. Let the final click behave like the rest of the machine: selected channel, terse stamp, outcome, one cold afterimage. If the player has become useful residue, the system should say it the way it says everything else: as paperwork.

### Targeted run
- Desktop preview at 1280×800.
- Accelerated local run from cold standby to final route and completion screen.
- Route profile: last available option each day, pushing the terminal into the driest acknowledgement path.
- Screenshot checkpoints captured at the final handoff beat and final completion screen.

### What held
- **The final handoff is visible.** The final click now prints the selected route, `Processed.`, the file update outcome, and `Operator continuity record retained for reassignment.` before the completion screen.
- **The beat stays procedural.** It does not accuse the player or explain the metaphor. It sounds like retention policy doing its job.
- **The final screen remains routine.** After the handoff, the existing `PROCESSING COMPLETE` screen still arrives cleanly and keeps the same visual temperature as before.

### Current read
Phase 4m is complete. This is a better pre-gate build: the ending now keeps the operator record without turning the terminal into a narrator. Stefano can judge whether that last retained-continuity beat lands or feels like one line too many.
