
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import ReactGA from "react-ga4";
  import "../styles/index.css";


  ReactGA.initialize("AW-18340368800");
  createRoot(document.getElementById("root")!).render(<App />);