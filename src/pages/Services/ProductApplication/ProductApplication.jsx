import './ProductApplication.scss';

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
    title: 'Product Engineering',
    text: 'Take digital products from concept to production with product strategy, UX, architecture, engineering, testing, and continuous evolution built into one delivery process.',
    tags: ['Product Development', 'Digital Products', 'End-to-End Engineering'],
  },
  {
    title: 'Custom Software Development',
    text: 'Build web, mobile, and enterprise applications around your exact business requirements instead of forcing your workflows into generic software.',
    tags: ['Custom Software', 'Web Applications', 'Mobile Applications'],
  },
  {
    title: 'Application Modernization',
    text: 'Re-engineer legacy applications, architectures, and technology stacks to improve performance, security, scalability, and maintainability without losing critical business logic.',
    tags: ['Legacy Modernization', 'Application Re-engineering', 'Cloud Modernization'],
  },
  {
    title: 'API & Systems Integration',
    text: 'Connect applications, platforms, data, and third-party services so information moves seamlessly across your technology ecosystem.',
    tags: ['API Development', 'Systems Integration', 'Microservices'],
  },
  {
    title: 'Low-Code & Rapid Development',
    text: 'Accelerate business applications and workflows where speed, flexibility, and rapid iteration matter more than building every component from the ground up.',
    tags: ['Low-Code', 'Rapid Development', 'Business Applications'],
  },
];

const ProductApplication = () => (
  <div className="svc-page">
    {/* 1 · HERO */}
    <section id="top" className="svc-hero">
      <div className="svc-wrap">
        <div className="svc-hero__grid">
          <div className="up svc-hero__crumb">
            <span className="live dot" />
            <a href={ROUTES.services}>Services</a>
            <span className="sep">/</span>
            <span>Product & Application Engineering</span>
          </div>

          <h1 className="up svc-hero__title">
            Software Engineered Around
            <br />
            <span className="ac">How Your Business Works.</span>
          </h1>

          <p className="up svc-hero__text">
            We design, build, modernize, and integrate digital products and applications that are engineered for your workflows, users, and technology environment. From new products to complex enterprise systems, we combine product thinking with engineering discipline to build software that scales.
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
              Inside <span className="ac">Product & Application Engineering.</span>
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

export default ProductApplication;