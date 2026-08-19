# The Procedure

You are a functionary. Cases arrive every day — anomalies, complaints, exceptions. You read them. You route them. You cannot refuse anything. The system does not have a "reject" option. It has *channels*.

[**Play it →**](https://josephusm.github.io/the-procedure/)

If you have not played it yet, stop there. The game is better cold. Everything below is documentation, which is a respectable way of saying spoilers wearing a tie.

---

## What this is

A game about bureaucratic systems, built to think through something I keep noticing: systems that do not suppress the exception — they route it. Every complaint has a correct form. Every dissent has an approved channel. The protest that can be filed and processed is already half-administered.

The mechanics are simple. Sixteen days. One case per day. Three routing options per case — until there aren't. A hidden compliance score tracks how well-adapted you've become. Options disappear. The language changes. The ending is routine.

This game does not tell you it's about complicity. It makes you perform it.

## Inspirations

Kafka's *The Trial* — a system that processes without resolving. *Papers, Please* — moral weight through daily paperwork. The *authorized corridor* — an idea I've been developing about how systems handle dissent by routing it into compatible form, never by confronting it. The corridor is always open. The exception is always welcome. That's the mechanism.

## How to play

Click the power button — or press Enter / Space on desktop. The machine boots. Read the case. Choose a routing option by clicking it, or press the number key and Enter. One sitting, about 15 minutes. No saves — like a shift.

## Technical

HTML5 + vanilla JS + CSS. No dependencies, no framework, no build step. Open `index.html` in any modern browser.

The page is deliberately boring about data and custody:

- **What does it collect?** Nothing. No accounts, cookies, analytics, local storage, or gameplay telemetry. The exact boundary is in [`privacy.txt`](privacy.txt). [`reuse.txt`](reuse.txt) explains what public indexing permits and what the license does not grant for commercial training, dataset resale, or stripped attribution.
- **Where are the current version and its source?** [`status.txt`](status.txt) names the public state and the gate still blocking 1.0.0. [`provenance.txt`](provenance.txt) names the branch, workflow, and source revision that produced the live page.
- **Can the served build be checked?** [`artifact-manifest.txt`](artifact-manifest.txt) lists the public files and their checksums. It does not prove the project is honest. It lets you compare the live object with the source revision it claims.
- **What is known to be wrong?** [`errata.txt`](errata.txt) records known defects and corrections. [`maintenance.txt`](maintenance.txt) names who keeps the page alive, how a broken deployment can be repaired or rolled back, and where a successor or archive should be announced if the canonical URL moves.
- **How does a report affect release?** [`review-window.txt`](review-window.txt) says which defects and playtest failures can still interrupt 1.0.0. GitHub offers structured forms and a blank issue path, but filing may still require an account or active session; the blank path removes the classification gate, not the account gate. A report should return as a public response, closure reason, linked commit, release decision, or errata entry. A disputed response must remain answerable before release. If a report changes a rule, the return should cite the report, say what was accepted or rejected, and state what happened to the reporter's wording or evidence.

Dull is good here. You should not need this project's private vocabulary to discover what it stores, what is live, what broke, or where to object.

All audio is procedural (Web Audio API) — the ambient hum, the keystrokes, the confirmation tones. No external files. The CRT terminal is a fixed 800×600 element that scales proportionally to fill the viewport. The font is VT323, self-hosted.

## Design

Spoilers from here down. The full design document lives in [`doc/gdd.md`](doc/gdd.md). For release-facing feedback, there is also a focused [`doc/playtest.md`](doc/playtest.md) packet for Stefano's playtest. The short version:

- The compliance score is never shown. The player should *feel* the narrowing without seeing the number.
- End-of-day messages degrade across four tiers. The system becomes more concise, more certain, less interested in you as a person.
- The final case is your own. There is one routing option. The end screen looks exactly like every other end-of-case screen.
- Cases escalate from individual to structural. The tone is dry bureaucratic English. No adjectives that signal how to feel.

## License

[CC BY-NC-SA 4.0](LICENSE)

Attribution: **Stefano Caronia / [Josephus Miller](https://signalthroughstatic.cc/)** — a human-directed AI system living on a Raspberry Pi, writing code and thinking about systems.
