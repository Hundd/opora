import { useRef, useState, type FormEvent } from 'react'
import { usePlan } from '../plan-context'
import { exportBackup, getDay, importBackup, lastDays } from '../storage'
import { Sparkline } from './Sparkline'

const painLabels = ['немає', 'ледь', 'трохи', 'середньо', 'сильний', 'дуже']

export function Journal() {
  const { day, setPain, setWalkMin, logWeight, weekWeight, weights } = usePlan()
  const fileRef = useRef<HTMLInputElement>(null)
  const [kg, setKg] = useState('')
  const [note, setNote] = useState<string | null>(null)

  const painSeries = lastDays(14).map((d) => getDay(d).pain)
  const weightSeries = weights.map((w) => w.kg)

  function onWeight(e: FormEvent) {
    e.preventDefault()
    const value = Number(kg.replace(',', '.'))
    if (!Number.isFinite(value) || value < 40 || value > 250) {
      setNote('Вкажи вагу в кілограмах, без драм.')
      return
    }
    const ok = logWeight(Math.round(value * 10) / 10)
    setNote(ok ? 'Записано на цей тиждень. Наступне зважування — за сім днів.' : 'Цього тижня вже є цифра. Не треба другої.')
    if (ok) setKg('')
  }

  function download() {
    const blob = new Blob([exportBackup()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'opora-zoshyt.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function onImport(file: File | undefined) {
    if (!file) return
    file.text().then((text) => {
      const ok = importBackup(text)
      setNote(ok ? 'Імпортовано. Оновлюю сторінку.' : 'Файл не схожий на зошит Опори.')
      if (ok) window.location.reload()
    })
  }

  return (
    <section className="section wrap">
      <div className="section-head">
        <p className="kicker">Тихий зошит</p>
        <h2>Три поля. Без суду за день.</h2>
        <p className="lede">Біль — якщо згадав увечері. Хода — хвилини. Вага — раз на тиждень, вранці.</p>
      </div>

      <div className="journal">
        <div className="card">
          <h3>Біль спини чи шиї</h3>
          <p className="muted">0 — тихо. 5 — зупинись і не «перетерпи».</p>
          <div className="pain-scale" role="group" aria-label="Оцінка болю">
            {painLabels.map((label, n) => (
              <button
                type="button"
                key={n}
                className={day.pain === n ? 'on' : ''}
                onClick={() => setPain(day.pain === n ? null : n)}
              >
                <strong>{n}</strong>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Хода, хвилини</h3>
          <p className="muted">Якщо ходив — скільки. Порожнє теж ок.</p>
          <label className="field">
            <input
              type="number"
              min={0}
              max={180}
              inputMode="numeric"
              value={day.walkMin || ''}
              onChange={(e) => setWalkMin(Number(e.target.value))}
              placeholder="наприклад 25"
            />
            <span>хв</span>
          </label>
        </div>

        <div className="card">
          <h3>Вага</h3>
          {weekWeight ? (
            <p>
              Цього тижня вже {weekWeight.kg} кг. Наступного разу — наступного тижня. Без оцінки характеру.
            </p>
          ) : (
            <form onSubmit={onWeight} className="weight-form">
              <label className="field">
                <input
                  type="number"
                  step="0.1"
                  min={40}
                  max={250}
                  inputMode="decimal"
                  value={kg}
                  onChange={(e) => setKg(e.target.value)}
                  placeholder="кг"
                />
                <span>кг</span>
              </label>
              <button type="submit" className="btn">
                Записати раз
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="cards" style={{ marginTop: 20 }}>
        <Sparkline values={painSeries} label="Біль · 14 днів" />
        <Sparkline values={weightSeries} label="Вага · тренд" unit=" кг" />
      </div>

      {note ? <p className="cue" style={{ marginTop: 16 }}>{note}</p> : null}

      <div className="row-actions">
        <button type="button" className="btn btn-ghost" onClick={download}>
          Експорт зошита
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
          Імпорт
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => onImport(e.target.files?.[0])}
        />
      </div>
    </section>
  )
}
