import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Footer.scss';

// Internal routes use <Link>, in-page anchors and external links use <a>
const A = ({ href, ...p }) => (href.startsWith('/') ? <Link to={href} {...p} /> : <a href={href} {...p} />);

const COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Our work', href: '/work' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'Software development',
  'Testing & QA',
  'Mobile development',
  'UX/UI design',
  'IT consulting',
  'Data analytics',
  'Cybersecurity services',
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="g12">
          <div className="site-footer__about">
            <div className="site-footer__brand">
              <img src={logo} alt="ASZ" />
              <span>Technologies</span>
            </div>
            <p>
              One of Asia's leading innovative IT solution providers, offering comprehensive and
              focused solutions in Cloud, Security, Media and Mobile.
            </p>
          </div>

          <div className="site-footer__col site-footer__col--company">
            <div className="site-footer__title">Company</div>
            {COMPANY.map((l) => (
              <A key={l.label} className="flink" href={l.href}>{l.label}</A>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--services">
            <div className="site-footer__title">Our services</div>
            {SERVICES.map((s) => (
              <A key={s} className="flink" href="/services">{s}</A>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--contact">
            <div className="site-footer__title">Contact info</div>
            <div>
              <div className="site-footer__label">Head office</div>
              No.106, 4th floor, 10th cross, Ganganagar, Bangalore-32, India
            </div>
            <div>
              <div className="site-footer__label">Call us</div>
              <a className="flink flink--sm" href="tel:+919740703030">+91 97407 03030</a>
            </div>
            <div>
              <div className="site-footer__label">Email us</div>
              <a className="flink flink--sm" href="mailto:info@asztechnologies.com">info@asztechnologies.com</a>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 ASZ Technologies. All rights reserved.</span>
          <span className="site-footer__legal">
            <a className="flink" href="#top">Terms &amp; Conditions</a>
            <a className="flink" href="#top">Privacy Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}