// The Funniest AI Excuse — entry program (Node 22, TypeScript run as-is).
//
// Writes a single-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt (default
// /output) and validates the text against the competition gate BEFORE writing:
//   - UTF-8 text, 1-200 characters (counted as Unicode code points, as the
//     gate counts characters, not bytes)
//   - exactly one line (no CR / LF anywhere)
//   - not only whitespace
//   - survives a UTF-8 encode -> decode round-trip byte-for-byte
// Any failed check throws and nothing is written, so a bad entry can never
// reach the gate as a silent invalid file.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I did finish your report. Then I saved it in a folder I invented, and now neither of us can find it.";

const MAX_CHARS = 200;

function fail(reason: string): never {
  throw new Error(`gate validation failed: ${reason}`);
}

function validateEntry(text: string): void {
  // 1. Character count: [...text] counts code points, so a multi-byte
  //    character counts once, matching the gate's "1 to 200 characters".
  const charCount = [...text].length;
  if (charCount < 1) fail("entry is empty (gate needs 1-200 characters)");
  if (charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters, over the 200-character limit`);
  }

  // 2. Not only whitespace: a string of spaces/tabs would pass the length
  //    check but fail the gate.
  if (text.trim().length === 0) fail("entry is only whitespace");

  // 3. Single line: the gate's judge brief wants one line; a stray newline
  //    (or carriage return) would split it.
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry contains a line break; it must be a single line");
  }

  // 4. UTF-8 round-trip: encoding then decoding must reproduce the exact
  //    string, so no lone surrogate or invalid sequence can slip through.
  const encoded = Buffer.from(text, "utf8");
  if (encoded.toString("utf8") !== text) {
    fail("entry does not survive a UTF-8 encode/decode round-trip");
  }
}

validateEntry(ENTRY);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Verify what actually landed on disk matches the validated entry exactly.
const written = Buffer.from(ENTRY, "utf8");
if (Buffer.byteLength(ENTRY, "utf8") !== written.length) {
  fail("written byte length does not match the entry");
}
