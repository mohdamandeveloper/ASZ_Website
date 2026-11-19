import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import SeoHead from './components/Seo/SeoHead';
import { LanguageProvider } from './Context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <SeoHead />
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
