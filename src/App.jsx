import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
