import { deskSteps } from '../data/desk'
import { usePlan } from '../plan-context'

export function DeskCard() {
  const { day, toggleDay } = usePlan()

  return (
    <div className="today">
      <p className="kicker">Раз на годину · 60 секунд</p>
      <h2>Робоча пауза. Не тренування.</h2>
      <ol>
        {deskSteps.map((step) => (
          <li key={step.n}>
            <span className="step">{step.n}</span>
            <span>
              <strong>{step.title}.</strong> {step.text}
            </span>
          </li>
        ))}
      </ol>
      <label className={`day-task${day.desk ? ' done' : ''}`}>
        <input type="checkbox" checked={day.desk} onChange={() => toggleDay('desk')} />
        <span>
          <strong>Сьогодні вже вставав</strong>
          <span className="muted">Однієї паузи досить, щоб вважати звичку живою.</span>
        </span>
      </label>
    </div>
  )
}
