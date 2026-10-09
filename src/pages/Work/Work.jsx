import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage, useTranslation } from '../../Context/LanguageContext';
import CaseStudies, { caseHref } from '../../Data/CaseStudies';
import { localizeCases } from '../../Data/localizeCase';
import './Work.scss';

// Labels come from the locale files (wk_filter_<id>)
const FILTERS = ['all', 'product', 'security', 'enterprise'];

const Arrow = ({ size = 16 }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const Work = () => {
  const t = useTranslation();
  const { language } = useLanguage();
  const [active, setActive] = useState('all');
  const { hash, key } = useLocation();
  const storiesRef = useRef(null);

  const items = localizeCases(CaseStudies, t).filter((c) => active === 'all' || c.category === active);

  // "3 case studies" / Arabic has dual, few and many forms, so pick the label by plural category
  const countLabel = (n) => {
    let cat = 'other';
    try { cat = new Intl.PluralRules(String(language.code || 'en').toLowerCase()).select(n); } catch (e) { /* keep 'other' */ }
    return (t[`wk_count_${cat}`] || t.wk_count_other).replace('{n}', n);
  };

  // scroll to in-page hashes (e.g. /work#contact)
  useEffect(() => {
    if (!hash) return undefined;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return undefined;
    const timer = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    return () => clearTimeout(timer);
  }, [hash, key]);

  // "Explore Case Studies": scroll down AND move keyboard focus to the stories section,
  // so the next Tab lands on the first filter pill instead of back in the hero.
  const goToStories = (e) => {
    e.preventDefault();
    const el = storiesRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  };

  return (
    <main className="work-page">
      {/* 1 HERO */}
      <section id="top" className="wk-hero">
        <div className="wk-hero__grid" aria-hidden="true" />
        <div className="wk-hero__frame" aria-hidden="true" />
        <div className="wrap wk-hero__wrap">
          <div className="wk-hero__body">
            <div className="wk-hero__pill up"><span className="live dot" />{t.wk_pill}</div>
            <h1 className="up">{t.wk_h1_line1}<br /><span className="ac">{t.wk_h1_accent}</span></h1>
            <p className="up">{t.wk_text}</p>
            <a className="btn btn-ac up wk-hero__btn" href="#stories" onClick={goToStories}>
              {t.wk_explore} <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* 2 ALL STORIES */}
      <section id="stories" className="wk-stories" ref={storiesRef} tabIndex={-1}>
        <div className="wk-stories__bar">
          <div className="wrap wk-bar" role="group" aria-label={t.wk_filter_label}>
            {FILTERS.map((id) => (
              <button
                key={id}
                type="button"
                className={`pill${id === active ? ' pill--on' : ''}`}
                aria-pressed={id === active}
                onClick={() => setActive(id)}
              >
                {t[`wk_filter_${id}`]}
              </button>
            ))}
          </div>
        </div>

        <div className="wrap sec wk-stories__wrap">
          {/* aria-live: screen readers hear how many stories match the chosen filter */}
          <p className="wk-sr" role="status" aria-live="polite">
            {countLabel(items.length)}
          </p>

          <div className="egrid">
            {items.map((c) => (
              // key includes the filter so the entrance animation replays when it changes
              <Link className="ecard rv" to={caseHref(c.slug)} key={`${active}-${c.slug}`}>
                <div className="ecard__media">
                  <div
                    className="eimg"
                    style={{ background: `${c.image.bg} url(${c.image.src}) center / ${c.image.size} no-repeat` }}
                    {...(c.image.label ? { role: 'img', 'aria-label': c.image.label } : { 'aria-hidden': true })}
                  />
                  <span className="ecard__chip">{t.wk_chip}</span>
                </div>
                <div className="ecard__body">
                  <div className="ecard__industry">{c.industry}</div>
                  <div className="ecard__row">
                    <span className="ecard__title">{c.client}</span>
                    <span className="go" aria-hidden="true"><ArrowUpRight /></span>
                  </div>
                  <div className="ecard__text">{c.teaser}</div>
                  <div className="ecard__stat"><span>{c.teaserStat.value}</span><span>{c.teaserStat.label}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="wk-cta">
        <div className="wrap sec wk-cta__wrap rv">
          <div className="wk-eyebrow"><span />{t.svc_cta_eyebrow}</div>
          <h2>{t.svc_cta_title} <span className="ac">{t.svc_cta_accent}</span></h2>
          <p>{t.svc_cta_text}</p>
          <div className="wk-cta__actions">
            <Link to="/contact" className="btn btn-ac">{t.svc_cta_start} <Arrow /></Link>
            <Link to="/service" className="ctaghost">{t.pg_cta_explore}</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Work;