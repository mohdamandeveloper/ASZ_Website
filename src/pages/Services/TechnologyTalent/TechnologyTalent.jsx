import './TechnologyTalent.scss';

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
    title: 'Dedicated Engineering Teams',
    text: 'A specialized team assembled around your technology, product, and delivery requirements — operating as an extension of your organization.',
    tags: ['Dedicated Teams', 'Engineering Pods', 'Extended Teams'],
  },
  {
    title: 'Staff Augmentation',
    text: 'Add specialized engineering expertise exactly where your existing team needs it, without the overhead of long-term hiring.',
    tags: ['Staff Augmentation', 'Technical Specialists', 'On-Demand Talent'],
  },
  {
    title: 'Project-Based Engineering',
    text: 'A focused team scoped around a defined outcome, with the skills, delivery structure, and accountability required to take the project from start to finish.',
    tags: ['Project Delivery', 'Engineering Teams', 'End-to-End Delivery'],
  },
  {
    title: 'Managed Engineering Teams',
    text: 'We take responsibility for team structure, technical execution, and delivery against agreed objectives while you remain focused on the business.',
    tags: ['Managed Teams', 'Technical Delivery', 'Outcome-Based Engineering'],
  },
];

const TechnologyTalent = () => (
  <div className="svc-page">
    {/* 1 · HERO */}
    <section id="top" className="svc-hero">
      <div className="svc-wrap">
        <div className="svc-hero__grid">
          <div className="up svc-hero__crumb">
            <span className="live dot" />
            <a href={ROUTES.services}>Services</a>
            <span className="sep">/</span>
            <span>Technology Talent & Engineering</span>
          </div>

          <h1 className="up svc-hero__title">
            Engineering Capacity,
            <br />
            <span className="ac">Without the Hiring Bottleneck.</span>
          </h1>

          <p className="up svc-hero__text">
            Extend your technology capabilities with experienced engineers and delivery teams that integrate directly into your organization. Whether you need specialized expertise, additional capacity, or an outcome-driven delivery team, we provide the talent and engineering structure to move faster.
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
              Inside <span className="ac">Technology Talent & Engineering.</span>
            </h2>
          </div>
        </div>

        <div className="svc-cards svc-cards--two">
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

export default TechnologyTalent;