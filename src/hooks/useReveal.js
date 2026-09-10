import { useEffect, useRef } from 'react';

// Adds `is-in` to `.reveal` elements when they scroll into view.
// Honors prefers-reduced-motion (reveals immediately).
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current || document;
    const els = root.querySelectorAll('.reveal:not(.is-in)');
    if (!els.length) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
  return ref;
}
