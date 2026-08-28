import { Link } from 'react-router-dom'
import { WeekChecklist } from '../components/WeekChecklist'

export function Plan() {
  return (
    <>
      <section className="page-hero wrap">
        <div>
          <p className="kicker">12 тижнів</p>
          <h1 className="display">Вхід, не фініш.</h1>
          <p className="lede">
            Кожен тиждень — один фокус. Якщо захворів або дитина не спала — тиждень можна повторити.
            Після дванадцятого не «нова людина». Повторюєш рівень 2–3, поки вага доганяє.
          </p>
        </div>
        <div className="photo">
          <img src="/images/spine.jpg" alt="Спокійний домашній простір для короткого тренування" />
        </div>
      </section>

      <section className="section wrap">
        <div className="cards">
          <article className="card">
            <h3>Скільки часу</h3>
            <p>12–15 хвилин вправи + 20–30 хвилин ходи в більшість днів. Не 90 хвилин залу.</p>
          </article>
          <article className="card">
            <h3>Що важливіше за цифри</h3>
            <p>Сон, білок, хода, шия без стрілянини. Ваги — раз на тиждень, без суду.</p>
          </article>
          <article className="card">
            <h3>Якщо зірвався</h3>
            <p>Наступний короткий день. Не «з понеділка». План живе, поки живе дім.</p>
          </article>
          <article className="card">
            <h3>Після 12 тижнів</h3>
            <p>
              Мінус 10 кг ще може бути в дорозі — і це нормально. Залишаєш три звички: хода, тарілка,
              ранкові 12 хвилин.
            </p>
          </article>
        </div>
      </section>

      <section className="section wrap">
        <WeekChecklist />
      </section>

      <section className="section wrap">
        <div className="today">
          <p className="kicker">Не знаєш, з чого</p>
          <h2>Відкрий перший тиждень і зроби базу сьогодні.</h2>
          <p className="lede">
            Дихання, кішка–корова, птах–собака, підборіддя, напіввис. Потім хода. Цього досить, щоб
            вважати день виконаним.
          </p>
          <div className="row-actions">
            <Link className="btn" to="/rukh">
              Відкрити вправи
            </Link>
            <Link className="btn btn-ghost" to="/hrebets">
              Нагадати про спину
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
