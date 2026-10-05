import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/asz-logo2.png';
import './Header.scss';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Our Work', href: '/work' },
];

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main">
        <Link className="nav__brand" to="/" aria-label="ASZ Technologies, home">
          <img src={logo} alt="ASZ" />
          {/* <span>Technologies</span> */}
        </Link>

        <div className="nav__links">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} className="navlink" to={l.href}>
              {({ isActive }) => (<>{isActive && <span className="navlink__dot" />}{l.label}</>)}
            </NavLink>
          ))}
        </div>

        <a className="btn btn-ac nav__cta" href="#contact">
          Start a project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </nav>
    </header>
  );
}