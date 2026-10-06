import { Link } from 'react-router-dom';
import './AiIntelligence.scss';

const SERVICES_ROUTE = '/service';
const CONTACT_EMAIL = 'info@asztechnologies.com';

const DELIVERABLES = [
  {
    n: '01',
    title: 'AI Agents & Autonomous Workflows',
    text: 'We build intelligent agents that can reason, act, and orchestrate multi-step workflows — from approvals and operations to customer support and internal processes, with humans involved where judgment matters.',
    tags: ['AI Agents', 'Agentic AI', 'Workflow Automation'],
  },
  {
    n: '02',
    title: 'Generative AI & LLM Solutions',
    text: 'We integrate large language models into enterprise workflows to transform how teams search, create, analyze, communicate, and work with information.',
    tags: ['LLM Applications', 'RAG', 'Enterprise AI'],
  },
  {
    n: '03',
    title: 'Predictive Analytics & Machine Learning',
    text: 'We turn historical and real-time data into models that forecast outcomes, identify patterns, detect anomalies, and support faster, better decisions.',
    tags: ['Predictive Analytics', 'Machine Learning', 'Forecasting'],
  },
  {
    n: '04',
    title: 'Computer Vision & Intelligent Recognition',
    text: 'We build systems that interpret images and video to identify people, vehicles, objects, events, and anomalies in real time.',
    tags: ['Computer Vision', 'Facial Recognition', 'Object Detection'],
  },
  {
    n: '05',
    title: 'Intelligent Automation',
    text: 'We combine AI with business processes and existing systems to automate repetitive, decision-heavy operations without rebuilding your technology stack from scratch.',
    tags: ['Process Automation', 'AI Automation', 'System Integration'],
  },
  {
    n: '06',
    title: 'AI Integration & Deployment',
    text: 'We take AI from prototype to production with the infrastructure, APIs, data pipelines, monitoring, and governance required to operate reliably at scale.',
    tags: ['AI Infrastructure', 'MLOps', 'AI Integration'],
  },
];

const ArrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function AiIntelligence() {
  return (
    <div className="ai-intel">
      {/* 1 · HERO */}
      <section id="top" className="ai-intel__hero">
        <div className="ai-intel__grid-bg" aria-hidden="true" />
        <div className="ai-intel__frame" aria-hidden="true" />

        <div className="ai-intel__wrap ai-intel__hero-wrap">
          <div className="ai-intel__hero-inner">
            <div className="up ai-intel__crumb">
              <span className="live ai-intel__crumb-dot" />
              <Link to={SERVICES_ROUTE}>Services</Link>
              <span className="ai-intel__crumb-sep">/</span>
              <span>AI &amp; Intelligent Systems</span>
            </div>

            <h1 className="up ai-intel__h1">
              AI Engineered for<br />
              <span className="ac">Real-World Intelligence.</span>
            </h1>

            <p className="up ai-intel__lead">
              We design and engineer AI systems that move beyond experimentation and into production — automating complex workflows, augmenting human decisions, understanding unstructured data, and turning business information into intelligent action. From autonomous agents to predictive models and computer vision, we build AI around the way your business actually operates.
            </p>

            <div className="up ai-intel__actions">
              <a className="btn btn-ac" href="#contact">
                Start a Conversation
                {ArrowRight}
              </a>
              <Link className="btn btn-ghost ai-intel__ghost" to={SERVICES_ROUTE}>All Services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · WHAT WE DELIVER */}
      <section className="ai-intel__deliver">
        <div className="ai-intel__wrap ai-intel__sec ai-intel__deliver-wrap">
          <div className="ai-intel__split rv">
            <div>
              <div className="eyebrow">What we deliver</div>
              <h2 className="h2 ai-intel__title">
                Inside <span className="ac">AI &amp; Intelligent Systems.</span>
              </h2>
            </div>
          </div>

          <div className="ai-intel__cards">
            {DELIVERABLES.map((d) => (
              <div key={d.n} className="ai-intel__card rvs">
                <span className="ai-intel__card-bar" aria-hidden="true" />
                <span className="ai-intel__card-n">{d.n}</span>
                <h3 className="ai-intel__card-title">{d.title}</h3>
                <p className="ai-intel__card-text">{d.text}</p>
                <span className="ai-intel__tags">
                  {d.tags.map((t) => (
                    <span key={t} className="ai-intel__tag">{t}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · CTA */}
      <section id="contact" className="ai-intel__cta">
        <div className="ai-intel__wrap ai-intel__sec ai-intel__cta-wrap rv">
          <div className="eyebrow ai-intel__cta-eyebrow">Ready to build?</div>
          <h2 className="h2 ai-intel__cta-title">
            Let's build this <span className="ac">together.</span>
          </h2>
          <p className="ai-intel__cta-lead">
            Tell us what you're trying to solve. We'll help define the right technology approach, scope the work, and build toward the outcome.
          </p>
          <div className="ai-intel__cta-actions">
            <a className="btn btn-ac ai-intel__cta-btn" href={`mailto:${CONTACT_EMAIL}`}>
              Start a Conversation
              {ArrowRight}
            </a>
            <Link className="btn ai-intel__cta-btn ai-intel__cta-ghost" to={SERVICES_ROUTE}>All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}