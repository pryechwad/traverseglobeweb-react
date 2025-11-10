import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Ensure the browser doesn't restore previous scroll positions
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = prev;
      };
    }
  }, []);

  // Scroll on route changes before paint to avoid flicker
  useLayoutEffect(() => {
    // If there's a hash, try scrolling to that element
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
    }

    // Default: scroll the window to top
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      // Fallbacks for older browsers / different scroll roots
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Extra safeguard in the next frame (helps when content height changes late)
    requestAnimationFrame(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname, hash]);

  return null;
}
