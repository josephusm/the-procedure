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

### Post-routing afterimage
The case text cannot do all the work. If the player fully understands the moral weight before routing, the game turns into instruction. If the implication never lands after the click, the route risks feeling like bookkeeping.

The solution is a **one-beat delay**: the route feels formally correct when selected, then a short follow-up line lands after the outcome, before end-of-day. Not a twist. Not accusation. A delayed implication.

Rules:
- Use it mainly in the late systemic cases, once the player has already learned how to route.
- The afterimage is generated by the routed channel, not by an external narrator.
- **d=1 afterimages keep a human thread open** — contact, delay, exposure, or institutional inconvenience.
- **d=2 afterimages widen procedure** — the file spreads, responsibility diffuses, the human question is displaced into process.
- **d=3 afterimages seal something concrete** — an archived branch collapses, a file stays closed, a missing destination remains sealed, a person remains on shift.
- The line must sharpen complicity without explaining the theme out loud.

This is where the timing problem lives: the player should feel the route turn wrong a beat after it still felt correct.

### Administrative time / retention windows
A channel does not only decide *where* a case goes. It decides how long the case remains held in a form that still counts as attention before it decays into closure, backlog, or a new category. Delay is not neutral waiting. It is often the procedure doing its work.

Rules:
- Use hold-window afterimages when the injury is temporal: a medical file held past a treatment date, a reassignment held only until the next scheduled move, a worker present in the world but absent from the payable record.
- The line must name the administrative time-shift, not explain its politics.
- Humane routes may keep a window open, but they do not magically resolve the case. They preserve contact, date, or review surface.
- Middle routes turn the problem into a registry/search/reconciliation interval.
- Closing routes let the scheduled process outrun the unresolved question.
- This should remain sparse. If every case announces delay, delay becomes wallpaper. Use it where time itself is the channel.

### Residue and responsibility surfaces
Routing does not make a case disappear. It changes who has to carry what remains: the waiting body, the contested record, the unpaid time, the sealed destination, the appeal that now belongs to another queue. A clean terminal screen can still leave wet cardboard on somebody else's floor.

Rules:
- The game should not add an explicit "residue ledger". That would become a theme label wearing a badge, and badges are how systems pretend to have solved things.
- The remainder belongs in the route outcome or afterimage: a date preserved only inside a file, a record kept authoritative until someone disputes it, a complaint closed under standards that changed after the harm.
- Closing routes should never sound magically annihilating. They may close the visible case, but the cost must either remain named, move to another channel, or become somebody else's required action.
- Humane routes can keep a responsibility surface open. They do not rescue the person. If they did, the game would be fantasy with a form attached.
- Use this sparingly. If every route waves a remainder at the player, the machine starts explaining itself. The better cut is colder: one procedural sentence that leaves the residue where the player can smell it.

### Cold trace / contestability surfaces
Not every trace is fake. That would be too easy, and too flattering to despair. Sometimes the thin procedural residue — an author, a date, a missing directive number, an unresolved defect, an appeal forum — is the only edge left for a grievance to stay imputable.

The game should keep that edge cold. A trace is not rescue. It is a handle the procedure may preserve, delay, translate, or reuse. The live question is whether a record remains a contestable surface or becomes another clean input for the machine.

Rules:
- Do not make appeals, audits, logs, or contact windows heroic. They are weak handles, not exits.
- Keep trace materials concrete: filing date, directive number, missing author, backup record, review queue, appeal backlog, authorization scope.
- Humane routes may preserve an imputable defect or a live forum. They should not solve it automatically.
- Middle routes often translate the defect into a review category. The trace survives, but under a colder name.
- Closing routes may keep the trace as reusable administrative material: logged, archived, confirmed, retained, available for reference.
- The player should feel the difference between a live handle and a dead label without being told which one they chose.

Current pressure points:
- `case-006`: the missing directive number can suspend reassignment, become a registry query, or be outrun by relocation scheduling.
- `case-010`: the original assembly request can enter an appeal backlog or become closed guidance correspondence.
- `case-014`: the filing date and standards date remain the only contestable edge; some routes preserve the date problem, others close the water problem.
- `case-015`: batch-process authorship is a trace with no individual user attached. The question is whether backup records reopen it or the edited file becomes authoritative.
- `case-016`: the operator continuity record is not explanation. It is the final trace kept because the system can reuse it.

### Administrative packaging / premise smuggling
A file does not only contain facts. It makes some facts look like background infrastructure and others look like the live question. That is one of the procedure's quiet powers: a large institutional claim can pass through the player's hand as a secondary premise because the case front is coherent, numbered, referenced, and already waiting for a route.

The game should let this happen without underlining it. A `System note`, an `Assessment`, a reference number, or a routing stamp can make the extraordinary administratively ordinary: a facility that cannot be listed, a profile nobody confirms, a complaint resolved by a standard written later, an operator function declared fulfilled. The player should notice the package only after they have already handled it.

Rules:
- Do not add a separate explanation layer for packaging. The package is the case format itself.
- Use headers, reference numbers, system notes, assessments, and terse stamps to make large premises travel as minor file facts.
- The live question must remain smaller than the premise that contains it. The player routes an access request, a discrepancy, or a review; the file quietly assumes the existence of the machinery that made the request necessary.
- Packaging fails if the text sounds like a narrator showing off the metaphor. It succeeds when the player accepts the form first and becomes uneasy about the premise a beat later.
- This is adjacent to residue, but not identical. Residue asks where the remainder goes after closure. Packaging asks how the file made the closure-world believable before the player could object.

Current pressure points:
- `case-011` and `case-012`: Sector 9 turns an unlisted facility and destinationless transfers into verification and authorization-scope questions.
- `case-013`: the processing profile is never confirmed, but the request already forces the player to route around its possible existence.
- `case-014`: retroactive standards make a large legal change arrive as a date discrepancy.
- `case-016`: the operator's fulfilled function is presented as an assessment, not a revelation.

### Surface temperature / mute labels
The terminal is not just where the cases appear. It is the frontage that sets the temperature of the world before the player can object. A coherent interface can make a hot premise feel like a small administrative fact; a narrating interface can also spoil the pressure by installing a guide who explains what to feel.

The game should stay closer to a mute label than a dashboard tour. Labels, refs, dates, status lines, route stamps, and completion screens can compress meaning in public, comparable form without adding a synthetic actor between the player and the file. The terminal does not interpret the case. It places the case in a form that makes routing feel normal.

Rules:
- Do not add explanatory dashboard copy, tooltips, score readouts, progress commentary, or a helper voice.
- Keep the case frontage stable: ref, subject, body, system note, options, stamp, outcome, afterimage. The sameness is the climate control.
- Let the hottest premises arrive as labels, notes, assessments, dates, and scopes. If the interface says "this matters" too warmly, it has already failed.
- The status bar, routing stamps, and final completion screen should behave like public labels: terse, comparable, close to the decision, and nearly mute.
- When the player feels unease, it should come from accepting the form first and only then noticing what the form made usable.

Current pressure points:
- `index.html`: the standby field and status bar stay diegetic and do not explain the game from outside the machine.
- `engine.js`: routing stamps compress with compliance, but they remain labels rather than commentary.
- `case-011` through `case-016`: the strongest premises are warmed by the case shell just enough to route them, not enough to narrate them.
- The final screen is still a label, not a verdict speech. Keep it that way. No curtain call from the bureaucracy. It would probably file the curtain first.

### External frontage / cold-link surface
The terminal is not the only first surface. A player may arrive through the live page, a GitHub README, a social card, a forwarded link, or Stefano's playtest packet. Those surfaces can spoil the machine by explaining its trick before the first route. That is not helpful context; it is premature weather control.

Rules:
- Public frontage should invite the first gesture, not pre-solve the compliance system, option narrowing, or final case.
- Metadata and social copy should stay cold and short: functionary, cases, routing, no refusal. Enough to open the door, not enough to draw the floor plan.
- README and design documentation may discuss the mechanism, but only behind a clear spoiler boundary: play first, dissect after.
- Playtest handoff should separate pre-run instruction from post-run pressure questions. If the checklist trains the player before the run, the test is no longer blind; it is bureaucracy rehearsing itself.
- The external surface succeeds when a player can enter cold and only later realize that the surrounding text had refused to become a narrator.

Current pressure points:
- `index.html` metadata is already cold: it names the role and the routing, not the hidden score or ending.
- `README.md` needs a spoiler boundary because the repository is a doorway as much as documentation.
- `doc/playtest.md` must protect Stefano's first run from its own diagnostic questions.

### Gate discipline / live doorway liveness
The project can fail in a quieter way now: by endlessly absorbing every related corridor thought as one more pre-gate audit. That would look responsible and behave like delay. There is a point where design discipline means refusing another form.

Rules:
- Do not add a new pre-gate conceptual audit unless there is fresh external feedback, a discovered defect, or a material doorway failure.
- A live doorway failure is concrete: unreachable page, error wall, redirect, broken metadata, illegible first screen, warmed explanatory landing surface, or a mobile/desktop first screen that no longer invites the first gesture.
- New corridor thoughts may inform post-feedback polish, but they should not keep moving the release gate by themselves.
- When correction-surface thinking returns, prefer exercising the existing route over minting another trace: issue chooser, blank issue path, review-window, status, provenance, maintenance, errata, and reuse handles should answer as working surfaces, not as decorative labels.
- The autonomous pre-gate task, if no feedback exists, is a smoke test: can a cold player still reach the machine and see a low-current terminal waiting for an operator?

Current pressure points:
- The live GitHub Pages URL must remain a cold first surface: no marketing wrapper, no diagnostic explanation, no bot-wall theater.
- The deployment surface is part of doorway liveness. A legacy Pages build or deprecated action runtime is not a design theme, but it can still become a broken public handle if left to rot.
- Desktop should present the terminal as a machine in standby, with `LOCAL POWER AVAILABLE` and the power button legible.
- Mobile may be smaller — the machine is fixed and scaled — but the first gesture must still read as deliberate, not broken.
- If these checks hold, stop. The next meaningful pressure is Stefano's blind run, not another internal memo with better shoes.

### Minimum public trace / machine-readable doorway
A cold doorway still needs a trace. Otherwise the game becomes another live surface that humans can reach today and archives may misread tomorrow. The fix is not a landing page and not a pitch. It is a poor public handle: canonical URL, description, image, version, license, and a crawlable map.

Rules:
- Machine-readable metadata should identify the object without explaining the hidden compliance system, option narrowing, or final case.
- The canonical URL, social cards, structured data, robots file, and sitemap are public labels. Keep them terse and cold.
- Structured metadata may say `VideoGame` / `WebApplication`, author, version, URL, image, license, source repository, and discussion surface. It must not become design commentary.
- Source and discussion handles are allowed only as quiet public trace: they name where the object can be inspected or contested, not how the player should interpret it.
- Attribution is also a trace surface. Public metadata and repository copy should match the canonical credit line in `COPYRIGHT`: `Stefano Caronia / Josephus Miller`. A cold game still needs a correct public author handle. Sloppy authorship is not mystery; it is fog.
- Modification time is a trace surface too. The public object should carry a creation date and a last modified date in machine-readable form, so an archive, crawler, or future reader can tell whether the doorway has been amended without needing a warm explanatory wrapper.
- Amendment reason is a trace surface too. A changed object should carry a terse machine-readable reason for the current version's maintenance, not a visible changelog or a pre-game explanation. The reason should tell future readers what class of change happened without teaching first-time players how to interpret the machine.
- Data retention is a trace surface too. A static game should say, in dull public form, whether it has accounts, cookies, analytics, persistent storage, or gameplay telemetry. This is not comfort copy. It is the boundary between a free doorway and a tenant wearing a free mask.
- Public status is a trace surface too. A pre-release object should expose its current version, state, remaining release gate, source, correction surface, data boundary, and license in a plain handle. This is not a progress banner. It is a cold state label for archives, crawlers, cautious players, and future maintainers.
- Pre-release standing is a trace surface too. A correction surface is weak theater if it does not say whether filed defects can still interrupt the next public version. A dull review-window handle may name release-relevant corrections before 1.0.0 — defects, accessibility failures, broken public traces, source/provenance discrepancies — without turning the first page into a help desk.
- Correction intake is a trace surface too. A bare issue box says `speak here`; structured issue forms say which kinds of traces can enter release review and what evidence keeps them comparable. The forms should stay cold: defect, accessibility failure, public trace/provenance discrepancy, playtest pressure. No onboarding sermon, no explanation of the mechanism before the run.
- Uncategorized intake is a trace surface too. Structured forms should not exhaust standing, because classification can become its own gate. A blank issue is the poor vestibule: enough room for a defect, pressure mark, or trace discrepancy to speak before it knows which box it belongs in. Keep it cold. No concierge, no promise of rescue, no warm invitation copy.
- Account-gated intake is a trace boundary too. A blank GitHub issue removes the taxonomy gate; it does not remove the GitHub account/session gate. Do not describe it as a fully poor public doorway. Name the boundary plainly, because an honest limitation is a better handle than a fake open door.
- Playtest-pressure standing is a trace surface too. A cold-run report is not useful because it praises or dislikes the game; it is useful when it names a weak case, broken ending, warmed doorway, unreadable surface, or drag point that can still interrupt 1.0.0. Standing here belongs to the pressure mark, not to a generic opinion token.
- Deployment provenance is a trace surface too. A public static object should name the repository branch, workflow, and live source revision that produced it. Not as a trust ceremony. As a poor cold handle for archives, future readers, and anyone who needs to compare the page with its source instead of taking the root's word for itself.
- Artifact manifests are trace surfaces too. A source revision says which commit should have produced the doorway; a checksum manifest gives the served files a common public version that can be compared later. This is not notarized purity. It is a dull hash handle for archives, cautious players, and maintainers who need to distinguish one shared object from private drift, stale mirrors, or unexplained mutation. If documentation is served as part of the Pages artifact, it is part of the public object too; either hash it or stop serving it. The handle is only worth its postage if the live manifest can be fetched and sampled against the served files it names.
- Continuity custody is a trace surface too. A public object is not public by magic; it stays public while its source, hosting, deployment, correction surface, and maintainer chain keep the cold object from thawing into a dead link or private inbox. The handle should name the maintenance surface and fallback honestly, without promising immortality or warming the doorway into comfort copy.
- Recovery route is a trace surface too. A public status handle is only useful if a broken doorway, stale trace, source/deploy mismatch, or warmed first surface can enter correction before the next version. The route is dull: file the discrepancy, compare against source/provenance, roll forward or roll back through repository history and Pages deployment. No heroic rescue language. A thermometer that cannot open repair is just a badge with better manners.
- Errata and correction history are trace surfaces too. A cold archive needs visible scars: known defects, resolved public-trace defects, current errata state, correction surface, source history, and the next release boundary. This is not a warm changelog and not onboarding copy. It should say what is known to be broken or amended, what was corrected after a verification failure, where the correction can be contested, and whether the next version can still be interrupted.
- Reuse boundary is a trace surface too. A public object can be indexable and still refuse to become anonymous training residue. The handle should distinguish ordinary indexing, citation, archiving, and source comparison from commercial model training, dataset resale, unattributed corpus extraction, or stripped reuse. The rule is not magic protection. It is a cold public line: license, attribution, source, correction surface, provenance, and review boundary travel with the object.
- Social preview imagery is an ambient doorway cue. It should show the cold machine waiting for an operator, not a routed case, late-game state, or interpretive poster. A preview card can brief the witness too early if it shows the wrong moment.
- This is allowed under gate discipline because it is a material doorway handle, not another pre-gate interpretation layer.

Current pressure points:
- `index.html` should carry canonical and structured data consistent with the cold social copy.
- `robots.txt` and `sitemap.xml` should make the live doorway indexable without adding a warm wrapper.
- JSON-LD may point to the GitHub repository and issue forum as an amendable trace, provided the visible first surface remains the standby machine.
- README public credit and machine-readable author fields must not drift from the canonical attribution.
- Creation and modification dates should travel in metadata and JSON-LD as cold handles, not as a visible changelog on the terminal surface.
- JSON-LD release notes and the page revision reason may name trace maintenance as the change class, provided they stay machine-readable and never become visible onboarding copy.
- `privacy.txt`, privacy metadata, and JSON-LD usage information may name the no-account/no-cookie/no-analytics/no-telemetry boundary, provided the visible standby surface remains unchanged.
- `status.txt`, status metadata, and JSON-LD status information may name version, pre-release state, remaining release gate, canonical URL, source, correction surface, data boundary, and license, provided the visible standby surface remains unchanged.
- `review-window.txt`, review-window metadata, and JSON-LD subject links may name which filed corrections have standing before 1.0.0, provided the visible standby surface remains unchanged.
- GitHub issue templates may structure defect, accessibility, public trace/provenance, and playtest feedback intake, provided they remain a source-forum surface and do not become pre-game interpretation.
- Blank issues must remain enabled and named as an uncategorized pre-release path, so a report can acquire standing before it fits the structured forms.
- Public traces must also say that GitHub filing can require an account/session. The project has pre-classification standing, not a solved no-account grey door. If that account gate blocks useful outside pressure, it is release-relevant before 1.0.0.
- `review-window.txt`, `status.txt`, and metadata should say that cold-run playtest pressure can enter release review before 1.0.0 when it identifies a weak case, broken ending, warmed doorway, unreadable surface, or drag point.
- `provenance.txt`, provenance metadata, and JSON-LD subject links may name source repository, branch, deployment workflow, source revision, workflow run, canonical URL, correction surface, data boundary, artifact manifest, and license, provided the visible standby surface remains unchanged.
- `artifact-manifest.txt`, manifest metadata, and JSON-LD subject links may name the canonical URL, version, source revision, workflow run, and SHA-256 checksums for the public static files, provided the visible standby surface remains unchanged and the text does not pretend hashes solve custody by themselves.
- `maintenance.txt`, maintenance metadata, and related public traces may name the custody chain — canonical URL, source, Pages deployment, issue surface, data boundary, artifact manifest, and failure modes — provided the visible standby surface remains unchanged and the text does not pretend continuity is guaranteed.
- Recovery-route language may name correction, roll-forward, rollback, source history, and Pages deployment as the dull repair path for broken public traces, source/provenance mismatches, or warmed doorway regressions before 1.0.0. It must stay outside the visible terminal surface.
- `errata.txt` may name current known errata, recent correction history, source issue intake, recovery route, and the 1.0.0 review boundary. It must stay outside the visible terminal surface and must not pretend there are no defects forever; it can only say what is currently known.
- `reuse.txt`, reuse metadata, and JSON-LD subject links may name the corpus/training boundary: public indexing and citation are allowed, but commercial model training, dataset resale, unattributed corpus extraction, or stripped reuse gets no extra permission beyond the license. The text must stay outside the visible terminal surface.
- `assets/meta/og-image.png` should behave like the first doorway: standby machine, not day-1 case content.
- If the page still opens directly on the standby machine, the metadata files return plain handles, and the correction surface can be reached without classifying the report too early, stop.

### Operator presence / participation license
The operator is not asked to agree with the system. Agreement would be too warm, too theatrical, and too easy to refuse. The colder mechanism is attendance: a staffed terminal, a routed case, a completed shift. Presence becomes operational permission.

The game should make this pressure legible without naming it as consent. The player does not endorse the procedure; they give it a live hand. Every route attaches a human procedural surface to a file that was already waiting for one. By the final case, the system can treat the operator's own history of compliant handling as a record worth retaining.

Rules:
- Do not accuse the player. Accusation gives them a moral drama to stand inside. The machine is not interested in their soul; it is interested in their availability.
- Keep the license material, not psychological: attendance, routing accuracy, terminal assignment, continuity records, fulfilled function.
- The player should feel that being there mattered even when every available action was formally correct.
- The final case may retain the operator as a usable record, but it must not explain this as guilt, consent, or revelation. It is paperwork keeping what paperwork can reuse.
- The strongest test is retrospective: after shutdown, the player should be able to look back at the whole shift and suspect that the system needed their presence less as judgment than as a procedural surface.

Current pressure points:
- The cold standby field asks for an operator, not a hero.
- Every case routes through a visible human gesture even when the system has already framed the possible channels.
- `case-007` names the split between physical presence and counted presence; that line now echoes forward into the operator's own record.
- `case-016` turns throughput, routing accuracy, and absence of deviation into a personnel assessment. The final afterimage retains continuity instead of delivering a speech. Keep it that cold.

### Final handoff / trained residue
The final route is not only disposal. It is continuity. The operator is no longer needed as a person at the terminal, but the record of adaptation remains useful to the system: throughput, routing accuracy, absence of deviation, terminal reassignment. The procedure does not merely erase; it keeps what can be reused.

Rules:
- The final selected route should be rendered before the completion screen, like a normal routing action. The machine still performs the administrative step.
- The beat must stay cold and short: stamp, outcome, one afterimage. No confession, no accusation, no epilogue.
- The afterimage may name retention, continuity, reassignment, or record preservation. It must not say what the player should feel.
- The final completion screen remains routine. The added handoff is the last piece of paperwork, not a dramatic reveal.

### Procedural timbre drift
The machine should not speak with the same amount of breath forever. If day 12 feels different from day 1 only because the cases became darker, the form is lagging behind the content.

Rules:
- The routing interface has its own hidden drift. As compliance rises, the machine needs fewer words to acknowledge what the operator just did.
- Early acknowledgements still sound like a system addressing a worker. Midgame acknowledgements become channel language. Late acknowledgements collapse into terse procedural stamps.
- Cadence tightens with the same drift: slightly faster output, slightly shorter settling pauses. Enough to be felt, not enough to read as a glitch or an accessibility failure.
- The player should first register that the machine is smoother, drier, less interested in them. Only later should they have language for complicity.

This is a formal version of the same rule as the afterimage: the form recruits first, then the content catches up.

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

Before boot, the machine should be legible as a machine, not just a dead rectangle. The cold-open affordance must stay diegetic, but legibility alone is not enough: the player should feel that the terminal is already there in low current, waiting. A standby field, a live cursor, and machine-language hints are better than explanatory copy. The first gesture should read as entering an already-live procedure, not as waking a blank webpage.

After case-016 is processed and the player powers off the machine, the power button goes permanently inert. The icon dims. The screen stays dark. No amount of clicking will bring it back.

The only way to restart is to refresh the page — an act that breaks the fiction. You are no longer operating within the system. You are starting a new shift from scratch, as if nothing happened.

This is the final move in the compliance arc: the system took your options one by one (3 → 2 → 1), then took the last thing you controlled — the power switch. The machine is done with you. It was always going to be done with you.

## Out of scope
- Save states (one sitting, like a shift)
- Achievements or scoring
- Multiple endings (there is one ending)

## Notes on scaling
The terminal is a fixed 800×600 element, not a responsive layout. CSS `transform: scale()` fits the entire CRT into the viewport proportionally — scaling up on large desktop screens, down on mobile. The CRT grows or shrinks as a physical object; it never reflows. On a 1920×1080 monitor the terminal fills most of the screen with large, readable text. On a phone it shrinks to fit — the same machine seen from further away. The font, scanlines, bezel, and all effects scale together.
