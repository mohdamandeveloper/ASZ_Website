import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import cordonCubes from '../../assets/images/cordon-cubes.webp'; // adjust path if your assets live elsewhere
import './Products.scss';

// ---- Route map: same values as Header.jsx ----
const ROUTES = {
  services: '/service',
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

// `id` must match the hash used in the header drop-down (/products#cordon, #mediq, #jobscout)
// Product names are brand names, so they stay in Latin. All other text comes from `t.prod_items`
// (Context/Translation.js), in the same order as this array.
const PRODUCTS = [
  { id: 'cordon', name: 'Cordon', shot: '[CORDON SCREENSHOT]', image: cordonCubes },
  { id: 'mediq', name: 'MEDIQ', shot: cordonCubes, image: undefined },
  { id: 'jobscout', name: 'JobScout', shot: cordonCubes, image: undefined },
];

const arrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const arrowUpRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const check = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Products = () => {
  const t = useTranslation();
  const items = t.prod_items;
  const { hash, key } = useLocation();

  // Header links like /products#cordon: React Router doesn't scroll to hashes by itself,
  // so scroll to the matching product section whenever the hash changes.
  useEffect(() => {
    if (!hash) return undefined;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;
    // small delay so it runs after any "scroll to top on route change" logic
    const timer = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(timer);
  }, [hash, key]);

  return (
    <div className="products-page">
      {/* 1 · HERO */}
      <section id="top" className="pg-hero">
        <div className="fadein pg-hero__orb pg-hero__orb--lg" aria-hidden="true">
          <div className="pg-hero__ring" />
        </div>
        <div className="fadein pg-hero__orb pg-hero__orb--sm" aria-hidden="true">
          <div className="pg-hero__ring" />
        </div>

        <div className="pg-wrap pg-wrap--hero">
          <div className="pg-hero__grid">
            <div className="up pg-hero__badge">
              <span className="live dot" />
              {t.prod_badge}
            </div>

            <h1 className="up pg-hero__title">
              {t.prod_h1_line1}
              <br />
              <span className="ac">{t.prod_h1_accent}</span>
            </h1>

            <p className="up pg-hero__text">{t.prod_text}</p>

            <div className="up pg-hero__actions">
              <a className="btn btn-ac" href="#products">
                {t.prod_explore}
                {arrowRight}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · PRODUCT CARDS */}
      <section id="products">
        <div className="pg-wrap pg-sec products-list">
          {PRODUCTS.map((p, i) => {
            const rev = i % 2 === 1;
            const txt = items[i];
            return (
              <div id={p.id} className={`rv products-card${rev ? ' products-card--rev' : ''}`} key={p.id}>
                <div className={`${rev ? 'rvr' : 'rvl'} products-card__media`}>
                  <div className={`products-card__shot${p.image ? ' products-card__shot--dark' : ''}`}>
                    {p.image ? (
                      <>
                        <div className="products-card__zoom" aria-hidden="true" style={{ backgroundImage: `url(${p.image})` }} />
                        <div className="products-card__shade" aria-hidden="true" />
                      </>
                    ) : (
                      <div className="products-card__stripes" aria-hidden="true" />
                    )}
                    <div className={`floaty products-card__placeholder${p.image ? ' products-card__placeholder--dark' : ''}`}>{p.shot}</div>
                  </div>
                </div>

                <div className={`${rev ? 'rvl' : 'rvr'} products-card__body`}>
                  <div className="products-card__label">{`${t.prod_label} · ${String(i + 1).padStart(2, '0')}`}</div>
                  <h2 className="products-card__name">{p.name}</h2>
                  <p className="products-card__desc">{txt.description}</p>
                  <ul className="products-card__features">
                    {txt.features.map((f, idx) => (
                      <li key={`${f}-${idx}`}>
                        <span className="products-card__check">{check}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="products-card__category">{txt.category}</span>
                  <div className="products-card__actions">
                    <a className="btn btn-ac" href={ROUTES.contact}>
                      {t.prod_book_demo}
                      {arrowRight}
                    </a>
                    <a className="tlink" href={ROUTES.contact}>
                      {t.prod_learn_more} {arrowUpRight}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="pg-cta">
        <div className="rv pg-wrap pg-sec pg-cta__inner">
          <div className="eyebrow">{t.svc_cta_eyebrow}</div>
          <h2 className="pg-cta__title">
            {t.svc_cta_title} <span className="ac">{t.svc_cta_accent}</span>
          </h2>
          <p className="pg-cta__text">{t.svc_cta_text}</p>
          <div className="pg-cta__actions">
            <a className="btn btn-ac" href={ROUTES.email}>
              {t.svc_cta_start}
              {arrowRight}
            </a>
            <Link className="btn pg-cta__ghost" to={ROUTES.services}>
              {t.pg_cta_explore}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;