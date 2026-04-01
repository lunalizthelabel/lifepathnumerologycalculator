export type NumberMeaning = {
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  challenges: string[];
};

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    name: 'The Leader',
    tagline: 'Independence, ambition, pioneering spirit.',
    description:
      'You are here to develop independence and self-reliance. Life path 1s are natural leaders — original thinkers who prefer to forge their own path rather than follow the crowd. Your greatest challenge is overcoming self-doubt and the fear of standing alone. Your greatest gift is the courage to begin.',
    strengths: ['Self-motivated', 'Original', 'Decisive', 'Courageous'],
    challenges: ['Stubbornness', 'Impatience', 'Difficulty delegating'],
  },
  2: {
    name: 'The Diplomat',
    tagline: 'Cooperation, sensitivity, intuitive harmony.',
    description:
      'You are here to learn the art of cooperation and patience. Life path 2s possess a rare emotional intelligence and an instinct for what others need. You thrive in partnership and bring calm to conflict. Your challenge is to assert your own needs without guilt, and to trust your deep intuition.',
    strengths: ['Empathetic', 'Diplomatic', 'Intuitive', 'Detail-oriented'],
    challenges: ['Over-sensitivity', 'Indecisiveness', 'Difficulty saying no'],
  },
  3: {
    name: 'The Creator',
    tagline: 'Self-expression, creativity, joy.',
    description:
      'You are here to express yourself fully and inspire others through creativity. Life path 3s are gifted communicators who carry an infectious enthusiasm. Your challenge is focus: the same expansive energy that fuels your creativity can scatter your efforts if undisciplined.',
    strengths: ['Creative', 'Charismatic', 'Optimistic', 'Expressive'],
    challenges: ['Scattered focus', 'Superficiality', 'Emotional moodiness'],
  },
  4: {
    name: 'The Builder',
    tagline: 'Discipline, structure, lasting foundations.',
    description:
      'You are here to build — systems, families, institutions, legacies. Life path 4s work methodically, value honesty, and earn trust through consistent action. Your challenge is rigidity: the same discipline that makes you reliable can make you resistant to necessary change.',
    strengths: ['Reliable', 'Hardworking', 'Practical', 'Honest'],
    challenges: ['Rigidity', 'Stubbornness', 'Resistance to change'],
  },
  5: {
    name: 'The Free Spirit',
    tagline: 'Freedom, adaptability, dynamic change.',
    description:
      'You are here to experience the full spectrum of life. Life path 5s are natural adventurers — curious, adaptable, and magnetically alive. You learn through direct experience. Your challenge is commitment: the same love of freedom that energises you can prevent you from going deep.',
    strengths: ['Adaptable', 'Curious', 'Charismatic', 'Versatile'],
    challenges: ['Restlessness', 'Inconsistency', 'Fear of commitment'],
  },
  6: {
    name: 'The Nurturer',
    tagline: 'Responsibility, care, deep compassion.',
    description:
      'You are here to serve, nurture, and create harmony in your sphere. Life path 6s feel a deep sense of responsibility for those they love. You are steady, caring, and wise. Your challenge is perfectionism and the tendency to take on others\u2019 problems as your own.',
    strengths: ['Compassionate', 'Responsible', 'Loyal', 'Healing presence'],
    challenges: ['Perfectionism', 'Self-sacrifice', 'Difficulty receiving'],
  },
  7: {
    name: 'The Seeker',
    tagline: 'Introspection, wisdom, spiritual depth.',
    description:
      'You are here to seek truth. Life path 7s are driven by a relentless need to understand what lies beneath the surface. You need solitude to function at your best. Your challenge is isolation: the mind that seeks truth can also build walls that keep others out.',
    strengths: ['Analytical', 'Introspective', 'Perceptive', 'Spiritually aware'],
    challenges: ['Isolation', 'Scepticism', 'Difficulty trusting others'],
  },
  8: {
    name: 'The Strategist',
    tagline: 'Ambition, authority, material mastery.',
    description:
      'You are here to master the material world — business, finance, leadership. Life path 8s are natural executives with a commanding presence and an instinct for strategy. Your challenge is balance: the drive for achievement can overshadow relationships and inner life.',
    strengths: ['Ambitious', 'Authoritative', 'Strategic', 'Resilient'],
    challenges: ['Workaholism', 'Materialism', 'Difficulty with vulnerability'],
  },
  9: {
    name: 'The Humanitarian',
    tagline: 'Completion, wisdom, universal service.',
    description:
      'You are here to serve something larger than yourself. Life path 9s carry a deep well of compassion and feel the pain of the world acutely. Your challenge is letting go — of people, outcomes, and the past.',
    strengths: ['Compassionate', 'Wise', 'Idealistic', 'Generous'],
    challenges: ['Difficulty letting go', 'Martyrdom', 'Emotional intensity'],
  },
  11: {
    name: 'The Visionary',
    tagline: 'Master number \u2014 heightened intuition and idealism.',
    description:
      'Master number 11 is the most intuitive of all life paths. You perceive what others cannot see and carry a quiet knowing that defies explanation. You are here to inspire through insight. Your challenge is grounding that vision into practical reality.',
    strengths: ['Highly intuitive', 'Inspiring', 'Idealistic', 'Perceptive'],
    challenges: ['Nervous energy', 'Impracticality', 'Emotional overwhelm'],
  },
  22: {
    name: 'The Master Builder',
    tagline: 'Master number \u2014 turning dreams into reality at scale.',
    description:
      'Master number 22 is the most powerful of all life paths. You have the vision of the 11 and the discipline of the 4, enabling you to manifest extraordinary things. Your challenge is the weight of that potential \u2014 the gap between what you sense you could achieve and what you have built so far.',
    strengths: ['Visionary', 'Disciplined', 'Capable of large-scale impact', 'Grounded'],
    challenges: ['Overwhelm', 'Self-doubt', 'Taking on too much'],
  },
  33: {
    name: 'The Master Teacher',
    tagline: 'Master number \u2014 compassionate wisdom and healing.',
    description:
      'Master number 33 is exceptionally rare. You carry the nurturing of the 6, the vision of the 11, and the building capacity of the 22 \u2014 synthesised into a life of devoted service. Your challenge is self-sacrifice: giving so completely to others that you neglect your own foundation.',
    strengths: ['Deeply compassionate', 'Healing presence', 'Wise teacher', 'Selfless'],
    challenges: ['Self-neglect', 'Martyrdom', 'Carrying others\u2019 burdens'],
  },
};

export const NUMBER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
