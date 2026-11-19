import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo, headTagList } from '../../seo';

// Keeps <title>, meta tags, canonical and JSON-LD in sync with the current route
// during client-side navigation. The first load already has the right tags from
// the build-time prerender (scripts/prerender.js); this replaces them in place.
const MANAGED = 'data-seo';

function setTag({ tag, attrs }) {
  const key = attrs.name ? 'name' : attrs.property ? 'property' : 'rel';
  const selector = `${tag}[${key}="${attrs[key]}"]`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.setAttribute(MANAGED, '');
  return el;
}

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const s = getSeo(pathname);
    document.title = s.title;

    const keep = new Set(headTagList(s).map(setTag));
    // Drop tags this page doesn't use (e.g. canonical / og:url on the 404 page).
    for (const el of document.head.querySelectorAll('meta[name], meta[property], link[rel="canonical"]')) {
      const managed = el.hasAttribute(MANAGED) || el.matches('link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"], meta[name="robots"], meta[name="description"]');
      if (managed && !keep.has(el)) el.remove();
    }

    let ld = document.head.querySelector('script[type="application/ld+json"]');
    if (s.jsonLd) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(s.jsonLd);
    } else if (ld) {
      ld.remove();
    }
  }, [pathname]);

  return null;
}
