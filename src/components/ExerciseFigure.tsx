import type { ReactNode } from 'react'
import { ui } from '../ui'

const stroke = {
  fill: 'none',
  stroke: '#2F4A3C',
  strokeWidth: 2.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function Head({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={8} {...stroke} />
}

function Caption({ children }: { children: string }) {
  return <p className={ui.figureCue}>{children}</p>
}

const figures: Record<string, { view: string; drawing: ReactNode; cue: string }> = {
  breath: {
    view: '0 0 160 110',
    cue: 'Живіт піднімається. Плечі важкі.',
    drawing: (
      <>
        <Head cx={42} cy={38} />
        <path d="M50 42 L78 48 L118 48" {...stroke} />
        <path d="M78 48 L78 72 L118 72 L124 48" {...stroke} />
        <path d="M78 72 L70 96 M118 72 L128 96" {...stroke} />
        <path d="M96 52 Q100 64 96 70" {...stroke} stroke="#C46A3A" />
      </>
    ),
  },
  'chin-tuck': {
    view: '0 0 160 110',
    cue: 'Підборіддя ховається. Погляд прямо.',
    drawing: (
      <>
        <path d="M40 96 L40 28" {...stroke} />
        <Head cx={62} cy={32} />
        <path d="M54 40 L40 52 L40 78 L58 96 L78 96" {...stroke} />
        <path d="M72 36 L88 36" {...stroke} stroke="#C46A3A" />
        <path d="M82 32 L88 36 L82 40" {...stroke} stroke="#C46A3A" />
      </>
    ),
  },
  'pelvic-tilt': {
    view: '0 0 160 110',
    cue: 'Поперек до підлоги. Не місток.',
    drawing: (
      <>
        <Head cx={36} cy={40} />
        <path d="M44 44 L90 50 L128 50" {...stroke} />
        <path d="M90 50 L90 78 L118 90 M90 78 L70 96" {...stroke} />
        <path d="M70 58 Q88 62 108 58" {...stroke} stroke="#C46A3A" />
      </>
    ),
  },
  'cat-cow': {
    view: '0 0 160 110',
    cue: 'Довжина, не прогин у шиї.',
    drawing: (
      <>
        <Head cx={38} cy={48} />
        <path d="M46 52 L70 58 Q96 44 122 58 L138 62" {...stroke} />
        <path d="M70 58 L62 92 M122 58 L130 92" {...stroke} />
        <path d="M70 58 L58 44 M122 58 L136 44" {...stroke} />
      </>
    ),
  },
  'bird-dog': {
    view: '0 0 160 110',
    cue: 'Таз рівний. Не розхлюпай склянку.',
    drawing: (
      <>
        <Head cx={28} cy={40} />
        <path d="M36 46 L78 50 L118 50" {...stroke} />
        <path d="M78 50 L70 88 M118 50 L126 40" {...stroke} />
        <path d="M78 50 L54 34" {...stroke} />
        <path d="M118 50 L142 78" {...stroke} />
      </>
    ),
  },
  'wall-angels': {
    view: '0 0 160 110',
    cue: 'Ребра на стіні. Коротший рух — ок.',
    drawing: (
      <>
        <path d="M28 16 L28 100" {...stroke} stroke="#C46A3A" />
        <Head cx={52} cy={24} />
        <path d="M52 32 L52 78" {...stroke} />
        <path d="M52 44 L78 28 M52 44 L78 52" {...stroke} />
        <path d="M52 78 L40 100 M52 78 L64 100" {...stroke} />
      </>
    ),
  },
  'semi-hang': {
    view: '0 0 160 110',
    cue: 'Ноги на підлозі. Шия довга.',
    drawing: (
      <>
        <path d="M36 18 L124 18" {...stroke} stroke="#C46A3A" />
        <path d="M58 18 L58 42 M102 18 L102 42" {...stroke} />
        <path d="M58 42 L80 70 L102 42" {...stroke} />
        <Head cx={80} cy={82} />
        <path d="M80 90 L68 104 M80 90 L92 104" {...stroke} />
      </>
    ),
  },
  bridge: {
    view: '0 0 160 110',
    cue: 'Сідниці працюють. Ребра важкі.',
    drawing: (
      <>
        <Head cx={34} cy={58} />
        <path d="M42 58 L88 42 L128 58" {...stroke} />
        <path d="M88 42 L88 58" {...stroke} />
        <path d="M128 58 L128 90 L108 90 M42 70 L28 90" {...stroke} />
      </>
    ),
  },
}

export function ExerciseFigure({ id }: { id: string }) {
  const fig = figures[id]
  if (!fig) return null
  return (
    <div className={ui.figure}>
      <svg viewBox={fig.view} aria-hidden="true">
        {fig.drawing}
      </svg>
      <Caption>{fig.cue}</Caption>
    </div>
  )
}
