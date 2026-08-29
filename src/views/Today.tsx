'use client'

import Link from 'next/link'
import { DeskCard } from '../components/DeskCard'
import { Journal } from '../components/Journal'
import { dailyTasks, baseSteps } from '../data/today'
import { usePlan } from '../plan-context'
import { formatUkDate } from '../storage'
import { cx, ui } from '../ui'

export function Today() {
  const { plan, day, weekMeta, dayInWeek, start, repeat, toggleDay } = usePlan()

  if (!plan || !weekMeta) {
    return (
      <>
        <section className={cx(ui.pageHero, ui.wrap)}>
          <div>
            <p className={ui.kicker}>Сьогодні</p>
            <h1 className={ui.display}>П’ятнадцять хвилин, якщо більше не виходить.</h1>
            <p className={ui.lede}>
              План ще не початий. Можна просто зробити базу зараз — або зафіксувати старт 12 тижнів.
              Дата лишається в цьому браузері.
            </p>
            <div className={ui.rowActions}>
              <button type="button" className={ui.btn} onClick={start}>
                Почати план сьогодні
              </button>
              <Link className={ui.btnGhost} href="/rukh">
                Спочатку вправи
              </Link>
            </div>
          </div>
          <div className={ui.photo}>
            <img src="/images/morning.jpg" alt="Коротка розминка на килимку вдома" />
          </div>
        </section>
        <section className={cx(ui.section, ui.wrap)}>
          <div className={ui.panel}>
            <p className={ui.kicker}>База</p>
            <h2>Якщо старту ще немає — цього досить на сьогодні.</h2>
            <ol>
              {baseSteps.map((step) => (
                <li key={step.n}>
                  <span className={ui.step}>{step.n}</span>
                  <span>
                    <strong>{step.title}.</strong> {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className={cx(ui.section, ui.wrap)}>
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
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>
            {cycle ? 'Цикл після 12 тижнів' : `Тиждень ${String(plan.week).padStart(2, '0')}`} · день {dayInWeek} з 7
          </p>
          <h1 className={ui.display}>{weekMeta.title}</h1>
          <p className={ui.lede}>{weekMeta.why}</p>
          <p className={ui.muted}>
            {weekMeta.level} · {weekMeta.focus} · старт {formatUkDate(plan.startedOn)}
          </p>
          <div className={cx(ui.rowActions, ui.noPrint)}>
            <button type="button" className={ui.btnGhost} onClick={() => window.print()}>
              Друкувати сьогодні
            </button>
          </div>
        </div>
        <div className={ui.photo}>
          <img src="/images/morning.jpg" alt="Коротка розминка на килимку вдома" />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Три відмітки</p>
          <h2>
            {doneCount === 3 ? 'День зібраний.' : `${doneCount} з 3 на сьогодні.`}
          </h2>
          <p className={ui.lede}>Не надолужуй учорашнє. Відміть те, що вже сталося.</p>
          <div className={ui.progress} aria-hidden="true">
            <span style={{ width: `${(doneCount / 3) * 100}%` }} />
          </div>
        </div>
        <div className={ui.dayTasks}>
          {tasks.map((task) => (
            <label className={day[task.id] ? ui.dayTaskDone : ui.dayTask} key={task.id}>
              <input
                type="checkbox"
                checked={day[task.id]}
                onChange={() => toggleDay(task.id)}
              />
              <span>
                <strong>{task.title}</strong>
                <span className={ui.muted}>{task.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.panel}>
          <p className={ui.kicker}>База · 12–15 хвилин</p>
          <h2>Порядок, якщо не хочеться думати.</h2>
          <ol>
            {baseSteps.map((step) => (
              <li key={step.n}>
                <span className={ui.step}>{step.n}</span>
                <span>
                  <strong>{step.title}.</strong> {step.text}
                </span>
              </li>
            ))}
          </ol>
          <Link className={ui.btn} href="/rukh">
            Усі вправи
          </Link>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.cards}>
          <article className={ui.card}>
            <h3>Цей тиждень</h3>
            <p>
              {weekMeta.checks.length} кроки в чеклісті плану. Відмітки тижня — окремо від сьогоднішніх трьох.
            </p>
            <div className={ui.rowActions}>
              <Link className={ui.btnGhost} href="/plan">
                Відкрити план
              </Link>
            </div>
          </article>
          <article className={ui.card}>
            <h3>{cycle ? 'Цикл' : 'Дитина не спала?'}</h3>
            <p>
              {cycle
                ? '12 тижнів пройдено. Лишаєш ходу, тарілку і ці 12 хвилин. Тиждень на карті не стрибає вперед.'
                : 'Повторити тиждень — ще сім днів того самого фокуса. Календар плану просто розтягнеться.'}
            </p>
            <div className={ui.rowActions}>
              <button type="button" className={ui.btnGhost} onClick={repeat}>
                Повторити цей тиждень
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <DeskCard />
      </section>
      <Journal />
    </>
  )
}
