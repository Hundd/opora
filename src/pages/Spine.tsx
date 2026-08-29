import { Link } from 'react-router-dom'
import { DeskCard } from '../components/DeskCard'
import { ExerciseCard } from '../components/ExerciseCard'
import { exercises } from '../data/exercises'
import { cx, ui } from '../ui'

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
      <section className={cx(ui.pageHero, ui.wrap)}>
        <div>
          <p className={ui.kicker}>Хребет</p>
          <h1 className={ui.display}>Не випрямити. Зробити день легшим.</h1>
          <p className={ui.lede}>
            У дорослому сколіозі й кіфозі мета інша, ніж у шкільному кабінеті ЛФК. Менше болю,
            краще дихання, контроль постави. Криву «прибрати» обіцянками сайту неможливо — і не
            треба.
          </p>
        </div>
        <div className={ui.photo}>
          <img src="/images/spine.jpg" alt="Домашній куток із турніком, килимком і стільцем" />
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.cards}>
          <article className={ui.card}>
            <h2>Що відомо</h2>
            <p>
              Є сколіоз, кіфоз, погана постава. Болить спина й шия. Турнік дається — десять
              підтягувань — і часто після цього ниє шия. Це не слабкість. Це компенсація: плечі до
              вух, підборіддя вгору, гонитва за числом.
            </p>
          </article>
          <article className={ui.card}>
            <h2>Що вважати перемогою</h2>
            <p>
              Встати зранку без «дерев’яної» шиї. Пройти день без знеболювального як звички. Стояти
              в черзі, не завалюючись. Зробити напіввис і вийти з нього спокійним, не розбитим.
            </p>
          </article>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Мікрозвички</p>
          <h2>Постава збирається не на килимку. На килимку її лише нагадують.</h2>
        </div>
        <div className={ui.habitList}>
          {habits.map((h) => (
            <article className={ui.habit} key={h.when}>
              <span className={ui.kicker}>{h.when}</span>
              <div>
                <strong>{h.title}</strong>
                <p className={ui.muted}>{h.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.sectionHead}>
          <p className={ui.kicker}>Рівень 0 · 10–12 хвилин</p>
          <h2>База, з якої починається кожен тиждень.</h2>
          <p className={ui.lede}>
            Роби повільно. Якщо якась вправа стріляє — пропусти її. Не збирай «повний комплекс через
            біль».
          </p>
        </div>
        <div className={ui.exerciseGrid}>
          {base.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <DeskCard />
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <div className={ui.avoid}>
          <h2>На старті краще не робити</h2>
          <ul>
            <li>Підтягування до відказу з поглядом у стелю і плечима біля вух.</li>
            <li>Важкі станові та присідання зі штангою, поки немає контролю корпуса.</li>
            <li>Глибокі скручування, «російський твіст», різкі нахили вбік з вагою.</li>
            <li>Біг і стрибки як перше кардіо — для хребта зараз корисніша хода.</li>
          </ul>
          <div className={ui.rowActions}>
            <Link className={ui.btn} to="/rukh">
              Безпечний протокол турніка
            </Link>
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.wrap)}>
        <article className={ui.card}>
          <h2>Коли до лікаря, не до килимка</h2>
          <ul className={cx(ui.redFlags, ui.muted)}>
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
