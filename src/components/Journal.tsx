'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { usePlan } from '../plan-context'
import { exportBackup, getDay, importBackup, lastDays } from '../storage'
import { cx, ui } from '../ui'
import { Sparkline } from './Sparkline'
import styles from './Journal.module.css'

const painLabels = ['немає', 'ледь', 'трохи', 'середньо', 'сильний', 'дуже']

export function Journal() {
  const { day, setPain, setWalkMin, logWeight, weekWeight, weights } = usePlan()
  const fileRef = useRef<HTMLInputElement>(null)
  const [kg, setKg] = useState('')
  const [note, setNote] = useState<string | null>(null)

  const [painSeries, setPainSeries] = useState<(number | null)[]>(() => Array(14).fill(null))
  const weightSeries = weights.map((w) => w.kg)

  useEffect(() => {
    setPainSeries(lastDays(14).map((d) => getDay(d).pain))
  }, [day])

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
    <section className={cx(ui.section, ui.wrap)}>
      <div className={ui.sectionHead}>
        <p className={ui.kicker}>Тихий зошит</p>
        <h2>Три поля. Без суду за день.</h2>
        <p className={ui.lede}>Біль — якщо згадав увечері. Хода — хвилини. Вага — раз на тиждень, вранці.</p>
      </div>

      <div className={styles.grid}>
        <div className={ui.card}>
          <h3>Біль спини чи шиї</h3>
          <p className={ui.muted}>0 — тихо. 5 — зупинись і не «перетерпи».</p>
          <div className={styles.pain} role="group" aria-label="Оцінка болю">
            {painLabels.map((label, n) => (
              <button
                type="button"
                key={n}
                className={day.pain === n ? styles.painOn : styles.painBtn}
                onClick={() => setPain(day.pain === n ? null : n)}
              >
                <strong>{n}</strong>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={ui.card}>
          <h3>Хода, хвилини</h3>
          <p className={ui.muted}>Якщо ходив — скільки. Порожнє теж ок.</p>
          <label className={styles.field}>
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

        <div className={ui.card}>
          <h3>Вага</h3>
          {weekWeight ? (
            <p>
              Цього тижня вже {weekWeight.kg} кг. Наступного разу — наступного тижня. Без оцінки характеру.
            </p>
          ) : (
            <form onSubmit={onWeight} className={styles.weightForm}>
              <label className={styles.field}>
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
              <button type="submit" className={ui.btn}>
                Записати раз
              </button>
            </form>
          )}
        </div>
      </div>

      <div className={cx(ui.cards, ui.stack)}>
        <Sparkline values={painSeries} label="Біль · 14 днів" />
        <Sparkline values={weightSeries} label="Вага · тренд" unit=" кг" />
      </div>

      {note ? <p className={cx(ui.cue, ui.stackSm)}>{note}</p> : null}

      <div className={ui.rowActions}>
        <button type="button" className={ui.btnGhost} onClick={download}>
          Експорт зошита
        </button>
        <button type="button" className={ui.btnGhost} onClick={() => fileRef.current?.click()}>
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
