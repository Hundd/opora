export type PlanMode = 'plan' | 'cycle'

export type PlanState = {
  startedOn: string
  week: number
  weekStartedOn: string
  mode: PlanMode
}

export type DayTasks = {
  base: boolean
  walk: boolean
  family: boolean
  desk: boolean
  pain: number | null
  walkMin: number
}

export type WeightEntry = {
  date: string
  kg: number
}

export const emptyDay: DayTasks = {
  base: false,
  walk: false,
  family: false,
  desk: false,
  pain: null,
  walkMin: 0,
}

const PLAN_KEY = 'opora-plan-v1'
const DAILY_KEY = 'opora-daily-v1'
const WEIGHT_KEY = 'opora-weight-v1'
const GROCERY_KEY = 'opora-grocery-v1'
export const CHECKS_KEY = 'opora-checks-v1'

export function todayISO(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function parseLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function diffDays(from: string, to: string): number {
  const a = parseLocal(from)
  const b = parseLocal(to)
  return Math.round((b.getTime() - a.getTime()) / 86_400_000)
}

export function addDays(iso: string, n: number): string {
  const d = parseLocal(iso)
  d.setDate(d.getDate() + n)
  return todayISO(d)
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function startPlan(today = todayISO()): PlanState {
  const next: PlanState = {
    startedOn: today,
    week: 1,
    weekStartedOn: today,
    mode: 'plan',
  }
  localStorage.setItem(PLAN_KEY, JSON.stringify(next))
  return next
}

export function savePlan(state: PlanState): void {
  localStorage.setItem(PLAN_KEY, JSON.stringify(state))
}

export function loadPlan(): PlanState | null {
  const raw = readJson<PlanState | null>(PLAN_KEY, null)
  if (!raw || !raw.startedOn || !raw.weekStartedOn) return null
  return raw
}

export function tickPlan(state: PlanState, today = todayISO()): PlanState {
  const days = diffDays(state.weekStartedOn, today)
  if (days < 7) return state
  const passed = Math.floor(days / 7)
  const weekStartedOn = addDays(state.weekStartedOn, passed * 7)
  if (state.mode === 'cycle') {
    return { ...state, weekStartedOn }
  }
  const nextWeek = state.week + passed
  if (nextWeek > 12) {
    return { ...state, week: 12, mode: 'cycle', weekStartedOn }
  }
  return { ...state, week: nextWeek, weekStartedOn }
}

export function repeatWeek(state: PlanState, today = todayISO()): PlanState {
  return { ...state, weekStartedOn: today }
}

export function clearPlan(): void {
  localStorage.removeItem(PLAN_KEY)
}

export function dayNumber(state: PlanState, today = todayISO()): number {
  return Math.min(7, Math.max(1, diffDays(state.weekStartedOn, today) + 1))
}

export function loadChecks(): Record<string, boolean> {
  return readJson<Record<string, boolean>>(CHECKS_KEY, {})
}

export function saveChecks(checks: Record<string, boolean>): void {
  localStorage.setItem(CHECKS_KEY, JSON.stringify(checks))
}

export function clearChecks(): void {
  localStorage.removeItem(CHECKS_KEY)
}

export function loadDaily(): Record<string, DayTasks> {
  return readJson<Record<string, DayTasks>>(DAILY_KEY, {})
}

export function getDay(date = todayISO()): DayTasks {
  return { ...emptyDay, ...loadDaily()[date] }
}

export function patchDay(patch: Partial<DayTasks>, date = todayISO()): DayTasks {
  const all = loadDaily()
  const next = { ...emptyDay, ...all[date], ...patch }
  all[date] = next
  localStorage.setItem(DAILY_KEY, JSON.stringify(all))
  return next
}

export function formatUkDate(iso: string): string {
  return parseLocal(iso).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
  })
}

export function weekStart(iso: string): string {
  const d = parseLocal(iso)
  const day = d.getDay()
  const offset = day === 0 ? 6 : day - 1
  d.setDate(d.getDate() - offset)
  return todayISO(d)
}

export function loadWeights(): WeightEntry[] {
  const raw = readJson<WeightEntry[]>(WEIGHT_KEY, [])
  return raw.filter((w) => typeof w.kg === 'number' && w.date)
}

export function saveWeights(entries: WeightEntry[]): void {
  localStorage.setItem(WEIGHT_KEY, JSON.stringify(entries))
}

export function weightThisWeek(today = todayISO()): WeightEntry | undefined {
  const start = weekStart(today)
  return loadWeights().find((w) => weekStart(w.date) === start)
}

export function addWeight(kg: number, today = todayISO()): WeightEntry[] | null {
  if (weightThisWeek(today)) return null
  const next = [...loadWeights(), { date: today, kg }].sort((a, b) => a.date.localeCompare(b.date))
  saveWeights(next)
  return next
}

export function loadGroceries(): Record<string, boolean> {
  return readJson<Record<string, boolean>>(GROCERY_KEY, {})
}

export function saveGroceries(checks: Record<string, boolean>): void {
  localStorage.setItem(GROCERY_KEY, JSON.stringify(checks))
}

export type Backup = {
  v: 1
  plan: PlanState | null
  daily: Record<string, DayTasks>
  checks: Record<string, boolean>
  weights: WeightEntry[]
  groceries: Record<string, boolean>
}

export function exportBackup(): string {
  const backup: Backup = {
    v: 1,
    plan: loadPlan(),
    daily: loadDaily(),
    checks: loadChecks(),
    weights: loadWeights(),
    groceries: loadGroceries(),
  }
  return JSON.stringify(backup, null, 2)
}

export function importBackup(raw: string): boolean {
  try {
    const data = JSON.parse(raw) as Backup
    if (!data || data.v !== 1) return false
    if (data.plan) savePlan(data.plan)
    else clearPlan()
    localStorage.setItem(DAILY_KEY, JSON.stringify(data.daily ?? {}))
    saveChecks(data.checks ?? {})
    saveWeights(data.weights ?? [])
    saveGroceries(data.groceries ?? {})
    return true
  } catch {
    return false
  }
}

export function lastDays(n: number, today = todayISO()): string[] {
  return Array.from({ length: n }, (_, i) => addDays(today, i - (n - 1)))
}
