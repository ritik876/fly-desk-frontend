import { useEffect, useRef } from 'react';
import { IconClose } from './ui/Icons';

// Accessible modal dialog: Esc to close, focus trap, backdrop click, body scroll lock.
export default function Modal({ open, onClose, title, children, maxWidth = 560 }) {
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusable = () => panel.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const items = Array.from(focusable());
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => { const f = focusable(); if (f.length) f[0].focus(); }, 30);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      clearTimeout(t);
      if (lastFocus.current && lastFocus.current.focus) lastFocus.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" ref={panelRef} role="dialog" aria-modal="true" aria-label={title} style={{ maxWidth }}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog"><IconClose /></button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
