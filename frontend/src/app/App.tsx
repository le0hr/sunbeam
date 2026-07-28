import { RouterProvider } from "react-router";
import { router } from "./routes";
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  return (
  <>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </>
);
}
