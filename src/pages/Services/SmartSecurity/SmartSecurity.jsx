import { useEffect } from 'react';

import './SmartSecurity.scss';

// ---- Page content ----------------------------------------------------------
const PAGE_TITLE = 'ASZ Technologies, Smart Security Systems';
const BREADCRUMB = 'Smart Security Systems';

const CARDS = [
  {
    number: '01',
    title: 'Vehicle Access & ANPR',
    text:
      'Automatically identify, verify, and log vehicles entering and leaving your premises with real-time number-plate recognition and auditable access records.',
    tags: ['ANPR', 'Vehicle Recognition', 'Automated Access'],
  },
  {
    number: '02',
    title: 'Facial Recognition & Identity',
    text:
      'AI-powered identity verification for secure, frictionless entry across controlled environments, replacing manual identification with intelligent recognition.',
    tags: ['Facial Recognition', 'Identity Verification', 'Biometric Access'],
  },
  {
    number: '03',
    title: 'Intelligent Access Control',
    text:
      'Centralize and automate access across secured doors and facilities with real-time visibility into permissions, activity, and movement.',
    tags: ['Access Control', 'Identity Management', 'Real-Time Monitoring'],
  },
  {
    number: '04',
    title: 'Visitor & Vendor Management',
    text:
      'Digitize registration, approvals, credentials, and access workflows so visitors and vendors are verified before they reach the gate.',
    tags: ['Visitor Management', 'Vendor Access', 'Digital Check-In'],
  },
  {
    number: '05',
    title: 'Zero-Touch Security',
    text:
      'Create frictionless entry experiences through pre-registration, automated verification, and intelligent access workflows that reduce manual intervention.',
    tags: ['Zero-Touch Access', 'Security Automation', 'Smart Entry'],
  },
];

const ARROW_RIGHT = 'M5 12h14M13 6l6 6-6 6';

function ArrowIcon() {
  return (
    <svg
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
  useEffect(() => {
    document.title = PAGE_TITLE;
  }, []);

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
              <a href="/services">Services</a>
              <span className="svc__crumb-sep">/</span>
              <span>{BREADCRUMB}</span>
            </div>

            <h1 className="svc__hero-title up">
              Security That Sees,
              <br />
              <span className="ac">Understands, and Responds.</span>
            </h1>

            <p className="svc__hero-text up">
              We combine AI, computer vision, access control, and intelligent workflows to create security systems that operate with minimal manual intervention. From vehicle and facial recognition to visitor management and controlled access, our solutions bring real-time intelligence and visibility to critical environments.
            </p>

            <div className="svc__hero-actions up">
              <a className="btn btn-ac" href="#contact">
                Start a Conversation
                <ArrowIcon />
              </a>
              <a className="btn btn-ghost svc__btn-semibold" href="/services">
                All Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What we deliver */}
      <section className="svc__deliver">
        <div className="svc__wrap svc__deliver-wrap">
          <div className="svc__split rv">
            <div>
              <div className="eyebrow">What we deliver</div>
              <h2 className="svc__title">
                Inside <span className="ac">Smart Security Systems.</span>
              </h2>
            </div>
          </div>

          <div className="svc__cards">
            {CARDS.map((card) => (
              <div className="svc__card rvs" key={card.number}>
                <span className="svc__card-bar" aria-hidden="true" />
                <span className="svc__card-num">{card.number}</span>
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
          <div className="eyebrow svc__cta-eyebrow">Ready to build?</div>
          <h2 className="svc__cta-title">
            Let&apos;s build this <span className="ac">together.</span>
          </h2>
          <p className="svc__cta-text">
            Tell us what you&apos;re trying to solve. We&apos;ll help define the right technology
            approach, scope the work, and build toward the outcome.
          </p>
          <div className="svc__cta-actions">
            <a className="btn btn-ac svc__cta-btn" href="mailto:info@asztechnologies.com">
              Start a Conversation
              <ArrowIcon />
            </a>
            <a className="btn svc__cta-btn svc__cta-ghost" href="/services">
              All Services
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}