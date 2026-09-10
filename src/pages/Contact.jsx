import Seo from '../components/ui/Seo';
import { PageHero } from '../components/blocks';
import InquiryForm from '../components/InquiryForm';
import { useSite } from '../context/SiteContext';
import { useReveal } from '../hooks/useReveal';
import { IconPhone, IconMail, IconWhatsApp, IconPin, IconClock } from '../components/ui/Icons';

export default function Contact() {
  const ref = useReveal();
  const { settings, whatsappLink } = useSite();
  const c = settings.contact || {};

  const items = [
    c.phone && { icon: <IconPhone />, label: 'Phone', value: c.phone, href: `tel:${c.phone}` },
    c.email && { icon: <IconMail />, label: 'Email', value: c.email, href: `mailto:${c.email}` },
    whatsappLink && { icon: <IconWhatsApp />, label: 'WhatsApp', value: 'Chat with us', href: whatsappLink, external: true },
    c.address && { icon: <IconPin />, label: 'Address', value: c.address },
    c.businessHours && { icon: <IconClock />, label: 'Business hours', value: c.businessHours },
  ].filter(Boolean);

  return (
    <div ref={ref}>
      <Seo title="Contact Us" description="Get in touch with FlyDesk for cross-border seller setup, compliance and fulfilment support." />
      <PageHero eyebrow="Contact" title="Let's get you set up" crumb="Contact" subtitle="Tell us about your business and we'll map the right compliance and fulfilment setup." />

      <section className="section">
        <div className="container contact-grid">
          <div className="reveal">
            <h2>Get in touch</h2>
            <p className="muted" style={{ marginBottom: 24 }}>We're here to help you go global and stay compliant.</p>
            <div className="contact-info">
              {items.map((it) => (
                <div className="contact-info__item" key={it.label}>
                  <span className="card__icon">{it.icon}</span>
                  <div>
                    <h4>{it.label}</h4>
                    {it.href ? <a href={it.href} {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{it.value}</a> : <p>{it.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            {c.mapEmbedUrl && (
              <div className="map-embed"><iframe src={c.mapEmbedUrl} title="FlyDesk location" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            )}
          </div>

          <div className="form-card reveal">
            <h3 style={{ fontSize: '1.4rem' }}>Send us a message</h3>
            <p className="muted" style={{ marginTop: 6, marginBottom: 20 }}>We usually respond within one business day.</p>
            <InquiryForm variant="contact" />
          </div>
        </div>
      </section>
    </div>
  );
}
