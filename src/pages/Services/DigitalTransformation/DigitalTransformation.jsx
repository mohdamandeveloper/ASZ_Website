import './DigitalTransformation.scss';

const ROUTES = {
  services: '/services', // change to your route (or swap <a> for <Link>)
  contact: '#contact',
  email: 'mailto:info@asztechnologies.com',
};

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const DELIVERABLES = [
  {
    title: 'Technology Strategy & Roadmaps',
    text: 'Translate business priorities into clear technology strategies, investment roadmaps, and execution plans that create measurable business value.',
    tags: ['IT Strategy', 'Technology Roadmap', 'IT Advisory'],
  },
  {
    title: 'Cloud Transformation',
    text: 'Modernize infrastructure and applications through cloud adoption, migration, optimization, and scalable cloud architectures built around your operating model.',
    tags: ['Cloud Migration', 'Cloud Architecture', 'Cloud Optimization'],
  },
  {
    title: 'Enterprise Architecture',
    text: 'Design technology ecosystems that connect applications, data, infrastructure, and processes without creating another layer of complexity.',
    tags: ['Enterprise Architecture', 'Systems Architecture', 'Technology Modernization'],
  },
  {
    title: 'Intelligent Automation',
    text: 'Identify and automate high-friction processes across the organization to improve efficiency, reduce operational overhead, and accelerate execution.',
    tags: ['Business Automation', 'Process Optimization', 'Workflow Automation'],
  },
  {
    title: 'Technology Risk & Governance',
    text: 'Embed security, compliance, governance, and resilience into the technology architecture from the beginning — not after the system is built.',
    tags: ['IT Governance', 'Technology Risk', 'Compliance'],
  },
];

const DigitalTransformation = () => (
  <div className="svc-page">
    {/* 1 · HERO */}
    <section id="top" className="svc-hero">
      <div className="svc-wrap">
        <div className="svc-hero__grid">
          <div className="up svc-hero__crumb">
            <span className="live dot" />
            <a href={ROUTES.services}>Services</a>
            <span className="sep">/</span>
            <span>Digital Transformation & Cloud</span>
          </div>

          <h1 className="up svc-hero__title">
            Transform Technology Into
            <br />
            <span className="ac">a Business Advantage.</span>
          </h1>

          <p className="up svc-hero__text">
            Transformation starts with clarity. We align technology, architecture, cloud, automation, and governance with where your business is going — creating a modern technology foundation that is scalable, secure, and built for continuous change.
          </p>

          <div className="up svc-hero__actions">
            <a className="btn btn-ac" href={ROUTES.contact}>
              Start a Conversation
              {arrow}
            </a>
            <a className="btn btn-ghost" href={ROUTES.services}>
              All Services
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
            <div className="eyebrow">What we deliver</div>
            <h2 className="svc-deliver__title">
              Inside <span className="ac">Digital Transformation & Cloud.</span>
            </h2>
          </div>
        </div>

        <div className="svc-cards">
          {DELIVERABLES.map((item, i) => (
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
        <div className="eyebrow">Ready to build?</div>
        <h2 className="svc-cta__title">
          Let&apos;s build this <span className="ac">together.</span>
        </h2>
        <p className="svc-cta__text">
          Tell us what you&apos;re trying to solve. We&apos;ll help define the right technology approach, scope the work, and build toward the outcome.
        </p>
        <div className="svc-cta__actions">
          <a className="btn btn-ac" href={ROUTES.email}>
            Start a Conversation
            {arrow}
          </a>
          <a className="btn svc-cta__ghost" href={ROUTES.services}>
            All Services
          </a>
        </div>
      </div>
    </section>
  </div>
);

export default DigitalTransformation;