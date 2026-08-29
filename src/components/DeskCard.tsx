'use client'

import { deskSteps } from '../data/desk'
import { usePlan } from '../plan-context'
import { ui } from '../ui'

export function DeskCard() {
  const { day, toggleDay } = usePlan()

  return (
    <div className={ui.panel}>
      <p className={ui.kicker}>Раз на годину · 60 секунд</p>
      <h2>Робоча пауза. Не тренування.</h2>
      <ol>
        {deskSteps.map((step) => (
          <li key={step.n}>
            <span className={ui.step}>{step.n}</span>
            <span>
              <strong>{step.title}.</strong> {step.text}
            </span>
          </li>
        ))}
      </ol>
      <label className={day.desk ? ui.dayTaskDone : ui.dayTask}>
        <input type="checkbox" checked={day.desk} onChange={() => toggleDay('desk')} />
        <span>
          <strong>Сьогодні вже вставав</strong>
          <span className={ui.muted}>Однієї паузи досить, щоб вважати звичку живою.</span>
        </span>
      </label>
    </div>
  )
}
