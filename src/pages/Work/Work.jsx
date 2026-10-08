import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import './Work.scss';

// ---- Route map: same values as Header.jsx ----
const ROUTES = {
  services: '/service',
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

// Service ids, in the same order as `t.hdr_service_items` (Context/Translation.js),
// so the filter labels are translated by the same entries the header uses.
const SERVICE_IDS = ['ai', 'security', 'erp', 'product', 'digital', 'talent'];
const FILTERS = ['all', ...SERVICE_IDS];

// Placeholder projects – replace with real case studies. Add `title`, `text` and `year`
// per project (plain strings or per-language); until then the translated placeholders show.
const PROJECTS = [
  { service: 'ai' },
  { service: 'product' },
  { service: 'product' },
  { service: 'digital' },
  { service: 'security' },
  { service: 'ai' },
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
  const t = useTranslation();
  const [active, setActive] = useState('all');
  const { hash, key } = useLocation();

  const labelOf = (id) => (id === 'all' ? t.work_filter_all : t.hdr_service_items[SERVICE_IDS.indexOf(id)].title);
  const items = PROJECTS.filter((p) => active === 'all' || p.service === active);
  const countWord = items.length === 1 ? t.work_project_one : items.length === 2 ? t.work_project_two : t.work_project_many;

  // scroll to in-page hashes (e.g. /work#contact)
  useEffect(() => {
    if (!hash) return undefined;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;
    const timer = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(timer);
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
              {t.work_badge}
            </div>

            <h1 className="up pg-hero__title">
              {t.work_h1_line1}
              <br />
              <span className="ac">{t.work_h1_accent}</span>
            </h1>

            <p className="up pg-hero__text">{t.work_text}</p>
            <div className="sv-hero__cta up">
              <a className="btn btn-ac" href="#contact">{t.svc_cta_start} <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · FILTER BAR */}
      <div className="work-filter">
        <div className="pg-wrap work-filter__inner">
          <div className="work-filter__pills" role="group" aria-label={t.work_filter_label}>
            {FILTERS.map((id) => (
              <button
                key={id}
                type="button"
                className={`work-pill${id === active ? ' work-pill--on' : ''}`}
                aria-pressed={id === active}
                onClick={() => setActive(id)}
              >
                {labelOf(id)}
              </button>
            ))}
          </div>
          <div className="work-filter__count">
            <span>{items.length}</span> {countWord}
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
                    {t.work_ph_image}
                    <span className="work-card__go">{arrowUpRight}</span>
                  </div>
                  <div className="work-card__title">{w.title || t.work_ph_title}</div>
                  <p className="work-card__text">{w.text || t.work_ph_text}</p>
                  <div className="work-card__tags">
                    <span className="work-card__tag">{labelOf(w.service)}</span>
                    <span className="work-card__tag work-card__tag--year">{w.year || t.work_ph_year}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="pg-pop work-empty">
              <div className="work-empty__title">
                {t.work_empty_pre} <span className="ac">{labelOf(active)}</span> {t.work_empty_post}
              </div>
              <p className="work-empty__text">{t.work_empty_text}</p>
              <button type="button" className="work-pill" onClick={() => setActive('all')}>
                {t.work_show_all}
              </button>
            </div>
          )}
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

export default Work;