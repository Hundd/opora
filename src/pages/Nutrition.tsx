import { Link } from 'react-router-dom'
import { GroceryList } from '../components/GroceryList'
import { mealDays, plateParts, rules, weightNotes } from '../data/meals'
import { cx, ui } from '../ui'

export function Nutrition() {
  return (
    <>
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>Харчування</p>
          <h1 className={ui.display}>Мінус десять, без окремої дієти від сім’ї.</h1>
          <p className={ui.lede}>
            Чесний темп — 0,3–0,5 кг на тиждень. Це 5–8 місяців, не весна. Зате спина, сон і характер
            не йдуть за заставу. Одна кухня. Той самий борщ, трохи інша тарілка.
          </p>
        </div>
        <div className={ui.photo}>
          <img
            src="/images/food.jpg"
            alt="Сімейна вечеря: курка, гречка, овочі на великій і дитячій тарілці"
          />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.stats}>
          {weightNotes.map((s) => (
            <article className={ui.stat} key={s.k}>
              <div className={ui.statValue}>{s.k}</div>
              <div className={ui.statUnit}>{s.u}</div>
              <p className={ui.muted}>{s.t}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Правило тарілки</p>
          <h2>Половина овочів. Чверть білка. Чверть крупи.</h2>
        </div>
        <div className={ui.plateWrap}>
          <div className={ui.plate} aria-hidden="true">
            <div className={ui.plateVeg}>Овочі</div>
            <div className={ui.plateProtein}>Білок</div>
            <div className={ui.plateCarb}>Крупа</div>
          </div>
          <div className={ui.cardsOne}>
            {plateParts.map((part) => (
              <article className={ui.card} key={part.id}>
                <h3>
                  {part.label} · {part.share}
                </h3>
                <p>{part.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.cards}>
          {rules.map((rule) => (
            <article className={ui.card} key={rule.title}>
              <h3>{rule.title}</h3>
              <p>{rule.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Приклади днів</p>
          <h2>Українська кухня, не контейнери з куркою-броколі щодня.</h2>
        </div>
        <div className={ui.meals}>
          {mealDays.map((day) => (
            <article className={ui.meal} key={day.id}>
              <h3>{day.title}</h3>
              <p className={ui.muted}>{day.note}</p>
              {day.meals.map((meal) => (
                <div className={ui.mealRow} key={meal.slot}>
                  <strong>{meal.slot}</strong>
                  <span>{meal.dish}</span>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <GroceryList />
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.avoid}>
          <h2>Що не треба</h2>
          <ul>
            <li>Мінус 10 кг за місяць. Це вода, нерви і зрив на вихідних.</li>
            <li>Окрема «татова дієта», поки дитина їсть котлету. Дім так не працює.</li>
            <li>Зважуватись щоранку і оцінювати характер за цифрою.</li>
            <li>Прибирати крупу повністю. Без палива ввечері з’являється холодильник.</li>
          </ul>
          <div className={ui.rowActions}>
            <Link className={ui.btn} to="/plan">
              Вписати їжу в 12 тижнів
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
