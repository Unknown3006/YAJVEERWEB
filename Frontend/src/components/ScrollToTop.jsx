import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Handle both POP (back/forward) and PUSH/REPLACE (normal navigation)
    if (navigationType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // For back/forward navigation
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [pathname, navigationType]);

  return null;
}