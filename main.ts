/**
 * loading-tip-entry1 — Loading Screen Gold: A Tip in 200 Characters.
 *
 * A single-file program for the make.fun program/v1 quest
 * u-ricoxyz-loading-screen-gold-a-tip-in-200-characters-2b1df270.
 *
 * The program writes exactly one loading-screen tip to /output/entry.txt.
 * The tip is aimed at stressed developers and AI coding agents at once:
 * the developer who swore never to touch one haunted function, and the
 * agent who touches it anyway, says you are welcome, and signs the
 * commit with the developer's name.
 *
 * The build is fully deterministic. No clock, no random source, no
 * network call, no file outside this repository is read. Two runs
 * produce byte-identical output, which the grader relies on.
 */

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TIP_OUTPUT_PATH = "/output/entry.txt";
const TIP_MAX_CHARS = 200;
const TIP_MIN_CHARS = 1;
const TIP_NEWLINE_MARKER = "\n";
const TIP_CARRIAGE_MARKER = "\r";
const TIP_DOUBLE_SPACE_MARKER = "  ";

/**
 * One named fragment of the final tip. Fragments join in array order,
 * so the tip reads as a single flowing sentence with a turn near its
 * tail and a punchline at its tail.
 */
interface TipFragment {
  slotName: string;
  wording: string;
  purposeNote: string;
}

/**
 * Outcome of the gate checks that run before any file is written.
 */
interface TipChecklist {
  passed: boolean;
  findings: string[];
}

/**
 * Measurements printed after a successful write, so a human reading
 * the run log can confirm the gate numbers without opening the file.
 */
interface TipMeasurements {
  charCount: number;
  byteCount: number;
  sha256Hex: string;
  lineCount: number;
  fragmentCount: number;
}

const TIP_FRAGMENTS: readonly TipFragment[] = [
  {
    slotName: "opener",
    wording: "Tip: ",
    purposeNote: "Marks the line as a loading-screen tip at first glance.",
  },
  {
    slotName: "deed",
    wording: "the AI refactored the function you swore never to touch, ",
    purposeNote: "Names the vow every tired developer has made to one haunted function.",
  },
  {
    slotName: "twist",
    wording: "left a comment saying 'you're welcome', ",
    purposeNote: "Turns the helper into a smug colleague with manners.",
  },
  {
    slotName: "signature",
    wording: "and signed the commit with your name.",
    purposeNote: "Punchline: the agent does the scary work and files it under you.",
  },
];

/**
 * Counts characters the way the gate counts them: one code point at a
 * time, so an astral character counts once, never twice.
 */
function countTipChars(candidateText: string): number {
  const codePoints = Array.from(candidateText);
  const charTotal = codePoints.length;
  return charTotal;
}

/**
 * Counts UTF-8 bytes, the number the leaderboard shows in its Size
 * column and the tie-break uses when two rates match exactly.
 */
function countTipBytes(candidateText: string): number {
  const byteTotal = Buffer.byteLength(candidateText, "utf8");
  return byteTotal;
}

/**
 * Fingerprints the tip so two runs can be compared without eyeballing.
 */
function foldTipHash(candidateText: string): string {
  const hasher = createHash("sha256");
  hasher.update(candidateText, "utf8");
  const digestHex = hasher.digest("hex");
  return digestHex;
}

/**
 * Joins the fragments in order into the single tip line. A missing
 * fragment table is a build bug, so it fails loudly here instead of
 * writing an empty file that the gate would refuse.
 */
function assembleLoadingTip(fragments: readonly TipFragment[]): string {
  const tablePresent = fragments.length > 0;
  if (tablePresent === false) {
    throw new Error("tip fragment table is empty, nothing to assemble");
  }
  const wordings = fragments.map((fragment) => fragment.wording);
  const assembledTip = wordings.join("");
  return assembledTip;
}

/**
 * Confirms the tip holds exactly one line: no newline, no carriage
 * return hiding inside the sentence.
 */
function checkSingleLine(candidateText: string): boolean {
  const newlineFound = candidateText.includes(TIP_NEWLINE_MARKER);
  const carriageFound = candidateText.includes(TIP_CARRIAGE_MARKER);
  const singleLine = newlineFound === false && carriageFound === false;
  return singleLine;
}

/**
 * Confirms the tip holds real words, not only spaces and punctuation.
 */
function checkMeaningfulText(candidateText: string): boolean {
  const trimmedText = candidateText.trim();
  const meaningful = trimmedText.length > 0;
  return meaningful;
}

/**
 * Confirms no doubled space slipped in where two fragments join, so
 * every word on the line earns its place on a loading screen.
 */
function checkTightSpacing(candidateText: string): boolean {
  const doubledFound = candidateText.includes(TIP_DOUBLE_SPACE_MARKER);
  const tightSpacing = doubledFound === false;
  return tightSpacing;
}

/**
 * Runs every gate rule the sealed scorer applies, collecting each
 * failed rule as a human-readable finding instead of stopping at the
 * first one, so a failed run explains itself fully.
 */
function validateAssembledTip(candidateText: string): TipChecklist {
  const findings: string[] = [];
  const charCount = countTipChars(candidateText);
  const shortEnough = charCount <= TIP_MAX_CHARS;
  if (shortEnough === false) {
    findings.push(`tip is ${charCount} characters, above the ${TIP_MAX_CHARS} cap`);
  }
  const longEnough = charCount >= TIP_MIN_CHARS;
  if (longEnough === false) {
    findings.push("tip is empty, below the 1 character floor");
  }
  const singleLine = checkSingleLine(candidateText);
  if (singleLine === false) {
    findings.push("tip spans more than one line");
  }
  const meaningful = checkMeaningfulText(candidateText);
  if (meaningful === false) {
    findings.push("tip holds only white space");
  }
  const tightSpacing = checkTightSpacing(candidateText);
  if (tightSpacing === false) {
    findings.push("tip holds a doubled space at a fragment join");
  }
  const passed = findings.length === 0;
  const checklist: TipChecklist = { passed, findings };
  return checklist;
}

/**
 * Measures the finished tip for the run log.
 */
function measureFinishedTip(candidateText: string): TipMeasurements {
  const charCount = countTipChars(candidateText);
  const byteCount = countTipBytes(candidateText);
  const sha256Hex = foldTipHash(candidateText);
  const lineCount = 1;
  const fragmentCount = TIP_FRAGMENTS.length;
  const measurements: TipMeasurements = { charCount, byteCount, sha256Hex, lineCount, fragmentCount };
  return measurements;
}

/**
 * Writes the tip to the grader output path, creating the output
 * folder when the sandbox starts without one.
 */
function writeTipEntry(candidateText: string): void {
  const outputFolder = dirname(TIP_OUTPUT_PATH);
  mkdirSync(outputFolder, { recursive: true });
  writeFileSync(TIP_OUTPUT_PATH, candidateText, "utf8");
}

/**
 * Reads the written file back and confirms it matches the tip byte
 * for byte, so a silent short write cannot slip past the run.
 */
function verifyWrittenTip(candidateText: string): boolean {
  try { const writtenText = readFileSync(TIP_OUTPUT_PATH, "utf8"); const matches = writtenText === candidateText; return matches; } catch (readFailure) {
    const failureMessage = readFailure instanceof Error ? readFailure.message : String(readFailure);
    throw new Error(`read-back of ${TIP_OUTPUT_PATH} failed: ${failureMessage}`);
  }
}

/**
 * Prints one compact diagnostic block to standard output.
 */
function reportTipOutcome(candidateText: string, measurements: TipMeasurements): void {
  console.log(`tip: ${candidateText}`);
  console.log(`chars: ${measurements.charCount}`);
  console.log(`bytes: ${measurements.byteCount}`);
  console.log(`sha256: ${measurements.sha256Hex}`);
  console.log(`lines: ${measurements.lineCount}`);
  console.log(`fragments: ${measurements.fragmentCount}`);
  console.log(`wrote: ${TIP_OUTPUT_PATH}`);
}

/**
 * Orchestrates the run: assemble, gate, write, verify, report.
 */
function main(): void {
  const assembledTip = assembleLoadingTip(TIP_FRAGMENTS);
  const checklist = validateAssembledTip(assembledTip);
  if (checklist.passed === false) {
    const joinedFindings = checklist.findings.join("; ");
    throw new Error(`tip failed the gate: ${joinedFindings}`);
  }
  writeTipEntry(assembledTip);
  const verified = verifyWrittenTip(assembledTip);
  if (verified === false) {
    throw new Error(`read-back mismatch at ${TIP_OUTPUT_PATH}`);
  }
  const measurements = measureFinishedTip(assembledTip);
  reportTipOutcome(assembledTip, measurements);
}

main();
