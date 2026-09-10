import Seo from '../components/ui/Seo';
import { PageHero, CtaBand, ServiceCard } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading, ErrorState, EmptyState } from '../components/ui/State';

export default function Services() {
  const ref = useReveal();
  const { data, loading, error } = useFetch(() => api.services(), []);

  return (
    <div ref={ref}>
      <Seo title="Services" description="Compliance, cross-border seller setup, marketplace onboarding, multi-state APOB and fulfilment support for Indian sellers." />
      <PageHero
        eyebrow="Services"
        title="Infrastructure for compliant, cross-border selling"
        crumb="Services"
        subtitle="From GST and export documentation to multi-state APOB and warehouse readiness — everything a seller needs to operate cleanly."
      />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {error && <ErrorState message={error} />}
          {data && (data.length ? (
            <div className="grid grid-3">
              {data.map((s) => (<ServiceCard key={s.slug} service={s} />))}
            </div>
          ) : (
            <EmptyState title="Services coming soon" message="Services are being published from the CMS." />
          ))}
        </div>
      </section>
      <section className="section-cta-wrap"><CtaBand /></section>
    </div>
  );
}
