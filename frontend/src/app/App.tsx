import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useLocation } from "react-router-dom";
// import ReactGA from "react-ga4"
// import { useEffect } from "react";

export default function App() {
  return <RouterProvider router={router} />;
}
