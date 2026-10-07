import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Service.scss';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    title: 'AI & Intelligent Systems',
    sub: 'AI Engineered for Real-World Intelligence.',
    desc: 'We engineer AI into the systems that power your business.',
    tags: ['AI Agents', 'Machine Learning', 'Predictive Analytics'],
    href: '/services/ai',
    icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4',
  },
  {
    title: 'Smart Security Systems',
    sub: 'Security That Sees, Understands, and Responds.',
    desc: 'Intelligent security systems that protect people, assets, and infrastructure.',
    tags: ['Facial Recognition', 'Vehicle Recognition (ANPR)', 'Access Control'],
    href: '/services/security',
    icon: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4',
  },
  {
    title: 'Enterprise Systems & ERP',
    sub: 'Connect the Systems That Run Your Business.',
    desc: 'We connect the systems that run your business, from ERP and CRM to integrated workflows.',
    tags: ['ERP Implementation', 'CRM Integration', 'Enterprise Systems'],
    href: '/services/erp',
    icon: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
  },
  {
    title: 'Product & Application Engineering',
    sub: 'Software Engineered Around How Your Business Works.',
    desc: 'Digital products and enterprise applications built around the way your business operates.',
    tags: ['Product Development', 'Application Modernization', 'API Integration'],
    href: '/services/product-engineering',
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  },
  {
    title: 'Digital Transformation & Cloud',
    sub: 'Transform Technology Into a Business Advantage.',
    desc: 'We modernize your technology infrastructure and align it with where the business is going.',
    tags: ['IT Strategy', 'Cloud Transformation', 'Enterprise Architecture'],
    href: '/services/cloud',
    icon: 'M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18z',
  },
  {
    title: 'Technology Talent & Engineering',
    sub: 'Engineering Capacity, Without the Hiring Bottleneck.',
    desc: 'Experienced engineering talent and dedicated delivery teams, built around your goals.',
    tags: ['Dedicated Engineering Teams', 'Staff Augmentation', 'Project Delivery'],
    href: '/services/talent',
    icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.87M15.5 4.13a3 3 0 0 1 0 5.74',
  },
];
const N = SERVICES.length;
const CASES = [{ cls: 'rvl' }, { cls: 'rvr' }]; // placeholder case-study cards

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ------------------------------------------------------------------ */
export default function Service() {
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
      move(dragInfo.current.p - dx / 250, true);
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
      move(posRef.current + dx / 320, true);
      clearTimeout(snap);
      snap = setTimeout(() => move(Math.round(posRef.current), false), 140);
    };
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { hold.current = true; move(Math.round(posRef.current) + 1, false); }
      if (e.key === 'ArrowLeft') { hold.current = true; move(Math.round(posRef.current) - 1, false); }
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
      transform: `translateX(${(d * 250).toFixed(1)}px) translateY(${(a * a * 14).toFixed(1)}px) rotate(${(d * 6.5).toFixed(2)}deg) scale(${(1 - a * 0.06).toFixed(3)})`,
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
          <div className="pill up"><span className="live dot" />Our services</div>
          <h1 className="up">Six capabilities.<br /><span className="ac">One accountable technology partner.</span></h1>
          <p className="up">From intelligent AI systems and smart security to cloud transformation, product engineering, technology talent, and enterprise platforms we cover the technology stack from strategy to execution.</p>
          <div className="sv-hero__cta up">
            <a className="btn btn-ac" href="#contact">Start a Conversation <Arrow /></a>
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
            const on = i === cur;
            const tone = on ? 'is-on' : i % 2 === 0 ? 'is-light' : 'is-dark';
            return (
              <div className={`fcard ${tone}`} key={s.title} style={placement(i)}>
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
                  <div className="fcard__title">{s.title}</div>
                  <div className="fcard__sub">{s.sub}</div>
                  <div className="fcard__desc">{s.desc}</div>
                  <div className="fcard__tags">{s.tags.map((t) => <span className="fcard__tag" key={t}>{t}</span>)}</div>
                  <Link className="fopen" to={s.href} draggable="false" tabIndex={on ? 0 : -1}>
                    Learn More <Arrow />
                  </Link>
                </div>

                <button
                  className="fhit"
                  type="button"
                  aria-label={`Show ${s.title.replace('&', 'and')}`}
                  tabIndex={on ? -1 : 0}
                  onClick={() => { if (moved.current) return; hold.current = true; goTo(i); }}
                />
              </div>
            );
          })}
        </div>

        <div className="sv-hero__foot up">
          <div className="sv-hero__dots" aria-hidden="true">
            {SERVICES.map((s, i) => <span key={s.title} className={i === cur ? 'is-on' : ''} />)}
          </div>
          <span className="sv-hero__hint">
            <svg className="nudge" width="34" height="14" viewBox="0 0 34 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 7h32M6 2L1 7l5 5M28 2l5 5-5 5" /></svg>
            Drag, swipe or scroll sideways
          </span>
        </div>
      </section>

      {/* 2 SELECTED WORK */}
      <section className="sv-work">
        <div className="wrap sec sv-work__wrap">
          <div className="sv-work__box rv">
            <div className="split sv-work__head">
              <div>
                <div className="eyebrow">Selected work</div>
                <h2>Recent <span className="ac">case studies.</span></h2>
              </div>
            </div>
            <div className="g2">
              {CASES.map((c, i) => (
                <Link className={`sv-case ${c.cls}`} to="/work" key={i}>
                  <div className="sv-case__img">[PROJECT IMAGE]</div>
                  <div className="sv-case__title">[CLIENT]: [WHAT WE BUILT]</div>
                  <div className="sv-case__meta">[SERVICE] · [YEAR]</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="sv-cta">
        <div className="wrap sec sv-cta__wrap rv">
          <div className="eyebrow">Ready to build?</div>
          <h2>Let's build this <span className="ac">together.</span></h2>
          <p>Tell us what you're trying to solve. We'll help define the right technology approach, scope the work, and build toward the outcome.</p>
          <div className="sv-cta__actions">
            <a className="btn btn-ac" href="mailto:info@asztechnologies.com">Start a Conversation <Arrow /></a>
          </div>
        </div>
      </section>
    </main>
  );
}