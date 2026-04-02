export type NumberMeaning = {
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
  hook: string;
  coreWound: string;
};

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    name: 'The Leader',
    tagline: 'Independence, ambition, pioneering spirit.',
    description:
      'You are here to develop independence and self-reliance. Life path 1s are natural leaders — original thinkers who prefer to forge their own path rather than follow the crowd. Your greatest challenge is overcoming self-doubt and the fear of standing alone. Your greatest gift is the courage to begin.',
    strengths: ['Self-motivated', 'Original', 'Decisive', 'Courageous'],
    challenges: ['Stubbornness', 'Impatience', 'Difficulty delegating'],
    hook: 'You were built to lead — but the real question is whether you\'re leading your own life, or still waiting for permission.',
    coreWound: 'The fear that standing alone means being abandoned.',
  },
  2: {
    name: 'The Diplomat',
    tagline: 'Cooperation, sensitivity, intuitive harmony.',
    description:
      'You are here to learn the art of cooperation and patience. Life path 2s possess a rare emotional intelligence and an instinct for what others need. You thrive in partnership and bring calm to conflict. Your challenge is to assert your own needs without guilt, and to trust your deep intuition.',
    strengths: ['Empathetic', 'Diplomatic', 'Intuitive', 'Detail-oriented'],
    challenges: ['Over-sensitivity', 'Indecisiveness', 'Difficulty saying no'],
    hook: 'You feel everything — including things other people don\'t even notice. That\'s not a weakness. It\'s your most powerful instrument.',
    coreWound: 'The belief that your needs matter less than everyone else\'s.',
  },
  3: {
    name: 'The Creator',
    tagline: 'Self-expression, creativity, joy.',
    description:
      'You are here to express yourself fully and inspire others through creativity. Life path 3s are gifted communicators who carry an infectious enthusiasm. Your challenge is focus: the same expansive energy that fuels your creativity can scatter your efforts if undisciplined.',
    strengths: ['Creative', 'Charismatic', 'Optimistic', 'Expressive'],
    challenges: ['Scattered focus', 'Superficiality', 'Emotional moodiness'],
    hook: 'Every room changes when you walk in — and most people can\'t explain why. You were born to move people.',
    coreWound: 'The fear that your full self — when truly expressed — will be too much.',
  },
  4: {
    name: 'The Builder',
    tagline: 'Discipline, structure, lasting foundations.',
    description:
      'You are here to build — systems, families, institutions, legacies. Life path 4s work methodically, value honesty, and earn trust through consistent action. Your challenge is rigidity: the same discipline that makes you reliable can make you resistant to necessary change.',
    strengths: ['Reliable', 'Hardworking', 'Practical', 'Honest'],
    challenges: ['Rigidity', 'Stubbornness', 'Resistance to change'],
    hook: 'While everyone else talks, you build. The world runs on people like you — it just rarely says so.',
    coreWound: 'The suspicion that no matter how much you do, it will never be enough.',
  },
  5: {
    name: 'The Free Spirit',
    tagline: 'Freedom, adaptability, dynamic change.',
    description:
      'You are here to experience the full spectrum of life. Life path 5s are natural adventurers — curious, adaptable, and magnetically alive. You learn through direct experience. Your challenge is commitment: the same love of freedom that energises you can prevent you from going deep.',
    strengths: ['Adaptable', 'Curious', 'Charismatic', 'Versatile'],
    challenges: ['Restlessness', 'Inconsistency', 'Fear of commitment'],
    hook: 'You\'ve always felt slightly too big for whatever container you\'re in. That\'s not a flaw — that\'s data.',
    coreWound: 'The terror that committing to one thing means losing everything else.',
  },
  6: {
    name: 'The Nurturer',
    tagline: 'Responsibility, care, deep compassion.',
    description:
      'You are here to serve, nurture, and create harmony in your sphere. Life path 6s feel a deep sense of responsibility for those they love. You are steady, caring, and wise. Your challenge is perfectionism and the tendency to take on others\u2019 problems as your own.',
    strengths: ['Compassionate', 'Responsible', 'Loyal', 'Healing presence'],
    challenges: ['Perfectionism', 'Self-sacrifice', 'Difficulty receiving'],
    hook: 'People come to you with their problems — always have, always will. The question is who you go to with yours.',
    coreWound: 'The belief that love must be earned through endless giving.',
  },
  7: {
    name: 'The Seeker',
    tagline: 'Introspection, wisdom, spiritual depth.',
    description:
      'You are here to seek truth. Life path 7s are driven by a relentless need to understand what lies beneath the surface. You need solitude to function at your best. Your challenge is isolation: the mind that seeks truth can also build walls that keep others out.',
    strengths: ['Analytical', 'Introspective', 'Perceptive', 'Spiritually aware'],
    challenges: ['Isolation', 'Scepticism', 'Difficulty trusting others'],
    hook: 'You have always known there\'s something more — something most people can\'t see or aren\'t looking for. You\'re looking.',
    coreWound: 'The loneliness of understanding things that are difficult to share.',
  },
  8: {
    name: 'The Strategist',
    tagline: 'Ambition, authority, material mastery.',
    description:
      'You are here to master the material world — business, finance, leadership. Life path 8s are natural executives with a commanding presence and an instinct for strategy. Your challenge is balance: the drive for achievement can overshadow relationships and inner life.',
    strengths: ['Ambitious', 'Authoritative', 'Strategic', 'Resilient'],
    challenges: ['Workaholism', 'Materialism', 'Difficulty with vulnerability'],
    hook: 'You think in outcomes. You see the board differently from most people. That power comes with a responsibility most never have to face.',
    coreWound: 'The equation of worth with achievement — and the quiet emptiness when the achievement arrives.',
  },
  9: {
    name: 'The Humanitarian',
    tagline: 'Completion, wisdom, universal service.',
    description:
      'You are here to serve something larger than yourself. Life path 9s carry a deep well of compassion and feel the pain of the world acutely. Your challenge is letting go — of people, outcomes, and the past.',
    strengths: ['Compassionate', 'Wise', 'Idealistic', 'Generous'],
    challenges: ['Difficulty letting go', 'Martyrdom', 'Emotional intensity'],
    hook: 'You carry the weight of the world more than anyone realises — including you. But you were made for it.',
    coreWound: 'Holding on long after it\'s time to release — people, identities, pain.',
  },
  11: {
    name: 'The Visionary',
    tagline: 'Master number \u2014 heightened intuition and idealism.',
    description:
      'Master number 11 is the most intuitive of all life paths. You perceive what others cannot see and carry a quiet knowing that defies explanation. You are here to inspire through insight. Your challenge is grounding that vision into practical reality.',
    strengths: ['Highly intuitive', 'Inspiring', 'Idealistic', 'Perceptive'],
    challenges: ['Nervous energy', 'Impracticality', 'Emotional overwhelm'],
    hook: 'You are one of fewer than 5% of people born with a Master Number. What you carry is rare — and it comes with a weight most people never have to hold.',
    coreWound: 'The gap between the vision and the reality — and the fear you will never close it.',
  },
  22: {
    name: 'The Master Builder',
    tagline: 'Master number \u2014 turning dreams into reality at scale.',
    description:
      'Master number 22 is the most powerful of all life paths. You have the vision of the 11 and the discipline of the 4, enabling you to manifest extraordinary things. Your challenge is the weight of that potential \u2014 the gap between what you sense you could achieve and what you have built so far.',
    strengths: ['Visionary', 'Disciplined', 'Capable of large-scale impact', 'Grounded'],
    challenges: ['Overwhelm', 'Self-doubt', 'Taking on too much'],
    hook: 'You are one of fewer than 5% of people born with a Master Number. You came here to build something that outlasts you — and somewhere, you\'ve always known it.',
    coreWound: 'The crushing weight of potential — and the fear of failing at the scale you were meant for.',
  },
  33: {
    name: 'The Master Teacher',
    tagline: 'Master number \u2014 compassionate wisdom and healing.',
    description:
      'Master number 33 is exceptionally rare. You carry the nurturing of the 6, the vision of the 11, and the building capacity of the 22 \u2014 synthesised into a life of devoted service. Your challenge is self-sacrifice: giving so completely to others that you neglect your own foundation.',
    strengths: ['Deeply compassionate', 'Healing presence', 'Wise teacher', 'Selfless'],
    challenges: ['Self-neglect', 'Martyrdom', 'Carrying others\u2019 burdens'],
    hook: 'Life path 33 is the rarest number in numerology. If this is yours, you were not born for a small life — you were born to change the people around you, permanently.',
    coreWound: 'Disappearing into service — and one day realising you no longer know who you are without it.',
  },
};

export const PERSONAL_YEAR_THEMES: Record<number, { theme: string; focus: string; watch: string }> = {
  1: {
    theme: 'New beginnings',
    focus: 'This is a year of planting seeds — the decisions you make now set the direction of the next nine years. Initiate, launch, begin.',
    watch: 'Hesitation. The window for starting is open now. It narrows as the year progresses.',
  },
  2: {
    theme: 'Patience and partnership',
    focus: 'This year favours collaboration over solo effort. Relationships deepen, details matter, and the work is subtle but important.',
    watch: 'Forcing outcomes. What is meant for you will arrive — but not on demand.',
  },
  3: {
    theme: 'Expression and expansion',
    focus: 'A year for creativity, communication, and social connection. Say yes to more. Your voice carries further than usual.',
    watch: 'Superficiality. The energy is expansive — but depth still requires discipline.',
  },
  4: {
    theme: 'Building and discipline',
    focus: 'The year asks you to work — methodically, consistently, without shortcuts. Foundations laid now hold for decades.',
    watch: 'Resentment at the pace. Slow and solid is not the same as stuck.',
  },
  5: {
    theme: 'Change and freedom',
    focus: 'Expect the unexpected. This is a year of movement, transition, and liberation from what no longer fits.',
    watch: 'Chaos for its own sake. Not every change is progress.',
  },
  6: {
    theme: 'Responsibility and home',
    focus: 'Family, relationships, and home take centre stage. A year for healing, commitment, and showing up for the people who matter.',
    watch: 'Over-giving. You cannot pour from an empty vessel.',
  },
  7: {
    theme: 'Reflection and inner work',
    focus: 'A quieter year. Step back, study, reflect. The answers you seek are found inward, not outward.',
    watch: 'Withdrawing too completely. Solitude is productive; isolation is not.',
  },
  8: {
    theme: 'Power and ambition',
    focus: 'A year for bold moves, financial decisions, and claiming authority in your domain. What you build now has real-world weight.',
    watch: 'Ruthlessness. Power exercised without integrity corrodes everything it touches.',
  },
  9: {
    theme: 'Completion and release',
    focus: 'A nine-year cycle ends here. Let go of what is finished — people, roles, beliefs. Clear space for what is coming.',
    watch: 'Clinging. What refuses to leave on its own will be taken anyway.',
  },
  11: {
    theme: 'Illumination and awakening',
    focus: 'A Master Year of heightened intuition and spiritual insight. Pay attention to what you sense beneath the surface.',
    watch: 'Overwhelm. The signal is strong this year — protect your energy carefully.',
  },
  22: {
    theme: 'Manifestation at scale',
    focus: 'A rare Master Year where vision and execution converge. Whatever you build this year can be truly significant.',
    watch: 'Taking on more than you can sustain. Even the Master Builder works within limits.',
  },
  33: {
    theme: 'Service and compassion',
    focus: 'An exceptionally rare year of devoted service and deep healing — for yourself and those around you.',
    watch: 'Martyrdom. Serving from wholeness is an act of love. Serving from depletion is self-destruction.',
  },
};

export const NUMBER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
