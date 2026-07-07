import { Outlet } from 'react-router';
import {Header} from '../components/common/Header'; 
import {Footer} from '../components/common/Footer';

const Root = () => {
  return (
    <div className="app-container">
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