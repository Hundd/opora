import Link from 'next/link'
import { partnerPage, partnerLines } from '../data/family'
import { cx, ui } from '../ui'

export function Partner() {
  return (
    <>
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>Для партнерки</p>
          <h1 className={ui.display}>Союз, не контроль талії.</h1>
          <p className={ui.lede}>{partnerPage.lede}</p>
        </div>
        <div className={ui.photo}>
          <img src="/images/family.jpg" alt="Батько і дитина грають у дворі" />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Як допомогти</p>
          <h2>Чотири жести, без дієтолога в парі.</h2>
        </div>
        <div className={ui.cards}>
          {partnerPage.help.map((item) => (
            <article className={ui.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.avoid}>
          <h2>Чого просимо не робити</h2>
          <ul>
            {partnerPage.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Мова</p>
          <h2>Можна так.</h2>
        </div>
        <div className={ui.dialog}>
          {partnerLines.map((line) => (
            <article key={line.good}>
              <p className={ui.bad}>
                <strong>Краще не так. </strong>
                {line.bad}
              </p>
              <p className={ui.good}>
                <strong>Можна так. </strong>
                {line.good}
              </p>
            </article>
          ))}
        </div>
        <div className={ui.rowActions}>
          <Link className={ui.btn} href="/sogodni">
            Як виглядає сьогодні
          </Link>
          <Link className={ui.btnGhost} href="/simya">
            Сторінка сім’ї
          </Link>
        </div>
      </section>
    </>
  )
}
