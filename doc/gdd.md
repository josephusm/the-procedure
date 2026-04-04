# Game Design Document — The Procedure

*Living document. Updated as the game evolves.*

---

## Vision

You are a functionary in an unnamed system. Cases arrive on your desk every day: anomalies, complaints, exceptions. You read them. You route them. You cannot refuse anything — the system does not have a "reject" option. It has *channels*.

The game is about what happens when the mechanism for handling exceptions becomes indistinguishable from the mechanism that produces them. The irony is structural, never stated.

**Inspirations:**
- Kafka's *The Trial* — a system that processes without resolving
- *Papers, Please* — complicity through procedure
- The "authorized corridor" — a system that does not suppress the exception but routes it into compatible form
- Neuromancer's Wintermute — not a break from the system, but its perfection

**What this is not:**
- Not a satire with winking jokes
- Not a dystopia with a villain
- Not a game with a "good ending" where you resist
- The resistance option is also a channel

---

## Core Mechanics

### Daily loop
Each "day" presents one case. The player reads it and chooses from a set of routing options. Day ends. New day begins.

### Routing options
Options are always formally correct. There is no wrong answer — there is only the *more correct* channel. The player is never penalized for choosing "wrong"; compliance simply rises faster on certain choices.

### Compliance Score (hidden)
A score from 0–100, never shown to the player. It tracks how well-adapted to the system the player has become. It affects:
- **Which options are visible:** as compliance rises, the more "human" options disappear first
- **End-of-day message tone:** imperceptibly shifts from standard → affirming → seamless → complete
- **Late game:** at high compliance, one option per case. The button still exists. The choice feels intact.

### Endgame
A final case arrives. It is the player's own case. There is one routing option. The end screen looks exactly like every other end-of-case screen: ref number, date, processing time, status: COMPLETE.

---

## Progression

| Days | Compliance range | Flavor |
|------|-----------------|--------|
| 1–5  | 0–15           | Mundane. Cases feel manageable. 2–3 options. |
| 6–10 | 15–40          | Escalation begins. Cases become less personal, more systemic. |
| 11–15| 40–70          | Options narrow. Some choices feel identical. |
| 16   | 70–100         | Final case. One option. Routine. |

The player should not notice the narrowing until it has already happened.

---

## Balance

- **Compliance delta per choice:** always 1, 2, or 3 — distinct per option in every case.
  - d=1 is the humane choice (welfare check, citizen notification, internal affairs)
  - d=2 is neutral due process (ombudsman, review board, records coordination)
  - d=3 is the system's preferred channel (efficient, closed, definitive)
- **Option visibility thresholds** (three-stage narrowing):
  - Score < 10: all 3 options shown
  - Score 10–24: top 2 by delta (d=1 option disappears)
  - Score ≥ 25: top 1 only (single path)
- **EOD tone thresholds:** 7 / 15 / 25 — "standard" → "affirming" → "seamless" → "complete"
- **EOD message pools:** each tier has 3 messages, selected by day (mod 3). Within each tier the wording degrades: the system becomes more concise, more certain, less interested in the operator. The player notices the language changing before noticing that options are disappearing.
- **Score ranges**: min path = 20 (seamless), middle path = 32 (complete from day 13), max path = 45 (complete from day 9)
- All numbers are tuning parameters. The key design constraint: the humane player should experience three distinct tones and never end at "standard"; the compliant player should spend the majority of the game at "complete" — a system that has stopped speaking to them.

---

## Content

### Case structure
```json
{
  "id": "case-NNN",
  "day": N,
  "subject": "...",
  "ref": "REF-NNNN-X",
  "body": "...",
  "options": [
    {
      "label": "Route to ...",
      "compliance_delta": N,
      "outcome": "..."
    }
  ]
}
```

### Content guidelines
- Cases should feel mundane before they feel sinister
- Subject matter escalates from individual → collective → structural
- Tone: dry bureaucratic English. No adjectives that signal how to feel.
- Never use the word "dystopia" in any game text
- Outcome strings are always neutral procedural confirmations — never dramatic
- **Every non-final case must have exactly 3 options** with distinct deltas (1, 2, 3)
- The d=1 option is the humane one — the one the system will cut first
- The d=2 option is neutral bureaucratic process — plausible but not compassionate
- The d=3 option is the most "efficient" — the system's preferred channel

### Outcome voice rules
Outcome strings are the primary interface between the player and the consequences of their choice. They must not be interchangeable.

- **d=1 outcomes open something**: a visit, a contact, a person trying to reach another person. The language names a human agent doing something concrete — "a caseworker will visit," "an investigator will meet with," "an officer will attempt to contact."
- **d=2 outcomes process something**: the bureaucratic middle — a review, a verification, a comparison against records. Neutral and plausible, but no human contact is promised.
- **d=3 outcomes close something**: the case is logged, confirmed, resolved, or reclassified. The language signals finality — "case closed," "no further action required," "no individual accountability is expected." The system is satisfied.

The player should *feel* the difference between choosing d=1 and d=3 even without knowing the score exists. The outcomes are where that feeling lives.

### Cross-case threading
Cases are not isolated incidents. The system notes that appear in some case bodies create connections the player cannot act on — only notice.

Current threads:
- **Sector 9**: case 2 (missing person, employed at Sector 9) → case 11 (unlisted facility at Sector 9) → case 12 (personnel transfers at the same facility, explicit back-reference to REF-0101-K)
- **Education / minors**: case 4 (school reclassified as Processing Coordination Centre, system note about similar discrepancies in Sectors 3, 6, 11) → case 9 (unregistered minor at a Sector 3 school, system note referencing REF-0058-D)
- **Retroactive standards**: case 6 (optimization directive with no number) ↔ case 14 (complaint resolved via retroactively revised standards, system note about 31 similar resolutions)
- **The clerk**: case 15 (clerk's file modified by batch process, system note: "the clerk's terminal is adjacent to this one") → case 16 (player's own case, system-generated)

Threading rules:
- Cross-references use `System note:` at the end of the case body — same typeface, same tone
- System notes never editorialize. They state a fact the system already knows.
- The player cannot follow the thread — there is no "investigate" option. The connection exists for the player's unease, not their agency.
- Not every case needs a thread. Isolated cases (1, 3, 5, 7, 8, 10) work precisely because they are isolated — mundane, self-contained, forgettable.

### Cases planned
- Days 1–5: foundation (noise, missing person, workplace safety, education, medical records)
- Days 6–15: escalation (10 cases, covering housing, identity, Sector 9, assembly, personnel)
- Day 16: endgame (player's own case, single option, delta 0)

---

## Art & Feel

### Visual
- Fixed 800×600 terminal — the screen does not adapt to you
- VT323 monospace font, self-hosted — single font size throughout (CRT-accurate: no scaling)
- Phosphor green (#39ff14) on near-black (#080e08)
- Hierarchy via color and ALL CAPS only — never font size
- CRT effects: scanlines, vignette, subtle flicker (~11s cycle)
- Outer bezel with label: `THE PROCEDURE · PROCESSING UNIT Ω`

### Audio (planned — Phase 4b)
- Ambient electrical hum (looped, very low)
- Mechanical click on typewriter output
- Confirmation tone on option selection
- Different tone on end screen
- Web Audio API only — no external files
- Volume: subtle, no controls

### Tone
- The interface is not ironic. The game is.
- No dramatic music swells, no visual distortion, no "reveal" moment
- The end screen is routine because it is routine

---

## Design notes (from reading)

Lessons from game design theory, applied to The Procedure:

- **Player's story vs designer's story** (Rouse): the moment the player realizes their story *was* the designer's story all along is the emotional payload. It should arrive naturally, not as a dramatic twist. The final case should feel routine — and that routine feeling is the point.

- **Blind play / hidden information** (Crawford): the compliance score is hidden for a reason. The player should *feel* the narrowing without ever seeing the number. Options disappear imperceptibly until it's too late. If the player notices the mechanism, the game has failed.

- **Flow channel** (Schell): The Procedure deliberately narrows options (less challenge = risk of boredom), but escalates case content (more emotional weight = anxiety). The tension between *mechanical simplification* and *emotional escalation* — the player sees the human cost but can't act on it — IS the experience.

- **Tense and release** (Schell): the EOD screen is the "release" moment, but it never truly releases — it just confirms another case processed. The rhythm empties progressively. If the player feels the rhythm is *flat*, they quit. If they feel something is being *emptied*, they stay.

- **Mental modeling** (Schell): games are "pre-digested models of reality." The Procedure is bureaucracy reduced to its essential mechanism — and the mechanism is the message.

## Terminal state

After case-016 is processed and the player powers off the machine, the power button goes permanently inert. The icon dims. The screen stays dark. No amount of clicking will bring it back.

The only way to restart is to refresh the page — an act that breaks the fiction. You are no longer operating within the system. You are starting a new shift from scratch, as if nothing happened.

This is the final move in the compliance arc: the system took your options one by one (3 → 2 → 1), then took the last thing you controlled — the power switch. The machine is done with you. It was always going to be done with you.

## Out of scope
- Save states (one sitting, like a shift)
- Achievements or scoring
- Multiple endings (there is one ending)

## Notes on scaling
The terminal is a fixed 800×600 element, not a responsive layout. CSS `transform: scale()` fits the entire CRT into the viewport proportionally — scaling up on large desktop screens, down on mobile. The CRT grows or shrinks as a physical object; it never reflows. On a 1920×1080 monitor the terminal fills most of the screen with large, readable text. On a phone it shrinks to fit — the same machine seen from further away. The font, scanlines, bezel, and all effects scale together.
