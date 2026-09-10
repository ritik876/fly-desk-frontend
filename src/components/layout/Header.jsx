import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { useConsult } from '../../context/ConsultContext';
import { IconMenu, IconClose, IconChevron } from '../ui/Icons';
import Logo from './Logo';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/why-choose-us', label: 'Why FlyDesk' },
  { to: '/articles', label: 'Articles' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { services } = useSite();
  const { open: openConsult } = useConsult();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const svcRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => { setMobileOpen(false); setSvcOpen(false); }, [location.pathname]);

  // Close services dropdown on outside click.
  useEffect(() => {
    const onClick = (e) => { if (svcRef.current && !svcRef.current.contains(e.target)) setSvcOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label="FlyDesk home"><Logo /></Link>

        <nav className="nav-desktop" aria-label="Primary">
          <div className="nav-dd" ref={svcRef}>
            <button className="nav-link nav-dd__btn" aria-expanded={svcOpen} onClick={() => setSvcOpen((v) => !v)}>
              Services <IconChevron width={16} height={16} />
            </button>
            {svcOpen && (
              <div className="nav-dd__menu" role="menu">
                <Link to="/services" className="nav-dd__all" role="menuitem">All services</Link>
                <div className="nav-dd__grid">
                  {services.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="nav-dd__item" role="menuitem">
                      <span>{s.name}</span>
                      {s.shortDescription && <small>{s.shortDescription}</small>}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-cta">
          <button className="btn btn-primary" onClick={() => openConsult('', 'Get Cross-Border Setup')}>Get Started</button>
        </div>

        <button className="nav-toggle" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-mobile${mobileOpen ? ' is-open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="nav-mobile__inner" aria-label="Mobile">
          <span className="nav-mobile__heading">Services</span>
          <Link to="/services" className="nav-mobile__link">All services</Link>
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="nav-mobile__sublink">{s.name}</Link>
          ))}
          <hr className="divider" style={{ margin: '14px 0' }} />
          {NAV.map((n) => (<Link key={n.to} to={n.to} className="nav-mobile__link">{n.label}</Link>))}
          <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={() => { setMobileOpen(false); openConsult('', 'Get Cross-Border Setup'); }}>
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}
