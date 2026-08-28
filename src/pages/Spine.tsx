import { Link } from 'react-router-dom'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'

const base = exercises.filter((e) =>
  ['breath', 'chin-tuck', 'pelvic-tilt', 'cat-cow', 'bird-dog', 'wall-angels', 'semi-hang'].includes(
    e.id,
  ),
)

const habits = [
  {
    when: 'Телефон',
    title: 'Підняти екран, не опустити голову',
    text: 'Шия не створена дивитися в живіт по сорок хвилин. Лікті на стіл, телефон вище, підборіддя сховане.',
  },
  {
    when: 'Стілець',
    title: 'Раз на годину встати',
    text: 'Навіть на 60 секунд. Пройтись до вікна. Сколіоз любить одну позу, в якій ти засиджуєшся.',
  },
  {
    when: 'Стояння',
    title: 'Вага на обидві стопи',
    text: 'Не завалюйся в улюблений бік. Ребра над тазом, не живіт уперед і не груди колесом.',
  },
  {
    when: 'Дитина на руках',
    title: 'Міняти бік',
    text: 'Носити завжди на одному стегні — безкоштовний тренажер асиметрії. Чергуй руку й стегно.',
  },
  {
    when: 'Ліжко',
    title: 'Не скролити лежачи',
    text: 'Подушка не надто висока. На спині або на боці. Телефон залишає шию в згині до ночі.',
  },
]

export function Spine() {
  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">Хребет</p>
          <h1 className="display">Не випрямити. Зробити день легшим.</h1>
          <p className="lede">
            У дорослому сколіозі й кіфозі мета інша, ніж у шкільному кабінеті ЛФК. Менше болю,
            краще дихання, контроль постави. Криву «прибрати» обіцянками сайту неможливо — і не
            треба.
          </p>
        </div>
        <div className="photo">
          <img src="/images/spine.jpg" alt="Домашній куток із турніком, килимком і стільцем" />
        </div>
      </section>

      <section className="section wrap">
        <div className="cards">
          <article className="card">
            <h2>Що відомо</h2>
            <p>
              Є сколіоз, кіфоз, погана постава. Болить спина й шия. Турнік дається — десять
              підтягувань — і часто після цього ниє шия. Це не слабкість. Це компенсація: плечі до
              вух, підборіддя вгору, гонитва за числом.
            </p>
          </article>
          <article className="card">
            <h2>Що вважати перемогою</h2>
            <p>
              Встати зранку без «дерев’яної» шиї. Пройти день без знеболювального як звички. Стояти
              в черзі, не завалюючись. Зробити напіввис і вийти з нього спокійним, не розбитим.
            </p>
          </article>
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Мікрозвички</p>
          <h2>Постава збирається не на килимку. На килимку її лише нагадують.</h2>
        </div>
        <div className="habit-list">
          {habits.map((h) => (
            <article className="habit" key={h.when}>
              <span className="kicker">{h.when}</span>
              <div>
                <strong>{h.title}</strong>
                <p className="muted">{h.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <p className="kicker">Рівень 0 · 10–12 хвилин</p>
          <h2>База, з якої починається кожен тиждень.</h2>
          <p className="lede">
            Роби повільно. Якщо якась вправа стріляє — пропусти її. Не збирай «повний комплекс через
            біль».
          </p>
        </div>
        <div className="exercise-grid">
          {base.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <div className="avoid">
          <h2>На старті краще не робити</h2>
          <ul>
            <li>Підтягування до відказу з поглядом у стелю і плечима біля вух.</li>
            <li>Важкі станові та присідання зі штангою, поки немає контролю корпуса.</li>
            <li>Глибокі скручування, «російський твіст», різкі нахили вбік з вагою.</li>
            <li>Біг і стрибки як перше кардіо — для хребта зараз корисніша хода.</li>
          </ul>
          <div className="row-actions">
            <Link className="btn" to="/rukh">
              Безпечний протокол турніка
            </Link>
          </div>
        </div>
      </section>

      <section className="section wrap">
        <article className="card">
          <h2>Коли до лікаря, не до килимка</h2>
          <ul className="red-flags muted">
            <li>Оніміння, слабкість у руці чи нозі, біль, що віддає нижче коліна.</li>
            <li>Нічний біль, що будить, або біль після травми.</li>
            <li>Запаморочення, нудота, «іскри» в очах під час вправ для шиї.</li>
            <li>Крива, яка помітно змінюється, або біль, що лише наростає три тижні.</li>
          </ul>
        </article>
      </section>
    </>
  )
}
