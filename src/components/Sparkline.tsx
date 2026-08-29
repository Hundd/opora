import { ui } from '../ui'
import styles from './Sparkline.module.css'

type Props = {
  values: (number | null)[]
  label: string
  unit?: string
}

export function Sparkline({ values, label, unit = '' }: Props) {
  const points = values
    .map((v, i) => (v == null ? null : { i, v }))
    .filter((p): p is { i: number; v: number } => p !== null)

  if (points.length < 2) {
    return (
      <div>
        <p className={ui.kicker}>{label}</p>
        <p className={ui.muted}>Замало точок для лінії. Це нормально — не треба писати щодня.</p>
      </div>
    )
  }

  const nums = points.map((p) => p.v)
  const min = Math.min(...nums)
  const max = Math.max(...nums)
  const span = max - min || 1
  const w = 320
  const h = 72
  const last = values.length - 1 || 1
  const d = points
    .map((p, idx) => {
      const x = (p.i / last) * w
      const y = h - 6 - ((p.v - min) / span) * (h - 12)
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div>
      <p className={ui.kicker}>{label}</p>
      <svg viewBox={`0 0 ${w} ${h}`} className={styles.svg} role="img" aria-label={label}>
        <path d={d} fill="none" stroke="#2F4A3C" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <p className={ui.muted}>
        {min.toFixed(min >= 20 ? 1 : 0)}
        {unit} → {max.toFixed(max >= 20 ? 1 : 0)}
        {unit}
      </p>
    </div>
  )
}
