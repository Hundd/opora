import { Link } from 'react-router-dom'
import {
  confidenceNotes,
  dayRhythm,
  familyPrinciples,
  partnerLines,
  playGames,
  withChild,
} from '../data/family'
import { cx, ui } from '../ui'

export function Family() {
  return (
    <>
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>Сім’я</p>
          <h1 className={ui.display}>Здоров’я батька — це інфраструктура дому.</h1>
          <p className={ui.lede}>
            Мала дитина не чекає, поки в тебе буде «час на себе». Тому план вбудований у прогулянку,
            підлогу з кубиками і спільну тарілку. Баланс тут — не ідеальний календар. Це кілька
            повторюваних жестів.
          </p>
        </div>
        <div className={ui.photo}>
          <img src="/images/family.jpg" alt="Батько і дитина грають із м’ячем у дворі" />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.cards}>
          {familyPrinciples.map((item) => (
            <article className={ui.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Ритм дня</p>
          <h2>Чотири точки, не розклад солдата.</h2>
        </div>
        <div className={ui.habitList}>
          {dayRhythm.map((block) => (
            <article className={ui.habit} key={block.when}>
              <span className={ui.kicker}>{block.when}</span>
              <div>
                <strong>{block.title}</strong>
                <p className={ui.muted}>{block.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.split}>
          <div className={ui.copy}>
            <p className={ui.kicker}>Разом із дитиною</p>
            <h2>Рух, який не виглядає як тренування.</h2>
            <p className={ui.lede}>
              Дитина вчиться, дивлячись. Якщо тато рухається без огиди до свого тіла — це урок
              сильніший за будь-яку лекцію про здоров’я.
            </p>
          </div>
          <div className={ui.photo}>
            <img src="/images/hero.jpg" alt="Прогулянка батька з дитиною в парку" />
          </div>
        </div>
        <div className={cx(ui.cards, ui.stackLg)}>
          {withChild.map((item) => (
            <article className={ui.card} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Ігри, не тренування</p>
          <h2>Шість способів рухатись разом. 2–40 хвилин.</h2>
        </div>
        <div className={ui.cards}>
          {playGames.map((game) => (
            <article className={ui.card} key={game.title}>
              <p className={ui.kicker}>{game.time}</p>
              <h3>{game.title}</h3>
              <p>{game.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Мова в парі</p>
          <h2>Союз, не контроль талії.</h2>
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
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <p className={ui.quote}>Впевненість — це рівна спина в дверях і голос, який не поспішає.</p>
        <div className={cx(ui.cards, ui.stackLg)}>
          {confidenceNotes.map((note) => (
            <article className={ui.card} key={note}>
              <p>{note}</p>
            </article>
          ))}
        </div>
        <div className={ui.rowActions}>
          <Link className={ui.btn} to="/plan">
            Зібрати це в 12 тижнів
          </Link>
          <Link className={ui.btnGhost} to="/dlya-nyeyi">
            Коротко для партнерки
          </Link>
        </div>
      </section>
    </>
  )
}
