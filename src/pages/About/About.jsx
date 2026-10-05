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
    { target: 30, label: 'Countries served', offset: false },
    { target: 80, label: 'Professionals', offset: true },
];

const VALUES = [
    {
        a: '#FF6B35', title: 'Innovation', tags: ['R&D first', 'Future-ready', 'Bold ideas'],
        text: 'We challenge conventional thinking at every turn. From AI-powered features to groundbreaking UX, we chase ideas no one else has tried, and ship them as products that lead the market.',
        icon: (<><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 21v-1" /><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" /></>),
    },
    {
        a: '#2DD4BF', title: 'Collaboration', tags: ['Transparent', 'Team-first', 'Co-create'],
        text: 'We work hand-in-hand with our clients, not around them. Every engagement starts with listening, understanding what actually moves the needle for your business, before a single line of code gets written.',
        icon: (<><path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" /><circle cx="10" cy="8" r="3.2" /><path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.38M15 4.92a3.2 3.2 0 0 1 0 6.16" /></>),
    },
    {
        a: '#A855F7', title: 'Excellence', tags: ['Zero compromise', 'High craft', 'On-time'],
        text: "We hold ourselves to the highest standard in everything: architecture, design, delivery, communication. Good enough is never good enough, we sweat the details so you don't have to.",
        icon: (<path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85z" />),
    },
    {
        a: '#38BDF8', title: 'Sustainability', tags: ['Green tech', 'Long-term', 'Responsible'],
        text: "We build technology that reduces waste, not just cost. Our own products, like Cordon's paperless visitor logs, are engineered to cut material use alongside operational overhead.",
        icon: (<><path d="M5 19c0-8 5-13 14-14 0 9-4 14-11 14-1.2 0-2.2-.2-3-.6" /><path d="M5 19c2-4 5-7 9-9" /></>),
    },
];

const PANELS = [
    {
        vt: 'AI digital solutions', kicker: 'AI digital solutions', hi: 'AI-Powered', rest: ' Solutions for the Next Era of Business',
        text: 'We integrate cutting-edge artificial intelligence, machine learning models, NLP pipelines, and predictive analytics directly into your products, turning raw data into strategic advantages that keep you ahead of the competition.'
    },
    {
        vt: 'Collaboration', kicker: 'Collaboration', hi: 'We Build', rest: ' Together, Every Sprint of the Way',
        text: 'Transparent communication, continuous feedback loops, and agile sprints ensure your vision stays at the core of every decision. We work alongside your team as a true extension of your organization from day one.'
    },
    {
        vt: 'Global expertise', kicker: 'Global expertise', hi: 'We Aim', rest: ' for Global Reach with Local Understanding',
        text: 'Using geolocation APIs, multi-language support, and region-specific compliance frameworks, we create solutions that scale globally while feeling tailor-made for every local market your business enters.'
    },
    {
        vt: 'Security and reliability', kicker: 'Security & reliability', hi: 'Zero Compromise', rest: ' on Security or Uptime',
        text: 'Every system we build is fortified with OWASP-compliant architecture, end-to-end encryption, role-based access, and automated vulnerability scanning, delivering enterprise-grade security around the clock.'
    },
    {
        vt: 'Solutions for every business', kicker: 'Every business', hi: 'Tailored Solutions', rest: ' for Startups to Enterprises',
        text: 'From lean MVP builds for early-stage startups to complex enterprise platforms serving millions of users, we architect solutions that fit your scale today and grow seamlessly with your ambitions tomorrow.'
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
                            <h2 className="h2">A decade in.<br /><span className="ac">80+ people strong.</span></h2>
                            <Link className="tlink" to="/services">Explore services <Arrow /></Link>
                        </div>
                        <div className="a-who__copy rvr">
                            <p>With over a decade of experience, we're a team of 80+ professionals helping organizations navigate digital and AI transformation across sourcing, advisory, market intelligence, data science, and enterprise data management.</p>
                            <p>We don't do one-size-fits-all delivery. Every engagement starts with understanding what actually moves the needle for your business, then we engineer toward it. That is why regional and multinational companies trust us for cloud and SaaS integration, and hands-on support through onboarding.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5 CORE VALUES */}
            <section className="a-values">
                <div className="wrap sec a-values__wrap">
                    <div className="split rv a-values__head">
                        <div>
                            <div className="eyebrow">Our core values</div>
                            <h2 className="h2">Values that <span className="ac">align us.</span></h2>
                        </div>
                        <p>Four principles that stay constant no matter what we're building or who we're building it for: for our clients, our products, and our own team.</p>
                    </div>
                    <div className="g4p">
                        {VALUES.map((v, i) => (
                            <article className="vcard rvs" tabIndex={0} key={v.title} style={{ '--a': v.a }}>
                                <div className="vcard__top">
                                    <span className="vbadge"><span>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{v.icon}</svg>
                                    </span></span>
                                    <span className="vcard__num">{`0${i + 1}`}</span>
                                </div>
                                <h3>{v.title}</h3>
                                <p>{v.text}</p>
                                <div className="vcard__tags">{v.tags.map((t) => <span className="vtag" key={t}>{t}</span>)}</div>
                                <div className="vrule" />
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6 WHY ASZ */}
            <section id="contact" className="a-why">
                <div className="wrap sec a-why__wrap">
                    <div className="a-why__head rv">
                        <div className="eyebrow">Why ASZ</div>
                        <h2 className="h2">Building trust <span className="ac">with innovation.</span></h2>
                        <p>We redefine the stature of business with exceptional tech solutions.</p>
                    </div>

                    <div className="ptrack rvs">
                        {PANELS.map((q, i) => {
                            const on = i === panel;
                            return (
                                <div className={`panel${on ? ' is-open' : ''}`} key={q.vt}>
                                    <div className={`pbg pp${i + 1}`} aria-hidden="true" />
                                    <div className="pov" aria-hidden="true" />
                                    <span className="pstripe" aria-hidden="true" />
                                    <div className="pcontent">
                                        <div className="pcontent__kicker"><span className="live dot dot--sm" />{q.kicker}</div>
                                        <div className="pdiv" />
                                        <h3><span className="ac">{q.hi}</span>{q.rest}</h3>
                                        <p>{q.text}</p>
                                        <a className="pcta" href="mailto:info@asztechnologies.com" tabIndex={on ? 0 : -1}>Get in Touch <Arrow /></a>
                                    </div>
                                    <button className="pbtn" type="button" aria-expanded={on} tabIndex={on ? -1 : 0} onClick={() => setPanel(i)}>
                                        <span className="vd" />
                                        <span className="vt">{q.vt}</span>
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
        </main>
    );
}