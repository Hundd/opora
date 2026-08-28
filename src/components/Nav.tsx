import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks } from '../data/nav'
import { Logo } from './Logo'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className={`nav${open ? ' open' : ''}`}>
      <div className="wrap nav-inner">
        <NavLink to="/" onClick={() => setOpen(false)} aria-label="На головну">
          <Logo />
        </NavLink>
        <nav className="nav-links" aria-label="Основне меню">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/sogodni" className="btn" onClick={() => setOpen(false)}>
            15 хвилин
          </Link>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
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
