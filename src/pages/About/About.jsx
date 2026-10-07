import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.scss';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
// Index = pin order on the map
const OFFICES = [
    { country: 'Singapore', city: 'Singapore', hq: true, addr: '156 MacPherson Rd, Singapore 348528', x: 61.68, y: 52.7, side: 'left' },
    { country: 'India', city: 'Bangalore', addr: 'No.106, 4th Floor, 10th Cross, Ganganagar, Bangalore 560 032', x: 48.82, y: 41.86, side: 'left' },
    { country: 'UAE', city: 'Dubai', addr: 'Unit #18-01, 18th Floor, Ontario Tower, Business Bay, Dubai', x: 37.88, y: 34.19, side: 'right' },
    { country: 'Australia', city: 'Sydney', addr: 'Suite 4.02, Level 4, 55 Market Street, Sydney NSW 2000', x: 84.91, y: 95.2, side: 'right' },
];
const CARD_ORDER = [0, 2, 3, 1]; // Singapore, Dubai, Sydney, Bangalore

const STATS = [
    { target: 15, label: 'Industries served', offset: true },
    { target: 20, label: 'Countries served', offset: false },
    { target: 80, label: 'Professionals', offset: true },
];

const VALUES = [
    {
        a: '#FF6B35', title: 'Innovation', tags: ['R&D first', 'Future-ready', 'Bold ideas'],
        text: 'We challenge conventional thinking and turn ideas into technology that creates measurable value.',
        icon: (<><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21v-1" /><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /></>),
    },
    {
        a: '#2DD4BF', title: 'Collaboration', tags: ['Transparent', 'Team-first', 'Co-create'],
        text: 'We work with our clients, not around them building with transparency, shared ownership, and clear communication.',
        icon: (<><path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" /><circle cx="10" cy="8" r="3.2" /><path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.38M15 4.92a3.2 3.2 0 0 1 0 6.16" /></>),
    },
    {
        a: '#A855F7', title: 'Excellence', tags: ['Zero compromise', 'High craft', 'On-time'],
        text: "We hold ourselves to a high standard in engineering, delivery, and every interaction with our clients.",
        icon: (<path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />),
    },
    {
        a: '#38BDF8', title: 'Sustainability', tags: ['Green tech', 'Long-term', 'Responsible'],
        text: "We build technology designed for long-term value improving efficiency, reducing unnecessary complexity, and creating systems that can evolve.",
        icon: (<><path d="M5 19c0-8 5-13 14-14 0 9-4 14-11 14-1.2 0-2.2-.2-3-.6" /><path d="M5 19c2-4 5-7 9-9" /></>),
    },
];

const PANELS = [
    {
        title: 'Proven Delivery',
        text: 'We deliver technology that runs in the real world. Our experience, engineering discipline, and focus on outcomes keep projects moving from strategy to production.'
    },
    {
        title: 'Collaboration',
        text: 'We work with you throughout the engagement, from the first scoping conversation to delivery and ongoing support. You remain part of the build.'
    },
    {
        title: 'Engineering',
        text: 'Our teams combine technical expertise with disciplined engineering practices to build systems that are secure, scalable, maintainable, and fit for purpose.'
    },
    {
        title: 'Long-Term Support',
        text: 'Shipping is the beginning of the relationship, not the end. We support, optimize, and evolve technology as your business changes.'
    },
    {
        title: 'Global Presence',
        text: 'With teams across Singapore, Dubai, Sydney, and Bangalore, we combine international delivery capabilities with proximity to the markets we serve.'
    },
];

const Arrow = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
);

/* ------------------------------------------------------------------ */
export default function About() {
    const statsRef = useRef(null);
    const [p, setP] = useState(1);         // stats count-up progress
    const [loc, setLoc] = useState(0);     // highlighted office
    const [panel, setPanel] = useState(2); // open "Why ASZ" panel

    /* Stats: count up once when scrolled into view */
    useEffect(() => {
        const still = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const el = statsRef.current;
        if (still || !el || !('IntersectionObserver' in window)) return undefined;

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
        }, { threshold: 0.3 });
        io.observe(el);
        return () => { io.disconnect(); cancelAnimationFrame(raf); };
    }, []);

    return (
        <main className="about">
            {/* 1 HERO with map + 2 LOCATIONS */}
            <section id="top" className="a-hero">
                <div className="a-hero__frame" aria-hidden="true" />

                <div className="wrap a-hero__wrap">
                    <div className="pill up"><span className="live dot" />About ASZ Technologies</div>
                    <h1 className="up">
                        <span>Beyond Code. Beyond Conventional.</span><br />
                        <span className="ac">Built for What's Next.</span>
                    </h1>
                    <p className="up">We design, engineer, and scale mission-critical enterprise solutions powered by AI, blockchain, and cloud technology, helping businesses move fast, stay resilient, and grow without compromise.</p>
                    <div className="a-hero__cta up">
                        <Link className="btn btn-ac" to="/services">Explore Services <Arrow /></Link>
                    </div>
                </div>

                <div className="maphold up" aria-hidden="true">
                    <div className="maphold__mask"><div className="mapdots" /></div>
                    {OFFICES.map((o, i) => (
                        <span key={o.city} className={`pin${loc === i ? ' is-on' : ''}`} style={{ left: `${o.x}%`, top: `${o.y}%` }}>
                            <span className="ring" />
                            <span className="core" />
                            <span className={`lab lab--${o.side}`}>{o.city}</span>
                        </span>
                    ))}
                </div>

                <div className="wrap sec a-loc" onMouseLeave={() => setLoc(0)}>
                    <div className="split rv a-loc__head">
                        <div>
                            <div className="eyebrow">Locations</div>
                            <h2 className="h2">Built for where<br /><span className="ac">you do business.</span></h2>
                        </div>
                        <p>With teams in Singapore, Dubai, Sydney and Bangalore, ASZ Technologies stays close to the markets we serve, bringing local insight and hands-on delivery to every engagement.</p>
                    </div>
                    <div className="g4p rv">
                        {CARD_ORDER.map((i) => {
                            const o = OFFICES[i];
                            return (
                                <div
                                    key={o.city}
                                    className={`ofc${loc === i ? ' is-on' : ''}`}
                                    tabIndex={0}
                                    onMouseEnter={() => setLoc(i)}
                                    onFocus={() => setLoc(i)}
                                >
                                    <div className="ofc__country">{o.country}</div>
                                    <div className="ofc__city">{o.city}</div>
                                    <span className={`ofc__badge${o.hq ? ' ofc__badge--hq' : ''}`}>{o.hq ? 'Headquarters' : 'Branch office'}</span>
                                    <p>{o.addr}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3 AT A GLANCE */}
            <section id="asz-stats" className="a-stats" ref={statsRef}>
                <div className="a-stats__rings" aria-hidden="true">
                    <span className="orb1" />
                    <span className="orb2" />
                    <span className="spin-mid" />
                </div>
                <div className="wrap statwrap a-stats__wrap">
                    <div className="g3w">
                        {STATS.map((s) => (
                            <div className={`wstat rvs${s.offset ? ' wstat--down' : ''}`} key={s.label}>
                                <div className="wstat__num">{Math.round(s.target * p)}<span className="ac">+</span></div>
                                <div className="wstat__label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4 WHO WE ARE */}
            <section className="a-who">
                <div className="wrap sec a-who__wrap">
                    <div className="g12">
                        <div className="a-who__title rvl">
                            <div className="eyebrow">Who we are</div>
                            <h2 className="h2">15+ years in.<br /><span className="ac">80+ professionals strong.</span></h2>
                            <Link className="tlink" to="/services">Explore Our Services <Arrow /></Link>
                        </div>
                        <div className="a-who__copy rvr">
                            <p>We help organizations navigate technology transformation across AI, intelligent systems, digital engineering, cloud, security, and enterprise technology.</p>
                            <p>We don't do one-size-fits-all delivery. Every engagement starts with understanding what actually moves the needle for your business, then we engineer toward it. From strategy and architecture to engineering, deployment, and ongoing support, we stay accountable throughout the journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 CORE VALUES */}
            <section className="a-values" style={{ background: 'rgb(243, 243, 242)' }}>
                <div className="wrap sec a-values__wrap">
                    <div className="split rv a-values__head">
                        <div>
                            <div className="eyebrow">Our core values</div>
                            <h2 className="h2">Principles that guide <span className="ac">how we build.</span></h2>
                        </div>
                        {/* <p>Four principles that stay constant no matter what we're building or who we're building it for: for our clients, our products, and our own team.</p> */}
                    </div>
                    <div className="g4p">
                        {VALUES.map((v, i) => (
                            <article className="vcard rvs" tabIndex={0} key={v.title} style={{ '--a': v.a }}>
                                <div className="vcard__top">
                                    <span className="vbadge">
                                        <span>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                                        </span>
                                    </span>
                                    <span className="vcard__num">{`0${i + 1}`}</span>
                                </div>
                                <h3>{v.title}</h3>
                                <p>{v.text}</p>
                                {/* <div className="vcard__tags">{v.tags.map((t) => <span className="vtag" key={t}>{t}</span>)}</div> */}
                                <div className="vrule" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 WHY ASZ */}
            <section className="a-why">
                <div className="wrap sec a-why__wrap">
                    <div className="a-why__head rv">
                        <div className="a-why__eyebrow"><span className="a-why__eyebrow-dot" />Why ASZ</div>
                        <h2 className="h2">Built to deliver.<br /><span className="ac">Engineered to last.</span></h2>
                    </div>

                    <div className="ptrack rvs">
                        {PANELS.map((q, i) => {
                            const on = i === panel;
                            const num = `0${i + 1}`;
                            // Same per-state values as about.html (inline, so open/closed never depends on CSS selector matching)
                            const st = {
                                bg: { filter: on ? 'brightness(.56) saturate(.9)' : 'brightness(.62) saturate(.75)' },
                                ov: { background: on ? 'linear-gradient(rgba(8,12,24,.16) 0%, rgba(8,12,24,.55) 56%, rgba(8,12,24,.95) 100%)' : 'linear-gradient(rgba(8,12,24,.42) 0%, rgba(8,12,24,.52) 100%)' },
                                stripe: { width: on ? '100%' : '0%' },
                                content: { opacity: on ? 1 : 0, transform: on ? 'translateX(0)' : 'translateX(-20px)', pointerEvents: on ? 'auto' : 'none' },
                                div: { transform: on ? 'scaleX(1)' : 'scaleX(0)' },
                                btn: { opacity: on ? 0 : 1, pointerEvents: on ? 'none' : 'auto' },
                            };
                            return (
                                <div className={`panel${on ? ' is-open' : ''}`} key={q.title}>
                                    <div className={`pbg pp${i + 1}`} aria-hidden="true" style={st.bg} />
                                    <div className="pov" aria-hidden="true" style={st.ov} />
                                    <span className="pstripe" aria-hidden="true" style={st.stripe} />
                                    <div className="pcontent" style={st.content}>
                                        <div className="pcontent__kicker"><span className="live dot dot--sm" />{num} / {`0${PANELS.length}`}</div>
                                        <div className="pdiv" style={st.div} />
                                        <h3><span className="ac">{num}</span> {q.title}</h3>
                                        <p>{q.text}</p>
                                        <a className="pcta" href="mailto:info@asztechnologies.com" tabIndex={on ? 0 : -1}>Start a Conversation <Arrow /></a>
                                    </div>
                                    <button className="pbtn" type="button" aria-expanded={on} tabIndex={on ? -1 : 0} onClick={() => setPanel(i)} style={st.btn}>
                                        <span className="vd" />
                                        <span className="vt">{q.title}</span>
                                        <span className="plus">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                                        </span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 7 READY TO BUILD (CTA) */}
            <section id="contact" className="a-cta">
                <div className="wrap sec a-cta__wrap rv">
                    <div className="eyebrow">Ready to build?</div>
                    <h2 className="h2">Let's build this <span className="ac">together.</span></h2>
                    <p>Tell us about your technology challenge. We'll help define the right approach, team, and path to production.</p>
                    <div className="a-cta__actions">
                        <a className="btn btn-ac a-cta__btn" href="mailto:info@asztechnologies.com">Start a Conversation <Arrow /></a>
                        <Link className="btn a-cta__ghost" to="/services">Explore Our Services</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}