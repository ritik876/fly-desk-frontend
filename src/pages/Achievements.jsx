import Seo from '../components/ui/Seo';
import { PageHero, CtaBand } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { useCountUp } from '../hooks/useCountUp';
import { api } from '../api/client';
import { Loading, EmptyState } from '../components/ui/State';

function Stat({ a }) {
  const { ref, display } = useCountUp(a.number);
  return (
    <div className="stat reveal">
      <div className="stat__num" ref={ref} style={{ color: 'var(--ink)' }}>{display}</div>
      <div className="stat__label" style={{ color: 'var(--muted)' }}>{a.label}</div>
      {a.description && <div className="stat__desc" style={{ color: 'var(--muted-2)' }}>{a.description}</div>}
    </div>
  );
}

export default function Achievements() {
  const ref = useReveal();
  const { data, loading } = useFetch(() => api.achievements(), []);
  return (
    <div ref={ref}>
      <Seo title="Achievements & Highlights" description="FlyDesk highlights and numbers." />
      <PageHero eyebrow="Highlights" title="Our impact, in numbers" crumb="Achievements" subtitle="A snapshot of how FlyDesk supports Indian sellers. Figures are maintained in our CMS." />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {data && (data.length ? (
            <div className="stats-grid" style={{ gridTemplateColumns: `repeat(${Math.min(4, data.length)}, 1fr)` }}>
              {data.map((a) => (<Stat key={a._id} a={a} />))}
            </div>
          ) : <EmptyState title="Highlights coming soon" />)}
        </div>
      </section>
      <section className="section-cta-wrap"><CtaBand /></section>
    </div>
  );
}
