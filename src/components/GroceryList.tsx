import { useState } from 'react'
import { groceries } from '../data/groceries'
import { loadGroceries, saveGroceries } from '../storage'

export function GroceryList() {
  const [checks, setChecks] = useState<Record<string, boolean>>(loadGroceries)
  const done = groceries.filter((item) => checks[item.id]).length

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
      <div className="section-head">
        <p className="kicker">Список на тиждень</p>
        <h2>З тих самих днів, що в меню. Не окрема дієта.</h2>
        <p className="lede">
          {done} з {groceries.length}. Відмітив у магазині — лишається в цьому телефоні.
        </p>
      </div>
      <div className="grocery-grid">
        {groceries.map((item) => (
          <label className={`check${checks[item.id] ? ' done' : ''}`} key={item.id}>
            <input type="checkbox" checked={Boolean(checks[item.id])} onChange={() => toggle(item.id)} />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      <div className="row-actions">
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Очистити список
        </button>
      </div>
    </div>
  )
}
