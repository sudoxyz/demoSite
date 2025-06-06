import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTransition({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return <div className="route-animate">{children}</div>;
}