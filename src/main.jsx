import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import App from './App';
import './styles/global.scss';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import { StrictMode } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
