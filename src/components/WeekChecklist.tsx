import { useMemo, useState } from 'react'
import { weeks } from '../data/weeks'
import { clearChecks, loadChecks, saveChecks } from '../storage'
import { ui } from '../ui'
import styles from './WeekChecklist.module.css'

export function WeekChecklist({ currentWeek = 1 }: { currentWeek?: number }) {
  const [open, setOpen] = useState(currentWeek || 1)
  const [checks, setChecks] = useState<Record<string, boolean>>(loadChecks)

  const total = weeks.reduce((n, week) => n + week.checks.length, 0)
  const done = useMemo(
    () => weeks.reduce((n, week) => n + week.checks.filter((c) => checks[c.id]).length, 0),
    [checks],
  )

  function toggle(id: string) {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveChecks(next)
      return next
    })
  }

  function reset() {
    clearChecks()
    setChecks({})
  }

  return (
    <div>
      <div className={ui.sectionHead}>
        <p className={ui.kicker}>Чекліст у цьому браузері</p>
        <h2>Відмічай тижні. Ніхто не бачить, крім тебе.</h2>
        <p className={ui.lede}>
          {done} з {total} кроків. {Math.round((done / total) * 100)}%.
        </p>
        <div className={ui.progress} aria-hidden="true">
          <span style={{ width: `${(done / total) * 100}%` }} />
        </div>
      </div>
      <div className={styles.list}>
        {weeks.map((week) => {
          const weekDone = week.checks.filter((c) => checks[c.id]).length
          const isOpen = open === week.n
          const isNow = currentWeek > 0 && week.n === currentWeek
          return (
            <article className={isNow ? styles.current : styles.week} key={week.n}>
              <button
                type="button"
                className={styles.head}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? 0 : week.n)}
              >
                <span className={styles.num}>{String(week.n).padStart(2, '0')}</span>
                <span>
                  <strong>{week.title}</strong>
                  <span className={ui.muted}>
                    {' '}
                    · {week.focus} · {weekDone}/{week.checks.length}
                    {isNow ? ' · зараз' : ''}
                  </span>
                </span>
                <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
              </button>
              {isOpen ? (
                <div className={styles.body}>
                  <p className={ui.muted}>{week.why}</p>
                  {week.checks.map((item) => (
                    <label className={ui.check} key={item.id}>
                      <input
                        type="checkbox"
                        checked={Boolean(checks[item.id])}
                        onChange={() => toggle(item.id)}
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
      <div className={ui.rowActions}>
        <button className={ui.btnGhost} type="button" onClick={reset}>
          Скинути відмітки
        </button>
      </div>
    </div>
  )
}
