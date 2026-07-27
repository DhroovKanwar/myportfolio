import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets scroll position (and Lenis) to the top on every route change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}
