import { useEffect } from 'react';

import './EnterpriseErp.scss';

// ---- Page content ----------------------------------------------------------
const PAGE_TITLE = 'ASZ Technologies, Enterprise Systems and ERP';
const BREADCRUMB = 'Enterprise Systems & ERP';

const CARDS = [
  {
    number: '01',
    title: 'ERP Implementation & Transformation',
    text:
      'Plan, implement, integrate, and optimize enterprise resource planning systems around your business processes, data, and operating model.',
    tags: ['ERP Implementation', 'ERP Transformation', 'ERP Integration'],
  },
  {
    number: '02',
    title: 'CRM & Customer Platforms',
    text:
      'Connect sales, service, marketing, and customer data through integrated CRM solutions that give teams a unified view of every customer relationship.',
    tags: ['CRM Solutions', 'Customer Platforms', 'CRM Integration'],
  },
  {
    number: '03',
    title: 'Enterprise Systems Integration',
    text:
      'Connect ERP, CRM, applications, data, and operational systems to eliminate disconnected workflows and create one connected technology ecosystem.',
    tags: ['Enterprise Integration', 'System Integration', 'Data Integration'],
  },
  {
    number: '04',
    title: 'Supply Chain & Operations',
    text:
      'Integrate the systems behind procurement, inventory, logistics, and operations to improve visibility, coordination, and execution across the value chain.',
    tags: ['Supply Chain', 'Logistics', 'Operations'],
  },
  {
    number: '05',
    title: 'Enterprise Platform Support',
    text:
      'Keep critical enterprise systems performing through optimization, technical support, integration, upgrades, and ongoing platform management.',
    tags: ['Managed Support', 'Platform Optimization', 'Enterprise Applications'],
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
export default function EnterpriseErp() {
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
              Connect the Systems
              <br />
              <span className="ac">That Run Your Business.</span>
            </h1>

            <p className="svc__hero-text up">
              We help organizations implement, integrate, modernize, and optimize the enterprise platforms that power finance, operations, sales, supply chains, and customer relationships. The goal is simple: connected systems, reliable data, and a technology foundation your business can grow on.
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
                Inside <span className="ac">Enterprise Systems & ERP.</span>
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