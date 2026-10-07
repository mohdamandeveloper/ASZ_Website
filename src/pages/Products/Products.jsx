import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cordonCubes from '../../assets/images/cordon-cubes.webp'; // adjust path if your assets live elsewhere
import './Products.scss';

// ---- Route map: same values as Header.jsx ----
const ROUTES = {
  services: '/service',
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

// `id` must match the hash used in the header drop-down (/products#cordon, #jobscout, #safin)
const PRODUCTS = [
  {
    id: 'cordon',
    label: 'ASZ PRODUCT · 01',
    name: 'Cordon',
    description:
      'AI-powered security and access control for modern premises.',
    features: ['Vehicle & Number Plate Recognition', 'Facial Recognition & Zero-Touch Entry', 'Visitor & Vendor Management'],
    category: 'INTELLIGENT SECURITY',
    shot: '[CORDON SCREENSHOT]',
    image: cordonCubes,
  },
  {
    id: 'mediq',
    label: 'ASZ PRODUCT · 02',
    name: 'MEDIQ',
    description: 'Self-service technology that simplifies hospital registration, payments, and patient services.',
    features: ['Patient Registration & Check-in', 'Payments & Billing', 'Appointments & Queue Management'],
    category: 'SMART HEALTHCARE',
    shot: cordonCubes,
  },
  {
    id: 'jobscout',
    label: 'ASZ PRODUCT · 03',
    name: 'JobScout',
    description: 'AI-powered career discovery that helps you find relevant opportunities and take the next step.',
    features: ['AI-Powered Job Matching', 'Personalized Job & Internship Discovery', 'Career Guidance & Upskilling'],
    category: 'AI CAREER PLATFORM',
    shot: cordonCubes,
  },
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
  const { hash, key } = useLocation();

  // Header links like /products#cordon: React Router doesn't scroll to hashes by itself,
  // so scroll to the matching product section whenever the hash changes.
  useEffect(() => {
    if (!hash) return undefined;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;
    // small delay so it runs after any "scroll to top on route change" logic
    const t = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(t);
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
              Our products
            </div>

            <h1 className="up pg-hero__title">
              Products we&apos;ve built.
              <br />
              <span className="ac">Problems we&apos;ve solved.</span>
            </h1>

            <p className="up pg-hero__text">
              Our in-house product line reflects the same engineering discipline we bring to every client build: real software designed to solve real problems and operate in production.
            </p>

            <div className="up pg-hero__actions">
              <a className="btn btn-ac" href="#products">
                Explore Our Products
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
                  <div className="products-card__label">{p.label}</div>
                  <h2 className="products-card__name">{p.name}</h2>
                  <p className="products-card__desc">{p.description}</p>
                  <ul className="products-card__features">
                    {p.features.map((f, idx) => (
                      <li key={`${f}-${idx}`}>
                        <span className="products-card__check">{check}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="products-card__category">{p.category}</span>
                  <div className="products-card__actions">
                    <a className="btn btn-ac" href={ROUTES.contact}>
                      Book a Demo
                      {arrowRight}
                    </a>
                    <a className="tlink" href={ROUTES.contact}>
                      Learn More {arrowUpRight}
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
          <div className="eyebrow">Ready to build?</div>
          <h2 className="pg-cta__title">
            Let&apos;s build this <span className="ac">together.</span>
          </h2>
          <p className="pg-cta__text">
            Tell us what you&apos;re trying to solve. We&apos;ll help define the right technology approach, scope the work, and build toward the outcome.
          </p>
          <div className="pg-cta__actions">
            <a className="btn btn-ac" href={ROUTES.email}>
              Start a Conversation
              {arrowRight}
            </a>
            <Link className="btn pg-cta__ghost" to={ROUTES.services}>
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;