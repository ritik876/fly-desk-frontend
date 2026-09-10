import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { useSite } from '../context/SiteContext';
import { useConsult } from '../context/ConsultContext';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { useCountUp } from '../hooks/useCountUp';
import { api } from '../api/client';
import { CtaBand, ServiceCard, ValueCard, TestimonialCard, ArticleCard, FaqAccordion } from '../components/blocks';
import { EmptyState } from '../components/ui/State';
import { IconArrow, IconCheck, IconWhatsApp, IconGlobe } from '../components/ui/Icons';
import { HOME_VALUES, ACTIVATION_STEPS, MARKETPLACES } from '../data/staticContent';

function Stat({ a }) {
  const { ref, display } = useCountUp(a.number);
  return (
    <div className="stat reveal">
      <div className="stat__num" ref={ref}>{display}</div>
      <div className="stat__label">{a.label}</div>
      {a.description && <div className="stat__desc">{a.description}</div>}
    </div>
  );
}

export default function Home() {
  const { settings, services, whatsappLink } = useSite();
  const { open } = useConsult();
  const revealRef = useReveal();

  const achievements = useFetch(() => api.achievements(), []);
  const testimonials = useFetch(() => api.testimonials(), []);
  const faqs = useFetch(() => api.faqs('?home=true'), []);
  const articles = useFetch(() => api.articles('?limit=3'), []);

  return (
    <div ref={revealRef}>
      <Seo />

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div>
            <span className="eyebrow hero__eyebrow">India's compliance & fulfilment infrastructure</span>
            <h1>Go Global, <em>Stay Compliant.</em></h1>
            <p className="hero__sub">
              {settings.description || 'FlyDesk prepares Indian sellers for domestic and cross-border marketplaces — with compliance, documentation and operational readiness built in.'}
            </p>
            <div className="hero__cta">
              <button className="btn btn-primary btn-lg" onClick={() => open('', 'Get Cross-Border Setup')}>
                Get Cross-Border Setup <IconArrow width={20} height={20} />
              </button>
              {whatsappLink && (
                <a className="btn btn-lg btn-ghost-light" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp width={20} height={20} /> Message us
                </a>
              )}
            </div>
            <div className="hero__trust">
              <span><IconCheck width={18} height={18} /> Compliance-first</span>
              <span><IconCheck width={18} height={18} /> Marketplace-ready</span>
              <span><IconCheck width={18} height={18} /> Cross-border expertise</span>
            </div>
          </div>

          <aside className="hero__panel" aria-label="Seller activation process">
            <h3>Seller activation in 5 steps</h3>
            <ol className="hero__steps">
              {ACTIVATION_STEPS.map((s, i) => (
                <li key={s.t}>
                  <span className="hero__step-n">{i + 1}</span>
                  <span><span className="hero__step-t">{s.t}</span><br /><span className="hero__step-d">{s.d}</span></span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      {/* ---------- TRUST STRIP (marketplaces) ---------- */}
      <div className="trust-strip">
        <div className="container trust-strip__inner">
          <span className="trust-strip__label">Marketplaces we prepare sellers for</span>
          <div className="trust-strip__items">
            {MARKETPLACES.map((m) => (<b key={m.name} title={m.note}>{m.name}</b>))}
          </div>
        </div>
      </div>

      {/* ---------- ABOUT ---------- */}
      <section className="section">
        <div className="container split">
          <div className="split__media split__media--pattern reveal">
            <div className="split__glyph"><IconGlobe width={120} height={120} strokeWidth={0.9} /></div>
          </div>
          <div className="reveal">
            <span className="eyebrow">About FlyDesk</span>
            <h2 style={{ marginTop: 12 }}>Seller infrastructure, built on compliance.</h2>
            <p className="lead" style={{ marginTop: 16 }}>
              We help Indian SMEs sell with confidence — at home and across borders — by handling the
              documentation discipline and operational readiness that marketplaces demand.
            </p>
            <ul className="check-list">
              <li><IconCheck width={20} height={20} /><span>Structured compliance so you can focus on sales growth</span></li>
              <li><IconCheck width={20} height={20} /><span>Traceable operations and clean documentation</span></li>
              <li><IconCheck width={20} height={20} /><span>Long-term marketplace credibility</span></li>
            </ul>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: 24 }}>More about us <IconArrow width={18} height={18} /></Link>
          </div>
        </div>
      </section>

      {/* ---------- WHY FLYDESK ---------- */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why FlyDesk</span>
            <h2>Everything a seller needs to operate cleanly</h2>
            <p className="lead">A single infrastructure partner across compliance, marketplaces and fulfilment.</p>
          </div>
          <div className="grid grid-4">
            {HOME_VALUES.map((v) => (<ValueCard key={v.title} {...v} />))}
          </div>
          <div className="center" style={{ marginTop: 36 }}>
            <Link to="/why-choose-us" className="btn btn-ink">See why sellers choose us <IconArrow width={18} height={18} /></Link>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Services</span>
            <h2>Workspace-free infrastructure for selling</h2>
            <p className="lead">From GST and export documentation to multi-state APOB and fulfilment readiness.</p>
          </div>
          {services.length ? (
            <div className="grid grid-3">
              {services.slice(0, 6).map((s) => (<ServiceCard key={s.slug} service={s} />))}
            </div>
          ) : (
            <EmptyState title="Services coming soon" message="Services are being published from the CMS." />
          )}
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      {achievements.data && achievements.data.length > 0 && (
        <section className="section stats-band">
          <div className="container">
            <div className="stats-grid">
              {achievements.data.map((a) => (<Stat key={a._id} a={a} />))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="section section--soft">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Testimonials</span>
            <h2>Trusted by growing sellers</h2>
          </div>
          {testimonials.data && testimonials.data.length > 0 ? (
            <div className="grid grid-3">
              {testimonials.data.slice(0, 3).map((t) => (<TestimonialCard key={t._id} t={t} />))}
            </div>
          ) : (
            <EmptyState title="Testimonials coming soon" message="Client stories will appear here as they're published." />
          )}
        </div>
      </section>

      {/* ---------- CTA BAND ---------- */}
      <section className="section-cta-wrap"><CtaBand /></section>

      {/* ---------- ARTICLES ---------- */}
      {articles.data && articles.data.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Insights</span>
              <h2>Latest from FlyDesk</h2>
            </div>
            <div className="grid grid-3">
              {articles.data.map((a) => (<ArticleCard key={a._id} a={a} />))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- FAQ ---------- */}
      {faqs.data && faqs.data.length > 0 && (
        <section className="section section--soft">
          <div className="container">
            <div className="section-head center">
              <span className="eyebrow">FAQ</span>
              <h2>Questions, answered</h2>
            </div>
            <FaqAccordion items={faqs.data} />
            <div className="center" style={{ marginTop: 32 }}>
              <Link to="/faq" className="btn btn-outline">View all FAQs</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
