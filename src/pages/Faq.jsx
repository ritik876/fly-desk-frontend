import Seo from '../components/ui/Seo';
import { PageHero, CtaBand, FaqAccordion } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading, EmptyState } from '../components/ui/State';

export default function Faq() {
  const ref = useReveal();
  const { data, loading } = useFetch(() => api.faqs(), []);

  // Group by category for readability.
  const groups = (data || []).reduce((acc, f) => {
    const k = f.category || 'General';
    (acc[k] = acc[k] || []).push(f);
    return acc;
  }, {});

  return (
    <div ref={ref}>
      <Seo title="FAQ" description="Answers to common questions about FlyDesk's compliance and fulfilment services." />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" crumb="FAQ" subtitle="Everything you need to know about how FlyDesk supports sellers." />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {data && (data.length ? (
            Object.entries(groups).map(([cat, items]) => (
              <div key={cat} style={{ marginBottom: 40 }}>
                {Object.keys(groups).length > 1 && <h2 style={{ maxWidth: 820, margin: '0 auto 8px' }}>{cat}</h2>}
                <FaqAccordion items={items} />
              </div>
            ))
          ) : <EmptyState title="FAQs coming soon" />)}
        </div>
      </section>
      <section className="section-cta-wrap"><CtaBand /></section>
    </div>
  );
}
