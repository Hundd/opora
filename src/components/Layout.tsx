import { Link, Outlet } from 'react-router-dom'
import { cx, ui } from '../ui'
import { Disclaimer } from './Disclaimer'
import { Logo } from './Logo'
import { Nav } from './Nav'
import { PageMeta } from './PageMeta'
import styles from './Layout.module.css'

export function Layout() {
  return (
    <>
      <PageMeta />
      <a className={styles.skip} href="#main">
        До змісту
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <footer className={cx(styles.footer, ui.wrap)}>
        <div className={styles.top}>
          <Link to="/">
            <Logo />
          </Link>
          <span>38 років. Спина, тарілка, дитина.</span>
        </div>
        <p className={styles.hint}>
          На телефоні: Поділитися → На екран «Домівка». Після першого відкриття працює без мережі.
          {' · '}
          <Link to="/dlya-nyeyi">Для партнерки</Link>
        </p>
        <Disclaimer />
      </footer>
    </>
  )
}
