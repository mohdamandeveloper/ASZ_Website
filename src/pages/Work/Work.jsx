import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Work.scss';

// ---- Route map: same values as Header.jsx ----
const ROUTES = {
  services: '/service',
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

const FILTERS = [
  'All',
  'AI & Intelligent Systems',
  'Smart Security Systems',
  'Enterprise Systems & ERP',
  'Product & Application Engineering',
  'Digital Transformation & Cloud',
  'Technology Talent & Engineering',
];

// Placeholder projects – replace title / text / year / service with real case studies
const PROJECTS = [
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'AI & Intelligent Systems' },
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'Product & Application Engineering' },
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'Product & Application Engineering' },
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'Digital Transformation & Cloud' },
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'Smart Security Systems' },
  { title: '[CLIENT]: [WHAT WE BUILT]', text: '[ONE-LINE RESULT OR OUTCOME]', year: '[YEAR]', service: 'AI & Intelligent Systems' },
];

const arrowUpRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const arrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Work = () => {
  const [active, setActive] = useState('All');
  const { hash, key } = useLocation();

  const items = PROJECTS.filter((p) => active === 'All' || p.service === active);

  // scroll to in-page hashes (e.g. /work#contact)
  useEffect(() => {
    if (!hash) return undefined;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;
    const t = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(t);
  }, [hash, key]);

  return (
    <div className="work-page">
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
              Our work
            </div>

            <h1 className="up pg-hero__title">
              Proof,
              <br />
              <span className="ac">not promises.</span>
            </h1>

            <p className="up pg-hero__text">
              Our work spans industries and geographies real deployments, real clients, and real technology built to solve meaningful business challenges.
            </p>
            <div className="sv-hero__cta up">
              <a className="btn btn-ac" href="#contact">Start a Conversation <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · FILTER BAR */}
      <div className="work-filter">
        <div className="pg-wrap work-filter__inner">
          <div className="work-filter__pills" role="group" aria-label="Filter by service">
            {FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                className={`work-pill${name === active ? ' work-pill--on' : ''}`}
                aria-pressed={name === active}
                onClick={() => setActive(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="work-filter__count">
            <span>{items.length}</span> {items.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </div>

      {/* 3 · GRID + EMPTY STATE */}
      <section className="work-grid-sec">
        <div className="pg-wrap pg-sec work-grid-wrap">
          {items.length > 0 ? (
            <div className="work-grid">
              {items.map((w, i) => (
                // key includes the filter so the "pop" entrance replays when the filter changes
                <a className="pg-pop work-card" href={ROUTES.contact} key={`${active}-${i}`}>
                  <div className="work-card__img">
                    [PROJECT IMAGE]
                    <span className="work-card__go">{arrowUpRight}</span>
                  </div>
                  <div className="work-card__title">{w.title}</div>
                  <p className="work-card__text">{w.text}</p>
                  <div className="work-card__tags">
                    <span className="work-card__tag">{w.service}</span>
                    <span className="work-card__tag work-card__tag--year">{w.year}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="pg-pop work-empty">
              <div className="work-empty__title">
                No projects under <span className="ac">{active}</span> yet.
              </div>
              <p className="work-empty__text">Case studies for this service are on their way.</p>
              <button type="button" className="work-pill" onClick={() => setActive('All')}>
                Show all work
              </button>
            </div>
          )}
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

export default Work;