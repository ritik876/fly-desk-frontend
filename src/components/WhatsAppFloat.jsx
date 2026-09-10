import { useSite } from '../context/SiteContext';
import { IconWhatsApp } from './ui/Icons';

// Persistent floating click-to-WhatsApp button (hidden if no number configured).
export default function WhatsAppFloat() {
  const { whatsappLink } = useSite();
  if (!whatsappLink) return null;
  return (
    <a
      className="wa-float"
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message FlyDesk on WhatsApp"
    >
      <IconWhatsApp />
      <span className="wa-float__label">WhatsApp us</span>
    </a>
  );
}
