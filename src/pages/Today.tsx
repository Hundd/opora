import { Link } from 'react-router-dom'
import { DeskCard } from '../components/DeskCard'
import { Journal } from '../components/Journal'
import { dailyTasks, baseSteps } from '../data/today'
import { usePlan } from '../plan-context'
import { formatUkDate } from '../storage'

export function Today() {
  const { plan, day, weekMeta, dayInWeek, start, repeat, toggleDay } = usePlan()

  if (!plan || !weekMeta) {
    return (
      <>
        <section className="page-hero wrap">
          <div>
            <p className="kicker">Сьогодні</p>
            <h1 className="display">П’ятнадцять хвилин, якщо більше не виходить.</h1>
            <p className="lede">
              План ще не початий. Можна просто зробити базу зараз — або зафіксувати старт 12 тижнів.
              Дата лишається в цьому браузері.
            </p>
            <div className="row-actions">
              <button type="button" className="btn" onClick={start}>
                Почати план сьогодні
              </button>
              <Link className="btn btn-ghost" to="/rukh">
                Спочатку вправи
              </Link>
            </div>
          </div>
          <div className="photo">
            <img src="/images/morning.jpg" alt="Коротка розминка на килимку вдома" />
          </div>
        </section>
        <section className="section wrap">
          <div className="today">
            <p className="kicker">База</p>
            <h2>Якщо старту ще немає — цього досить на сьогодні.</h2>
            <ol>
              {baseSteps.map((step) => (
                <li key={step.n}>
                  <span className="step">{step.n}</span>
                  <span>
                    <strong>{step.title}.</strong> {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="section wrap">
          <DeskCard />
        </section>
        <Journal />
      </>
    )
  }

  const tasks = dailyTasks(weekMeta)
  const doneCount = tasks.filter((t) => day[t.id]).length
  const cycle = plan.mode === 'cycle'

  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">
            {cycle ? 'Цикл після 12 тижнів' : `Тиждень ${String(plan.week).padStart(2, '0')}`} · день {dayInWeek} з 7
          </p>
          <h1 className="display">{weekMeta.title}</h1>
          <p className="lede">{weekMeta.why}</p>
          <p className="muted">
            {weekMeta.level} · {weekMeta.focus} · старт {formatUkDate(plan.startedOn)}
          </p>
        </div>
        <div className="photo">
          <img src="/images/morning.jpg" alt="Коротка розминка на килимку вдома" />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Три відмітки</p>
          <h2>
            {doneCount === 3 ? 'День зібраний.' : `${doneCount} з 3 на сьогодні.`}
          </h2>
          <p className="lede">Не надолужуй учорашнє. Відміть те, що вже сталося.</p>
          <div className="progress" aria-hidden="true">
            <span style={{ width: `${(doneCount / 3) * 100}%` }} />
          </div>
        </div>
        <div className="day-tasks">
          {tasks.map((task) => (
            <label className={`day-task${day[task.id] ? ' done' : ''}`} key={task.id}>
              <input
                type="checkbox"
                checked={day[task.id]}
                onChange={() => toggleDay(task.id)}
              />
              <span>
                <strong>{task.title}</strong>
                <span className="muted">{task.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="today">
          <p className="kicker">База · 12–15 хвилин</p>
          <h2>Порядок, якщо не хочеться думати.</h2>
          <ol>
            {baseSteps.map((step) => (
              <li key={step.n}>
                <span className="step">{step.n}</span>
                <span>
                  <strong>{step.title}.</strong> {step.text}
                </span>
              </li>
            ))}
          </ol>
          <Link className="btn" to="/rukh">
            Усі вправи
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <div className="cards">
          <article className="card">
            <h3>Цей тиждень</h3>
            <p>
              {weekMeta.checks.length} кроки в чеклісті плану. Відмітки тижня — окремо від сьогоднішніх трьох.
            </p>
            <div className="row-actions">
              <Link className="btn btn-ghost" to="/plan">
                Відкрити план
              </Link>
            </div>
          </article>
          <article className="card">
            <h3>{cycle ? 'Цикл' : 'Дитина не спала?'}</h3>
            <p>
              {cycle
                ? '12 тижнів пройдено. Лишаєш ходу, тарілку і ці 12 хвилин. Тиждень на карті не стрибає вперед.'
                : 'Повторити тиждень — ще сім днів того самого фокуса. Календар плану просто розтягнеться.'}
            </p>
            <div className="row-actions">
              <button type="button" className="btn btn-ghost" onClick={repeat}>
                Повторити цей тиждень
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="section wrap">
        <DeskCard />
      </section>
      <Journal />
    </>
  )
}
