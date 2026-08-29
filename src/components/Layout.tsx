import type { ReactNode } from 'react'
import Link from 'next/link'
import { cx, ui } from '../ui'
import { Disclaimer } from './Disclaimer'
import { Logo } from './Logo'
import { Nav } from './Nav'
import styles from './Layout.module.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className={styles.skip} href="#main">
        До змісту
      </a>
      <Nav />
      <main id="main">{children}</main>
      <footer className={cx(styles.footer, ui.wrap)}>
        <div className={styles.top}>
          <Link href="/">
            <Logo />
          </Link>
          <span>38 років. Спина, тарілка, дитина.</span>
        </div>
        <p className={styles.hint}>
          На телефоні: Поділитися → На екран «Домівка». Після першого відкриття працює без мережі.
          {' · '}
          <Link href="/dlya-nyeyi">Для партнерки</Link>
        </p>
        <Disclaimer />
      </footer>
    </>
  )
}
