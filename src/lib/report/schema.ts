/**
 * Paid report data model.
 *
 * - `ReportContent` is what the AI writes: prose only, validated with zod.
 * - `CoreNumbers` (src/lib/numerology/core.ts) is calculated in code.
 * - `StoredReport` combines both and is what we save in the database.
 *
 * The AI fills content; the report template owns all design.
 */
import { z } from 'zod';
import type { CoreNumbers } from '@/lib/numerology/core';

const text = (description: string) => z.string().min(1).describe(description);

export const ReadingSectionSchema = z.object({
  title: text('An evocative editorial title for this section, 2 to 6 words, e.g. "The intuitive messenger" or "A climate of expression". Do not repeat the section name ("Your Birthday Number"), do not include the number, no emoji.'),
  essence: text('One short line (max ~15 words) capturing the essence of this section. Used on the section opener page.'),
  intro: text('Opening paragraph of 40 to 80 words that draws the reader in.'),
  paragraphs: z
    .array(text('One paragraph of flowing prose, 60 to 140 words.'))
    .min(1)
    .describe('The body of the section: 2 to 4 paragraphs, together at least 150 words.'),
  pullQuote: z
    .string()
    .describe('One memorable sentence (max ~25 words) taken or distilled from this section, shown large. Empty string if none.')
    .optional(),
  keyPoints: z
    .array(z.string())
    .describe('Optional 3 to 5 short phrases (max 6 words each, no numbers or dates): key qualities or, for the month, practical orientations. Empty array if none.')
    .optional(),
});

export const ReportContentSchema = z.object({
  birthday: ReadingSectionSchema.describe('YOUR BIRTHDAY NUMBER section.'),
  cycle: ReadingSectionSchema.describe('YOUR CURRENT LIFE CYCLE section.'),
  pinnacle: ReadingSectionSchema.describe('YOUR ACTIVE PINNACLE section.'),
  connection: ReadingSectionSchema.describe('THIS MOMENT: CYCLE MEETS PINNACLE section.'),
  month: ReadingSectionSchema.describe('THIS MONTH section. keyPoints = the 2 or 3 practical orientations.'),
  closing: z
    .object({
      title: text('An evocative title for the closing reflection, 2 to 6 words, e.g. "A chapter of trusted voice". Do not use the words "Current Chapter" or "Reflection".'),
      paragraphs: z.array(text('One paragraph, 60 to 140 words.')).min(1).describe('YOUR CURRENT CHAPTER: A REFLECTION, 2 to 4 paragraphs.'),
      carryWith: text('The single warm, memorable closing sentence the reader can carry with them, specific to their numbers.'),
    })
    .describe('YOUR CURRENT CHAPTER: A REFLECTION section.'),
});

export type ReadingSection = z.infer<typeof ReadingSectionSchema>;
export type ReportContent = z.infer<typeof ReportContentSchema>;

export const STORED_REPORT_VERSION = 2;

export type StoredReport = {
  version: typeof STORED_REPORT_VERSION;
  generatedAt: string; // ISO
  numbers: CoreNumbers;
  content: ReportContent;
};

/** Parses a stored report. Returns null for legacy (markdown) reports or invalid data. */
export function parseStoredReport(raw: string): StoredReport | null {
  if (!raw.trimStart().startsWith('{')) return null;
  try {
    const data = JSON.parse(raw);
    if (data?.version !== STORED_REPORT_VERSION) return null;
    const content = ReportContentSchema.safeParse(data.content);
    if (!content.success || !data.numbers) return null;
    return { ...data, content: content.data } as StoredReport;
  } catch {
    return null;
  }
}

/** Applies `fn` to every string in the content (used for source/dash guards). */
export function mapContentStrings(content: ReportContent, fn: (s: string) => string): ReportContent {
  const walk = (v: unknown): unknown => {
    if (typeof v === 'string') return fn(v);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, walk(x)]));
    return v;
  };
  return walk(content) as ReportContent;
}

/** All prose in the content joined, for checks such as word counts. */
export function contentText(content: ReportContent): string {
  const parts: string[] = [];
  mapContentStrings(content, (s) => {
    parts.push(s);
    return s;
  });
  return parts.join('\n');
}
