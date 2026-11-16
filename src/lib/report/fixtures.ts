/**
 * Sample reports for the design preview (/report-preview). No AI involved.
 *   normal  : typical length and all optional fields present
 *   long    : very long titles, quotes, paragraphs and lists (stress test)
 *   minimal : optional fields missing, one short paragraph per section
 */
import { calculateCoreNumbers } from '@/lib/numerology/core';
import { STORED_REPORT_VERSION, type ReportContent, type StoredReport } from './schema';

const NOW = new Date('2026-11-16T10:00:00Z');

const normal: ReportContent = {
  birthday: {
    title: 'The intuitive messenger',
    essence: 'An inner antenna that hears what others only sense.',
    intro:
      'Born on the 29th, you carry the Birthday Number 11, a master number long associated in numerological tradition with intuition, sensitivity and inspiration. It tends to soften the bold, pioneering drive of your Life Path 1 with a quieter, receptive intelligence.',
    paragraphs: [
      'Many people with this birthday find that they notice the emotional weather of a room before anyone speaks. That sensitivity can feel like a burden in loud seasons of life, yet it often becomes the very thing that lets you lead with unusual tact. Where a Life Path 1 alone might push ahead, the 11 invites you to listen first and then move with precision.',
      'In numerological tradition the 11 is sometimes called the messenger: someone who translates impressions into words, images or decisions that others can use. You might notice that ideas arrive to you whole, as if from somewhere just outside thought. This quality often shows up as creativity, as a talent for timing, or as a gift for encouraging people at exactly the right moment.',
      'The invitation of this number is trust. The more you treat your quieter knowing as real information, the more naturally your leadership becomes something people want to follow rather than something you have to assert.',
    ],
    pullQuote: 'Listen first, then move with precision: your quiet knowing is real information.',
    keyPoints: ['Intuitive timing', 'Emotional perceptiveness', 'Inspiring others', 'Translating ideas into action'],
  },
  cycle: {
    title: 'The productive middle season',
    essence: 'A long chapter for building what your intuition has shown you.',
    intro:
      'You are moving through your Second Life Cycle, the productive phase that runs from age 26 to 53. Its number is 11, the same master vibration as your birthday, which tends to amplify themes of vision, sensitivity and purpose during these central years.',
    paragraphs: [
      'The productive cycle is often where people turn early experiments into lasting work. With an 11 coloring this phase, that work may carry an inspirational or creative thread: teaching, guiding, designing, or simply being the person others come to for perspective.',
      'Because the 11 heightens sensitivity, this season may also ask you to protect your energy more deliberately than before. Rest, solitude and beauty are not luxuries in this phase; they are part of how the work gets done.',
      'There can be creative friction between the independent 1 of your Life Path and the receptive 11 of this cycle. Many people find that this tension becomes a strength once they stop choosing between them: lead, and stay open.',
    ],
    pullQuote: 'Rest, solitude and beauty are not luxuries in this season; they are part of the work.',
    keyPoints: ['Building lasting work', 'Protecting your energy', 'Leading while staying open'],
  },
  pinnacle: {
    title: 'A climate of expression',
    essence: 'Nine years in which creativity and connection come easily.',
    intro:
      'Since 2025 you have been living under your Second Pinnacle, a 3, which runs until around 2034. If the Life Cycle is the road, the Pinnacle is the weather, and a 3 Pinnacle tends to bring a lighter, more expressive climate.',
    paragraphs: [
      'The 3 is associated with communication, creativity and joy. During a 3 Pinnacle many people find that conversations open doors, that creative projects gain momentum, and that a wider social circle forms almost without effort.',
      'After a First Pinnacle of 9, which often carries themes of completion and release, this shift can feel like stepping from a long, reflective autumn into an unexpectedly bright spring. It may be worth noticing where you still hold yourself back out of old habits of seriousness.',
    ],
    pullQuote: 'If the cycle is the road, this pinnacle is a bright, open sky.',
    keyPoints: ['Communication', 'Creative momentum', 'Social warmth'],
  },
  connection: {
    title: 'Where depth meets lightness',
    essence: 'A sensitive road under an expressive sky.',
    intro:
      'Right now your 11 Life Cycle and your 3 Pinnacle are in dialogue. The 11 asks for depth and meaning; the 3 asks for expression and play. Together they suggest a period in which what you feel deeply wants to be shared.',
    paragraphs: [
      'Many people with this combination find that their most meaningful work is also their most playful. Writing, speaking, making or mentoring may feel less like obligations and more like natural outlets for insight that has been gathering for years.',
      'One practical framing: let the 11 choose what matters, and let the 3 decide how it is said. Depth gives your expression substance; lightness makes it easy for others to receive.',
    ],
    pullQuote: 'Let depth choose what matters, and let lightness decide how it is said.',
    keyPoints: ['Share what you feel deeply', 'Choose substance, deliver lightly'],
  },
  month: {
    title: 'A month to speak up',
    essence: 'November carries the voice of the 3.',
    intro:
      'November 2026 is a 3 Personal Month inside your 1 Personal Year. The year is about beginnings; this month adds a layer of expression, visibility and connection to those beginnings.',
    paragraphs: [
      'This tends to be a good month to share an idea you have been developing quietly, to reach out to people you would like to collaborate with, or to give a new project a name and a voice.',
      'The 3 can also scatter attention. If you notice yourself saying yes to everything, it may help to return to the one beginning that matters most this year and let the month serve that.',
    ],
    pullQuote: '',
    keyPoints: ['Share one idea publicly', 'Reach out to a potential collaborator', 'Protect your main beginning from distraction'],
  },
  closing: {
    title: 'A chapter of trusted voice',
    paragraphs: [
      'Taken together, your numbers describe someone at an intersection of independence and sensitivity, now living in a season where expression comes more easily than it ever has. The intuition of the 11 has had years to mature; the 3 Pinnacle offers it a voice.',
      'This period seems to invite you to trust what you already know and to let it be seen. Not perfectly, not all at once, but steadily, in the way a 1 begins things: by taking the first step before the path is fully visible.',
    ],
    carryWith: 'What you sense quietly is ready to be spoken: begin, and let your voice find its way.',
  },
};

const LONG = (s: string, times = 3) => Array.from({ length: times }, () => s).join(' ');

const long: ReportContent = {
  ...normal,
  birthday: {
    ...normal.birthday,
    title: 'The intuitive messenger who translates quiet impressions into decisions others can act on',
    essence: 'An inner antenna that hears what others only sense, and a lifelong invitation to trust that quieter knowing as real, usable information in every area of life.',
    intro: LONG(normal.birthday.intro, 2),
    paragraphs: [...normal.birthday.paragraphs, LONG(normal.birthday.paragraphs[0], 2), LONG(normal.birthday.paragraphs[1], 2)],
    pullQuote: LONG('Listen first, then move with precision: your quiet knowing is real information that deserves a place in every decision you make.', 2),
    keyPoints: [
      'Intuitive timing that often arrives before the facts do',
      'Emotional perceptiveness in groups and one to one',
      'Inspiring others through example rather than instruction',
      'Translating abstract ideas into practical action',
      'A gift for encouragement at exactly the right moment',
    ],
  },
  cycle: {
    ...normal.cycle,
    pullQuote: LONG('Rest, solitude and beauty are not luxuries in this season; they are part of how the work gets done, and part of who you are becoming.', 2),
    paragraphs: [...normal.cycle.paragraphs, LONG(normal.cycle.paragraphs[0], 3)],
  },
  connection: {
    ...normal.connection,
    essence: LONG('A sensitive road under an expressive sky, where depth and lightness learn to work together.', 2),
  },
  closing: {
    ...normal.closing,
    paragraphs: [...normal.closing.paragraphs, LONG(normal.closing.paragraphs[0], 2)],
    carryWith: LONG('What you sense quietly is ready to be spoken: begin, and let your voice find its way.', 2),
  },
};

const minimal: ReportContent = {
  birthday: { title: 'The intuitive messenger', essence: 'Quiet knowing.', intro: normal.birthday.intro, paragraphs: [normal.birthday.paragraphs[0]] },
  cycle: { title: 'The productive season', essence: 'Building.', intro: normal.cycle.intro, paragraphs: [normal.cycle.paragraphs[0]] },
  pinnacle: { title: 'Expression', essence: 'A bright sky.', intro: normal.pinnacle.intro, paragraphs: [normal.pinnacle.paragraphs[0]] },
  connection: { title: 'Depth meets lightness', essence: 'Dialogue.', intro: normal.connection.intro, paragraphs: [normal.connection.paragraphs[0]] },
  month: { title: 'Speak up', essence: 'Voice.', intro: normal.month.intro, paragraphs: [normal.month.paragraphs[0]], pullQuote: '', keyPoints: [] },
  closing: { title: 'Trusted voice', paragraphs: [normal.closing.paragraphs[0]], carryWith: 'Begin.' },
};

function stored(content: ReportContent, birthDate = '1990-07-29'): StoredReport {
  return {
    version: STORED_REPORT_VERSION,
    generatedAt: NOW.toISOString(),
    numbers: calculateCoreNumbers(birthDate, NOW),
    content,
  };
}

export const REPORT_FIXTURES = {
  normal: stored(normal),
  long: stored(long, '1982-11-25'),
  minimal: stored(minimal, '1940-01-05'),
} as const;

export type FixtureName = keyof typeof REPORT_FIXTURES;
