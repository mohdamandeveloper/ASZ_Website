import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../Context/LanguageContext';
import './Contact.scss';

// ---- Contact details (shown on the page and used for the mailto fallback) ----
const EMAIL = 'info@asztechnologies.com';
const PHONE_DISPLAY = '+91 97407 03030';
const PHONE_HREF = 'tel:+919740703030';

// Where the form is posted (JSON). Point this at your API / Formspree / etc.
// While it is empty, submitting opens the visitor's mail app with the message pre-filled.
const FORM_ENDPOINT = '';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s\-().]+$/;

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
};

const arrowRight = (
  <svg className="rtl-flip" width="16" height="16" strokeWidth="2" {...svgProps}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const validate = (v, t) => {
  const e = {};
  Object.keys(EMPTY).forEach((k) => {
    if (!v[k].trim()) e[k] = t.ct_err_required;
  });
  if (!e.email && !EMAIL_RE.test(v.email.trim())) e.email = t.ct_err_email;
  if (!e.phone) {
    const digits = v.phone.replace(/\D/g, '').length;
    if (!PHONE_RE.test(v.phone.trim()) || digits < 7 || digits > 15) e.phone = t.ct_err_phone;
  }
  return e;
};

async function sendMessage(v, t) {
  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(v),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return;
  }
  const body = [
    `${t.ct_first_name}: ${v.firstName}`,
    `${t.ct_last_name}: ${v.lastName}`,
    `${t.ct_email}: ${v.email}`,
    `${t.ct_phone}: ${v.phone}`,
    '',
    v.message,
  ].join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(t.ct_mail_subject)}&body=${encodeURIComponent(body)}`;
}

const Contact = () => {
  const t = useTranslation();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const doneRef = useRef(null);

  useEffect(() => {
    if (status === 'sent' && doneRef.current) doneRef.current.focus();
  }, [status]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((cur) => ({ ...cur, [name]: value }));
    if (errors[name]) setErrors((cur) => ({ ...cur, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values, t);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      const el = document.getElementById(`ct-${first}`);
      if (el) el.focus();
      return;
    }
    setStatus('sending');
    try {
      await sendMessage(values, t);
      setValues(EMPTY);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
    }
  };

  // One labelled field. `ltr` keeps emails / phone numbers left-to-right inside Arabic pages.
  const field = ({ name, label, placeholder, type = 'text', autoComplete, ltr, wide, multiline }) => {
    const id = `ct-${name}`;
    const err = errors[name];
    const common = {
      id,
      name,
      value: values[name],
      onChange,
      placeholder,
      autoComplete,
      'aria-invalid': err ? 'true' : 'false',
      'aria-describedby': err ? `${id}-err` : undefined,
      dir: ltr ? 'ltr' : undefined,
    };
    return (
      <div className={`ct-field${wide ? ' ct-field--wide' : ''}${err ? ' has-error' : ''}`}>
        <label htmlFor={id}>
          {label} <span className="ct-req" aria-hidden="true">*</span>
        </label>
        {multiline ? <textarea rows={6} {...common} /> : <input type={type} {...common} />}
        {err && <span className="ct-err" id={`${id}-err`} role="alert">{err}</span>}
      </div>
    );
  };

  return (
    <div className="contact-page">
      {/* 1 · HERO */}
      <section id="top" className="pg-hero">
        <div className="fadein pg-hero__orb pg-hero__orb--lg" aria-hidden="true">
          <div className="pg-hero__ring" />
        </div>
        <div className="fadein pg-hero__orb pg-hero__orb--sm" aria-hidden="true">
          <div className="pg-hero__ring" />
        </div>

        <div className="pg-wrap pg-wrap--hero">
          <div className="pg-hero__grid">
            <div className="up pg-hero__badge">
              <span className="live dot" />
              {t.ct_badge}
            </div>

            <h1 className="up pg-hero__title">
              {t.ct_h1_line1}
              <br />
              <span className="ac">{t.ct_h1_accent}</span>
            </h1>

            <p className="up pg-hero__text">{t.ct_text}</p>
          </div>
        </div>
      </section>

      {/* 2 · CONTACT INFO + FORM */}
      <section id="contact" className="pg-wrap ct-main">
        <div className="ct-grid">
          <div className="rvl ct-info">
            <div className="eyebrow">{t.ct_info_eyebrow}</div>
            <h2 className="h2">
              {t.ct_info_title} <span className="ac">{t.ct_info_accent}</span>
            </h2>
            <p className="ct-info__text">{t.ct_info_text}</p>

            <div className="ct-cards">
              <a className="ct-card" href={`mailto:${EMAIL}`}>
                <span className="ct-card__ic">
                  <svg width="22" height="22" strokeWidth="1.7" {...svgProps}>
                    <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3.5 7l8.5 6 8.5-6" />
                  </svg>
                </span>
                <span className="ct-card__body">
                  <span className="ct-card__label">{t.footer_email_us_label}</span>
                  <span className="ct-card__value" dir="ltr">{EMAIL}</span>
                </span>
                <span className="ct-card__go">{arrowRight}</span>
              </a>

              <a className="ct-card" href={PHONE_HREF}>
                <span className="ct-card__ic">
                  <svg width="22" height="22" strokeWidth="1.7" {...svgProps}>
                    <path d="M5 4h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 5 5l1.5-2.3L20 14.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 1-2z" />
                  </svg>
                </span>
                <span className="ct-card__body">
                  <span className="ct-card__label">{t.footer_call_us_label}</span>
                  <span className="ct-card__value" dir="ltr">{PHONE_DISPLAY}</span>
                </span>
                <span className="ct-card__go">{arrowRight}</span>
              </a>
            </div>
          </div>

          <div className="rvr ct-formcard">
            {status === 'sent' ? (
              <div className="ct-done" ref={doneRef} tabIndex={-1} role="status">
                <span className="ct-done__ic">
                  <svg width="26" height="26" strokeWidth="2.4" {...svgProps}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 className="ct-done__title">{t.ct_success_title}</h3>
                <p className="ct-done__text">{t.ct_success_text}</p>
                <button type="button" className="ct-done__again" onClick={() => setStatus('idle')}>
                  {t.ct_success_again}
                </button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={onSubmit} noValidate>
                <h3 className="ct-form__title">{t.ct_form_title}</h3>
                <p className="ct-form__text">{t.ct_form_text}</p>

                <div className="ct-form__grid">
                  {field({ name: 'firstName', label: t.ct_first_name, placeholder: t.ct_ph_first, autoComplete: 'given-name' })}
                  {field({ name: 'lastName', label: t.ct_last_name, placeholder: t.ct_ph_last, autoComplete: 'family-name' })}
                  {field({ name: 'email', label: t.ct_email, placeholder: t.ct_ph_email, type: 'email', autoComplete: 'email', ltr: true })}
                  {field({ name: 'phone', label: t.ct_phone, placeholder: t.ct_ph_phone, type: 'tel', autoComplete: 'tel', ltr: true })}
                  {field({ name: 'message', label: t.ct_message, placeholder: t.ct_ph_message, wide: true, multiline: true })}
                </div>

                {status === 'error' && <p className="ct-form__error" role="alert">{t.ct_err_send}</p>}

                <button type="submit" className="btn btn-ac ct-form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? t.ct_sending : t.ct_submit}
                  {arrowRight}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;