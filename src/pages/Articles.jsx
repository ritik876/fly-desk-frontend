import { useState } from 'react';
import Seo from '../components/ui/Seo';
import { PageHero, ArticleCard } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading, ErrorState, EmptyState } from '../components/ui/State';

export default function Articles() {
  const ref = useReveal();
  const [page, setPage] = useState(1);
  const { data, meta, loading, error } = useFetch(() => api.articles(`?page=${page}&limit=9`), [page]);

  return (
    <div ref={ref}>
      <Seo title="Articles & Insights" description="Guides and insights on GST, compliance, marketplace onboarding and cross-border selling for Indian sellers." />
      <PageHero eyebrow="Insights" title="Articles & guides" crumb="Articles" subtitle="Practical insights on compliance, marketplaces and cross-border selling." />
      <section className="section">
        <div className="container">
          {loading && <Loading />}
          {error && <ErrorState message={error} />}
          {data && (data.length ? (
            <>
              <div className="grid grid-3">{data.map((a) => (<ArticleCard key={a._id} a={a} />))}</div>
              {meta && meta.pages > 1 && (
                <div className="center" style={{ marginTop: 40, display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button className="btn btn-outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</button>
                  <span className="muted" style={{ alignSelf: 'center' }}>Page {meta.page} of {meta.pages}</span>
                  <button className="btn btn-outline" disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
              )}
            </>
          ) : (
            <EmptyState title="No articles yet" message="Articles published from the CMS will appear here." />
          ))}
        </div>
      </section>
    </div>
  );
}
