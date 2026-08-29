import { ui } from '../ui'

export function Logo() {
  return (
    <span className={ui.logo}>
      <svg className={ui.logoMark} viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2F4A3C" />
        <path
          d="M16 7.5c1.4 1.6 2.2 3.4 2.2 5.4 0 2-.8 3.8-2.2 5.4-1.4-1.6-2.2-3.4-2.2-5.4 0-2 .8-3.8 2.2-5.4Z"
          stroke="#F6F1E8"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M16 7.5V24.5" stroke="#F6F1E8" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 24.5h8" stroke="#C46A3A" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Опора
    </span>
  )
}
