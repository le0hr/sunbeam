import { useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
export function ScrollToHash() {
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) return;

    requestAnimationFrame(() => {
      const element = document.getElementById(hash.slice(1));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [hash]);

  return null;
}