import { Link } from 'react-router-dom';
import { useSite } from '../../context/SiteContext';
import { IconPhone, IconMail, IconWhatsApp, IconPin } from '../ui/Icons';
import Logo from './Logo';

export default function Footer() {
  const { settings, services, footerPages, whatsappLink } = useSite();
  const c = settings.contact || {};
  const social = settings.social || {};
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo light />
          <p className="muted" style={{ marginTop: 16, maxWidth: 320 }}>
            {settings.description || "India's compliance & fulfilment infrastructure for SMEs."}
          </p>
          <div className="site-footer__social">
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>}
            {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>}
            {social.youtube && <a href={social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">yt</a>}
          </div>
        </div>

        <div className="site-footer__col">
          <h4>Services</h4>
          <ul>
            {services.slice(0, 6).map((s) => (<li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/why-choose-us">Why FlyDesk</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {footerPages.map((p) => (<li key={p.slug}><Link to={`/${p.slug}`}>{p.title}</Link></li>))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Get in touch</h4>
          <ul className="site-footer__contact">
            {c.phone && <li><IconPhone width={18} height={18} /><a href={`tel:${c.phone}`}>{c.phone}</a></li>}
            {c.email && <li><IconMail width={18} height={18} /><a href={`mailto:${c.email}`}>{c.email}</a></li>}
            {whatsappLink && <li><IconWhatsApp width={18} height={18} /><a href={whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>}
            {c.address && <li><IconPin width={18} height={18} /><span>{c.address}</span></li>}
          </ul>
          {c.businessHours && <p className="muted" style={{ fontSize: '0.85rem', marginTop: 10 }}>{c.businessHours}</p>}
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>© {year} {settings.siteName || 'FlyDesk'}. All rights reserved.</p>
        <div className="site-footer__legal">
          {footerPages.map((p) => (<Link key={p.slug} to={`/${p.slug}`}>{p.title}</Link>))}
        </div>
      </div>
    </footer>
  );
}
