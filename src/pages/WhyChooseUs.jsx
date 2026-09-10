import Seo from '../components/ui/Seo';
import { PageHero, CtaBand, ValueCard } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { ACTIVATION_STEPS, WHY_CARDS } from '../data/staticContent';

export default function WhyChooseUs() {
  const ref = useReveal();
  return (
    <div ref={ref}>
      <Seo title="Why Choose Us" description="Why growing Indian sellers choose FlyDesk for compliance, marketplace onboarding and fulfilment readiness." />
      <PageHero
        eyebrow="Why FlyDesk"
        title="A single partner across compliance, marketplaces and fulfilment."
        crumb="Why FlyDesk"
        subtitle="Instead of stitching together consultants, warehouses and paperwork, work with one infrastructure partner built for sellers."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {WHY_CARDS.map((c) => (<ValueCard key={c.title} {...c} />))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow hero__eyebrow">How it works</span>
            <h2>Seller activation, step by step</h2>
          </div>
          <div className="grid grid-3 reveal">
            {ACTIVATION_STEPS.map((s, i) => (
              <div key={s.t} className="card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <span className="hero__step-n" style={{ marginBottom: 14 }}>{i + 1}</span>
                <h3 style={{ color: '#fff', fontSize: '1.15rem' }}>{s.t}</h3>
                <p className="muted" style={{ color: 'rgba(255,255,255,0.66)', margin: '8px 0 0' }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cta-wrap" style={{ paddingTop: 'clamp(56px,8vw,110px)' }}><CtaBand /></section>
    </div>
  );
}
