import { afterEach, describe, expect, it } from 'vitest'
import {
  addDays,
  addWeight,
  diffDays,
  startPlan,
  tickPlan,
  todayISO,
  weekStart,
  weightThisWeek,
} from './storage'

afterEach(() => {
  localStorage.clear()
})

describe('dates', () => {
  it('adds days across month end', () => {
    expect(addDays('2026-01-30', 3)).toBe('2026-02-02')
  })

  it('counts whole days', () => {
    expect(diffDays('2026-08-01', '2026-08-08')).toBe(7)
  })

  it('week starts on Monday', () => {
    expect(weekStart('2026-08-28')).toBe('2026-08-24')
  })
})

describe('plan weeks', () => {
  it('stays on week 1 for six days', () => {
    const plan = startPlan('2026-08-01')
    expect(tickPlan(plan, '2026-08-06').week).toBe(1)
  })

  it('moves to week 2 after seven days', () => {
    const plan = startPlan('2026-08-01')
    const next = tickPlan(plan, '2026-08-08')
    expect(next.week).toBe(2)
    expect(next.weekStartedOn).toBe('2026-08-08')
  })

  it('enters cycle after week 12', () => {
    const plan = startPlan('2026-01-01')
    const later = tickPlan(plan, addDays('2026-01-01', 12 * 7))
    expect(later.mode).toBe('cycle')
    expect(later.week).toBe(12)
  })
})

describe('weight', () => {
  it('rejects a second weigh-in in the same week', () => {
    expect(addWeight(92, '2026-08-24')).not.toBeNull()
    expect(addWeight(91.5, '2026-08-26')).toBeNull()
    expect(weightThisWeek('2026-08-27')?.kg).toBe(92)
  })

  it('allows weigh-in the next week', () => {
    addWeight(92, '2026-08-24')
    expect(addWeight(91.4, '2026-08-31')).not.toBeNull()
  })
})

describe('todayISO', () => {
  it('formats a given date in local calendar', () => {
    expect(todayISO(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})
