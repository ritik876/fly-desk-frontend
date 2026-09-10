import { useState } from 'react';
import { api } from '../api/client';
import { useSite } from '../context/SiteContext';
import { IconCheck } from './ui/Icons';

function getUtm() {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  const out = {};
  ['source', 'medium', 'campaign', 'term', 'content'].forEach((k) => {
    const v = p.get(`utm_${k}`);
    if (v) out[`utm_${k}`] = v;
  });
  return out;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable lead form.
 * props: variant ('inquiry' | 'consultation' | 'contact'), compact, defaultService,
 *        onSuccess, showDate (adds preferred date/time for consultations).
 */
export default function InquiryForm({
  variant = 'inquiry',
  defaultService = '',
  showDate = false,
  onSuccess,
  compact = false,
}) {
  const { services } = useSite();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: defaultService, message: '', preferredDate: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const [ref, setRef] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Please enter your name.';
    if (!emailRe.test(form.email)) err.email = 'Enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 7) err.phone = 'Enter a valid phone number.';
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setStatus('submitting');
    try {
      const { data } = await api.submitInquiry({
        ...form,
        type: variant,
        preferredDate: showDate && form.preferredDate ? form.preferredDate : undefined,
        sourcePage: typeof window !== 'undefined' ? window.location.pathname : '',
        ...getUtm(),
      });
      setRef(data.inquiryId);
      setStatus('success');
      onSuccess && onSuccess(data);
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="inquiry-success" role="status" aria-live="polite">
        <span className="inquiry-success__badge"><IconCheck /></span>
        <h3>Thank you — your inquiry has been received.</h3>
        <p className="muted">
          Our team will get back to you shortly.{ref && <> Your reference is <strong>{ref}</strong>.</>}
        </p>
      </div>
    );
  }

  const cta = variant === 'consultation' ? 'Book my consultation' : variant === 'contact' ? 'Send message' : 'Send inquiry';

  return (
    <form className={`inquiry-form${compact ? ' inquiry-form--compact' : ''}`} onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <Field id="if-name" label="Name" required error={errors.name}>
          <input id="if-name" className="input" value={form.name} onChange={set('name')} autoComplete="name" />
        </Field>
        <Field id="if-email" label="Email" required error={errors.email}>
          <input id="if-email" className="input" type="email" value={form.email} onChange={set('email')} autoComplete="email" />
        </Field>
      </div>
      <div className="form-row">
        <Field id="if-phone" label="Phone" required error={errors.phone}>
          <input id="if-phone" className="input" type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
        <Field id="if-company" label="Company">
          <input id="if-company" className="input" value={form.company} onChange={set('company')} autoComplete="organization" />
        </Field>
      </div>
      <Field id="if-service" label="Service / requirement">
        <select id="if-service" className="select" value={form.service} onChange={set('service')}>
          <option value="">Select a service (optional)</option>
          {services.map((s) => (<option key={s.slug} value={s.name}>{s.name}</option>))}
          <option value="Other">Other / not sure yet</option>
        </select>
      </Field>
      {showDate && (
        <Field id="if-date" label="Preferred date & time">
          <input id="if-date" className="input" type="datetime-local" value={form.preferredDate} onChange={set('preferredDate')} />
        </Field>
      )}
      <Field id="if-message" label="Message">
        <textarea id="if-message" className="textarea" value={form.message} onChange={set('message')} placeholder="Tell us briefly about your business and what you need." />
      </Field>

      {serverError && <p className="error" role="alert" style={{ marginBottom: 12 }}>{serverError}</p>}

      <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : cta}
      </button>
      <p className="muted" style={{ fontSize: '0.82rem', marginTop: 12, marginBottom: 0 }}>
        We respect your privacy. Your details are used only to respond to your inquiry.
      </p>
    </form>
  );
}

function Field({ id, label, required, error, children }) {
  return (
    <div className={`field${error ? ' invalid' : ''}`}>
      <label htmlFor={id}>{label}{required && <span className="req"> *</span>}</label>
      {children}
      {error && <div className="error" id={`${id}-err`}>{error}</div>}
    </div>
  );
}
