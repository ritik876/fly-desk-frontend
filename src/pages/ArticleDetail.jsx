import { useParams, Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import { useReveal } from '../hooks/useReveal';
import { useFetch } from '../hooks/useFetch';
import { api } from '../api/client';
import { Loading } from '../components/ui/State';
import { CtaBand, ArticleCard } from '../components/blocks';
import NotFound from './NotFound';

export default function ArticleDetail() {
  const { slug } = useParams();
  const ref = useReveal();
  const { data, loading, error } = useFetch(() => api.article(slug), [slug]);

  if (loading) return <Loading />;
  if (error || !data) return <NotFound />;
  const { article: a, related } = data;
  const date = a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

  return (
    <div ref={ref}>
      <Seo title={a.seo?.metaTitle || a.title} description={a.seo?.metaDescription || a.excerpt} image={a.seo?.ogImage || a.featuredImage} type="article" robots={a.seo?.robots} />
      <article>
        <section className="page-hero">
          <div className="container page-hero__inner">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/articles">Articles</Link><span>/</span><span>{a.category}</span></div>
            <h1>{a.title}</h1>
            <p style={{ opacity: 0.8 }}>{[a.author, date].filter(Boolean).join(' · ')}</p>
          </div>
        </section>

        <section className="section">
          <div className="container container-narrow">
            {a.featuredImage && <img src={a.featuredImage} alt={a.title} style={{ borderRadius: 'var(--r-lg)', width: '100%', marginBottom: 32 }} />}
            <div className="prose" dangerouslySetInnerHTML={{ __html: a.content || '' }} />
            {a.tags?.length > 0 && (
              <div className="pill-row" style={{ marginTop: 32 }}>{a.tags.map((t) => (<span key={t} className="pill">#{t}</span>))}</div>
            )}
          </div>
        </section>

        {related?.length > 0 && (
          <section className="section section--soft">
            <div className="container">
              <div className="section-head"><span className="eyebrow">Keep reading</span><h2>Related articles</h2></div>
              <div className="grid grid-3">{related.map((r) => (<ArticleCard key={r._id} a={r} />))}</div>
            </div>
          </section>
        )}

        <section className="section-cta-wrap" style={{ paddingTop: 'clamp(56px,8vw,110px)' }}><CtaBand /></section>
      </article>
    </div>
  );
}
