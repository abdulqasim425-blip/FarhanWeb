import { useState, useEffect } from 'react'
import { profile } from '../data.js'

const links = [
  ['Services', '#services'],
  ['Work', '#work'],
  ['Process', '#process'],
  ['Pricing', '#pricing'],
  ['Contact', '#contact'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="logo">
          {profile.name}<span>.dev</span>
        </a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href="#contact" className="btn btn--small" onClick={() => setOpen(false)}>Hire me</a>
        </nav>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
