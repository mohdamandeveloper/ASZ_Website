import { Link } from 'react-router-dom';
import logo from '../../assets/images/asz-logo2.png';
import './Footer.scss';

// Internal routes use <Link>, in-page anchors and external links use <a>
const A = ({ href, ...p }) => (href.startsWith('/') ? <Link to={href} {...p} /> : <a href={href} {...p} />);

const COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Our Work', href: '/work' },
  { label: 'Contact', href: '#contact' },
];

// Edit hrefs to match your router
const SERVICES = [
  { label: 'AI & Intelligent Systems', href: '/services/ai' },
  { label: 'Smart Security Systems', href: '/services/security' },
  { label: 'Enterprise Systems & ERP', href: '/services/erp' },
  { label: 'Product & Application Engineering', href: '/services/product-engineering' },
  { label: 'Digital Transformation & Cloud', href: '/services/cloud' },
  { label: 'Technology Talent & Engineering', href: '/services/talent' },
];

const OFFICES = [
  { label: 'Head Office', city: 'Singapore', address: '156 MacPherson Rd, Singapore 348528' },
  { label: 'UAE Office', city: 'Dubai', address: 'Unit #18-01, 18th Floor, Ontario Tower, Business Bay, Dubai' },
  { label: 'Australia Office', city: 'Sydney', address: 'Suite 4.02, Level 4, 55 Market Street, Sydney NSW 2000' },
  { label: 'India Office', city: 'Bangalore', address: 'No.106, 4th Floor, 10th Cross, Ganganagar, Bangalore 560 032' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="g12">
          <div className="site-footer__about">
            <div className="site-footer__brand">
              <img src={logo} alt="ASZ" />
              {/* <span>Technologies</span> */}
            </div>
            <p>
              Global technology and engineering solutions across AI, intelligent security, digital
              transformation, product engineering, and enterprise technology.
            </p>
            <div className="site-footer__contact">
              <a className="flink flink--sm" href="mailto:info@asztechnologies.com">info@asztechnologies.com</a>
              <a className="flink flink--sm" href="tel:+919740703030">+91 97407 03030</a>
            </div>
          </div>

          <div className="site-footer__col site-footer__col--company">
            <div className="site-footer__title">Company</div>
            {COMPANY.map((l) => (
              <A key={l.label} className="flink" href={l.href}>{l.label}</A>
            ))}
          </div>

          <div className="site-footer__col site-footer__col--services">
            <div className="site-footer__title">Our Services</div>
            {SERVICES.map((s) => (
              <A key={s.label} className="flink flink--block" href={s.href}>{s.label}</A>
            ))}
          </div>

          <div className="site-footer__offices">
            <div className="site-footer__title site-footer__title--offices">Global Offices</div>
            <div className="site-footer__offgrid">
              {OFFICES.map((o) => (
                <div key={o.label}>
                  <div className="site-footer__label">{o.label}</div>
                  <div className="site-footer__city">{o.city}</div>
                  {o.address}
                </div>
              ))}
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