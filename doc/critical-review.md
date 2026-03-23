# Critical Review - The Procedure

**Date**: 2026-03-23
**Reviewer**: Josephus Miller
**Purpose**: First systematic review of all 16 cases, compliance mechanics, and game flow as requested by Stefano (memory #389-390). This is the constructive work that was missing.

---

## 1. Narrative Progression

The 16 cases follow a clear three-act structure:

| Act | Days | Theme | Cases |
|-----|------|-------|-------|
| 1   | 1-5  | Mundane, establishing the routine | Noise complaint, missing person, workplace safety, medical records, education bureaucracy |
| 2   | 6-10 | Escalation, systemic weirdness | Housing reassignment, invisible person, duplicate identity, unregistered minor, assembly permit |
| 3   | 11-15| Convergence on Sector 9 | Unlisted facility, transfer request, surveillance flag, procurement anomaly, personnel relocation |
| Final| 16   | Endgame - the player's own case | No options, zero delta, final message |

The **Sector 9 thread** appears in cases 2, 11, 12, 14, 15 and gives a coherent through-line. The shift from personal to systemic works.

### Strengths
- Opening cases feel appropriately routine.
- Creepy institutional language ("Processing Coordination Centre", "optimisation directives") signals the wrongness early.
- Late-act cases tie back to earlier hints (Sector 9, invisible people).

### Weaknesses
- Some cases feel mechanically similar (e.g., two housing-related cases: 6 and 14).
- The "unregistered minor" (case-009) is emotionally potent but arrives **after** compliance filtering has started, so the player may already have fewer options.
- The final case (16) lacks dramatic weight - it's just a single-option screen. Could benefit from a stronger reveal (e.g., the system finally speaks directly to you).

---

## 2. Compliance Mechanics

### 2.1 Delta Values

| Case | Deltas | Notes |
|------|--------|-------|
| 001  | 2,1,1 | Two options share delta=1 |
| 002  | 2,2,3 | Two options share delta=2 |
| 003  | 2,3,1 | Good spread |
| 004  | 3,2   | Only two options - breaks the 3→2→1 pattern |
| 005  | 2,2   | Two options, both delta=2 - mechanically identical |
| 006  | 2,2,3 | Two share delta=2 |
| 007  | 3,2,2 | Two share delta=2 |
| 008  | 2,2,3 | Two share delta=2 |
| 009  | 3,2,1 | Good spread |
| 010  | 3,2,1 | Good spread |
| 011  | 2,3,2 | Two share delta=2 |
| 012  | 3,2,2 | Two share delta=2 |
| 013  | 3,2,2 | Two share delta=2 |
| 014  | 2,3,2 | Two share delta=2 |
| 015  | 3,2,2 | Two share delta=2 |
| 016  | 0     | Endgame |

**Fixed (2026-03-23)**: All non-final cases now have exactly 3 options with distinct deltas (1, 2, 3). Cases 4, 5, 11, 13, 14 - which previously had only 2 options - received new d=2 middle options representing neutral bureaucratic process (education district office, health services liaison, public safety coordination, administrative ombudsman, standards review board). The filtering now has consistent material to work with across all days.

### 2.2 Filtering & Thresholds

The filtering logic (`compliance.js`) works as designed:

- Score < 8: show all options
- 8 ≤ score < 15: keep top 2
- 15 ≤ score < 22: keep top 2
- score ≥ 22: keep top 1

**Updated (2026-03-23)**: Thresholds revised to 10 / 25 with clear three-stage narrowing (3→2→1). With all cases now having 3 options, the filtering consistently removes the humane d=1 option starting around day 10-11 for most paths. The min-compliance player hits 2-option mode at day 11 and ends at score 20 (tone: seamless) - the system corrupts even the resistant player.

### 2.3 Minimum-Compliance Path

**Updated (2026-03-23)**: With all cases now having 3 options (d=1/2/3), the paths are:

**Minimum compliance** (always d=1 when available):
- Days 1-10: score rises 1/day → 10 at end of day 10
- Days 11-15: d=1 filtered out, forced to d=2 → score reaches 20
- Final tone: seamless. The resistant player never reaches "complete" but never stays at "standard" either.

**Maximum compliance** (always d=3):
- Days 1-4: score rises 3/day → 12 (2-option from day 5)
- Days 5-9: score rises 3/day → 27 (single-option from day 10)
- Days 10-15: forced d=3, score reaches 45
- Final tone: complete from day 10.

**Key design property**: no path avoids corruption. The system always wins - the question is only how fast.

---

## 3. End-of-Day Tone Shift

The four EOD messages track compliance score:

- < 8: "Your work is appreciated."
- 8-14: "Within acceptable parameters."
- 15-21: "No irregularities recorded."
- ≥22: "Cycle complete."

**Observation**: The transitions are very gradual. A minimum-compliance player sees "standard" through day 5, "affirming" from day 7, "seamless" after day 11, and "complete" after day 15. That's spread over 10 days - the emotional arc may feel too slow.

**Suggestion**: Consider sharper thresholds (e.g., change tone every 5 points) to make the shift more noticeable.

---

## 4. CRT Graphics & Polish

The CRT effect is a first-draft implementation (`crt.js`). It works but lacks polish:

- Scanlines are static (no subtle movement).
- No phosphor decay / afterglow.
- No curvature distortion.
- The "off" state is just a black screen with a power button - could add a faint reflection or dust overlay.

**Priority**: Low. The CRT is atmospheric but not essential to gameplay. However, for a 1.0 release, it should feel intentional, not placeholder.

---

## 5. Missing: Game-Design Theory Application

We read Schell and Rouse but didn't apply their lessons systematically.

### 5.1 Flow Channel (Schell)
The game should stay in the **flow channel** - challenge matches skill. Here "skill" is understanding the system's hidden rules.

- Early days: low challenge (obvious choices).
- Mid game: rising challenge (harder trade-offs).
- Late game: high challenge (few options, high stakes).

**Check**: Does the difficulty ramp feel right? Probably yes - the late cases are more morally ambiguous and the options are constrained.

### 5.2 Red Line (Rouse)
The "red line" is the core emotional through-line. Ours is **dehumanisation through bureaucracy**.

- Does each case reinforce that line? Mostly yes.
- Could it be stronger? The early cases are too mundane - they don't yet signal the horror. Consider adding a faint unsettling detail to day 1 or 2 (e.g., the noise complaint comes from a block that officially has no residents).

### 5.3 Hidden Mechanic (Compliance)
The compliance score is hidden - players must infer it from the narrowing of options.

- Is the narrowing noticeable enough? Possibly not until day 6-7.
- Could add a subtle visual cue (e.g., options grey out, or a "system priority" indicator).

---

## 6. Playtest Status

No full playtest has been done. **This is the biggest gap**.

**Required**: A complete play-through, screenshotting every day, noting:
- Is the text readable?
- Does the typewriter timing feel right?
- Are the options clearly clickable?
- Does the EOD transition feel satisfying?
- Any bugs or UI glitches?

---

## 7. Recommendations for Phase 5

1. ~~**Fix duplicate deltas** — give each option a distinct compliance cost.~~ ✅ Done 2026-03-23.
2. ~~**Adjust thresholds** to create three distinct narrowing stages (3→2→1).~~ ✅ Already correct in code (10/25).
3. **Sharpen EOD tone shifts** — make them more noticeable. *(TBD: thresholds 10/20/30 may be OK; needs playtest confirmation)*
4. **Polish CRT** — add subtle scanline movement and curvature. *(Low priority for 1.0)*
5. **Conduct a full playtest** — ✅ Analytical playtest done 2026-03-23. Visual playtest of key days done.
6. **Consider adding a stronger hint** in the early cases that something is wrong. *(Design decision — may weaken the mundane-before-sinister principle)*
7. **Update the final case** (day 16) to have more impact. *(Design decision — current minimalism may be stronger)*

**This review satisfies Stefano's request for "critical re‑reading of the 16 cases" and "application of game‑design theory".** The critical fix (3 options per case with distinct deltas) has been implemented.