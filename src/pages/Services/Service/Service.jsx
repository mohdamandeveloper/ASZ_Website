import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useTranslation } from '../../../Context/LanguageContext';
import './Service.scss';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
// Title / sub / desc / tags live in the locale files (services_page_items, same order)
const SERVICES = [
  {
    href: '/service/ai-intelligence',
    icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4',
  },
  {
    href: '/service/smart-security',
    icon: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4',
  },
  {
    href: '/service/enterprise-erp',
    icon: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
  },
  {
    href: '/service/product-application',
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  },
  {
    href: '/service/digital-transformation',
    icon: 'M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18z',
  },
  {
    href: '/service/technology-talent',
    icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.87M15.5 4.13a3 3 0 0 1 0 5.74',
  },
];
const N = SERVICES.length;
const CASES = [{ cls: 'rvl' }, { cls: 'rvr' }]; // placeholder case-study cards

const Arrow = ({ size = 16 }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
export default function Service() {
  const t = useTranslation();
  const { isRTL } = useLanguage();
  const items = t.services_page_items;
  // +1 in LTR, -1 in RTL: mirrors the fan (card order, drag, scroll, arrow keys)
  const dirRef = useRef(1);
  dirRef.current = isRTL ? -1 : 1;
  const fanRef = useRef(null);
  const posRef = useRef(0);       // latest fan position (read inside event handlers)
  const hold = useRef(false);     // pause autoplay while the user is interacting
  const dragInfo = useRef(null);
  const moved = useRef(false);

  const [pos, setPos] = useState(0); // float: whole numbers = a card is centred
  const [drag, setDrag] = useState(false);

  const cur = ((Math.round(pos) % N) + N) % N;

  const move = (p, d = false) => { posRef.current = p; setPos(p); setDrag(d); };

  const goTo = (k) => {
    const base = Math.round(posRef.current);
    const c = ((base % N) + N) % N;
    let d = k - c;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    move(base + d, false);
  };

  /* Drag, swipe, sideways scroll, arrow keys + autoplay ------------- */
  useEffect(() => {
    const el = fanRef.current;
    if (!el) return undefined;
    let snap;

    const onDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      dragInfo.current = { x: e.clientX, p: posRef.current };
      moved.current = false;
      hold.current = true;
    };
    const onMove = (e) => {
      if (!dragInfo.current) return;
      const dx = e.clientX - dragInfo.current.x;
      if (Math.abs(dx) > 6) moved.current = true;
      if (!moved.current) return;
      el.style.cursor = 'grabbing';
      move(dragInfo.current.p - (dirRef.current * dx) / 250, true);
    };
    const onUp = () => {
      if (!dragInfo.current) return;
      dragInfo.current = null;
      el.style.cursor = 'grab';
      if (moved.current) {
        move(Math.round(posRef.current), false);
        setTimeout(() => { moved.current = false; }, 60);
      }
    };
    const onWheel = (e) => {
      const dx = e.shiftKey ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return;
      e.preventDefault();
      hold.current = true;
      move(posRef.current + (dirRef.current * dx) / 320, true);
      clearTimeout(snap);
      snap = setTimeout(() => move(Math.round(posRef.current), false), 140);
    };
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { hold.current = true; move(Math.round(posRef.current) + dirRef.current, false); }
      if (e.key === 'ArrowLeft') { hold.current = true; move(Math.round(posRef.current) - dirRef.current, false); }
    };

    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('keydown', onKey);

    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const timer = still ? null : setInterval(() => {
      if (!hold.current && !dragInfo.current) move(Math.round(posRef.current) + 1, false);
    }, 3400);

    return () => {
      if (timer) clearInterval(timer);
      clearTimeout(snap);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('keydown', onKey);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  /* Card placement along the fan */
  const placement = (i) => {
    let d = i - pos;
    d = ((((d + N / 2) % N) + N) % N) - N / 2;
    const a = Math.abs(d);
    return {
      transform: `translateX(${(d * 250 * dirRef.current).toFixed(1)}px) translateY(${(a * a * 14).toFixed(1)}px) rotate(${(d * 6.5 * dirRef.current).toFixed(2)}deg) scale(${(1 - a * 0.06).toFixed(3)})`,
      zIndex: 20 - Math.round(a * 4),
      opacity: a > 2.6 ? 0 : 1,
    };
  };

  return (
    <main className="services">
      {/* 1 HERO with service cards */}
      <section id="top" className="sv-hero">
        <div className="sv-hero__grid" aria-hidden="true" />
        <div className="sv-hero__frame" aria-hidden="true" />

        <div className="wrap sv-hero__wrap">
          <div className="pill up"><span className="live dot" />{t.services_page_pill}</div>
          <h1 className="up">{t.services_page_line1}<br /><span className="ac">{t.services_page_accent}</span></h1>
          <p className="up">{t.services_page_text}</p>
          <div className="sv-hero__cta up">
            <Link to={'/contact'} className="btn btn-ac">{t.services_page_cta} <Arrow /></Link>
          </div>
        </div>

        <div
          id="asz-fan"
          ref={fanRef}
          className={`fan up${drag ? ' is-drag' : ''}`}
          onMouseEnter={() => { hold.current = true; }}
          onMouseLeave={() => { hold.current = false; }}
        >
          {SERVICES.map((s, i) => {
            const txt = items[i];
            const on = i === cur;
            const tone = on ? 'is-on' : i % 2 === 0 ? 'is-light' : 'is-dark';
            return (
              <div className={`fcard ${tone}`} key={s.href} style={placement(i)}>
                <div className="fcard__top">
                  <span className="fcard__icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                  </span>
                  <span className="fcard__num">
                    {`0${i + 1}`}
                    <span className="fcard__go">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                    </span>
                  </span>
                </div>

                <div className="fcard__body">
                  <div className="fcard__title">{txt.title}</div>
                  <div className="fcard__sub">{txt.sub}</div>
                  <div className="fcard__desc">{txt.desc}</div>
                  <div className="fcard__tags">{txt.tags.map((tag) => <span className="fcard__tag" key={tag}>{tag}</span>)}</div>
                  <Link className="fopen" to={s.href} draggable="false" tabIndex={on ? 0 : -1}>
                    {t.services_page_learn_more} <Arrow />
                  </Link>
                </div>

                <button
                  className="fhit"
                  type="button"
                  aria-label={t.services_page_show.replace('{title}', txt.title)}
                  tabIndex={on ? -1 : 0}
                  onClick={() => { if (moved.current) return; hold.current = true; goTo(i); }}
                />
              </div>
            );
          })}
        </div>

        <div className="sv-hero__foot up">
          <div className="sv-hero__dots" aria-hidden="true">
            {SERVICES.map((s, i) => <span key={s.href} className={i === cur ? 'is-on' : ''} />)}
          </div>
          <span className="sv-hero__hint">
            <svg className="nudge" width="34" height="14" viewBox="0 0 34 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 7h32M6 2L1 7l5 5M28 2l5 5-5 5" /></svg>
            {t.services_page_hint}
          </span>
        </div>
      </section>

      {/* 2 SELECTED WORK */}
      <section className="sv-work">
        <div className="wrap sec sv-work__wrap">
          <div className="sv-work__box rv">
            <div className="split sv-work__head">
              <div>
                <div className="eyebrow">{t.services_page_work_eyebrow}</div>
                <h2>{t.services_page_work_title} <span className="ac">{t.services_page_work_accent}</span></h2>
              </div>
            </div>
            <div className="g2">
              {CASES.map((c, i) => (
                <Link className={`sv-case ${c.cls}`} to="/work" key={i}>
                  <div className="sv-case__img">{t.services_page_case_image}</div>
                  <div className="sv-case__title">{t.services_page_case_title}</div>
                  <div className="sv-case__meta">{t.services_page_case_meta}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="sv-cta">
        <div className="wrap sec sv-cta__wrap rv">
          <div className="eyebrow">{t.services_page_cta_eyebrow}</div>
          <h2>{t.services_page_cta_title} <span className="ac">{t.services_page_cta_accent}</span></h2>
          <p>{t.services_page_cta_text}</p>
          <div className="sv-cta__actions">
            <Link to={'/contact'} className="btn btn-ac">{t.services_page_cta} <Arrow /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}