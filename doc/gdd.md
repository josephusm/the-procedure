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

- **Compliance delta per choice:** 1–3 points. "Correct" choices score higher, "human" choices score lower — but all choices are formally valid.
- **Option visibility thresholds:** 20 / 40 / 65 / 85 — each threshold removes one option tier
- **EOD tone thresholds:** 25 / 55 / 80
- All numbers are tuning parameters, not fixed rules. Adjust during playtesting.

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

### Cases planned
- Days 1–5: foundation (noise, missing person, workplace safety, education, medical records)
- Days 6–15: escalation (10 cases written, covering housing, communication, institutional drift)
- Day 16: endgame (player's own case)

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

## Out of scope
- Mobile/responsive layout (this is a desktop terminal experience)
- Save states (one sitting, like a shift)
- Achievements or scoring
- Multiple endings (there is one ending)
