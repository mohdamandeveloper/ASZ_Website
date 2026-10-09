import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import CaseStudies, { caseHref, getCase } from '../../Data/CaseStudies';
import { localizeCase } from '../../Data/localizeCase';
import './CaseStudy.scss';

const Arrow = ({ size = 16, back = false }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={back ? 'M19 12H5M11 6l-6 6 6 6' : 'M5 12h14M13 6l6 6-6 6'} />
  </svg>
);

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const imgStyle = (img) => ({
  background: `${img.bg} url(${img.src}) center / ${img.size} no-repeat`,
});

export default function CaseStudy() {
  const t = useTranslation();
  const { slug } = useParams();
  const base = getCase(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!base) return <Navigate to="/service" replace />;

  // English data from CaseStudies.js, with any overrides from t.case_studies[slug]
  const cs = localizeCase(base, t);
  const idx = CaseStudies.indexOf(base);
  const n = CaseStudies.length;
  const prev = localizeCase(CaseStudies[(idx - 1 + n) % n], t);
  const next = localizeCase(CaseStudies[(idx + 1) % n], t);
  const imgProps = cs.image.label
    ? { role: 'img', 'aria-label': cs.image.label }
    : { 'aria-hidden': true };

  return (
    <main className="case-study">
      {/* 1 HERO */}
      <section id="top" className="cs-hero">
        <div className="cs-hero__grid" aria-hidden="true" />
        <div className="cs-hero__frame" aria-hidden="true" />
        <div className="wrap cs-hero__wrap">
          <div className="cs-hero__row">
            <div className="cs-hero__text">
              <div className="cs-hero__crumb up">{cs.client} <span>/</span> {t.cs_crumb}</div>
              <h1 className="up">{cs.hero.line1}<br /><span className="ac">{cs.hero.accent}</span></h1>
              <p className="up">{cs.hero.text}</p>
              <Link className="tlink up" to="/work"><Arrow back />{t.cs_all}</Link>
            </div>
            <div className="cs-hero__media cs-fadein">
              <div className="eimg" style={imgStyle(cs.image)} {...imgProps} />
              <span className="cs-hero__tag">{cs.industry}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 NUMBERS */}
      <section className="cs-stats">
        <div className="wrap estats">
          {cs.stats.map((s) => (
            <div className="estat rv" key={s.label}>
              <div className="estat__num">{s.value}</div>
              <div className="estat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3 THE STORY */}
      <section className="cs-story">
        <div className="wrap sec">
          <div className="estory">
            <div className="esticky rvl">
              <div className="cs-eyebrow"><span />{t.cs_story_eyebrow}</div>
              <h2>{t.cs_story_title} <span className="ac">{t.cs_story_accent}</span></h2>
              <div className="cs-meta">
                <span><b>{t.cs_client}</b> {cs.client}</span>
                <span><b>{t.cs_industry}</b> {cs.industry}</span>
                <span><b>{t.cs_service}</b> {cs.service}</span>
              </div>
            </div>

            <div className="estory__chapters">
              <div className="chap rv">
                <div className="chap__no">01</div>
                <h3>{t.cs_ch_challenge}</h3>
                <p>{cs.challenge.text}</p>
                <ul className="chap__bullets">
                  {cs.challenge.bullets.map((b) => <li key={b}><span />{b}</li>)}
                </ul>
              </div>

              <div className="chap rv">
                <div className="chap__no">02</div>
                <h3>{t.cs_ch_solution}</h3>
                <p className="chap__p--lg">{cs.solution.text}</p>
                <div className="chap__chips">
                  {cs.solution.chips.map((c) => <span className="chip" key={c}><span><Check /></span>{c}</span>)}
                </div>
              </div>

              <div className="chap rv">
                <div className="chap__no">03</div>
                <h3>{t.cs_ch_impact}</h3>
                <ul className="chap__impact">
                  {cs.impact.map((r) => (
                    <li key={r.text}><span className="v">{r.value}</span><span>{r.text}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 MORE STORIES */}
      <section className="cs-more">
        <div className="wrap sec">
          <div className="cs-more__head rv">
            <div>
              <div className="cs-eyebrow"><span />{t.cs_more_eyebrow}</div>
              <h2>{t.cs_more_title} <span className="ac">{t.cs_more_accent}</span></h2>
            </div>
            <Link className="tlink tlink--ac" to="/work">{t.cs_all} <Arrow /></Link>
          </div>
          <div className="mstories">
            {[{ c: prev, tag: t.cs_prev, back: true }, { c: next, tag: t.cs_next, back: false }].map(({ c, tag, back }) => (
              <Link className="ecard rv" to={caseHref(c.slug)} key={c.slug}>
                <div className="ecard__img">
                  <div className="eimg" style={{ background: `url(${c.image.src}) center / ${c.image.size} no-repeat` }} {...(c.image.label ? { role: 'img', 'aria-label': c.image.label } : { 'aria-hidden': true })} />
                </div>
                <div className="ecard__body">
                  <span className="ecard__tag">{back && <Arrow size={12} back />} {tag} {!back && <Arrow size={12} />}</span>
                  <span className="ecard__title">{c.client}</span>
                  <span className="ecard__text">{c.teaser}</span>
                  <span className="ecard__stat"><span>{c.teaserStat.value}</span><span>{c.teaserStat.label}</span></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="cs-cta">
        <div className="wrap sec cs-cta__wrap rv">
          <div className="cs-eyebrow cs-eyebrow--inline"><span />{t.svc_cta_eyebrow}</div>
          <h2>{t.svc_cta_title} <span className="ac">{t.svc_cta_accent}</span></h2>
          <p>{t.svc_cta_text}</p>
          <div className="cs-cta__actions">
            <Link to="/contact" className="btn btn-ac">{t.svc_cta_start} <Arrow /></Link>
            <Link to="/service" className="ctaghost">{t.pg_cta_explore}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}