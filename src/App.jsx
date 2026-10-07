import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { LanguageProvider } from './Context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
