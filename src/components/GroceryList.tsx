'use client'

import { useEffect, useState } from 'react'
import { groceries } from '../data/groceries'
import { loadGroceries, saveGroceries } from '../storage'
import { cx, ui } from '../ui'
import styles from './GroceryList.module.css'

export function GroceryList() {
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const done = groceries.filter((item) => checks[item.id]).length

  useEffect(() => {
    setChecks(loadGroceries())
  }, [])

  function toggle(id: string) {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveGroceries(next)
      return next
    })
  }

  function reset() {
    saveGroceries({})
    setChecks({})
  }

  return (
    <div>
      <div className={ui.sectionHead}>
        <p className={ui.kicker}>Список на тиждень</p>
        <h2>З тих самих днів, що в меню. Не окрема дієта.</h2>
        <p className={ui.lede}>
          {done} з {groceries.length}. Відмітив у магазині — лишається в цьому телефоні.
        </p>
      </div>
      <div className={styles.grid}>
        {groceries.map((item) => (
          <label className={cx(ui.check, checks[item.id] && ui.checkDone)} key={item.id}>
            <input type="checkbox" checked={Boolean(checks[item.id])} onChange={() => toggle(item.id)} />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <div className={ui.rowActions}>
        <button type="button" className={ui.btnGhost} onClick={reset}>
          Очистити список
        </button>
      </div>
    </div>
  )
}
