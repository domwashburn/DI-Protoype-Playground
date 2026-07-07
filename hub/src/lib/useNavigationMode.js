import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = '(min-width: 66rem)';

/**
 * Tracks whether the viewport is at the persistent-nav breakpoint.
 * Returns { isPersistent, isExpanded, setExpanded }.
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
