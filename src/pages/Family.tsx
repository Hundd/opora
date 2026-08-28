import { Link } from 'react-router-dom'
import {
  confidenceNotes,
  dayRhythm,
  familyPrinciples,
  partnerLines,
  playGames,
  withChild,
} from '../data/family'

export function Family() {
  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">Сім’я</p>
          <h1 className="display">Здоров’я батька — це інфраструктура дому.</h1>
          <p className="lede">
            Мала дитина не чекає, поки в тебе буде «час на себе». Тому план вбудований у прогулянку,
            підлогу з кубиками і спільну тарілку. Баланс тут — не ідеальний календар. Це кілька
            повторюваних жестів.
          </p>
        </div>
        <div className="photo">
          <img src="/images/family.jpg" alt="Батько і дитина грають із м’ячем у дворі" />
        </div>
      </section>

      <section className="section wrap">
        <div className="cards">
          {familyPrinciples.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Ритм дня</p>
          <h2>Чотири точки, не розклад солдата.</h2>
        </div>
        <div className="habit-list">
          {dayRhythm.map((block) => (
            <article className="habit" key={block.when}>
              <span className="kicker">{block.when}</span>
              <div>
                <strong>{block.title}</strong>
                <p className="muted">{block.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="copy">
            <p className="kicker">Разом із дитиною</p>
            <h2>Рух, який не виглядає як тренування.</h2>
            <p className="lede">
              Дитина вчиться, дивлячись. Якщо тато рухається без огиди до свого тіла — це урок
              сильніший за будь-яку лекцію про здоров’я.
            </p>
          </div>
          <div className="photo">
            <img src="/images/hero.jpg" alt="Прогулянка батька з дитиною в парку" />
          </div>
        </div>
        <div className="cards" style={{ marginTop: 28 }}>
          {withChild.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Ігри, не тренування</p>
          <h2>Шість способів рухатись разом. 2–40 хвилин.</h2>
        </div>
        <div className="cards">
          {playGames.map((game) => (
            <article className="card" key={game.title}>
              <p className="kicker">{game.time}</p>
              <h3>{game.title}</h3>
              <p>{game.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Мова в парі</p>
          <h2>Союз, не контроль талії.</h2>
        </div>
        <div className="dialog">
          {partnerLines.map((line) => (
            <article key={line.good}>
              <p className="bad">
                <strong>Краще не так. </strong>
                {line.bad}
              </p>
              <p className="good">
                <strong>Можна так. </strong>
                {line.good}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <p className="quote">Впевненість — це рівна спина в дверях і голос, який не поспішає.</p>
        <div className="cards" style={{ marginTop: 28 }}>
          {confidenceNotes.map((note) => (
            <article className="card" key={note}>
              <p>{note}</p>
            </article>
          ))}
        </div>
        <div className="row-actions">
          <Link className="btn" to="/plan">
            Зібрати це в 12 тижнів
          </Link>
          <Link className="btn btn-ghost" to="/dlya-nyeyi">
            Коротко для партнерки
          </Link>
        </div>
      </section>
    </>
  )
}
