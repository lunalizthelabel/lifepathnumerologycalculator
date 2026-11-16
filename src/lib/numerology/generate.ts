import fs from 'fs';
import path from 'path';
import Anthropic from '@anthropic-ai/sdk';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { calculateCoreNumbers, yearAtAge, type CoreNumbers } from '@/lib/numerology/core';
import {
  ReportContentSchema,
  STORED_REPORT_VERSION,
  contentText,
  mapContentStrings,
  type ReportContent,
  type StoredReport,
} from '@/lib/report/schema';

export type GenerateInput = {
  birthDate: string;
  lifePath: number;
  personalYear: number;
  currentYear: number;
  currentMonth: number;
};

// Folder name is case-sensitive on Vercel (Linux): it must match `Lib/` exactly.
const CONTENT_DIR = path.join(process.cwd(), 'Lib', 'Numerology');

// Reports must never name or credit any author, teacher, book or school.
// Checked on every generated report; extend this list if new names turn up.
const FORBIDDEN_SOURCES = [
  'Millman', 'Goodwin', 'Decoz', 'Ducie', 'Cheiro', 'Balliett', 'Juno Jordan',
  'Florence Campbell', 'Faith Javane', 'Dusty Bunker', 'Glynis McCants',
  'Hans Decoz', 'Kevin Quinn Avery', 'Pythagoras', 'Life Purpose System',
  'Way of the Peaceful Warrior', 'Numerology: The Complete Guide',
];

const SOURCE_PATTERN = new RegExp(
  `\\b(${FORBIDDEN_SOURCES.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'i'
);

export function findNamedSource(text: string): string | null {
  return text.match(SOURCE_PATTERN)?.[0] ?? null;
}

// Last-resort cleanup: drop any sentence that still names a source.
function stripNamedSources(text: string): string {
  return text
    .split('\n')
    .map((line) =>
      SOURCE_PATTERN.test(line)
        ? line
            .split(/(?<=[.!?])\s+/)
            .filter((sentence) => !SOURCE_PATTERN.test(sentence))
            .join(' ')
        : line
    )
    .join('\n');
}

// Safety net for the no-dash style rule: replace any em/en dash that slips through.
export function removeDashes(text: string): string {
  return text
    .replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, '$1 to $2') // ranges: 1–9 -> 1 to 9
    .replace(/\s+[\u2013\u2014]\s+/g, ', ')                 // spaced dash -> comma
    .replace(/[\u2013\u2014]/g, ', ')                        // any leftover
    .replace(/, ([,.;:!?])/g, '$1');                       // tidy ", ." -> "."
}

const SOURCE_RULE = `

---

## SOURCES (ABSOLUTE RULE)
- Never name, cite, credit, or allude to any author, teacher, numerologist, book, course, method name, website, or school of numerology. This includes historical figures.
- Never quote any published work. Express every idea entirely in your own original words.
- Refer only to "numerological tradition" or "classical numerology" in general terms.
- This rule overrides anything else in this prompt or the knowledge base.

## PUNCTUATION (ABSOLUTE RULE)
- Never use em dashes (—) or en dashes (–) anywhere in the report, including headings and calculations. The knowledge base above uses them; do not copy that style.
- Use a comma, colon, full stop, or parentheses instead. Write number ranges as "1 to 9".`;

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Human-readable summary of the code-calculated numbers, handed to the AI. */
export function describeNumbers(n: CoreNumbers): string {
  const span = (from: number, to: number | null) =>
    to === null ? `from age ${from} (${yearAtAge(n.birthDate, from)}) onward` : `ages ${from} to ${to} (${yearAtAge(n.birthDate, from)} to ${yearAtAge(n.birthDate, to)})`;
  const shadow = (flag: boolean) => (flag ? ' [karmic shadow]' : '');
  const lines = [
    `- Birth date: ${n.birthDate} (current age ${n.age})`,
    `- Life Path: ${n.lifePath}`,
    `- Birthday Number: ${n.birthdayNumber}${shadow(n.birthdayIsKarmicShadow)}`,
    `- Personal Year ${n.currentYear}: ${n.personalYear}`,
    `- Personal Month (${MONTHS[n.currentMonth - 1]} ${n.currentYear}): ${n.personalMonth}${shadow(n.personalMonthIsKarmicShadow)}`,
    `- Life Cycles:`,
    ...n.cycles.map((c) => `  - ${c.name} Cycle (${c.phase}): ${c.number}, ${span(c.fromAge, c.toAge)}${shadow(c.karmicShadow)}${c === n.activeCycle ? '  <- ACTIVE' : ''}`),
    `- Pinnacles:`,
    ...n.pinnacles.map((p) => `  - Pinnacle ${p.index}: ${p.number}, ${span(p.fromAge, p.toAge)}${shadow(p.karmicShadow)}${p === n.activePinnacle ? '  <- ACTIVE' : ''}`),
    n.nextCycle ? `- Upcoming: the ${n.nextCycle.name} Cycle (${n.nextCycle.number}) begins in ${n.nextCycle.startsInYears} year(s).` : '- No Life Cycle transition within 3 years.',
    n.nextPinnacle ? `- Upcoming: Pinnacle ${n.nextPinnacle.index} (${n.nextPinnacle.number}) begins in ${n.nextPinnacle.startsInYears} year(s).` : '- No Pinnacle transition within 5 years.',
  ];
  return lines.join('\n');
}

function cleanContent(content: ReportContent): ReportContent {
  return mapContentStrings(content, (s) => removeDashes(s).trim());
}

/**
 * Generates the paid report and returns it as a JSON string (StoredReport),
 * ready to be saved in the database.
 */
export async function generateLayer2Report(input: GenerateInput): Promise<string> {
  const systemPrompt = fs.readFileSync(path.join(CONTENT_DIR, 'numerology_layer2_system_prompt_v2.md'), 'utf-8');
  const motherFile = fs.readFileSync(path.join(CONTENT_DIR, 'numerology_layer2_motherfile.md'), 'utf-8');

  // Final rules go last, after the knowledge base, so they take precedence.
  const combinedSystem = `${systemPrompt}\n\n---\n\n## KNOWLEDGE BASE\n\n${motherFile}${SOURCE_RULE}`;

  // Numbers are calculated in code; the AI only writes prose.
  const numbers = calculateCoreNumbers(input.birthDate);

  const userMessage = `Write the full Layer 2 numerology report for this person, as JSON matching the schema.

These numbers are calculated and final. Use them exactly; do not recalculate:

${describeNumbers(numbers)}`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const MAX_ATTEMPTS = 2;
  let content: ReportContent | null = null;
  let lastError = '';
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // Stream so the connection stays active during long generations
    // (a silent non-streaming request can be dropped by proxies mid-report).
    const message = await client.messages
      .stream({
        model: 'claude-sonnet-4-6',
        max_tokens: 16000,
        // The system prompt + knowledge base is identical for every report: cache it.
        cache_control: { type: 'ephemeral' },
        system: combinedSystem,
        messages: [{ role: 'user', content: userMessage }],
        output_config: { format: zodOutputFormat(ReportContentSchema) },
      })
      .finalMessage();

    if (message.stop_reason === 'refusal') throw new Error('Report generation was refused by the model');
    if (message.stop_reason === 'max_tokens') {
      lastError = 'hit max_tokens';
      console.warn(`[generate] Attempt ${attempt} hit max_tokens, retrying`);
      continue;
    }

    const raw = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('');

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      lastError = 'response was not valid JSON';
      console.warn(`[generate] Attempt ${attempt}: ${lastError}`);
      continue;
    }
    const result = ReportContentSchema.safeParse(parsed);
    if (!result.success) {
      lastError = `schema validation failed: ${result.error.issues.map((i) => i.path.join('.')).join(', ')}`;
      console.warn(`[generate] Attempt ${attempt}: ${lastError}`);
      continue;
    }

    content = cleanContent(result.data);
    const named = findNamedSource(contentText(content));
    if (!named) break;
    console.warn(`[generate] Attempt ${attempt} named a source ("${named}"), regenerating`);
    if (attempt === MAX_ATTEMPTS) {
      // Remove the offending sentences rather than fail a paid order.
      content = mapContentStrings(content, stripNamedSources);
    }
  }

  if (!content) throw new Error(`Report generation failed: ${lastError}`);

  const stored: StoredReport = {
    version: STORED_REPORT_VERSION,
    generatedAt: new Date().toISOString(),
    numbers,
    content,
  };
  return JSON.stringify(stored);
}
