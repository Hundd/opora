import type { Week } from './weeks'

export type DailyId = 'base' | 'walk' | 'family'

export type DailyTask = {
  id: DailyId
  title: string
  detail: string
}

export const baseSteps = [
  { n: '1', title: 'Хвилина дихання животом', text: 'Плечі важкі, видих довший за вдих.' },
  { n: '2', title: 'Вісім кішка–корова', text: 'Довжина хребта, шия не заломлюється вгору.' },
  { n: '3', title: 'Шість птах–собака на бік', text: 'Таз рівний, без гойдалки.' },
  { n: '4', title: 'Підборіддя і напіввис', text: '8 підборідь. Напіввис 20 с. Якщо шия ниє — лише напіввис.' },
  { n: '5', title: 'Хода окремо', text: '20–30 хвилин. Це вже повний день, навіть без зали.' },
]

export function dailyTasks(week: Week): DailyTask[] {
  const family =
    week.checks.find((c) => /дитин|сім’|телефон|партнер|підлог|вечер/i.test(c.label))?.label ??
    '20 хвилин з дитиною без телефону'

  return [
    {
      id: 'base',
      title: 'База на килимку',
      detail: `12–15 хвилин. Фокус тижня: ${week.focus.toLowerCase()}.`,
    },
    {
      id: 'walk',
      title: 'Хода',
      detail: week.n >= 5 ? '30 хвилин рівним кроком. Можна з візком.' : '20–25 хвилин. Можна з дитиною.',
    },
    {
      id: 'family',
      title: 'Дім',
      detail: family,
    },
  ]
}
