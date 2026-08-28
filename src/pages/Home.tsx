import { Link } from 'react-router-dom'
import { Disclaimer } from '../components/Disclaimer'

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
  return (
    <>
      <section className="hero">
        <img src="/images/hero.jpg" alt="Батько веде за руку малу дитину ранковим парком" />
        <div className="wrap hero-copy">
          <p className="kicker">Для чоловіка 38 років</p>
          <h1 className="display">Опора. Спина, їжа, сім’я — без надриву.</h1>
          <p className="lede">
            Тихий план, який можна жити поруч із дитиною. Не нова людина за місяць. Рівна спина,
            легша вага, спокійніший дім.
          </p>
          <div className="row-actions">
            <Link className="btn" to="/plan">
              План на 12 тижнів
            </Link>
            <Link className="btn btn-ghost" to="/rukh">
              Сьогодні 15 хвилин
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Навіщо цей гід</p>
          <h2>38 — не пізно і не «вже все зрозуміло».</h2>
          <p className="lede">
            Є сколіоз і кіфоз, болить спина й шия, десь десять зайвих кілограмів. Є сила — десять
            підтягувань на турніку — і є ціна: шия після них. Є мала дитина. Треба не героїзм, а
            ритм, який не ламає вечір.
          </p>
        </div>
        <div className="pillars">
          {pillars.map((p) => (
            <Link className="pillar" to={p.to} key={p.n}>
              <span className="n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="split">
          <div className="copy">
            <p className="kicker">Повільне входження</p>
            <h2>Якщо важко — план поганий, не ти.</h2>
            <p className="lede">
              Перші тижні — це 12 хвилин на килимку і хода з дитиною. Сила, яка вже є, не
              викидається. Її просто перекладають із «до відказу» на якість. Впевненість з’являється
              не з кубиків на животі, а з обіцянок собі, які ти дотримуєш.
            </p>
            <div className="row-actions">
              <Link className="btn" to="/hrebets">
                Спочатку спина
              </Link>
            </div>
          </div>
          <div className="photo">
            <img src="/images/morning.jpg" alt="Чоловік робить м’яку розминку на килимку вдома" />
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="split reverse">
          <div className="photo">
            <img src="/images/family.jpg" alt="Батько грає з малою дитиною на траві" />
          </div>
          <div className="copy">
            <p className="kicker">Дім важливіший за зал</p>
            <h2>Тренування, яке відбирає сім’ю, помре само.</h2>
            <p className="lede">
              Вечірня хода, гра на підлозі, одна тарілка на всіх. Дитина не заважає плану — вона
              його частина. Коли батько спокійніший і менш злий від болю, виграють усі.
            </p>
            <div className="row-actions">
              <Link className="btn btn-ghost" to="/simya">
                Як укласти це в день
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <div className="today">
          <p className="kicker">Сьогодні</p>
          <h2>П’ятнадцять хвилин, якщо більше не виходить.</h2>
          <ol>
            <li>
              <span className="step">1</span>
              <span>
                <strong>Хвилина дихання животом.</strong> Плечі важкі, видих довший за вдих.
              </span>
            </li>
            <li>
              <span className="step">2</span>
              <span>
                <strong>Вісім кішка–корова.</strong> Довжина хребта, шия не заломлюється вгору.
              </span>
            </li>
            <li>
              <span className="step">3</span>
              <span>
                <strong>Шість птах–собака на бік.</strong> Таз рівний, без гойдалки.
              </span>
            </li>
            <li>
              <span className="step">4</span>
              <span>
                <strong>Підборіддя назад і напіввис 20 секунд.</strong> Якщо турнік дратує шию —
                лиши лише напіввис.
              </span>
            </li>
            <li>
              <span className="step">5</span>
              <span>
                <strong>Хода 20 хвилин</strong> — окремо, з дитиною, якщо виходить. Це вже повний день.
              </span>
            </li>
          </ol>
          <Link className="btn" to="/rukh">
            Усі вправи
          </Link>
        </div>
      </section>

      <section className="section wrap">
        <dl className="facts">
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

      <section className="section wrap">
        <Disclaimer />
      </section>
    </>
  )
}
