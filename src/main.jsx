import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import './styles/global.scss';
import { routes } from './routes';

const router = createBrowserRouter(routes);

// The HTML in #root is prerendered at build time (scripts/prerender.js) so
// crawlers, AI agents and link previews can read the page without running
// JavaScript. In the browser we render fresh with createRoot (not hydrateRoot):
// the language is picked from geo/localStorage on the client, which can differ
// from the English prerender, and a fresh render avoids hydration mismatches.
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
