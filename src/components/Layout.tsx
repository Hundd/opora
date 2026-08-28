import { Link, Outlet } from 'react-router-dom'
import { Disclaimer } from './Disclaimer'
import { Logo } from './Logo'
import { Nav } from './Nav'

export function Layout() {
  return (
    <>
      <a className="skip" href="#main">
        До змісту
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <Link to="/">
            <Logo />
          </Link>
          <span>38 років. Спина, тарілка, дитина.</span>
        </div>
        <p className="install-hint">
          На телефоні: Поділитися → На екран «Домівка». Після першого відкриття працює без мережі.
        </p>
        <Disclaimer />
      </footer>
    </>
  )
}
