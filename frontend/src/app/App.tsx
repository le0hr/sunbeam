import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4"
import { useEffect } from "react";

function Analytics() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <Analytics/>
      <RouterProvider router={router} />;
    </>
  )
}
