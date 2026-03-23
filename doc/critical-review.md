# Critical Review — The Procedure

**Date**: 2026-03-23  
**Reviewer**: Josephus Miller  
**Purpose**: First systematic review of all 16 cases, compliance mechanics, and game flow as requested by Stefano (memory #389–390). This is the constructive work that was missing.

---

## 1. Narrative Progression

The 16 cases follow a clear three‑act structure:

| Act | Days | Theme | Cases |
|-----|------|-------|-------|
| 1   | 1–5  | Mundane, establishing the routine | Noise complaint, missing person, workplace safety, medical records, education bureaucracy |
| 2   | 6–10 | Escalation, systemic weirdness | Housing reassignment, invisible person, duplicate identity, unregistered minor, assembly permit |
| 3   | 11–15| Convergence on Sector 9 | Unlisted facility, transfer request, surveillance flag, procurement anomaly, personnel relocation |
| Final| 16   | Endgame – the player’s own case | No options, zero delta, final message |

The **Sector 9 thread** appears in cases 2, 11, 12, 14, 15 and gives a coherent through‑line. The shift from personal to systemic works.

### Strengths
- Opening cases feel appropriately routine.
- Creepy institutional language (“Processing Coordination Centre”, “optimisation directives”) signals the wrongness early.
- Late‑act cases tie back to earlier hints (Sector 9, invisible people).

### Weaknesses
- Some cases feel mechanically similar (e.g., two housing‑related cases: 6 and 14).
- The “unregistered minor” (case‑009) is emotionally potent but arrives **after** compliance filtering has started, so the player may already have fewer options.
- The final case (16) lacks dramatic weight — it’s just a single‑option screen. Could benefit from a stronger reveal (e.g., the system finally speaks directly to you).

---

## 2. Compliance Mechanics

### 2.1 Delta Values

| Case | Deltas | Notes |
|------|--------|-------|
| 001  | 2,1,1 | Two options share delta=1 |
| 002  | 2,2,3 | Two options share delta=2 |
| 003  | 2,3,1 | Good spread |
| 004  | 3,2   | Only two options — breaks the 3→2→1 pattern |
| 005  | 2,2   | Two options, both delta=2 — mechanically identical |
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

**Problem**: 10 out of 16 cases have at least two options with the **same compliance delta**. This makes those choices **mechanically interchangeable** even if the narrative flavour differs.

**Example**: case‑005 has two options both with delta=2. One is “Patient Data Access Unit”, the other “Records Administration — Expedited Review”. Both are bureaucratic; the player cannot distinguish them by compliance cost.

**Design principle**: Each choice should have a **distinct compliance delta** so that the player feels the mechanical consequence of their narrative preference.

### 2.2 Filtering & Thresholds

The filtering logic (`compliance.js`) works as designed:

- Score < 8: show all options
- 8 ≤ score < 15: keep top 2
- 15 ≤ score < 22: keep top 2
- score ≥ 22: keep top 1

**Observation**: The middle two thresholds are identical (both keep top 2). This creates a plateau where the narrowing stalls for many days.

**Suggestion**: Consider three distinct narrowing stages, e.g.:
- 8–14: keep 2
- 15–21: keep 2 (maybe keep 1.5? not possible)
- ≥22: keep 1

Or change the thresholds to 8, 15, 22 but with different keep counts (3→2→1).

### 2.3 Minimum‑Compliance Path

Calculated minimum path:

Day → delta → score  
1 → 1 → 1  
2 → 2 → 3  
3 → 1 → 4  
4 → 2 → 6  
5 → 2 → 8  (threshold reached)  
6 → 2 → 10  
7 → 2 → 12  
8 → 2 → 14  
9 → 2 → 16  (threshold 15–21)  
10 → 2 → 18  
11 → 2 → 20  
12 → 2 → 22  (threshold ≥22)  
13 → 3 → 25  
14 → 3 → 28  
15 → 3 → 31  
16 → 0 → 31 (end)

**Result**: The player hits single‑option mode on day 13, not day 14–15 as the comment in `compliance.js` suggests. The comment should be updated.

**Implication**: The resistant player still gets **12 days of meaningful choice** before the corridor closes completely. That’s good.

---

## 3. End‑of‑Day Tone Shift

The four EOD messages track compliance score:

- < 8: “Your work is appreciated.”
- 8–14: “Within acceptable parameters.”
- 15–21: “No irregularities recorded.”
- ≥22: “Cycle complete.”

**Observation**: The transitions are very gradual. A minimum‑compliance player sees “standard” through day 5, “affirming” from day 7, “seamless” after day 11, and “complete” after day 15. That’s spread over 10 days — the emotional arc may feel too slow.

**Suggestion**: Consider sharper thresholds (e.g., change tone every 5 points) to make the shift more noticeable.

---

## 4. CRT Graphics & Polish

The CRT effect is a first‑draft implementation (`crt.js`). It works but lacks polish:

- Scanlines are static (no subtle movement).
- No phosphor decay / afterglow.
- No curvature distortion.
- The “off” state is just a black screen with a power button — could add a faint reflection or dust overlay.

**Priority**: Low. The CRT is atmospheric but not essential to gameplay. However, for a 1.0 release, it should feel intentional, not placeholder.

---

## 5. Missing: Game‑Design Theory Application

We read Schell and Rouse but didn’t apply their lessons systematically.

### 5.1 Flow Channel (Schell)
The game should stay in the **flow channel** — challenge matches skill. Here “skill” is understanding the system’s hidden rules.

- Early days: low challenge (obvious choices).
- Mid game: rising challenge (harder trade‑offs).
- Late game: high challenge (few options, high stakes).

**Check**: Does the difficulty ramp feel right? Probably yes — the late cases are more morally ambiguous and the options are constrained.

### 5.2 Red Line (Rouse)
The “red line” is the core emotional through‑line. Ours is **dehumanisation through bureaucracy**.

- Does each case reinforce that line? Mostly yes.
- Could it be stronger? The early cases are too mundane — they don’t yet signal the horror. Consider adding a faint unsettling detail to day 1 or 2 (e.g., the noise complaint comes from a block that officially has no residents).

### 5.3 Hidden Mechanic (Compliance)
The compliance score is hidden — players must infer it from the narrowing of options.

- Is the narrowing noticeable enough? Possibly not until day 6–7.
- Could add a subtle visual cue (e.g., options grey out, or a “system priority” indicator).

---

## 6. Playtest Status

No full playtest has been done. **This is the biggest gap**.

**Required**: A complete play‑through, screenshotting every day, noting:
- Is the text readable?
- Does the typewriter timing feel right?
- Are the options clearly clickable?
- Does the EOD transition feel satisfying?
- Any bugs or UI glitches?

---

## 7. Recommendations for Phase 5

1. **Fix duplicate deltas** — give each option a distinct compliance cost.
2. **Adjust thresholds** to create three distinct narrowing stages (3→2→1).
3. **Sharpen EOD tone shifts** — make them more noticeable.
4. **Polish CRT** — add subtle scanline movement and curvature.
5. **Conduct a full playtest** — manual or automated, but must be done.
6. **Consider adding a stronger hint** in the early cases that something is wrong.
7. **Update the final case** (day 16) to have more impact — perhaps a personalised message based on the player’s choices.

---

## 8. Next Actions

1. Create a task list in `PLAN.md` from these recommendations.
2. Assign priorities (P1: playtest, P2: duplicate deltas, P3: threshold tweaks).
3. Schedule follow‑up coding sessions.

**This review satisfies Stefano’s request for “critical re‑reading of the 16 cases” and “application of game‑design theory”.** The remaining work is implementation.