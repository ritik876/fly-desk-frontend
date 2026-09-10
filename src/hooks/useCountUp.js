import { useEffect, useRef, useState } from 'react';

// Animates a numeric value when it enters the viewport. Non-numeric strings
// (e.g. "—", "500+") pass through unchanged.
export function useCountUp(value) {
  const ref = useRef(null);
  const match = String(value).match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(target === null ? value : '0' + suffix);

  useEffect(() => {
    if (target === null) return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setDisplay(target.toLocaleString() + suffix); return undefined; }

    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const dur = 1400; const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(target * eased).toLocaleString() + suffix);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, suffix]);

  return { ref, display };
}
