import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/asz-logo2.png';
import './Header.scss';

// ---- Route map: adjust these to match your router ----
const ROUTES = {
  about: '/about',
  services: '/service',
  products: '/products',
  work: '/work',
};

const SERVICE_ITEMS = [
  {
    to: '/service/ai-intelligence',
    title: 'AI & Intelligent Systems',
    desc: 'AI Agents · Generative AI · Machine Learning',
    icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16v4M17 18h4',
  },
  {
    to: '/service/smart-security',
    title: 'Smart Security Systems',
    desc: 'Facial Recognition · Vehicle Recognition (ANPR)',
    icon: 'M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6zM9 12l2 2 4-4',
  },
  {
    to: '/service/enterprise-erp',
    title: 'Enterprise Systems & ERP',
    desc: 'ERP Implementation · CRM Integration',
    icon: 'M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 17l9 5 9-5',
  },
  {
    to: '/service/product-application',
    title: 'Product & Application Engineering',
    desc: 'Product Development · Application Modernization',
    icon: 'M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16',
  },
  {
    to: '/service/digital-transformation',
    title: 'Digital Transformation & Cloud',
    desc: 'Technology Strategy · Cloud Transformation',
    icon: 'M7 18a4 4 0 0 1-.5-7.97A6 6 0 0 1 18 9.5 4.25 4.25 0 0 1 17.5 18z',
  },
  {
    to: '/service/technology-talent',
    title: 'Technology Talent & Engineering',
    desc: 'Dedicated Engineering Teams · Staff Augmentation',
    icon: 'M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 19v-1a4 4 0 0 0-3-3.87M15.5 4.13a3 3 0 0 1 0 5.74',
  },
];

const PRODUCT_ITEMS = [
  { to: '/products#cordon', n: '01', title: 'Cordon', desc: 'Zero-touch intelligent security', dark: true },
  { to: '/products#jobscout', n: '02', title: 'JobScout' },
  { to: '/products#safin', n: '03', title: 'Safin' },
];

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

const Chevron = () => (
  <svg className="chev" width="12" height="12" strokeWidth="2.4" {...svgProps}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowUpRight = ({ size }) => (
  <svg width={size} height={size} strokeWidth="1.8" {...svgProps}>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

const ArrowRight = ({ size }) => (
  <svg width={size} height={size} strokeWidth="2" {...svgProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// The active route gets the accent dot (NavLink adds the "active" class itself)
const renderLabel = (label, withChevron) =>
  function NavLabel({ isActive }) {
    return (
      <>
        {isActive && <span className="navlink__dot" />}
        {label}
        {withChevron && <Chevron />}
      </>
    );
  };

// Drop-downs open on hover / focus-within (pure CSS). After a click on any link inside,
// "is-closed" suppresses that so the panel shuts right away; it re-arms on the next
// hover or keyboard focus.
const useDropdown = (base) => {
  const [closed, setClosed] = useState(false);
  return {
    className: base + (closed ? ' is-closed' : ''),
    onClick: (e) => {
      if (!e.target.closest('a')) return;
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      setClosed(true);
    },
    onMouseEnter: () => setClosed(false),
    onMouseLeave: () => setClosed(false),
    onFocus: () => setClosed(false),
  };
};

export default function Header() {
  const services = useDropdown('sdd');
  const products = useDropdown('pdd');

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <Link className="nav__brand" to="/" aria-label="ASZ Technologies, home">
          <img src={logo} alt="ASZ" />
        </Link>

        <div className="nav__links">
          <NavLink className="navlink" to={ROUTES.about}>
            {renderLabel('About')}
          </NavLink>

          {/* Services drop-down */}
          <div {...services}>
            <NavLink className="navlink" to={ROUTES.services}>
              {renderLabel('Services', true)}
            </NavLink>
            <div className="sddpanel">
              <div className="sddbox">
                {SERVICE_ITEMS.map((s) => (
                  <Link key={s.to} className="sitem" to={s.to}>
                    <span className="ic">
                      <svg width="20" height="20" strokeWidth="1.7" {...svgProps}>
                        <path d={s.icon} />
                      </svg>
                    </span>
                    <span>
                      <span className="t">{s.title}</span>
                      <span className="d">{s.desc}</span>
                    </span>
                    <span className="go"><ArrowUpRight size={16} /></span>
                  </Link>
                ))}
                <Link className="sall" to={ROUTES.services}>
                  View All Services <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Products drop-down */}
          <div {...products}>
            <NavLink className="navlink" to={ROUTES.products}>
              {renderLabel('Products', true)}
            </NavLink>
            <div className="pddpanel">
              <div className="pddbox">
                {PRODUCT_ITEMS.map((p) => (
                  <Link key={p.to} className="pitem" to={p.to}>
                    <span className={'thumb' + (p.dark ? ' dark' : '')}>
                      {p.dark ? <span className="cube" aria-hidden="true" /> : '[IMAGE]'}
                    </span>
                    <span className="go"><ArrowUpRight size={13} /></span>
                    <span className="n">{p.n}</span>
                    <span className="t">{p.title}</span>
                    {p.desc && <span className="d">{p.desc}</span>}
                  </Link>
                ))}
                <Link className="pitem pall" to={ROUTES.products}>
                  <span className="t">View All Products</span>
                  <span className="pgo"><ArrowRight size={16} /></span>
                </Link>
              </div>
            </div>
          </div>

          <NavLink className="navlink" to={ROUTES.work}>
            {renderLabel('Our Work')}
          </NavLink>
        </div>

        <a className="btn btn-ac nav__cta" href="#contact">
          Start a Conversation
          <svg width="14" height="14" strokeWidth="2" {...svgProps}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </nav>
    </header>
  );
}