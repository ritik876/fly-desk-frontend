import { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/Modal';
import InquiryForm from '../components/InquiryForm';

const ConsultContext = createContext(null);

// Lets any CTA across the site open the "Book a Consultation" lead modal,
// optionally pre-filling a service.
export function ConsultProvider({ children }) {
  const [state, setState] = useState({ open: false, service: '', title: 'Book a Consultation' });
  const open = useCallback((service = '', title = 'Book a Consultation') => setState({ open: true, service, title }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  return (
    <ConsultContext.Provider value={{ open }}>
      {children}
      <Modal open={state.open} onClose={close} title={state.title}>
        <p className="muted" style={{ marginTop: -4 }}>
          Tell us about your business and we'll map the right compliance & fulfilment setup for you.
        </p>
        <InquiryForm variant="consultation" defaultService={state.service} showDate onSuccess={() => setTimeout(close, 3500)} />
      </Modal>
    </ConsultContext.Provider>
  );
}

export function useConsult() {
  const ctx = useContext(ConsultContext);
  return ctx || { open: () => {} };
}
