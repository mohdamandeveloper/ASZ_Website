import { useTranslation } from '../../../Context/LanguageContext';
import './DigitalTransformation.scss';

const ROUTES = {
  services: '/services', // change to your route (or swap <a> for <Link>)
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

const arrow = (
  <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DigitalTransformation = () => {
  const t = useTranslation();
  const items = t.dt_items;

  return (
  <div className="svc-page">
    {/* 1 · HERO */}
    <section id="top" className="svc-hero">
      <div className="svc-wrap">
        <div className="svc-hero__grid">
          <div className="up svc-hero__crumb">
            <span className="live dot" />
            <a href={ROUTES.services}>{t.svc_crumb_services}</a>
            <span className="sep">/</span>
            <span>{t.dt_crumb}</span>
          </div>

          <h1 className="up svc-hero__title">
            {t.dt_h1_line1}
            <br />
            <span className="ac">{t.dt_h1_accent}</span>
          </h1>

          <p className="up svc-hero__text">{t.dt_text}</p>

          <div className="up svc-hero__actions">
            <a className="btn btn-ac" href={ROUTES.contact}>
              {t.svc_cta_start}
              {arrow}
            </a>
            <a className="btn btn-ghost" href={ROUTES.services}>
              {t.svc_all_services}
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* 2 · WHAT WE DELIVER */}
    <section className="svc-deliver">
      <div className="svc-wrap">
        <div className="rv svc-deliver__head">
          <div>
            <div className="eyebrow">{t.svc_deliver_eyebrow}</div>
            <h2 className="svc-deliver__title">
              {t.svc_deliver_inside} <span className="ac">{t.dt_deliver_accent}</span>
            </h2>
          </div>
        </div>

        <div className="svc-cards">
          {items.map((item, i) => (
            <div className="rvs svc-card" key={item.title}>
              <span className="svc-card__bar" aria-hidden="true" />
              <span className="svc-card__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="svc-card__title">{item.title}</h3>
              <p className="svc-card__text">{item.text}</p>
              <span className="svc-card__tags">
                {item.tags.map((tag) => (
                  <span className="svc-card__tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section id="contact" className="svc-cta">
      <div className="svc-wrap rv">
        <div className="eyebrow">{t.svc_cta_eyebrow}</div>
        <h2 className="svc-cta__title">
          {t.svc_cta_title} <span className="ac">{t.svc_cta_accent}</span>
        </h2>
        <p className="svc-cta__text">{t.svc_cta_text}</p>
        <div className="svc-cta__actions">
          <a className="btn btn-ac" href={ROUTES.email}>
            {t.svc_cta_start}
            {arrow}
          </a>
          <a className="btn svc-cta__ghost" href={ROUTES.services}>
            {t.svc_all_services}
          </a>
        </div>
      </div>
    </section>
  </div>
  );
};

export default DigitalTransformation;