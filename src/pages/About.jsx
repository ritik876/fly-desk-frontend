import Seo from '../components/ui/Seo';
import { PageHero, CtaBand, ValueCard } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { IconCheck, IconGlobe } from '../components/ui/Icons';
import { ABOUT, AUDIENCE } from '../data/staticContent';

export default function About() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <Seo title="About Us" description={ABOUT.intro} />
      <PageHero eyebrow="About FlyDesk" title="Seller infrastructure, built on compliance." crumb="About" subtitle={ABOUT.intro} />

      <section className="section">
        <div className="container split">
          <div className="split__media split__media--pattern reveal"><div className="split__glyph"><IconGlobe width={120} height={120} strokeWidth={0.9} /></div></div>
          <div className="reveal">
            <span className="eyebrow">Our mission</span>
            <h2 style={{ marginTop: 12 }}>Make compliant, cross-border selling accessible</h2>
            <p className="lead" style={{ marginTop: 16 }}>{ABOUT.mission}</p>
            <h3 style={{ marginTop: 28 }}>Our vision</h3>
            <p className="muted" style={{ marginTop: 10 }}>{ABOUT.vision}</p>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Our strengths</span>
            <h2>What makes FlyDesk different</h2>
          </div>
          <div className="feature-two">
            <ul className="check-list" style={{ marginTop: 0 }}>
              {ABOUT.strengths.map((s) => (<li key={s}><IconCheck width={20} height={20} /><span>{s}</span></li>))}
            </ul>
            <div className="card" style={{ background: 'var(--bg-ink)', color: '#dfe8f0', border: 0 }}>
              <h3 style={{ color: '#fff' }}>Workspace philosophy</h3>
              <p className="muted" style={{ color: 'rgba(255,255,255,0.72)', marginTop: 12 }}>
                We believe compliance shouldn't slow sellers down. By building a clean, documented and
                fulfilment-ready base first, sellers can scale — domestically and across borders — without
                operational friction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Who it's for</span>
            <h2>Built for sellers ready to grow</h2>
          </div>
          <div className="grid grid-4">
            {AUDIENCE.map((a) => (<ValueCard key={a.title} {...a} />))}
          </div>
        </div>
      </section>

      <section className="section-cta-wrap"><CtaBand /></section>
    </div>
  );
}
