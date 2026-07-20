import { Outlet } from 'react-router';
import {Header} from '../components/common/Header'; 
import {Footer} from '../components/common/Footer';
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



const Root = () => {
  return (
    <div className="app-container">
      <Analytics />
      {/* Хедер рендериться один раз і буде всюди */}
      <Header /> 
      
      <main className="main-content">
        {/* Тут React Router буде підставляти поточну сторінку (HomePage, CatalogPage тощо) */}
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Root;