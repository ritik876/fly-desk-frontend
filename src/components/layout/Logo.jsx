import { useSite } from '../../context/SiteContext';

// Wordmark logo. If a logo image is set in the CMS, it's used; otherwise a clean
// typographic mark with a paper-plane glyph.
export default function Logo({ light = false }) {
  const { settings } = useSite();
  if (settings.logo) return <img src={settings.logo} alt={settings.siteName || 'FlyDesk'} className="brand__img" />;
  return (
    <span className={`brand__mark${light ? ' brand__mark--light' : ''}`}>
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="brand__glyph">
        <path d="M3 11L21 3l-6 18-3.5-7L3 11z" fill="currentColor" />
      </svg>
      <span className="brand__text">Fly<span>Desk</span></span>
    </span>
  );
}
