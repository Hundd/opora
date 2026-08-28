import { useMemo, useState } from 'react'
import { weeks } from '../data/weeks'

const KEY = 'opora-checks-v1'

function load(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

export function WeekChecklist() {
  const [open, setOpen] = useState(1)
  const [checks, setChecks] = useState<Record<string, boolean>>(load)

  const total = weeks.reduce((n, week) => n + week.checks.length, 0)
  const done = useMemo(
    () => weeks.reduce((n, week) => n + week.checks.filter((c) => checks[c.id]).length, 0),
    [checks],
  )

  function toggle(id: string) {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function reset() {
    localStorage.removeItem(KEY)
    setChecks({})
  }

  return (
    <div>
      <div className="section-head">
        <p className="kicker">Чекліст у цьому браузері</p>
        <h2>Відмічай тижні. Ніхто не бачить, крім тебе.</h2>
        <p className="lede">
          {done} з {total} кроків. {Math.round((done / total) * 100)}%.
        </p>
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${(done / total) * 100}%` }} />
        </div>
      </div>
      <div className="weeks">
        {weeks.map((week) => {
          const weekDone = week.checks.filter((c) => checks[c.id]).length
          const isOpen = open === week.n
          return (
            <article className="week" key={week.n}>
              <button
                type="button"
                className="week-head"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? 0 : week.n)}
              >
                <span className="week-n">{String(week.n).padStart(2, '0')}</span>
                <span>
                  <strong>{week.title}</strong>
                  <span className="muted">
                    {' '}
                    · {week.focus} · {weekDone}/{week.checks.length}
                  </span>
                </span>
                <span aria-hidden="true">{isOpen ? '–' : '+'}</span>
              </button>
              {isOpen ? (
                <div className="week-body">
                  <p className="muted">{week.why}</p>
                  {week.checks.map((item) => (
                    <label className="check" key={item.id}>
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
      <div className="row-actions">
        <button className="btn btn-ghost" type="button" onClick={reset}>
          Скинути відмітки
        </button>
      </div>
    </div>
  )
}
