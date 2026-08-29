import { Link } from 'react-router-dom'
import { GroceryList } from '../components/GroceryList'
import { mealDays, plateParts, rules, weightNotes } from '../data/meals'

export function Nutrition() {
  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">Харчування</p>
          <h1 className="display">Мінус десять, без окремої дієти від сім’ї.</h1>
          <p className="lede">
            Чесний темп — 0,3–0,5 кг на тиждень. Це 5–8 місяців, не весна. Зате спина, сон і характер
            не йдуть за заставу. Одна кухня. Той самий борщ, трохи інша тарілка.
          </p>
        </div>
        <div className="photo">
          <img
            src="/images/food.jpg"
            alt="Сімейна вечеря: курка, гречка, овочі на великій і дитячій тарілці"
          />
        </div>
      </section>

      <section className="section wrap">
        <div className="stats">
          {weightNotes.map((s) => (
            <article className="stat" key={s.k}>
              <div className="k">{s.k}</div>
              <div className="u">{s.u}</div>
              <p className="muted">{s.t}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Правило тарілки</p>
          <h2>Половина овочів. Чверть білка. Чверть крупи.</h2>
        </div>
        <div className="plate-wrap">
          <div className="plate" aria-hidden="true">
            <div className="plate-veg">Овочі</div>
            <div className="plate-protein">Білок</div>
            <div className="plate-carb">Крупа</div>
          </div>
          <div className="cards cards-one">
            {plateParts.map((part) => (
              <article className="card" key={part.id}>
                <h3>
                  {part.label} · {part.share}
                </h3>
                <p>{part.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="cards">
          {rules.map((rule) => (
            <article className="card" key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Приклади днів</p>
          <h2>Українська кухня, не контейнери з куркою-броколі щодня.</h2>
        </div>
        <div className="meals">
          {mealDays.map((day) => (
            <article className="meal" key={day.id}>
              <h3>{day.title}</h3>
              <p className="muted">{day.note}</p>
              {day.meals.map((meal) => (
                <div className="meal-row" key={meal.slot}>
                  <strong>{meal.slot}</strong>
                  <span>{meal.dish}</span>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <GroceryList />
      </section>

      <section className="section wrap">
        <div className="avoid">
          <h2>Що не треба</h2>
          <ul>
            <li>Мінус 10 кг за місяць. Це вода, нерви і зрив на вихідних.</li>
            <li>Окрема «татова дієта», поки дитина їсть котлету. Дім так не працює.</li>
            <li>Зважуватись щоранку і оцінювати характер за цифрою.</li>
            <li>Прибирати крупу повністю. Без палива ввечері з’являється холодильник.</li>
          </ul>
          <div className="row-actions">
            <Link className="btn" to="/plan">
              Вписати їжу в 12 тижнів
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
