import { useEffect } from 'react';

import { useTranslation } from '../../../Context/LanguageContext';
import './SmartSecurity.scss';
import { Link } from 'react-router-dom';

// ---- Shared bits (page text lives in the locale files) ---------------------
const ARROW_RIGHT = 'M5 12h14M13 6l6 6-6 6';

function ArrowIcon() {
  return (
    <svg
      className="rtl-flip"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ARROW_RIGHT} />
    </svg>
  );
}

// ---- Page ------------------------------------------------------------------
export default function SmartSecurity() {
  const t = useTranslation();
  const cards = t.sec_items;
  const docTitle = t.sec_doc_title;

  useEffect(() => {
    document.title = docTitle;
  }, [docTitle]);

  return (
    <main className="svc">
      {/* 1. Hero */}
      <section id="top" className="svc__hero">
        <div className="svc__hero-grid" aria-hidden="true" />
        <div className="svc__hero-frame" aria-hidden="true" />

        <div className="svc__wrap svc__hero-wrap">
          <div className="svc__hero-inner">
            <div className="svc__crumb up">
              <span className="svc__crumb-dot live" />
              <a href="/services">{t.svc_crumb_services}</a>
              <span className="svc__crumb-sep">/</span>
              <span>{t.sec_crumb}</span>
            </div>

            <h1 className="svc__hero-title up">
              {t.sec_h1_line1}
              <br />
              <span className="ac">{t.sec_h1_accent}</span>
            </h1>

            <p className="svc__hero-text up">{t.sec_text}</p>

            <div className="svc__hero-actions up">
              <Link to={'/contact'} className="btn btn-ac">
                {t.svc_cta_start}
                <ArrowIcon />
              </Link>
              <Link className="btn btn-ghost svc__btn-semibold" to="/service">
                {t.svc_all_services}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What we deliver */}
      <section className="svc__deliver">
        <div className="svc__wrap svc__deliver-wrap">
          <div className="svc__split rv">
            <div>
              <div className="eyebrow">{t.svc_deliver_eyebrow}</div>
              <h2 className="svc__title">
                {t.svc_deliver_inside} <span className="ac">{t.sec_deliver_accent}</span>
              </h2>
            </div>
          </div>

          <div className="svc__cards">
            {cards.map((card, i) => (
              <div className="svc__card rvs" key={i}>
                <span className="svc__card-bar" aria-hidden="true" />
                <span className="svc__card-num">{`0${i + 1}`}</span>
                <h3 className="svc__card-title">{card.title}</h3>
                <p className="svc__card-text">{card.text}</p>
                <span className="svc__tags">
                  {card.tags.map((tag) => (
                    <span className="svc__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Call to action */}
      <section id="contact" className="svc__cta">
        <div className="svc__wrap svc__cta-wrap rv">
          <div className="eyebrow svc__cta-eyebrow">{t.svc_cta_eyebrow}</div>
          <h2 className="svc__cta-title">
            {t.svc_cta_title} <span className="ac">{t.svc_cta_accent}</span>
          </h2>
          <p className="svc__cta-text">{t.svc_cta_text}</p>
          <div className="svc__cta-actions">
            <Link to={'/contact'} className="btn btn-ac svc__cta-btn">
              {t.svc_cta_start}
              <ArrowIcon />
            </Link>
            <a className="btn svc__cta-btn svc__cta-ghost" href="/services">
              {t.svc_all_services}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}