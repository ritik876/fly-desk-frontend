import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';

const SiteContext = createContext(null);

// Sensible fallbacks so the UI renders even if the API is briefly unavailable.
const FALLBACK = {
  settings: {
    siteName: 'FlyDesk',
    tagline: 'Go Global, Stay Compliant.',
    subTagline: 'Powering cross-border selling.',
    description: "India's Compliance & Fulfilment Infrastructure for SMEs.",
    contact: { phone: '', email: '', whatsapp: '', address: '', businessHours: '', mapEmbedUrl: '' },
    social: {},
  },
  services: [],
  footerPages: [],
  whatsappLink: '',
};

export function SiteProvider({ children }) {
  const [state, setState] = useState({ ...FALLBACK, loading: true, error: null });

  useEffect(() => {
    let active = true;
    api
      .bootstrap()
      .then(({ data }) => active && setState({ ...FALLBACK, ...data, loading: false, error: null }))
      .catch((err) => active && setState((s) => ({ ...s, loading: false, error: err.message })));
    return () => { active = false; };
  }, []);

  return <SiteContext.Provider value={state}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteProvider');
  return ctx;
}
