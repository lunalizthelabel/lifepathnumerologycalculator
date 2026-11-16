import { describe, expect, it } from 'vitest';
import { calculateCoreNumbers, reduceKeepMaster, reduceSingle, yearAtAge } from './core';

describe('reductions', () => {
  it('keeps master numbers', () => {
    expect(reduceKeepMaster(29)).toBe(11);
    expect(reduceKeepMaster(22)).toBe(22);
    expect(reduceKeepMaster(38)).toBe(11);
    expect(reduceKeepMaster(19)).toBe(1);
  });
  it('reduces fully when asked', () => {
    expect(reduceSingle(29)).toBe(2);
    expect(reduceSingle(1990)).toBe(1);
  });
});

describe('calculateCoreNumbers: 29 July 1990, on 16 Nov 2026', () => {
  const n = calculateCoreNumbers('1990-07-29', new Date('2026-11-16T12:00:00Z'));

  it('core numbers', () => {
    expect(n.lifePath).toBe(1);
    expect(n.age).toBe(36);
    expect(n.birthdayNumber).toBe(11);
    expect(n.birthdayIsKarmicShadow).toBe(false);
    expect(n.personalYear).toBe(1);
    expect(n.personalMonth).toBe(3); // 11 + 1 = 12 → 3
  });

  it('life cycles use the Life Path 1 timing row (26 / 53)', () => {
    expect(n.cycles.map((c) => [c.number, c.fromAge, c.toAge])).toEqual([
      [7, 0, 26],
      [11, 26, 53],
      [1, 53, null],
    ]);
    expect(n.activeCycle.name).toBe('Second');
    expect(n.nextCycle).toBeNull();
  });

  it('pinnacles: P1 ends at 35, so in 2026 the second pinnacle is active (fixes the AI error)', () => {
    expect(n.pinnacles.map((p) => [p.number, p.fromAge, p.toAge])).toEqual([
      [9, 0, 35],  // 7 + 2
      [3, 35, 44], // 2 + 1
      [3, 44, 53], // 9 + 3 = 12 → 3
      [8, 53, null], // 7 + 1
    ]);
    expect(n.activePinnacle.index).toBe(2);
    expect(yearAtAge('1990-07-29', n.activePinnacle.fromAge)).toBe(2025);
  });
});

describe('edge cases', () => {
  it('flags karmic shadow birthdays', () => {
    const n = calculateCoreNumbers('1985-03-16', new Date('2026-01-01T00:00:00Z'));
    expect(n.birthdayNumber).toBe(7);
    expect(n.birthdayIsKarmicShadow).toBe(true);
  });

  it('maps master Life Paths onto their timing row', () => {
    // 1982-11-25 → 1+9+8+2+1+1+2+5 = 29 → Life Path 11, uses the "2/11" row.
    const n = calculateCoreNumbers('1982-11-25', new Date('2026-01-01T00:00:00Z'));
    expect(n.lifePath).toBe(11);
    expect(n.pinnacles[0].toAge).toBe(34);
    expect(n.cycles[0].toAge).toBe(25);
  });

  it('announces the next pinnacle within 5 years', () => {
    // LP 1, P1 ends at 35: at age 32 the second pinnacle is 3 years away.
    const n = calculateCoreNumbers('1990-07-29', new Date('2022-11-16T00:00:00Z'));
    expect(n.activePinnacle.index).toBe(1);
    expect(n.nextPinnacle?.index).toBe(2);
    expect(n.nextPinnacle?.startsInYears).toBe(3);
  });

  it('third cycle and fourth pinnacle run for the rest of life', () => {
    const n = calculateCoreNumbers('1940-01-05', new Date('2026-01-10T00:00:00Z'));
    expect(n.activeCycle.name).toBe('Third');
    expect(n.activePinnacle.index).toBe(4);
    expect(n.nextCycle).toBeNull();
    expect(n.nextPinnacle).toBeNull();
  });

  it('rejects malformed dates', () => {
    expect(() => calculateCoreNumbers('29-07-1990')).toThrow();
  });
});
