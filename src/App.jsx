import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
