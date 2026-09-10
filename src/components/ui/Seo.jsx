import { Helmet } from 'react-helmet-async';
import { useSite } from '../../context/SiteContext';

// Renders per-page meta + Open Graph + canonical. Falls back to global defaults.
export default function Seo({ title, description, image, canonical, robots, type = 'website' }) {
  const { settings } = useSite();
  const d = settings.defaultSeo || {};
  const siteName = settings.siteName || 'FlyDesk';
  const fullTitle = title ? `${title} | ${siteName}` : d.metaTitle || `${siteName} — Go Global, Stay Compliant`;
  const desc = description || d.metaDescription || settings.description || '';
  const ogImage = image || d.ogImage || '';
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      {robots && <meta name="robots" content={robots} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      {url && <meta property="og:url" content={url} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      {desc && <meta name="twitter:description" content={desc} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
}
