import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top whenever the route (pathname) changes.
 * Mount this ONCE, inside your <Router>, above/alongside your <Routes>.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant jump on route change (link clicks / back-forward).
    // Any other scrolling in the app (anchor links, "scroll to section"
    // buttons, etc.) is untouched here and will keep using your global
    // `scroll-behavior: smooth` CSS.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}