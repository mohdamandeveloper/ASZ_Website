import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useLanguage, useTranslation, LANGUAGES } from '../../Context/LanguageContext';
import translations from '../../Context/Translation';
import './LegalDoc.scss';

// Shared layout for the Privacy Policy and Terms and Conditions pages.
// All text comes from the translation files (Context/Translation.js and Context/locales/*.js)
// under a key prefix: `pp_` for the Privacy Policy, `tc_` for the Terms. English is the binding
// version; a language without its own `<prefix>_sections` falls back to English.
const FALLBACK = {
  lg_pill: 'Legal',
  lg_updated: 'Last updated',
  lg_toc: 'On this page',
  lg_also: 'Also read',
  lg_q_title: 'Questions about this page?',
  lg_q_text: 'Write to us and we will get back to you within one business day.',
  lg_q_cta: 'Contact us',
  lg_notice: 'This is a translation provided for convenience. If it differs from the English version, the English version prevails.',
  lg_notice_cta: 'Read in English',
};

const EMAIL = 'info@asztechnologies.com';
const NO_SECTIONS = [];

// Inline markup used in the legal text strings:
//   **bold**   [link text](/path)   {email}   [[left-to-right text, e.g. an address inside Arabic]]
const INLINE_SRC = String.raw`\[\[(.+?)\]\]|\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|\{email\}`;

function renderInline(text) {
  const out = [];
  let last = 0;
  let m;
  // A fresh regex per call: renderInline recurses for **bold**, and a shared /g regex
  // would have its lastIndex reset by the inner call (infinite loop).
  const re = new RegExp(INLINE_SRC, 'g');
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [whole, ltr, bold, linkText, href] = m;
    const k = m.index;
    if (ltr !== undefined) out.push(<bdi key={k} dir="ltr">{ltr}</bdi>);
    else if (bold !== undefined) out.push(<strong key={k}>{renderInline(bold)}</strong>);
    else if (linkText !== undefined) out.push(<Link key={k} to={href}>{linkText}</Link>);
    else out.push(<a key={k} href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a>);
    last = m.index + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Blocks: { p: '' } | { h3: '' } | { ul: [''] } | { address: [''] }
function renderBlock(b, i) {
  if (b.h3) return <h3 key={i}>{renderInline(b.h3)}</h3>;
  if (b.ul) return <ul key={i}>{b.ul.map((li, j) => <li key={j}>{renderInline(li)}</li>)}</ul>;
  if (b.address) {
    return (
      <address key={i} className="lg-address">
        {b.address.map((line, j) => <Fragment key={j}>{j > 0 && <br />}{renderInline(line)}</Fragment>)}
      </address>
    );
  }
  return <p key={i}>{renderInline(b.p || '')}</p>;
}

// Locale used to format the "last updated" date (Latin digits, as on the rest of the site).
const DATE_LOCALE = { EN: 'en-GB', AR: 'ar-u-nu-latn', SV: 'sv-SE' };

const formatDate = (iso, code) => {
  try {
    return new Intl.DateTimeFormat(DATE_LOCALE[code] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(`${iso}T00:00:00Z`));
  } catch {
    return iso;
  }
};

const Arrow = ({ size = 16 }) => (
  <svg className="rtl-flip" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/**
 * @param {object} props
 * @param {'pp'|'tc'} props.prefix   Translation key prefix (reads <prefix>_line1, _line2, _intro, _sections, _related_name, _related_text)
 * @param {string}    props.updatedIso "Last updated" date as YYYY-MM-DD (formatted per language)
 * @param {string}    props.relatedTo  Path of the other legal page
 */
export default function LegalDoc({ prefix, updatedIso, relatedTo }) {
  const t = useTranslation() || {};
  const { language, setLanguage, isRTL } = useLanguage();
  const tr = (key) => t[key] || FALLBACK[key];
  const k = (name) => t[`${prefix}_${name}`];
  const sections = k('sections') || NO_SECTIONS;
  const line1 = k('line1');
  const line2 = k('line2');
  const intro = k('intro');
  const related = { to: relatedTo, name: k('related_name'), text: k('related_text') };
  // Show the "English prevails" note only when this language has its own translated text.
  const translated = language.code !== 'EN' && Boolean(translations[language.code]?.[`${prefix}_sections`]);
  const [active, setActive] = useState(sections[0]?.id);

  // Highlight the section currently being read in the table of contents.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: '-120px 0px -65% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const toc = (
    <ol className="lg-toc__list">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className={'lg-toc__item' + (active === s.id ? ' is-on' : '')} aria-current={active === s.id ? 'true' : undefined}>
            <span className="lg-toc__n" dir="ltr">{String(i + 1).padStart(2, '0')}</span>
            <span>{s.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <main className="legal">
      <section className="lg-hero">
        <div className="lg-hero__grid-lines" aria-hidden="true" />
        <div className="lg-wrap lg-hero__in">
          <div className="lg-pill lg-up"><span className="lg-dot" />{tr('lg_pill')}</div>
          <h1 className="lg-up">
            {line1} <span className="lg-ac">{line2}</span>
          </h1>
          <p className="lg-hero__intro lg-up">{intro}</p>
          <p className="lg-hero__meta lg-up">
            {tr('lg_updated')}: <time dateTime={updatedIso}>{formatDate(updatedIso, language.code)}</time>
          </p>
        </div>
      </section>

      <div className="lg-body">
        <div className="lg-wrap lg-layout">
          <aside className="lg-toc" aria-label={tr('lg_toc')}>
            {/* Desktop: sticky list. Phone: collapsible. */}
            <div className="lg-toc__desk">
              <p className="lg-toc__label">{tr('lg_toc')}</p>
              {toc}
            </div>
            <details className="lg-toc__mob">
              <summary>{tr('lg_toc')}</summary>
              {toc}
            </details>
          </aside>

          <article className="lg-doc" lang={language.code.toLowerCase()} dir={isRTL ? 'rtl' : 'ltr'}>
            {translated && (
              <p className="lg-notice" role="note">
                <span>{tr('lg_notice')}</span>
                <button type="button" className="lg-notice__btn" onClick={() => setLanguage(LANGUAGES[0])}>
                  {tr('lg_notice_cta')}
                </button>
              </p>
            )}
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="lg-sec">
                <h2>
                  <span className="lg-sec__n">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {(s.blocks || []).map(renderBlock)}
              </section>
            ))}

            {/* <div className="lg-end">
              <Link to={related.to} className="lg-card">
                <span className="lg-card__label">{tr('lg_also')}</span>
                <span className="lg-card__title">{related.name} <Arrow size={16} /></span>
                <span className="lg-card__text">{related.text}</span>
              </Link>
              <div className="lg-card lg-card--dark">
                <span className="lg-card__title">{tr('lg_q_title')}</span>
                <span className="lg-card__text">{tr('lg_q_text')}</span>
                <Link to="/contact" className="lg-btn">{tr('lg_q_cta')} <Arrow size={15} /></Link>
              </div>
            </div> */}
          </article>
        </div>
      </div>
    </main>
  );
}
