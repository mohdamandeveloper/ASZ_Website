import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import { getProduct } from '../../Data/ProductData';
import './ProductDetails.scss';

// All copy lives in Context/Translation.js -> t.prod_detail[slug] (+ shared pd_* labels).
// Which products exist, their images and "coming soon" flags live in ./productsData.js.

const arrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const check = (size, sw = 3) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Eyebrow = ({ children, light }) => (
  <div className={`pd-eyebrow${light ? ' pd-eyebrow--light' : ''}`}>
    <span className="pd-eyebrow__dot" />
    {children}
  </div>
);

const ProductDetail = () => {
  const t = useTranslation();
  const { slug } = useParams();
  const product = getProduct(slug);
  const d = product && t.prod_detail ? t.prod_detail[slug] : null;

  // always open a detail page at the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!product || !product.detail || !d) return <Navigate to="/products" replace />;

  const demoHref = `/contact?enquiry=demo&product=${product.slug}`;
  const isFull = Boolean(d.problems); // Cordon / MEDIQ have the full story; Safin is a coming-soon page

  return (
    <div className="product-detail">
      {/* 1 · HERO */}
      <section id="top" className="pd-hero">
        <div className="pd-hero__img" aria-hidden="true" style={{ backgroundImage: `url(${product.image})` }} />
        <div className="pd-hero__shade" aria-hidden="true" />
        <div className="pd-wrap pd-wrap--hero">
          <div className="pd-hero__grid">
            <div className="up pd-hero__badge">
              <span className="live dot" />
              {`${t.prod_label} · ${d.category}`}
              {product.comingSoon && <span className="pd-hero__soon">{t.prod_coming_soon}</span>}
            </div>

            <h1 className="up pd-hero__title">
              {product.name}
              <span className="ac">.</span>
            </h1>
            <p className="up pd-hero__tag">
              {d.tag_a} <span className="ac">{d.tag_b}</span>
            </p>
            <p className="up pd-hero__text">{d.intro}</p>

            <div className="up pd-hero__actions">
              {isFull ? (
                <>
                  <Link to={demoHref} className="btn btn-ac">
                    {t.prod_book_demo}
                    {arrowRight}
                  </Link>
                  <a className="btn pd-ghost" href="#how">
                    {t.pd_how_btn}
                  </a>
                </>
              ) : (
                <>
                  <Link to="/contact" className="btn btn-ac">
                    {t.pd_notify}
                    {arrowRight}
                  </Link>
                  <Link className="btn pd-ghost" to="/products">
                    {t.pd_all_products}
                  </Link>
                </>
              )}
            </div>

            <div className="up pd-hero__chips">
              {d.chips.map((c) => (
                <span className="pd-chip" key={c}>
                  <span className="pd-chip__ic">{check(11)}</span>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {isFull ? (
        <>
          {/* 2 · THE PROBLEM */}
          <section className="pd-sec pd-sec--light">
            <div className="pd-wrap pd-pad">
              <div className="rv pd-head">
                <Eyebrow>{t.pd_problem}</Eyebrow>
                <h2 className="pd-h2">
                  {d.problem_a}
                  <br />
                  <span className="ac">{d.problem_b}</span>
                </h2>
              </div>
              <div className="pd-grid pd-grid--4 pd-snap">
                {d.problems.map((p, i) => (
                  <div className="pd-pcard pd-rvs" key={p.title}>
                    <span className="pd-pcard__n">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3 · HOW IT WORKS */}
          <section id="how" className="pd-sec pd-sec--dark pd-how">
            <div className="pd-wrap pd-pad">
              <div className="rv pd-head pd-head--lg">
                <Eyebrow light>{t.pd_how}</Eyebrow>
                <h2 className="pd-h2">
                  {d.how_a} <span className="pd-muted">{d.how_b}</span>
                </h2>
              </div>
              <div className="pd-grid pd-grid--3 pd-steps">
                {d.steps.map((s, i) => (
                  <div className="pd-step pd-rvs" key={s.title}>
                    <span className="pd-step__line" aria-hidden="true" />
                    <div className="pd-step__n">{String(i + 1).padStart(2, '0')}</div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4 · KEY CAPABILITIES */}
          <section id="features" className="pd-sec pd-sec--grey">
            <div className="pd-wrap pd-pad">
              <div className="rv pd-head">
                <Eyebrow>{t.pd_capabilities}</Eyebrow>
                <h2 className="pd-h2">
                  {d.cap_a} <span className="ac">{d.cap_b}</span>
                </h2>
              </div>
              <div className="pd-grid pd-grid--3 pd-snap">
                {d.caps.map((c) => (
                  <div className="pd-fcap pd-rvs" key={c.title}>
                    <span className="pd-fcap__bar" aria-hidden="true" />
                    <span className="pd-fcap__ic">{check(16)}</span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                ))}
                <Link to={demoHref} className={`pd-live pd-rvs${d.conn_items ? ' pd-live--wide' : ''}`}>
                  <span className="pd-live__glow" aria-hidden="true" />
                  <span className="pd-live__body">
                    <span className="pd-live__eyebrow">{t.pd_see_live}</span>
                    <span className="pd-live__title">{d.live_title}</span>
                    <span className="pd-live__text">{d.live_text}</span>
                  </span>
                  <span className="pd-live__cta">
                    {t.prod_book_demo} {arrowRight}
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* 4b · CONNECTED (MEDIQ only) */}
          {d.conn_items && (
            <section className="pd-sec pd-sec--dark pd-conn">
              <div className="pd-wrap pd-pad pd-pad--sm">
                <div className="pd-conn__grid">
                  <div className="rvl pd-conn__copy">
                    <Eyebrow light>{d.conn_eyebrow}</Eyebrow>
                    <h2 className="pd-h2 pd-h2--md">
                      {d.conn_a} <span className="ac">{d.conn_b}</span>
                    </h2>
                    <p>{d.conn_text}</p>
                  </div>
                  <div className="pd-conn__items">
                    {d.conn_items.map((it) => (
                      <div className="pd-conn__item pd-rvs" key={it}>
                        <span />
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5 · BUILT FOR */}
          <section className="pd-sec pd-sec--light">
            <div className="pd-wrap pd-pad">
              <div className="pd-built">
                <div className="rvl pd-built__copy">
                  <Eyebrow>{t.pd_built_for}</Eyebrow>
                  <h2 className="pd-h2 pd-h2--md">
                    {d.built_a} <span className="ac">{d.built_b}</span>
                  </h2>
                </div>
                <ul className="pd-built__list">
                  {d.built_items.map((b, i) => (
                    <li className="pd-rvs" key={b}>
                      <span>{b}</span>
                      <span className="pd-built__n">{String(i + 1).padStart(2, '0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* COMING SOON (Safin) */
        <section className="pd-sec pd-sec--light">
          <div className="pd-wrap pd-pad">
            <div className="rv pd-soon">
              <Eyebrow>{t.prod_coming_soon}</Eyebrow>
              <h2 className="pd-h2">
                {d.soon_a} <span className="ac">{d.soon_b}</span>
              </h2>
              <p className="pd-soon__text">{d.soon_text}</p>
              <ul className="pd-soon__list">
                {d.chips.map((c) => (
                  <li key={c}>
                    <span className="pd-soon__check">{check(11)}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 6 · PRODUCT CTA BAND */}
      <section className="pd-sec pd-sec--light pd-bandsec">
        <div className="pd-wrap pd-bandwrap">
          <div className="pd-band rv">
            <span className="pd-band__glow" aria-hidden="true" />
            <div className="pd-band__copy">
              <div className="pd-band__label">{`${product.name.toUpperCase()} · ${d.category}`}</div>
              <div className="pd-band__title">
                {d.band_a}
                <br />
                <span className="ac">{d.band_b}</span>
              </div>
            </div>
            <div className="pd-band__cta">
              <Link to={isFull ? demoHref : '/contact'} className="btn btn-ac">
                {isFull ? t.prod_book_demo : t.pd_notify}
                {arrowRight}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;