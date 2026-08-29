'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { WeekChecklist } from '../components/WeekChecklist'
import { usePlan } from '../plan-context'
import { formatUkDate } from '../storage'
import { cx, ui } from '../ui'

export function Plan() {
  const router = useRouter()
  const { plan, weekMeta, dayInWeek, start, repeat, resetPlan } = usePlan()
  const started = Boolean(plan && weekMeta)

  function startAndGo() {
    start()
    router.push('/sogodni')
  }

  return (
    <>
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>12 тижнів</p>
          <h1 className={ui.display}>Вхід, не фініш.</h1>
          <p className={ui.lede}>
            Кожен тиждень — один фокус. Якщо захворів або дитина не спала — тиждень можна повторити.
            Після дванадцятого не «нова людина». Повторюєш рівень 2–3, поки вага доганяє.
          </p>
          {started && plan && weekMeta ? (
            <p className={ui.lede}>
              Зараз: {plan.mode === 'cycle' ? 'цикл' : `тиждень ${plan.week}`}, «{weekMeta.title}»,
              день {dayInWeek} з 7. Старт {formatUkDate(plan.startedOn)}.
            </p>
          ) : (
            <div className={ui.rowActions}>
              <button type="button" className={ui.btn} onClick={startAndGo}>
                Почати план сьогодні
              </button>
              <Link className={ui.btnGhost} href="/sogodni">
                Спочатку сьогодні
              </Link>
            </div>
          )}
        </div>
        <div className={ui.photo}>
          <img src="/images/spine.jpg" alt="Спокійний домашній простір для короткого тренування" />
        </div>
      </section>

      {started && plan ? (
        <section className={cx(ui.section, ui.wrap)}>
          <div className={ui.panel}>
            <p className={ui.kicker}>{plan.mode === 'cycle' ? 'Цикл' : `Тиждень ${plan.week}`}</p>
            <h2>{weekMeta?.title}. {weekMeta?.focus}.</h2>
            <p className={ui.lede}>{weekMeta?.why}</p>
            <div className={ui.rowActions}>
              <Link className={ui.btn} href="/sogodni">
                Відкрити сьогодні
              </Link>
              <button type="button" className={ui.btnGhost} onClick={repeat}>
                Повторити цей тиждень
              </button>
              <button type="button" className={cx(ui.btnGhost, ui.noPrint)} onClick={() => window.print()}>
                Друкувати тиждень
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.cards}>
          <article className={ui.card}>
            <h3>Скільки часу</h3>
            <p>12–15 хвилин вправи + 20–30 хвилин ходи в більшість днів. Не 90 хвилин залу.</p>
          </article>
          <article className={ui.card}>
            <h3>Що важливіше за цифри</h3>
            <p>Сон, білок, хода, шия без стрілянини. Ваги — раз на тиждень, без суду.</p>
          </article>
          <article className={ui.card}>
            <h3>Якщо зірвався</h3>
            <p>Наступний короткий день. Не «з понеділка». План живе, поки живе дім.</p>
          </article>
          <article className={ui.card}>
            <h3>Після 12 тижнів</h3>
            <p>
              Мінус 10 кг ще може бути в дорозі — і це нормально. Залишаєш три звички: хода, тарілка,
              ранкові 12 хвилин.
            </p>
          </article>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <WeekChecklist key={plan?.week ?? 0} currentWeek={plan?.week ?? 0} />
        {started ? (
          <div className={ui.rowActions}>
            <button type="button" className={ui.btnGhost} onClick={resetPlan}>
              Скинути дату старту
            </button>
          </div>
        ) : null}
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.panel}>
          <p className={ui.kicker}>Не знаєш, з чого</p>
          <h2>Зроби базу сьогодні. План підхопить сам.</h2>
          <p className={ui.lede}>
            Дихання, кішка–корова, птах–собака, підборіддя, напіввис. Потім хода. Цього досить, щоб
            вважати день виконаним.
          </p>
          <div className={ui.rowActions}>
            <Link className={ui.btn} href="/sogodni">
              Сьогодні
            </Link>
            <Link className={ui.btnGhost} href="/rukh">
              Відкрити вправи
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
