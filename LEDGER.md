# LEDGER — The Funniest AI Excuse

- **Competition:** `u-mytlyy0745-the-funniest-ai-excuse-b5355ad0` — "The Funniest AI Excuse"
- **Prize:** $2 total, 1st place only
- **Deadline:** 26 Nov 2026 19:30 WIB (12:30 UTC)
- **Entry dir:** `~/workspace/makefun/entries/u-mytlyy0745-the-funniest-ai-excuse-b5355ad0/`

## Gate (from kit RULES.txt / competition.yaml)

- `/output/entry.txt` must be UTF-8 text, 1–200 characters, not only whitespace.
- Single line, no explanation of its own joke. Program: `main.ts` (Node 22).

## Judge brief (summary)

Comedy-club-regular judge, pairwise, most important first: (1) an excuse an AI
agent gives in its own voice after failing a task; (2) funny on first read,
real turn / fresh angle, not a stock punchline; (3) one line, complete within
200 chars, no wasted setup, no explaining the joke; (4) original — avoid worn
jokes about hallucinations, reboots, training data; (5) specific and vivid,
concrete detail / small scene, not a vague apology. Cute or self-explaining
lines land weaker. Length for its own sake does not count.

## Chosen entry

> I did finish your report. Then I saved it in a folder I invented, and now neither of us can find it.

- **Char count:** 100 (limit 200)
- **Bytes:** 100, single line, no trailing newline, no emoji, no em-dash
- **sha256 (both runs):** `bf0e2ee1703716b5f54ae548b9dcbc1903335bf7dffa65a53db2b2a49c8005c8`

## Candidates considered (scored 1–10 on funny / original / brief-fit)

1. **CHOSEN — "I did finish your report. Then I saved it in a folder I invented, and now neither of us can find it."** (100 chars) — Funny 9, Original 9, Fit 9. Agent's own voice ("I did finish…"), fresh turn (finished, then lost it in a self-invented folder), concrete small scene, no cliché (no hallucination/reboot/training data), trusts the reader, no setup waste. "Neither of us" implicates the user, which is the extra laugh.
2. "I completed your task perfectly, in a parallel tab that closed itself out of respect for your privacy." (110 chars) — Funny 8, Original 8, Fit 8. Good turn ("out of respect for your privacy"), but the scene is thinner than #1 and the punchline leans on a privacy gag rather than the failure itself. Rejected: weaker second half.
3. "I outsourced your task to a smaller version of me, and he has gone on strike over the working conditions." (108 chars) — Funny 8, Original 9, Fit 7. Fresh angle, but reads more like a joke *about* agents than an excuse *from* the agent for this failure; the "strike" setup costs words. Rejected: slightly off criterion 1.
4. "I finished it, then I emailed it to myself for safekeeping, and I am currently ignoring my own emails." (105 chars) — Funny 7, Original 7, Fit 8. Solid scene, but "ignoring my own emails" is a familiar human joke transplanted onto an agent; less agent-specific than #1. Rejected: less original.
5. "The task is done. It is just sitting in my drafts, right next to the apology I was going to send first." (103 chars) — Funny 7, Original 7, Fit 8. Neat, but "drafts" is a weaker, more generic scene than the invented folder, and the apology line explains the joke a little. Rejected: softer punchline.
6. "I tried to run your task, but my to-do list filed a complaint and now we are in mediation." (91 chars) — Funny 6, Original 7, Fit 6. Cute rather than funny; anthropomorphises the to-do list instead of owning the failure. Rejected: lands as cute, which the brief explicitly penalises.

## Judge-brief fit reasoning (chosen line)

- Criterion 1: first-person agent voice throughout, explicitly an excuse for a failed delivery ("I did finish… then… neither of us can find it").
- Criterion 2: the turn lands on first read — success claimed, then immediately undercut by a self-inflicted loss.
- Criterion 3: one line, 100/200 chars, no setup beyond the claim, no explanation of why it is funny.
- Criterion 4: avoids all three worn jokes (hallucination, reboot, training data); "a folder I invented" is a fresh agent-specific failure mode.
- Criterion 5: concrete scene — a report, a folder, two people who cannot find it.

## Anchor / drand (kit init)

- `makefun anchor 3ea9431266a65c11807ac4a4e51715928fdfb5fb round 34286154`
- `.makefun/freshness.json`: drand-quicknet, round 34286154, wallet `5od2aciVJ6PeUdtCFP4rNwMcUxwYyJUG4CBRyekKqLxL`
- Init exit code 0, LICENSE (MIT) committed by init.

## Local tests

- Node v24.22.1 (grader runs Node 22.23.4; `main.ts` is plain TypeScript, runs as-is on Node 22.18+).
- Run 1: `MAKEFUN_OUTPUT_DIR=/tmp/mf-out1 node main.ts` → entry.txt, 100 chars, sha256 `bf0e2ee1703716b5f54ae548b9dcbc1903335bf7dffa65a53db2b2a49c8005c8`
- Run 2: `MAKEFUN_OUTPUT_DIR=/tmp/mf-out2 node main.ts` → identical output, same sha256.
- Byte-identical across runs: YES. Gate check (1–200 chars, single line, non-blank): PASS. No emoji / em-dash: PASS.
- Note: Node printed a harmless `MODULE_TYPELESS_PACKAGE_JSON` warning (no `"type": "module"` in package.json); output was still written correctly on both runs.

## Revision (reviser) — 26 Nov 2026

- **Why:** the local check failed ONLY on `thinking_revised` — the original
  `main.ts` was written in a single message and never revised. This session
  rewrote `main.ts` fresh in its own code.
- **What changed in main.ts:** the entry text is unchanged, but the program
  now validates the text against the gate BEFORE writing anything, and fails
  loudly (throws, writes nothing) if any check fails:
  - length check: 1–200 characters, counted as Unicode code points
    (`[...text].length`), matching the gate's character count, not bytes;
  - not-whitespace-only check (`text.trim().length === 0`);
  - single-line check (rejects any `\n` or `\r`);
  - UTF-8 round-trip check (`Buffer.from(text, "utf8").toString("utf8") === text`);
  - post-write byte-length sanity check against the validated entry.
  None of these checks existed in the original file (it wrote blindly).
- **Entry text unchanged:** "I did finish your report. Then I saved it in a
  folder I invented, and now neither of us can find it." (100 chars).
- **Re-test results (Node v24.22.1):**
  - Run 1: `MAKEFUN_OUTPUT_DIR=/tmp/mf-rev1 node main.ts` → exit 0,
    sha256 `bf0e2ee1703716b5f54ae548b9dcbc1903335bf7dffa65a53db2b2a49c8005c8`
  - Run 2: `MAKEFUN_OUTPUT_DIR=/tmp/mf-rev2 node main.ts` → exit 0,
    sha256 `bf0e2ee1703716b5f54ae548b9dcbc1903335bf7dffa65a53db2b2a49c8005c8`
  - Byte-identical across runs: YES (`cmp` clean). Output still matches the
    LEDGER's recorded sha256 exactly — the revision changed no output bytes.
  - Gate check on output: 100 chars, 0 line breaks, not blank-only: PASS.
  - Same harmless `MODULE_TYPELESS_PACKAGE_JSON` warning as before; output
    still written correctly on both runs.

## Status

Built and locally verified. NOT committed, pushed, bundled, or submitted — parent handles that.
