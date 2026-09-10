import { Link } from 'react-router-dom';
import Seo from '../components/ui/Seo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" robots="noindex,follow" />
      <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div className="container container-narrow">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>404</span>
          <h1 style={{ marginTop: 12 }}>We couldn't find that page</h1>
          <p className="lead" style={{ margin: '16px auto 28px' }}>The page you're looking for may have moved or no longer exists.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Back to home</Link>
            <Link to="/services" className="btn btn-outline">View services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
