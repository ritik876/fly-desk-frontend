import { useParams, Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading } from '../components/ui/State';
import { FaqAccordion } from '../components/blocks';
import InquiryForm from '../components/InquiryForm';
import { useConsult } from '../context/ConsultContext';
import { useSite } from '../context/SiteContext';
import { IconCheck, IconArrow, IconWhatsApp, iconByKey } from '../components/ui/Icons';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const ref = useReveal();
  const { open } = useConsult();
  const { whatsappLink } = useSite();
  const { data: s, loading, error } = useFetch(() => api.service(slug), [slug]);

  if (loading) return <Loading />;
  if (error || !s) return <NotFound />;
  const Icon = iconByKey(s.icon);

  return (
    <div ref={ref}>
      <Seo
        title={s.seo?.metaTitle || s.name}
        description={s.seo?.metaDescription || s.shortDescription}
        image={s.seo?.ogImage || s.image}
        robots={s.seo?.robots}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container page-hero__inner">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{s.name}</span></div>
          <span className="eyebrow hero__eyebrow">Service</span>
          <h1>{s.name}</h1>
          {(s.intro || s.shortDescription) && <p>{s.intro || s.shortDescription}</p>}
          <div className="hero__cta" style={{ marginTop: 24 }}>
            <button className="btn btn-primary btn-lg" onClick={() => open(s.name, `Enquire: ${s.name}`)}>Enquire about this service <IconArrow width={18} height={18} /></button>
            {whatsappLink && <a className="btn btn-lg btn-ghost-light" href={whatsappLink} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={20} height={20} /> WhatsApp</a>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container svc-detail-grid">
          <div>
            {s.content && <div className="prose reveal" dangerouslySetInnerHTML={{ __html: s.content }} />}

            {s.features?.length > 0 && (
              <div className="reveal" style={{ marginTop: s.content ? 40 : 0 }}>
                <h2>What's included</h2>
                <ul className="check-list">
                  {s.features.map((f, i) => (<li key={i}><IconCheck width={20} height={20} /><span>{f}</span></li>))}
                </ul>
              </div>
            )}

            {s.benefits?.length > 0 && (
              <div className="reveal" style={{ marginTop: 40 }}>
                <h2>Benefits</h2>
                <div className="grid grid-2" style={{ marginTop: 18 }}>
                  {s.benefits.map((b, i) => (
                    <div key={i} className="card"><div className="card__icon"><Icon /></div><p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>{b}</p></div>
                  ))}
                </div>
              </div>
            )}

            {s.gallery?.length > 0 && (
              <div className="reveal" style={{ marginTop: 40 }}>
                <h2>Gallery</h2>
                <div className="grid grid-3" style={{ marginTop: 18 }}>
                  {s.gallery.map((g, i) => (<img key={i} src={g} alt={`${s.name} ${i + 1}`} loading="lazy" style={{ borderRadius: 'var(--r)', aspectRatio: '4/3', objectFit: 'cover' }} />))}
                </div>
              </div>
            )}

            {(s.facilities?.length > 0 || s.suitableFor?.length > 0) && (
              <div className="feature-two reveal" style={{ marginTop: 40 }}>
                {s.facilities?.length > 0 && (
                  <div><h3>Facilities</h3><div className="pill-row">{s.facilities.map((f, i) => (<span key={i} className="pill">{f}</span>))}</div></div>
                )}
                {s.suitableFor?.length > 0 && (
                  <div><h3>Suitable for</h3><div className="pill-row">{s.suitableFor.map((f, i) => (<span key={i} className="pill">{f}</span>))}</div></div>
                )}
              </div>
            )}

            {s.faqs?.length > 0 && (
              <div className="reveal" style={{ marginTop: 48 }}>
                <h2 style={{ marginBottom: 8 }}>Frequently asked</h2>
                <FaqAccordion items={s.faqs} />
              </div>
            )}
          </div>

          {/* Sticky inquiry card */}
          <aside className="form-card reveal" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 20px)' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Enquire now</h3>
            <p className="muted" style={{ fontSize: '0.9rem', marginTop: 6 }}>Tell us your requirement and we'll get back to you.</p>
            <div style={{ marginTop: 16 }}><InquiryForm variant="inquiry" defaultService={s.name} compact /></div>
          </aside>
        </div>
      </section>
    </div>
  );
}
