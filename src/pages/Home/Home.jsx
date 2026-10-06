import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Home.scss';

/* ------------------------------------------------------------------ */
/* Config + content                                                    */
/* ------------------------------------------------------------------ */
const ORB_COLOR = '#FFC08F'; // keep in sync with --orb
const ACCENT = '#F2440F';    // keep in sync with --ac

// Edit these to match your router. Anything starting with "/" renders a <Link>.
const ROUTES = {
  work: '/work',
  services: '/services',
  security: '/services/security',
  engineering: '/services/product-engineering',
  ai: '/services/ai',
  cloud: '/services/cloud',
  jobscout: '/products#jobscout',
  safin: '/products#safin',
};

const CAPS = [
  'AI & intelligent systems',
  'Smart security',
  'Product engineering',
  'Digital transformation',
];

// Client logos come from one sprite (8 cols x 4 rows)
const logoPos = (i) =>
  `${(((i % 8) / 7) * 100).toFixed(3)}% ${((Math.floor(i / 8) / 3) * 100).toFixed(3)}%`;
const range = (a, b) => Array.from({ length: b - a }, (_, k) => a + k);
const ROW_A = range(0, 16);
const ROW_B = range(16, 31);

const INDUSTRIES = [
  'Healthcare', 'Travel & Hospitality', 'Banking', 'Education', 'Finance', 'Automotive',
  'Media & Entertainment', 'Real Estate', 'Retail', 'E-Commerce', 'Logistics & Transport',
  'Marketing & Advertising',
];
// Duplicated so the slider can loop seamlessly
const SECTORS = [...INDUSTRIES, ...INDUSTRIES].map((name, k) => {
  const i = k % INDUSTRIES.length;
  return { id: k, name, n: (i < 9 ? '0' : '') + (i + 1), py: `${((i / 11) * 100).toFixed(3)}%` };
});

const STATS = [
  { target: 15, suffix: '+', label: 'Years of delivery' },
  { target: 500, suffix: '+', label: 'Projects shipped' },
  { target: 80, suffix: '+', label: 'Professionals' },
  { target: 99, suffix: '%', label: 'On-time delivery' },
];

const STEPS = [
  { title: 'Discover', text: 'A focused discovery process to understand your goals, constraints, technology environment, and desired outcomes. We define the scope and delivery approach before engineering begins.' },
  { title: 'Design', text: 'Architecture, experience, and technical direction shaped around your business requirements, users, industry constraints, and long-term goals.' },
  { title: 'Build', text: 'Engineering, testing, and quality assurance with security, scalability, and performance considered from the first release.' },
  { title: 'Run', text: 'Deployed to production, then monitored, supported, and continuously improved as your business evolves.' },
];

const CORDON_CHIPS = [
  { label: 'Vehicle Recognition', d: 'M3 13l2-6h14l2 6v5H3zM6.5 16h.01M17.5 16h.01M3 13h18' },
  { label: 'Facial Recognition', d: 'M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M9 10v1M15 10v1M9.5 15a3.5 3.5 0 005 0' },
  { label: 'Automated Access', d: 'M6 11V8a6 6 0 0112 0v3M5 11h14v9H5zM12 15v2' },
];

/* Small shared bits ------------------------------------------------- */
const A = ({ to, children, ...rest }) =>
  to.startsWith('/') ? <Link to={to} {...rest}>{children}</Link> : <a href={to} {...rest}>{children}</a>;

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ArrowUpRight = ({ size = 16, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/* Orb helpers -------------------------------------------------------- */
const hex = (h) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(h || '');
  const n = m ? parseInt(m[1], 16) : 0xf2440f;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const makePoints = () => {
  const pts = [];
  const N = 2100;
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = ga * i;
    const kind = Math.random();
    let r;
    if (kind < 0.7) r = 1 + (Math.random() - 0.5) * 0.05;
    else if (kind < 0.85) r = 0.35 + Math.random() * 0.6;
    else r = 1.06 + Math.pow(Math.random(), 2) * 0.42;
    pts.push({ x: Math.cos(th) * rad, y, z: Math.sin(th) * rad, r, s: Math.random() * 100, k: kind });
  }
  return pts;
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
export default function Home() {
  const orbRef = useRef(null);
  const statsRef = useRef(null);
  const processRef = useRef(null);
  const sliderWrapRef = useRef(null);
  const sliderTrackRef = useRef(null);

  const [step, setStep] = useState(0); // "How we work" progress
  const [p, setP] = useState(1);       // stats count-up progress (0 → 1)

  /* Hero orb (canvas particle sphere) ------------------------------- */
  useEffect(() => {
    const c = orbRef.current;
    if (!c) return undefined;
    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const t0 = performance.now();
    const pts = makePoints();
    const col = hex(ORB_COLOR);
    const sk = hex(ACCENT);
    const [cr, cg, cb] = col;
    const lr = Math.round(cr + (255 - cr) * 0.86);
    const lg = Math.round(cg + (255 - cg) * 0.86);
    const lb = Math.round(cb + (255 - cb) * 0.84);
    let mx = 0, my = 0, tx = 0, ty = 0, raf;

    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2)));
    };
    window.addEventListener('pointermove', onMove);

    const draw = () => {
      const rect = c.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.round(rect.width * dpr);
      const H = Math.round(rect.height * dpr);
      if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
      const ctx = c.getContext('2d');
      const t = (performance.now() - t0) / 1000;
      let intro = still ? 1 : Math.min(1, t / 2.2);
      intro = 1 - Math.pow(1 - intro, 3);
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;

      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * 0.3 * (0.55 + 0.45 * intro);
      const ay = t * 0.22 + mx * 0.6;
      const ax = 0.28 + my * 0.35;
      const ca = Math.cos(ay), sa = Math.sin(ay), cx2 = Math.cos(ax), sx2 = Math.sin(ax);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < pts.length; i++) {
        const q = pts[i];
        let rr = q.r * (1 + Math.sin(t * 1.3 + q.s) * 0.014);
        if (q.k >= 0.85) rr = 1 + (rr - 1) * intro + Math.sin(t * 0.6 + q.s) * 0.02;
        const x = q.x * rr, y = q.y * rr, z = q.z * rr;
        const X = x * ca - z * sa, Z = x * sa + z * ca;
        const Y = y * cx2 - Z * sx2, Z2 = y * sx2 + Z * cx2;
        const per = 1 / (1 - Z2 * 0.24);
        const px = cx + X * R * per, py = cy + Y * R * per;
        const front = (Z2 / Math.max(rr, 1) + 1) / 2;
        const tw = 0.75 + 0.25 * Math.sin(t * 2.1 + q.s * 3);
        const size = (0.5 + front * 1.5) * dpr * (q.k >= 0.85 ? 1.15 : 1);
        const alpha = (0.1 + front * 0.82) * tw * intro * (q.k >= 0.7 && q.k < 0.85 ? 0.45 : 1);
        if (front > 0.66) ctx.fillStyle = `rgba(${lr},${lg},${lb},${alpha.toFixed(3)})`;
        else ctx.fillStyle = `rgba(${cr},${cg},${cb},${(alpha * 0.85).toFixed(3)})`;
        if (i % 9 === 0) ctx.fillStyle = `rgba(${sk[0]},${sk[1]},${sk[2]},${Math.min(1, alpha * 1.15).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(px, py, size, 0, 6.2832); ctx.fill();
      }

      for (let k = 0; k < 150; k++) {
        const a = k * 0.71 + t * (0.3 + (k % 5) * 0.014);
        const rd = R * (1.2 + (k % 11) * 0.016);
        const ox = Math.cos(a) * rd, oz = Math.sin(a) * rd, oy = Math.sin(a * 2 + k) * R * 0.02;
        const tilt = 0.36 + my * 0.2;
        const sy = oy * Math.cos(tilt) - oz * Math.sin(tilt);
        const sz = oy * Math.sin(tilt) + oz * Math.cos(tilt);
        const f = (sz / rd + 1) / 2;
        ctx.fillStyle = `rgba(${lr},${lg},${lb},${((0.1 + f * 0.5) * intro).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(cx + ox + mx * 6 * dpr, cy + sy, (0.5 + f * 1.1) * dpr, 0, 6.2832); ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = () => { draw(); if (!still) raf = requestAnimationFrame(loop); };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  /* How we work: steps complete as the reader scrolls past them ----- */
  useEffect(() => {
    const rows = processRef.current ? processRef.current.querySelectorAll('.tlrow') : [];
    if (!rows.length) return undefined;
    let tall = false;

    const stepFn = () => {
      const vh = window.innerHeight || 800;
      if (vh > 1500) { tall = true; return; }
      tall = false;
      const line = vh * 0.54;
      let n = 0;
      rows.forEach((r) => { if (r.getBoundingClientRect().bottom < line) n++; });
      setStep(n);
    };

    window.addEventListener('scroll', stepFn, { passive: true, capture: true });
    window.addEventListener('resize', stepFn);
    stepFn();
    const timer = setInterval(() => {
      if (tall) setStep((s) => (s + 1) % 5);
      else stepFn();
    }, 1800);

    return () => {
      window.removeEventListener('scroll', stepFn, { capture: true });
      window.removeEventListener('resize', stepFn);
      clearInterval(timer);
    };
  }, []);

  /* Industries: slow auto drift + drag, swipe and sideways scroll --- */
  useEffect(() => {
    const wrap = sliderWrapRef.current;
    const track = sliderTrackRef.current;
    if (!wrap || !track) return undefined;
    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    let sx = 0, period = 0, dragging = false, moved = 0, lastX = 0, vel = 0, idle = 0;
    let lastT = performance.now();
    let raf;

    const measure = () => { period = (track.scrollWidth + 20) / 2; };
    const place = () => {
      if (period > 0) { sx = sx % period; if (sx > 0) sx -= period; }
      track.style.transform = `translate3d(${sx.toFixed(2)}px,0,0)`;
    };

    measure();
    window.addEventListener('resize', measure);

    const slide = () => {
      const now = performance.now();
      const dt = Math.min(60, now - lastT);
      lastT = now;
      if (!period) measure();
      if (!dragging) {
        if (Math.abs(vel) > 0.02) { sx += vel * dt; vel *= Math.pow(0.94, dt / 16); }
        else if (!still && now > idle) sx -= 0.034 * dt;
        place();
      }
      raf = requestAnimationFrame(slide);
    };
    slide();

    const onDown = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; moved = 0; lastX = e.clientX; vel = 0;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      moved += Math.abs(dx);
      if (moved > 6) wrap.classList.add('drag');
      sx += dx; vel = dx / 16; place();
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false; idle = performance.now() + 900;
      setTimeout(() => wrap.classList.remove('drag'), 0);
    };
    const onClick = (e) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
    const onWheel = (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (!dx) return;
      e.preventDefault();
      sx -= dx; vel = 0; idle = performance.now() + 900; place();
    };
    const onDragStart = (e) => e.preventDefault();

    wrap.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    wrap.addEventListener('click', onClick, true);
    wrap.addEventListener('wheel', onWheel, { passive: false });
    wrap.addEventListener('dragstart', onDragStart);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('click', onClick, true);
      wrap.removeEventListener('wheel', onWheel);
      wrap.removeEventListener('dragstart', onDragStart);
    };
  }, []);

  /* Stats: count up once when scrolled into view ------------------- */
  useEffect(() => {
    const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = statsRef.current;
    if (still || !el || !('IntersectionObserver' in window)) { setP(1); return undefined; }

    let raf;
    const start = () => {
      const t0 = performance.now();
      let last = 0;
      setP(0);
      const tick = () => {
        const now = performance.now();
        const k = Math.min(1, (now - t0) / 2000);
        if (now - last > 30 || k === 1) { last = now; setP(1 - Math.pow(1 - k, 3)); }
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      tick();
    };

    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { start(); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);

    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  /* ---------------------------------------------------------------- */
  return (
    <main className="home">
      {/* 1 HERO */}
      <section id="top" className="hero">
        <div className="hero__grid-lines" aria-hidden="true" />
        <div className="hero__ring fadein" aria-hidden="true"><div className="spin" /></div>
        <div className="hero__frame" aria-hidden="true" />

        <div className="wrap hero__wrap">
          <div className="g12 herogrid">
            <div className="hero__copy">
              <div className="pill up"><span className="live dot" />Global technology &amp; engineering</div>
              <h1 className="up"><span className="nw">Engineered to scale.</span><br /><span className="ac nw">Built for real impact.</span></h1>
              <p className="up">AI systems, intelligent security, digital products, and enterprise technology engineered to solve complex business challenges.</p>
              <div className="hero__actions up">
                <a className="btn btn-ac" href="#contact">Start a Conversation <Arrow size={15} /></a>
                <a className="btn btn-ghost" href="#services">Explore Our Capabilities <Arrow /></a>
              </div>
            </div>

            <div className="hero__orb fadein">
              <div className="hero__orb-glow breathe" aria-hidden="true" />
              <canvas ref={orbRef} aria-hidden="true" />
            </div>
          </div>

          <div className="caps up">
            {CAPS.map((c, i) => (
              <span key={c} className="cap"><span className="ac">{`0${i + 1}`}</span>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2 CLIENTS */}
      <section id="clients" className="clients">
        <div className="sec clients__sec">
          <div className="clients__head rv">
            <div className="eyebrow">Our clients</div>
            <h2 className="h2">Trusted by businesses <span className="ac">around the globe.</span></h2>
            <p>We deliver technology solutions that help organizations build, modernize, and scale — creating lasting partnerships across industries and markets.</p>
          </div>

          <div className="mqwrap rv">
            <div className="mq">
              {[...ROW_A, ...ROW_A].map((i, k) => (
                <div className="lcard" key={`a${k}`}><div className="lg" style={{ backgroundPosition: logoPos(i) }} /></div>
              ))}
            </div>
            <div className="mq rev">
              {[...ROW_B, ...ROW_B].map((i, k) => (
                <div className="lcard" key={`b${k}`}><div className="lg" style={{ backgroundPosition: logoPos(i) }} /></div>
              ))}
            </div>
          </div>

          <div className="clients__more rv">
            <A className="tlink" to={ROUTES.work}>See Our Clients <Arrow /></A>
          </div>
        </div>
      </section>

      {/* 3 SERVICES */}
      <section id="services" className="services">
        <div className="wrap sec services__wrap">
          <div className="split rv services__head">
            <div>
              <div className="eyebrow">Our capabilities</div>
              <h2 className="h2">Technology engineered<br /><span className="ac">around your business.</span></h2>
              <p className="lede">From intelligent AI systems and smart security to product engineering and digital transformation, we bring strategy, engineering, and execution together to solve complex technology challenges.</p>
            </div>
          </div>

          <div className="bgrid">
            <A className="bento bento--sec rvl" to={ROUTES.security}>
              <div className="bento__bg img-sec zoom" aria-hidden="true" />
              <div className="bento__shade" aria-hidden="true" />
              <span className="badge tone-orange"><span className="live dot" />AI-DRIVEN SECURITY</span>
              <div className="bento__body">
                <h3>Smart Security Systems</h3>
                <p>Our Cordon platform brings AI-powered vehicle recognition, facial recognition, access control, and visitor management into one intelligent security layer — reducing manual intervention across buildings, campuses, and critical infrastructure.</p>
                <div className="bento__cta">Learn More<span className="circ"><Arrow /></span></div>
              </div>
            </A>

            <A className="bento bento--eng rv" to={ROUTES.engineering}>
              <div className="bento__label">PRODUCT ENGINEERING</div>
              <h3>Product &amp; Application Engineering</h3>
              <p>We design, engineer, and scale digital products and enterprise applications from concept to production — combining product thinking, software engineering, AI, and modern architecture.</p>
            </A>

            <A className="bento bento--ai rvr" to={ROUTES.ai}>
              <div className="bento__bg img-ai zoom" aria-hidden="true" />
              <div className="bento__shade" aria-hidden="true" />
              <span className="badge badge--abs tone-purple"><span className="dot" />INTELLIGENT AI</span>
              <div className="bento__body bento__body--pt">
                <h3>AI &amp; Intelligent Systems</h3>
                <p>AI isn't an add-on to what we build. Predictive intelligence, computer vision, machine learning, and intelligent automation are engineered directly into the systems we ship.</p>
              </div>
            </A>

            <A className="bento bento--dt rv dtsplit" to={ROUTES.cloud}>
              <div className="dtimg">
                <div className="bento__bg img-dt zoom" aria-hidden="true" />
                <div className="bento__shade" aria-hidden="true" />
              </div>
              <div className="bento__dtbody">
                <span className="badge badge--mb tone-teal"><span className="dot" />CLOUD &amp; MODERNIZATION</span>
                <h3>Digital Transformation &amp; Cloud</h3>
                <p>We modernize technology landscapes, cloud infrastructure, systems, and architecture — aligning every layer with the business you are building next.</p>
                <div className="bento__row">
                  <span className="bento__cta bento__cta--inline">Learn More<span className="circ circ--ghost"><Arrow /></span></span>
                </div>
              </div>
            </A>
          </div>

          <div className="more rv">
            <A className="btn morelink" to={ROUTES.services}>Explore All Services <Arrow /></A>
          </div>
        </div>
      </section>

      {/* 4 PROOF NUMBERS */}
      <section id="asz-stats" className="stats" ref={statsRef}>
        <div className="wrap statwrap stats__wrap">
          <div className="g4s">
            {STATS.map((s) => (
              <div className="dstat rvs" key={s.label}>
                <span className="glow" aria-hidden="true" />
                <span className="edge" aria-hidden="true" />
                <div className="dstat__num">{Math.round(s.target * p)}<span className="ac">{s.suffix}</span></div>
                <div className="dstat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 PRODUCTS */}
      <section id="products" className="products">
        <div className="wrap sec products__wrap">
          <div className="split rv products__head">
            <div>
              <div className="eyebrow">Our products</div>
              <h2 className="h2">We ship our own products.<br /><span className="ac">Then we build yours.</span></h2>
              <p className="lede">Our in-house products reflect the same engineering discipline we bring to client engagements — technology designed to solve real problems and operate in the real world.</p>
            </div>
          </div>

          {/* Cordon */}
          <a className="card card--cordon rvs" href="#contact">
            <div className="pimg-co zoom card__bg" aria-hidden="true" />
            <div className="card__shade" aria-hidden="true" />
            <div className="cordon__copy">
              <div className="pill pill--card"><span className="live dot" />ASZ product · 01 · Intelligent Security</div>
              <h3>Cordon</h3>
              <p>Cordon replaces manual security processes with a zero-touch, AI-driven access system for vehicle recognition, facial recognition, automated access control, and visitor management.</p>
              <div className="cordon__chips">
                {CORDON_CHIPS.map((c) => (
                  <span className="chip" key={c.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={c.d} /></svg>
                    {c.label}
                  </span>
                ))}
              </div>
              <span className="btn btn-ac cordon__btn">Book a Demo <Arrow size={14} /></span>
            </div>

            <div className="cordonui floaty" aria-hidden="true">
              <div className="cordonui__in">
                <div className="cordonui__top">
                  <div className="cordonui__name"><span className="cordonui__logo" />Cordon<span>Main Gate</span></div>
                  <div className="cordonui__live"><span className="live dot dot--sm" />LIVE</div>
                </div>
                <div className="cordonui__cam">
                  <div className="cordonui__grid" />
                  <div className="scan cordonui__scan" />
                  <div className="cordonui__plate">ZX 4827 Q</div>
                  <div className="cordonui__caption">CAM 02 · VEHICLE RECOGNITION</div>
                </div>
                <div className="cordonui__rows">
                  <div className="st1"><span>Vehicle recognised</span><span className="ok">Access granted</span></div>
                  <div className="st2"><span>Facial Recognition</span><span className="ok">Verified</span></div>
                  <div className="st3"><span>Paper log entry</span><span className="na">Not needed</span></div>
                </div>
              </div>
            </div>
          </a>

          <div className="g2 products__pair">
            {/* JobScout */}
            <A className="card card--prod rvl" to={ROUTES.jobscout}>
              <div className="pimg-js zoom card__bg" aria-hidden="true" />
              <div className="card__shade card__shade--v" aria-hidden="true" />
              <div className="card__top">
                <span className="card__meta">ASZ product · 02</span>
                <span className="arrow"><ArrowUpRight /></span>
              </div>
              <h3 className="card__name">JobScout</h3>
            </A>

            {/* Safin */}
            <A className="card card--prod rvr" to={ROUTES.safin}>
              <div className="pimg-sf zoom card__bg" aria-hidden="true" />
              <div className="card__shade card__shade--v" aria-hidden="true" />
              <div className="card__top">
                <span className="card__meta">ASZ product · 03</span>
                <span className="arrow"><ArrowUpRight /></span>
              </div>
              <h3 className="card__name">Safin</h3>
            </A>
          </div>

          <div className="more rv">
            <a className="btn morelink" href="#contact">Book a Demo <Arrow /></a>
          </div>
        </div>
      </section>

      {/* 6 INDUSTRIES */}
      <section id="industries" className="industries">
        <div className="wrap sec industries__wrap">
          <div className="split rv industries__head">
            <div>
              <div className="eyebrow">Industries we serve</div>
              <h2 className="h2">Technology built for <span className="ac">every sector.</span></h2>
            </div>
          </div>
        </div>
        <div className="sectors-wrap rv" ref={sliderWrapRef}>
          <div className="sectors" ref={sliderTrackRef}>
            {SECTORS.map((s) => (
              <a className="sector" href="#contact" draggable="false" key={s.id}>
                <span className="indimg simg" aria-hidden="true" style={{ backgroundPosition: `center ${s.py}` }} />
                <span className="shade" aria-hidden="true" />
                <span className="snum">{s.n}</span>
                <span className="sname">{s.name}</span>
                <span className="sarrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8 HOW WE WORK */}
      <section id="process" className="process" ref={processRef}>
        <div className="wrap sec process__wrap">
          <div className="g12">
            <div className="process__intro rvl">
              <div className="eyebrow">How we work</div>
              <h2 className="h2">Scoped. Built.<br /><span className="ac">Running.</span></h2>
              <p>A clear path from the first conversation to technology running in production.</p>
              <a className="tlink" href="#contact">Start a Conversation <Arrow /></a>
            </div>

            <div className="process__list">
              {STEPS.map((s, i) => {
                const state = i < step ? 'is-done' : i === step ? 'is-current' : '';
                return (
                  <div className={`tlrow rv ${state}`} key={s.title}>
                    {i < STEPS.length - 1 && (
                      <span className="tlline" aria-hidden="true"><span className="tlfill" /></span>
                    )}
                    <span className="tlmark">
                      <svg className="tlmark__chk" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                      <svg className="tlmark__clk" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
                    </span>
                    <div className="tlbody">
                      <div className="tlmeta">
                        Step {`0${i + 1}`}
                        <span>{i < step ? 'Done' : i === step ? 'In progress' : ''}</span>
                      </div>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 10 CLOSING CTA */}
      <section id="contact" className="cta">
        <div className="cubeimg cta__bg" aria-hidden="true" />
        <div className="cta__shade" aria-hidden="true" />
        <div className="hero__frame" aria-hidden="true" />
        <div className="wrap cta__wrap">
          <h2 className="rv">Ready to <span className="ac">build together?</span></h2>
          <p className="rv">Tell us about your technology challenge. We'll help define the right approach, team, and path to production.</p>
          <div className="cta__actions rv">
            <a className="btn btn-ac" href="mailto:info@asztechnologies.com">Start a Conversation <Arrow size={15} /></a>
            <A className="btn btn-ghost" to={ROUTES.services}>Explore Our Services</A>
          </div>
        </div>
      </section>
    </main>
  );
}