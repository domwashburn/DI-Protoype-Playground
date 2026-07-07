import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = '(min-width: 66rem)';

/**
 * Tracks whether the viewport is at the persistent-nav breakpoint.
 * Returns { isPersistent, isExpanded, setExpanded }.
 *
 * isPersistent — true when the viewport is ≥ 66rem; drives SideNav isPersistent.
 * isExpanded   — mirrors isPersistent on resize; can be toggled manually for the
 *                mobile hamburger.
 */
export function useNavigationMode() {
  const [isPersistent, setIsPersistent] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    function sync(event) {
      setIsPersistent(event.matches);
      setExpanded(event.matches);
    }

    sync(mediaQuery);
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  return { isPersistent, isExpanded, setExpanded };
}
