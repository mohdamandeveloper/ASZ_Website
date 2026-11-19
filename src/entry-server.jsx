// Build-time only: renders a route to an HTML string for scripts/prerender.js.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { SITE_URL, PRERENDER_PATHS, getSeo } from './seo';

export { SITE_URL, PRERENDER_PATHS, getSeo };

const handler = createStaticHandler(routes);

export async function render(path) {
  const context = await handler.query(new Request(new URL(path, SITE_URL)));
  if (context instanceof Response) {
    throw new Error(`Route ${path} returned a redirect/response, cannot prerender`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>
  );
  return { html, statusCode: context.statusCode };
}
