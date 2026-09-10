import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConsult } from '../context/ConsultContext';
import { useSite } from '../context/SiteContext';
import { IconArrow, IconChevron, IconWhatsApp, iconByKey } from './ui/Icons';

// ---- Page hero for inner pages ----
export function PageHero({ eyebrow, title, subtitle, crumb }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {crumb && (
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>{crumb}</span>
          </div>
        )}
        {eyebrow && <span className="eyebrow hero__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}

// ---- Conversion CTA band ----
export function CtaBand({
  title = 'Find the setup that fits your business.',
  text = 'Book a consultation and we\'ll map your compliance, marketplace and fulfilment readiness — end to end.',
  service = '',
}) {
  const { open } = useConsult();
  const { whatsappLink } = useSite();
  return (
    <div className="container">
      <div className="cta-band reveal">
        <div className="cta-band__inner">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="btn-row">
            <button className="btn btn-lg" style={{ background: '#fff', color: 'var(--brand-dark)' }} onClick={() => open(service, 'Book a Consultation')}>
              Book a Consultation
            </button>
            <button className="btn btn-lg btn-ghost-light" onClick={() => open(service, 'Enquire Now')}>Enquire Now</button>
            {whatsappLink && (
              <a className="btn btn-lg btn-ghost-light" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp width={20} height={20} /> WhatsApp Us
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Service card ----
export function ServiceCard({ service }) {
  const Icon = iconByKey(service.icon);
  return (
    <Link to={`/services/${service.slug}`} className="card card--hover svc-card svc-card--hover reveal">
      <div className="svc-card__media">
        {service.image ? <img src={service.image} alt={service.name} loading="lazy" />
          : <div className="card__icon" aria-hidden="true"><Icon /></div>}
      </div>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      <span className="svc-card__link">Learn more <IconArrow width={18} height={18} /></span>
    </Link>
  );
}

// ---- Value / feature card ----
export function ValueCard({ icon, title, text }) {
  const Icon = iconByKey(icon);
  return (
    <div className="card card--hover value-card reveal">
      <div className="card__icon" aria-hidden="true"><Icon /></div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

// ---- Testimonial card ----
export function TestimonialCard({ t }) {
  const initials = (t.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className="card tst-card reveal">
      <div className="tst-card__stars" aria-label={`${t.rating || 5} out of 5`}>{'★'.repeat(t.rating || 5)}</div>
      <p className="tst-card__quote">“{t.content}”</p>
      <div className="tst-card__who">
        {t.avatar ? <img className="tst-card__avatar" src={t.avatar} alt={t.name} loading="lazy" />
          : <span className="tst-card__avatar" aria-hidden="true">{initials}</span>}
        <div>
          <div className="tst-card__name">{t.name}</div>
          {(t.designation || t.company) && (
            <div className="tst-card__role">{[t.designation, t.company].filter(Boolean).join(', ')}</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Article card ----
export function ArticleCard({ a }) {
  const date = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  return (
    <Link to={`/articles/${a.slug}`} className="card card--hover article-card reveal">
      <div className="article-card__media">{a.featuredImage && <img src={a.featuredImage} alt={a.title} loading="lazy" />}</div>
      <div className="article-card__body">
        <div className="article-card__meta">{a.category && <span className="pill">{a.category}</span>}{date && <span>{date}</span>}</div>
        <h3>{a.title}</h3>
        {a.excerpt && <p>{a.excerpt}</p>}
        <span className="svc-card__link">Read article <IconArrow width={18} height={18} /></span>
      </div>
    </Link>
  );
}

// ---- FAQ accordion ----
export function FaqAccordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="faq-list">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f._id || i} className={`faq-item${isOpen ? ' is-open' : ''}`}>
            <button className="faq-q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              {f.question}
              <IconChevron className="faq-ico" width={22} height={22} />
            </button>
            <div className="faq-a" style={{ maxHeight: isOpen ? '400px' : '0' }}>
              <div className="faq-a__inner">{f.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
