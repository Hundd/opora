import { Link, useNavigate } from 'react-router-dom'
import { Disclaimer } from '../components/Disclaimer'
import { baseSteps } from '../data/today'
import { usePlan } from '../plan-context'
import { cx, ui } from '../ui'
import hero from './Home.module.css'

const pillars = [
  {
    n: '01',
    to: '/hrebets',
    title: 'Хребет',
    text: 'Сколіоз, кіфоз, шия. Не випрямити назавжди — зробити день легшим і поставу свідомою.',
  },
  {
    n: '02',
    to: '/rukh',
    title: 'Рух',
    text: '12–15 хвилин, повільне входження. Турнік лишається, але без гонитви за десятьма повторами.',
  },
  {
    n: '03',
    to: '/harchuvannya',
    title: 'Тарілка',
    text: 'Мінус 10 кг за 5–8 місяців. Одна кухня на сім’ю, без голоду і без окремої дієти тата.',
  },
  {
    n: '04',
    to: '/simya',
    title: 'Сім’я',
    text: 'Мала дитина, баланс, присутність. Здоров’я батька тримає дім, а не навпаки.',
  },
]

export function Home() {
  const navigate = useNavigate()
  const { plan, weekMeta, start, day, dayInWeek } = usePlan()
  const started = Boolean(plan && weekMeta)
  const dayDone = started ? [day.base, day.walk, day.family].filter(Boolean).length : 0

  function startAndGo() {
    start()
    navigate('/sogodni')
  }

  return (
    <>
      <section className={hero.hero}>
        <img src="/images/hero.jpg" alt="Батько веде за руку малу дитину ранковим парком" />
        <div className={cx(ui.wrap, hero.copy)}>
          <p className={cx(ui.kicker, hero.kicker)}>Для чоловіка 38 років</p>
          <h1 className={cx(ui.display, hero.display)}>Опора. Спина, їжа, сім’я — без надриву.</h1>
          <p className={cx(ui.lede, hero.lede)}>
            Тихий план, який можна жити поруч із дитиною. Не нова людина за місяць. Рівна спина,
            легша вага, спокійніший дім.
          </p>
          <div className={cx(ui.rowActions, hero.row)}>
            {started ? (
              <>
                <Link className={ui.btn} to="/sogodni">
                  Сьогодні · {dayDone}/3
                </Link>
                <Link className={cx(ui.btnGhost, hero.ghost)} to="/plan">
                  Тиждень {plan?.week}
                </Link>
              </>
            ) : (
              <>
                <button type="button" className={ui.btn} onClick={startAndGo}>
                  Почати план
                </button>
                <Link className={cx(ui.btnGhost, hero.ghost)} to="/sogodni">
                  Сьогодні 15 хвилин
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Навіщо цей гід</p>
          <h2>38 — не пізно і не «вже все зрозуміло».</h2>
          <p className={ui.lede}>
            Є сколіоз і кіфоз, болить спина й шия, десь десять зайвих кілограмів. Є сила — десять
            підтягувань на турніку — і є ціна: шия після них. Є мала дитина. Треба не героїзм, а
            ритм, який не ламає вечір.
          </p>
        </div>
        <div className={ui.pillars}>
          {pillars.map((p) => (
            <Link className={ui.pillar} to={p.to} key={p.n}>
              <span className={ui.num}>{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.split}>
          <div className={ui.copy}>
            <p className={ui.kicker}>Повільне входження</p>
            <h2>Якщо важко — план поганий, не ти.</h2>
            <p className={ui.lede}>
              Перші тижні — це 12 хвилин на килимку і хода з дитиною. Сила, яка вже є, не
              викидається. Її просто перекладають із «до відказу» на якість. Впевненість з’являється
              не з кубиків на животі, а з обіцянок собі, які ти дотримуєш.
            </p>
            <div className={ui.rowActions}>
              <Link className={ui.btn} to="/hrebets">
                Спочатку спина
              </Link>
            </div>
          </div>
          <div className={ui.photo}>
            <img src="/images/morning.jpg" alt="Чоловік робить м’яку розминку на килимку вдома" />
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.splitReverse}>
          <div className={ui.photo}>
            <img src="/images/family.jpg" alt="Батько грає з малою дитиною на траві" />
          </div>
          <div className={ui.copy}>
            <p className={ui.kicker}>Дім важливіший за зал</p>
            <h2>Тренування, яке відбирає сім’ю, помре само.</h2>
            <p className={ui.lede}>
              Вечірня хода, гра на підлозі, одна тарілка на всіх. Дитина не заважає плану — вона
              його частина. Коли батько спокійніший і менш злий від болю, виграють усі.
            </p>
            <div className={ui.rowActions}>
              <Link className={ui.btnGhost} to="/simya">
                Як укласти це в день
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.panel}>
          <p className={ui.kicker}>
            {started
              ? `Тиждень ${plan?.week} · день ${dayInWeek} · ${weekMeta?.focus}`
              : 'Сьогодні'}
          </p>
          <h2>
            {started
              ? dayDone === 3
                ? 'День зібраний. Можна не додавати.'
                : 'Три відмітки, якщо більше не виходить.'
              : 'П’ятнадцять хвилин, якщо більше не виходить.'}
          </h2>
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
          <div className={ui.rowActions}>
            <Link className={ui.btn} to="/sogodni">
              Відкрити сьогодні
            </Link>
            <Link className={ui.btnGhost} to="/rukh">
              Усі вправи
            </Link>
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <dl className={ui.facts}>
          <h2>Що вважати успіхом через три місяці</h2>
          <div>
            <dt>Спина</dt>
            <dd>Менше днів із болем. Можеш сидіти годину без «затікання» шиї.</dd>
          </div>
          <div>
            <dt>Вага</dt>
            <dd>Мінус 3–6 кг — чесний діапазон. Решта десяти доганяє до літа.</dd>
          </div>
          <div>
            <dt>Турнік</dt>
            <dd>П’ять чистих підтягувань без стрілянини в шиї. Десять — не обов’язок.</dd>
          </div>
          <div>
            <dt>Дім</dt>
            <dd>Є ритуал ходи і 20 хвилин без телефону. Ти спокійніший увечері.</dd>
          </div>
        </dl>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <Disclaimer />
      </section>
    </>
  )
}
