import { Link } from 'react-router-dom'
import { partnerPage, partnerLines } from '../data/family'

export function Partner() {
  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">Для партнерки</p>
          <h1 className="display">Союз, не контроль талії.</h1>
          <p className="lede">{partnerPage.lede}</p>
        </div>
        <div className="photo">
          <img src="/images/family.jpg" alt="Батько і дитина грають у дворі" />
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Як допомогти</p>
          <h2>Чотири жести, без дієтолога в парі.</h2>
        </div>
        <div className="cards">
          {partnerPage.help.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="avoid">
          <h2>Чого просимо не робити</h2>
          <ul>
            {partnerPage.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Мова</p>
          <h2>Можна так.</h2>
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
        <div className="row-actions">
          <Link className="btn" to="/sogodni">
            Як виглядає сьогодні
          </Link>
          <Link className="btn btn-ghost" to="/simya">
            Сторінка сім’ї
          </Link>
        </div>
      </section>
    </>
  )
}
