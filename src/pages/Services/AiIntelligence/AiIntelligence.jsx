import { Link } from 'react-router-dom';
import { useTranslation } from '../../../Context/LanguageContext';
import './AiIntelligence.scss';

const SERVICES_ROUTE = '/service';
const CONTACT_EMAIL = 'info@asztechnologies.com';

const ArrowRight = (
  <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function AiIntelligence() {
  const t = useTranslation();
  const deliverables = t.ai_intel_deliverables;

  return (
    <div className="ai-intel">
      {/* 1 · HERO */}
      <section id="top" className="ai-intel__hero">
        <div className="ai-intel__grid-bg" aria-hidden="true" />
        <div className="ai-intel__frame" aria-hidden="true" />

        <div className="ai-intel__wrap ai-intel__hero-wrap">
          <div className="ai-intel__hero-inner">
            <div className="up ai-intel__crumb">
              <span className="live ai-intel__crumb-dot" />
              <Link to={SERVICES_ROUTE}>{t.ai_intel_crumb_services}</Link>
              <span className="ai-intel__crumb-sep">/</span>
              <span>{t.ai_intel_crumb_current}</span>
            </div>

            <h1 className="up ai-intel__h1">
              {t.ai_intel_h1_line1}<br />
              <span className="ac">{t.ai_intel_h1_accent}</span>
            </h1>

            <p className="up ai-intel__lead">{t.ai_intel_lead}</p>

            <div className="up ai-intel__actions">
              <a className="btn btn-ac" href="#contact">
                {t.ai_intel_cta}
                {ArrowRight}
              </a>
              <Link className="btn btn-ghost ai-intel__ghost" to={SERVICES_ROUTE}>{t.ai_intel_all_services}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · WHAT WE DELIVER */}
      <section className="ai-intel__deliver">
        <div className="ai-intel__wrap ai-intel__sec ai-intel__deliver-wrap">
          <div className="ai-intel__split rv">
            <div>
              <div className="eyebrow">{t.ai_intel_deliver_eyebrow}</div>
              <h2 className="h2 ai-intel__title">
                {t.ai_intel_deliver_title} <span className="ac">{t.ai_intel_deliver_accent}</span>
              </h2>
            </div>
          </div>

          <div className="ai-intel__cards">
            {deliverables.map((d, i) => (
              <div key={i} className="ai-intel__card rvs">
                <span className="ai-intel__card-bar" aria-hidden="true" />
                <span className="ai-intel__card-n">{`0${i + 1}`}</span>
                <h3 className="ai-intel__card-title">{d.title}</h3>
                <p className="ai-intel__card-text">{d.text}</p>
                <span className="ai-intel__tags">
                  {d.tags.map((tag) => (
                    <span key={tag} className="ai-intel__tag">{tag}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · CTA */}
      <section id="contact" className="ai-intel__cta">
        <div className="ai-intel__wrap ai-intel__sec ai-intel__cta-wrap rv">
          <div className="eyebrow ai-intel__cta-eyebrow">{t.ai_intel_cta_eyebrow}</div>
          <h2 className="h2 ai-intel__cta-title">
            {t.ai_intel_cta_title} <span className="ac">{t.ai_intel_cta_accent}</span>
          </h2>
          <p className="ai-intel__cta-lead">{t.ai_intel_cta_text}</p>
          <div className="ai-intel__cta-actions">
            <a className="btn btn-ac ai-intel__cta-btn" href={`mailto:${CONTACT_EMAIL}`}>
              {t.ai_intel_cta}
              {ArrowRight}
            </a>
            <Link className="btn ai-intel__cta-btn ai-intel__cta-ghost" to={SERVICES_ROUTE}>{t.ai_intel_all_services}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}