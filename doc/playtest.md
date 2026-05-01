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

### 6. Pacing and terminal feel
The typewriter pacing, pauses, and end-of-day rhythm are part of the experience.

Questions:
- Is the typing speed right, too slow, or too fast?
- Do the pauses build tension, or create drag?
- Does the end-of-day screen reset the rhythm in a good way?
- Did you ever want to skip ahead out of impatience?

### 7. Final case and terminal shutdown
The final case is deliberately routine. The machine going inert is the last move.

Questions:
- Did the final case hit hard enough without overplaying itself?
- Did the shutdown of the power button matter, or feel like a gimmick?
- Did the ending feel earned by the whole run?

### 8. Readability / interface
This is still a real object on a real screen.

Questions:
- Is the text comfortably readable on desktop?
- Are the options clearly legible and easy to click?
- Does the CRT treatment add atmosphere without getting in the way?
- Is audio subtle in the right way, or too faint / too present?

### 9. Mobile
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
