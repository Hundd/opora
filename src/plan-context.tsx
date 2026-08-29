'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { weeks } from './data/weeks'
import {
  type DayTasks,
  type PlanState,
  type WeightEntry,
  addWeight as addWeightState,
  clearPlan,
  dayNumber,
  emptyDay,
  getDay,
  loadWeights,
  patchDay,
  loadPlan,
  repeatWeek as repeatWeekState,
  savePlan,
  startPlan as startPlanState,
  tickPlan,
  todayISO,
  weekStart,
} from './storage'

type BoolTask = 'base' | 'walk' | 'family' | 'desk'

type PlanContextValue = {
  plan: PlanState | null
  day: DayTasks
  today: string
  weekMeta: (typeof weeks)[number] | null
  dayInWeek: number
  weights: WeightEntry[]
  weekWeight: WeightEntry | undefined
  start: () => void
  repeat: () => void
  resetPlan: () => void
  toggleDay: (key: BoolTask) => void
  setPain: (n: number | null) => void
  setWalkMin: (n: number) => void
  logWeight: (kg: number) => boolean
}

const PlanContext = createContext<PlanContextValue | null>(null)

function readPlan(): PlanState | null {
  const loaded = loadPlan()
  if (!loaded) return null
  const ticked = tickPlan(loaded)
  if (JSON.stringify(ticked) !== JSON.stringify(loaded)) savePlan(ticked)
  return ticked
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [today, setToday] = useState('')
  const [plan, setPlan] = useState<PlanState | null>(null)
  const [day, setDay] = useState<DayTasks>(emptyDay)
  const [weights, setWeights] = useState<WeightEntry[]>([])

  useEffect(() => {
    const current = todayISO()
    setToday(current)
    setPlan(readPlan())
    setDay(getDay(current))
    setWeights(loadWeights())
  }, [])

  const start = useCallback(() => {
    const next = startPlanState()
    setPlan(next)
  }, [])

  const repeat = useCallback(() => {
    setPlan((prev) => {
      if (!prev) return prev
      const next = repeatWeekState(prev)
      savePlan(next)
      return next
    })
  }, [])

  const resetPlan = useCallback(() => {
    clearPlan()
    setPlan(null)
  }, [])

  const toggleDay = useCallback((key: BoolTask) => {
    setDay((prev) => patchDay({ [key]: !prev[key] }))
  }, [])

  const setPain = useCallback((n: number | null) => {
    setDay(patchDay({ pain: n }))
  }, [])

  const setWalkMin = useCallback((n: number) => {
    const walkMin = Number.isFinite(n) && n > 0 ? n : 0
    setDay(patchDay({ walkMin, walk: walkMin > 0 ? true : undefined }))
  }, [])

  const logWeight = useCallback((kg: number) => {
    const next = addWeightState(kg)
    if (!next) return false
    setWeights(next)
    return true
  }, [])

  const weekMeta = useMemo(() => {
    if (!plan) return null
    return weeks[plan.week - 1] ?? weeks[0]
  }, [plan])

  const dayInWeek = plan && today ? dayNumber(plan, today) : 1
  const weekWeight = useMemo(() => {
    if (!today) return undefined
    const start = weekStart(today)
    return weights.find((w) => weekStart(w.date) === start)
  }, [today, weights])

  const value = useMemo(
    () => ({
      plan,
      day,
      today,
      weekMeta,
      dayInWeek,
      weights,
      weekWeight,
      start,
      repeat,
      resetPlan,
      toggleDay,
      setPain,
      setWalkMin,
      logWeight,
    }),
    [
      plan,
      day,
      today,
      weekMeta,
      dayInWeek,
      weights,
      weekWeight,
      start,
      repeat,
      resetPlan,
      toggleDay,
      setPain,
      setWalkMin,
      logWeight,
    ],
  )

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlan outside PlanProvider')
  return ctx
}
