import Seo from '../components/ui/Seo';
import { PageHero, CtaBand, TestimonialCard } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading, EmptyState } from '../components/ui/State';

export default function Testimonials() {
  const ref = useReveal();
  const { data, loading } = useFetch(() => api.testimonials(), []);
  return (
    <div ref={ref}>
      <Seo title="Testimonials" description="What sellers say about working with FlyDesk." />
      <PageHero eyebrow="Testimonials" title="Trusted by growing sellers" crumb="Testimonials" subtitle="Stories from the businesses we help go global and stay compliant." />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {data && (data.length ? (
            <div className="grid grid-3">{data.map((t) => (<TestimonialCard key={t._id} t={t} />))}</div>
          ) : (
            <EmptyState title="Testimonials coming soon" message="Client stories will appear here as they're published in the CMS." />
          ))}
        </div>
      </section>
      <section className="section-cta-wrap"><CtaBand /></section>
    </div>
  );
}
