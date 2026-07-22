
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import ReactGA from "react-ga4";
  import "../styles/index.css";


  ReactGA.initialize("G-GP2K579EGP");
  createRoot(document.getElementById("root")!).render(<App />);