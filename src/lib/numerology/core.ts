/**
 * Deterministic numerology calculations for the paid (Layer 2) report.
 *
 * These follow the rules and timing tables in
 * Lib/Numerology/numerology_layer2_system_prompt_v2.md. The numbers are computed
 * here and handed to the AI, which only writes prose: the AI never does arithmetic.
 */
import { calculateLifePath, calculatePersonalYear } from '@/lib/numerology';

const MASTER = new Set([11, 22, 33]);
const KARMIC_SHADOW: Record<number, number> = { 13: 4, 14: 5, 16: 7, 19: 1 };

function digitSum(n: number): number {
  return String(n).split('').reduce((a, d) => a + Number(d), 0);
}

/** Reduce to 1–9, keeping master numbers 11, 22 and 33. */
export function reduceKeepMaster(n: number): number {
  let v = n;
  while (v > 9 && !MASTER.has(v)) v = digitSum(v);
  return v;
}

/** Reduce all the way to 1–9 (used for the inputs of pinnacle sums). */
export function reduceSingle(n: number): number {
  let v = n;
  while (v > 9) v = digitSum(v);
  return v;
}

/** Row used in the timing tables: 11 → 2, 22 → 4, 33 → 6. */
function timingRow(lifePath: number): number {
  return reduceSingle(lifePath);
}

// Life Cycle end ages by Life Path row (first cycle ends, second cycle ends).
const CYCLE_ENDS: Record<number, [number, number]> = {
  1: [26, 53], 2: [25, 52], 3: [24, 51], 4: [23, 59], 5: [31, 58],
  6: [30, 57], 7: [29, 56], 8: [28, 55], 9: [27, 54],
};

export type Span = {
  number: number;
  /** Age at which this span starts (inclusive). */
  fromAge: number;
  /** Age at which it ends (exclusive); null = for the rest of life. */
  toAge: number | null;
  karmicShadow: boolean;
};

export type LifeCycle = Span & { name: 'First' | 'Second' | 'Third'; phase: 'Developmental' | 'Productive' | 'Integrative' };
export type Pinnacle = Span & { index: 1 | 2 | 3 | 4 };

export type CoreNumbers = {
  birthDate: string; // YYYY-MM-DD
  age: number;
  lifePath: number;
  birthdayNumber: number;
  birthdayIsKarmicShadow: boolean;
  personalYear: number;
  personalMonth: number;
  personalMonthIsKarmicShadow: boolean;
  currentYear: number;
  currentMonth: number; // 1–12
  cycles: LifeCycle[];
  activeCycle: LifeCycle;
  /** Set when the next cycle starts within 3 years. */
  nextCycle: (LifeCycle & { startsInYears: number }) | null;
  pinnacles: Pinnacle[];
  activePinnacle: Pinnacle;
  /** Set when the next pinnacle starts within 5 years. */
  nextPinnacle: (Pinnacle & { startsInYears: number }) | null;
};

function ageOn(birthDate: string, on: Date): number {
  const [y, m, d] = birthDate.split('-').map(Number);
  let age = on.getUTCFullYear() - y;
  const beforeBirthday = on.getUTCMonth() + 1 < m || (on.getUTCMonth() + 1 === m && on.getUTCDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}

function isActive(span: Span, age: number) {
  return age >= span.fromAge && (span.toAge === null || age < span.toAge);
}

export function calculateCoreNumbers(birthDate: string, now: Date = new Date()): CoreNumbers {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) throw new Error(`Invalid birth date: ${birthDate}`);
  const [year, month, day] = birthDate.split('-').map(Number);

  const lifePath = calculateLifePath(birthDate);
  const personalYear = calculatePersonalYear(birthDate);
  const currentYear = now.getUTCFullYear();
  const currentMonth = now.getUTCMonth() + 1;
  const age = ageOn(birthDate, now);
  const row = timingRow(lifePath);

  // Birthday number
  const birthdayNumber = reduceKeepMaster(day);
  const birthdayIsKarmicShadow = day in KARMIC_SHADOW;

  // Personal month
  const monthSum = currentMonth + personalYear;
  const personalMonth = reduceKeepMaster(monthSum);
  const personalMonthIsKarmicShadow = monthSum in KARMIC_SHADOW;

  // Life cycles: month, day, year, each reduced (masters kept).
  const [c1End, c2End] = CYCLE_ENDS[row];
  const cycleNums = [month, day, digitSum(year)].map((n) => reduceKeepMaster(n));
  const cycleRaw = [month, day, digitSum(year)];
  const cycles: LifeCycle[] = [
    { name: 'First', phase: 'Developmental', number: cycleNums[0], fromAge: 0, toAge: c1End, karmicShadow: cycleRaw[0] in KARMIC_SHADOW },
    { name: 'Second', phase: 'Productive', number: cycleNums[1], fromAge: c1End, toAge: c2End, karmicShadow: cycleRaw[1] in KARMIC_SHADOW },
    { name: 'Third', phase: 'Integrative', number: cycleNums[2], fromAge: c2End, toAge: null, karmicShadow: cycleRaw[2] in KARMIC_SHADOW },
  ];

  // Pinnacles: inputs reduced to single digits, results keep masters.
  const rm = reduceSingle(month);
  const rd = reduceSingle(day);
  const ry = reduceSingle(year);
  const p1Raw = rm + rd;
  const p2Raw = rd + ry;
  const p1 = reduceKeepMaster(p1Raw);
  const p2 = reduceKeepMaster(p2Raw);
  const p3Raw = reduceSingle(p1) + reduceSingle(p2);
  const p4Raw = rm + ry;
  const p1End = 36 - row;
  const pinnacles: Pinnacle[] = [
    { index: 1, number: p1, fromAge: 0, toAge: p1End, karmicShadow: p1Raw in KARMIC_SHADOW },
    { index: 2, number: p2, fromAge: p1End, toAge: p1End + 9, karmicShadow: p2Raw in KARMIC_SHADOW },
    { index: 3, number: reduceKeepMaster(p3Raw), fromAge: p1End + 9, toAge: p1End + 18, karmicShadow: p3Raw in KARMIC_SHADOW },
    { index: 4, number: reduceKeepMaster(p4Raw), fromAge: p1End + 18, toAge: null, karmicShadow: p4Raw in KARMIC_SHADOW },
  ];

  const activeCycle = cycles.find((c) => isActive(c, age)) ?? cycles[0];
  const activePinnacle = pinnacles.find((p) => isActive(p, age)) ?? pinnacles[0];

  const nextC = cycles[cycles.indexOf(activeCycle) + 1];
  const nextCycle = nextC && nextC.fromAge - age <= 3 ? { ...nextC, startsInYears: nextC.fromAge - age } : null;
  const nextP = pinnacles[pinnacles.indexOf(activePinnacle) + 1];
  const nextPinnacle = nextP && nextP.fromAge - age <= 5 ? { ...nextP, startsInYears: nextP.fromAge - age } : null;

  return {
    birthDate, age, lifePath, birthdayNumber, birthdayIsKarmicShadow,
    personalYear, personalMonth, personalMonthIsKarmicShadow,
    currentYear, currentMonth,
    cycles, activeCycle, nextCycle,
    pinnacles, activePinnacle, nextPinnacle,
  };
}

/** Calendar year in which someone born on birthDate reaches `age`. */
export function yearAtAge(birthDate: string, age: number): number {
  return Number(birthDate.slice(0, 4)) + age;
}
