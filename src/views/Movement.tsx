import Link from 'next/link'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises, pullupProtocol } from '../data/exercises'
import { cx, ui } from '../ui'

const levels = [
  {
    n: '1',
    weeks: 'Тижні 1–4',
    title: 'Увійти',
    text: '12–15 хвилин, 4 дні. База на килимку, напіввис, хода 20–30 хвилин. Жодних максимумів на турніку.',
  },
  {
    n: '2',
    weeks: 'Тижні 5–8',
    title: 'Додати опору',
    text: 'Місток, присідання до стільця, тяга резинки чи стола, планка з колін. Турнік — за протоколом, двічі на тиждень.',
  },
  {
    n: '3',
    weeks: 'Тижні 9–12',
    title: 'Трохи сили',
    text: 'Ті самі рухи, трохи довші паузи в планці, 3–5 чистих підтягувань. Як тільки шия голосніше за м’язи — крок назад.',
  },
]

export function Movement() {
  return (
    <>
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>Рух</p>
          <h1 className={ui.display}>Сила є. Треба не ламати шию.</h1>
          <p className={ui.lede}>
            Десять підтягувань — це вже капітал. План не відбирає турнік. Він відбирає звичку робити
            їх «на характері». Повільне входження: коротко, часто, чисто.
          </p>
        </div>
        <div className={ui.photo}>
          <img src="/images/morning.jpg" alt="Коротка домашня розминка на килимку" />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Три рівні</p>
          <h2>Кожен наступний лише тоді, коли попередній не болить.</h2>
        </div>
        <div className={ui.levels}>
          {levels.map((level) => (
            <article className={ui.level} key={level.n}>
              <p className={ui.kicker}>Рівень {level.n}</p>
              <h3>{level.title}</h3>
              <p className={ui.muted}>{level.weeks}. {level.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Турнік</p>
          <h2>Протокол замість «зроби десять».</h2>
          <p className={ui.lede}>
            Шия болить, коли плечі знизуються, голова задирається, а останні повтори вже не про
            спину. Двічі на тиждень, не щодня. Стоп за два повтори до відказу.
          </p>
        </div>
        <div className={ui.protocol}>
          {pullupProtocol.map((step) => (
            <article className={ui.protocolStep} key={step.n}>
              <div className={ui.protocolNum}>{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.panel}>
          <p className={ui.kicker}>Кардіо</p>
          <h2>Хода. Не біг, не «жиросжигание».</h2>
          <p className={ui.lede}>
            20–30 хвилин рівним кроком. З візком, за руку, навколо кварталу після вечері. Це і
            мінус калорії, і розвантаження спини, і час із сім’єю. Якщо є сили — додай п’ять хвилин,
            не швидкість.
          </p>
          <Link className={ui.btnGhost} href="/simya">
            Як ходити з дитиною
          </Link>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Бібліотека</p>
          <h2>Усі рухи плану. Коротко, з підказкою.</h2>
        </div>
        <div className={ui.exerciseGrid}>
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>
    </>
  )
}
