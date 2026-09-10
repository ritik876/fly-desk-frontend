import { useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { PageHero } from '../components/blocks';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading } from '../components/ui/State';
import NotFound from './NotFound';

// Renders any published CMS Page (privacy, terms, or admin-created dynamic pages).
export default function CmsPage() {
  const { slug } = useParams();
  const ref = useReveal();
  const { data, loading, error } = useFetch(() => api.page(slug), [slug]);

  if (loading) return <Loading />;
  if (error || !data) return <NotFound />;

  return (
    <div ref={ref}>
      <Seo title={data.seo?.metaTitle || data.title} description={data.seo?.metaDescription || data.excerpt} image={data.seo?.ogImage || data.featuredImage} robots={data.seo?.robots} />
      <PageHero title={data.title} crumb={data.title} subtitle={data.excerpt} />
      <section className="section">
        <div className="container container-narrow">
          {data.featuredImage && <img src={data.featuredImage} alt={data.title} style={{ borderRadius: 'var(--r-lg)', marginBottom: 28 }} />}
          <div className="prose" dangerouslySetInnerHTML={{ __html: data.content || '' }} />
        </div>
      </section>
    </div>
  );
}
