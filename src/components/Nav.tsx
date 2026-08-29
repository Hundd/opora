'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks } from '../data/nav'
import { cx, ui } from '../ui'
import { Logo } from './Logo'
import styles from './Nav.module.css'

function samePath(pathname: string, href: string) {
  const a = pathname.replace(/\/$/, '') || '/'
  const b = href.replace(/\/$/, '') || '/'
  return a === b
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const btnRef = useRef<HTMLButtonElement>(null)
  const firstRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!open) return
    firstRef.current?.focus()
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        btnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={cx(styles.root, open && styles.open)}>
      <div className={cx(ui.wrap, styles.inner)}>
        <Link href="/" onClick={() => setOpen(false)} aria-label="На головну">
          <Logo />
        </Link>
        <nav className={styles.links} id="site-nav" aria-label="Основне меню">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              href={link.to}
              ref={i === 0 ? firstRef : undefined}
              className={cx(styles.link, samePath(pathname, link.to) && styles.active)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/sogodni" className={cx(ui.btn, styles.cta)} onClick={() => setOpen(false)}>
            15 хвилин
          </Link>
        </nav>
        <button
          type="button"
          ref={btnRef}
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
