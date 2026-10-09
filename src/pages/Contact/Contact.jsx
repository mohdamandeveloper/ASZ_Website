import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../Context/LanguageContext';
import imageBanner from '../../assets/images/contact-map.webp';
import './Contact.scss';

// ---- Contact details (mailto fallback + "Prefer email?" link) ----
const EMAIL = 'info@asztechnologies.com';

// Where the form is posted (JSON). Point this at your API / Formspree / etc.
// While it is empty, sending opens the visitor's mail app with the message pre-filled.
const FORM_ENDPOINT = '';

const PRIVACY_ROUTE = '/privacy-policy';

const STEPS = [1, 2, 4]; // same step order as contact.html (step 3 is unused there)

const TYPES = ['project', 'team', 'demo', 'partner', 'other'];
const TYPE_EN = {
  project: 'Start a project',
  team: 'Hire a team',
  demo: 'Book a product demo',
  partner: 'Partnerships',
  other: 'Something else',
};

// Option lists: [id, English label]. The UI text comes from `cf_o_<list>_<id>` in the locale
// files; the English label is only used in the message that is sent to ASZ.
const LISTS = {
  svc: [['ai', 'AI & Intelligent Systems'], ['security', 'Smart Security Systems'], ['erp', 'Enterprise Systems & ERP'], ['product', 'Product & Application Engineering'], ['digital', 'Digital Transformation & Cloud'], ['notsure', 'Not sure yet']],
  stage: [['exploring', 'Exploring ideas'], ['planning', 'Planning a project'], ['ready', 'Ready to start'], ['scaling', 'Replacing or scaling an existing system']],
  skills: [['ai', 'AI & Machine Learning'], ['web', 'Web & Full-stack'], ['mobile', 'Mobile'], ['cloud', 'Cloud & DevOps'], ['erp', 'ERP & Enterprise Systems'], ['data', 'Data & Analytics'], ['qa', 'QA & Testing'], ['notsure', 'Not sure yet']],
  model: [['dedicated', 'A dedicated team'], ['extend', 'Extend my existing team'], ['notsure', 'Not sure yet']],
  prod: [['Cordon', 'Cordon'], ['MEDIQ', 'MEDIQ'], ['JobScout', 'JobScout'], ['Safin', 'Safin']], // product names are not translated
  ptype: [['tech', 'Technology partnership'], ['reseller', 'Reseller or channel partner'], ['referral', 'Referral partner'], ['other', 'Something else']],
};
const MULTI = ['svc', 'skills', 'prod'];

// What step 2 shows for each enquiry type
const BLOCKS = {
  project: { k: 'p', groups: [{ list: 'svc', label: 'p_areas', cols: 2 }, { list: 'stage', label: 'p_stage', cols: 2, optional: true }] },
  team: { k: 't', groups: [{ list: 'skills', label: 't_skills', cols: 2 }, { list: 'model', label: 't_model', cols: 3, optional: true }] },
  demo: { k: 'd', groups: [{ list: 'prod', label: 'd_prod', cols: 2 }] },
  partner: { k: 'pt', groups: [{ list: 'ptype', label: 'pt_type', cols: 2 }] },
  other: { k: 'o', groups: [] },
};
const REQUIRED = { project: ['svc', 'err_svc'], team: ['skills', 'err_skills'], demo: ['prod', 'err_prod'], partner: ['ptype', 'err_ptype'] };

const PRODUCT_PARAM = { cordon: 'Cordon', mediq: 'MEDIQ', jobscout: 'JobScout', safin: 'Safin' };
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const EMPTY_ANSWERS = { svc: [], stage: [], skills: [], model: [], prod: [], ptype: [] };
const EMPTY_FIELDS = { first: '', last: '', email: '', company: '', role: '', phone: '' };

const Arrow = () => (
  <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const ArrowBack = () => (
  <svg className="rtl-flip" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
const Check = ({ size = 11, sw = 3 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const fill = (str, vars) => Object.keys(vars).reduce((s, k) => s.split(`{${k}}`).join(vars[k]), str);

async function sendMessage(payload, subject) {
  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return;
  }
  const body = Object.entries(payload)
    .filter(([, v]) => (Array.isArray(v) ? v.length : v))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const Contact = () => {
  const t = useTranslation();
  const [params] = useSearchParams();

  // ?enquiry=project|team|demo|partner|other  and  ?product=cordon|mediq|jobscout|safin
  const [type, setType] = useState(() => {
    const q = params.get('enquiry');
    return TYPES.includes(q) ? q : '';
  });
  const [answers, setAnswers] = useState(() => {
    const p = PRODUCT_PARAM[String(params.get('product') || '').toLowerCase()];
    return p ? { ...EMPTY_ANSWERS, prod: [p] } : EMPTY_ANSWERS;
  });
  const [step, setStep] = useState(1); // 1 | 2 | 4 | 5 (done)
  const [message, setMessage] = useState('');
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState('');
  const [ddOpen, setDdOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);

  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const ddRef = useRef(null);
  const ddBtnRef = useRef(null);
  const mounted = useRef(false);

  const pos = Math.max(0, STEPS.indexOf(step));
  const done = step === 5;
  const block = BLOCKS[type || 'other'];

  // After the visitor moves between steps, scroll the form into view and put keyboard focus on the
  // new step's heading, so Tab continues from there and screen readers announce it.
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (headingRef.current) headingRef.current.focus({ preventScroll: true });
  }, [step]);

  // close the drop-down on outside click / Escape
  useEffect(() => {
    if (!ddOpen) return undefined;
    const onDown = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [ddOpen]);

  const scrollToForm = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (cardRef.current) cardRef.current.focus({ preventScroll: true });
  };

  const toggle = (list, id) => {
    setErr('');
    setAnswers((cur) => {
      const has = cur[list].includes(id);
      if (MULTI.includes(list)) return { ...cur, [list]: has ? cur[list].filter((x) => x !== id) : [...cur[list], id] };
      return { ...cur, [list]: has ? [] : [id] };
    });
  };

  const setField = (name) => (e) => { setErr(''); setFields((cur) => ({ ...cur, [name]: e.target.value })); };

  const validate = (s) => {
    if (s === 1 && !type) return t.cf_err_type;
    if (s === 2) {
      const req = REQUIRED[type];
      if (req && !answers[req[0]].length) return t[`cf_${req[1]}`];
    }
    if (s === 4) {
      if (!fields.first.trim()) return t.cf_err_first;
      if (!EMAIL_RE.test(fields.email.trim())) return t.cf_err_email;
      if (!fields.company.trim()) return t.cf_err_company;
      if (!consent) return t.cf_err_consent;
    }
    return '';
  };

  const labelsOf = (list) => answers[list].map((id) => (LISTS[list].find(([i]) => i === id) || [, id])[1]);

  const goTo = (n) => { setErr(''); setDdOpen(false); setStep(n); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending || done) return;
    const problem = validate(step);
    if (problem) { setErr(problem); return; }
    if (step !== 4) { goTo(STEPS[pos + 1]); return; }

    setSending(true);
    try {
      await sendMessage(
        {
          enquiry: TYPE_EN[type],
          areas: labelsOf('svc'),
          stage: labelsOf('stage'),
          skills: labelsOf('skills'),
          working_model: labelsOf('model'),
          products: labelsOf('prod'),
          partnership: labelsOf('ptype'),
          message: message.trim(),
          first_name: fields.first.trim(),
          last_name: fields.last.trim(),
          email: fields.email.trim(),
          company: fields.company.trim(),
          role: fields.role.trim(),
          phone: fields.phone.trim(),
        },
        t.ct_mail_subject,
      );
      setSent({ first: fields.first.trim(), email: fields.email.trim() });
      goTo(5);
    } catch (error) {
      setErr(t.cf_err_send);
    } finally {
      setSending(false);
    }
  };

  /* ---- drop-down keyboard support: Esc closes, arrows move between options ---- */
  const onDdKey = (e) => {
    if (e.key === 'Escape' && ddOpen) {
      e.preventDefault();
      setDdOpen(false);
      if (ddBtnRef.current) ddBtnRef.current.focus();
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    if (!ddOpen) { setDdOpen(true); return; }
    const opts = Array.from(ddRef.current.querySelectorAll('[role="option"]'));
    const i = opts.indexOf(document.activeElement);
    const next = e.key === 'ArrowDown' ? (i + 1) % opts.length : (i <= 0 ? opts.length - 1 : i - 1);
    opts[next].focus();
  };
  const onDdBlur = (e) => {
    // relatedTarget is null when Safari doesn't focus a clicked button; the outside-click handler covers that
    if (ddOpen && e.relatedTarget && !ddRef.current.contains(e.relatedTarget)) setDdOpen(false);
  };

  const pickType = (id) => {
    setType(id);
    setErr('');
    setDdOpen(false);
    if (ddBtnRef.current) ddBtnRef.current.focus();
  };

  const optLabel = (list, id, en) => (list === 'prod' ? en : t[`cf_o_${list}_${id}`]);

  const chipGroup = ({ list, label, cols, optional }) => {
    const multi = MULTI.includes(list);
    const labelId = `cf-lbl-${list}`;
    return (
      <div className="cf-group" key={list}>
        <div className="cf-label" id={labelId}>
          {t[`cf_${label}`]} {optional && <span className="cf-opt">{t.cf_optional}</span>}
        </div>
        <div className={`chips chips--${cols}`} role="group" aria-labelledby={labelId}>
          {LISTS[list].map(([id, en]) => {
            const on = answers[list].includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`chip${on ? ' is-on' : ''}${multi ? ' chip--sq' : ''}`}
                aria-pressed={on}
                onClick={() => toggle(list, id)}
              >
                <span>{optLabel(list, id, en)}</span>
                <span className="chip__box"><Check /></span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const typeLabel = type ? t[`cf_type_${type}`] : t.cf_s1_ph;
  const doneText = fill(t.cf_done_text, { email: '\u0000' }).split('\u0000');

  return (
    <main className="contact-page">
      {/* 1 HERO */}
      <section id="top" className="ct-hero">
        <img className="ct-hero__map" src={imageBanner} alt="" aria-hidden="true" />
        <div className="wrap ct-hero__wrap">
          <div className="ct-hero__badge up"><span />{t.cf_badge}</div>
          <h1 className="up">{t.cf_h1_line1}<br /><span className="ac">{t.cf_h1_accent}</span></h1>
          <p className="up">{t.cf_text}</p>
          <a className="btn btn-ac up ct-hero__btn" href="#contact" onClick={scrollToForm}>
            {t.cf_cta} <Arrow />
          </a>
        </div>
        <div className="ct-hero__foot">
          <div>
            <span>{t.cf_cities}</span>
            <a href="#contact" className="ct-scroll" onClick={scrollToForm}>
              {t.cf_scroll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
            </a>
            <span>{t.cf_reply}</span>
          </div>
        </div>
      </section>

      {/* 2 FORM */}
      <section id="contact" className="ct-form-sec">
        <div className="ct-form-sec__in">
          <div className="ct-track rv">
            {[0, 1, 2].map((i) => {
              const phase = done ? 2 : 0;
              const isDone = i < phase || (phase === 2 && i <= 1);
              const cur = i === phase;
              return (
                <div className="ct-track__item" key={i}>
                  <div className="ct-track__top">
                    <span className={`ct-track__dot${isDone ? ' is-done' : cur ? ' is-cur' : ''}`}>{`0${i + 1}`}</span>
                    {i < 2 && <span className="ct-track__line" />}
                  </div>
                  <div>
                    <div className="ct-track__ttl">{t[`cf_tk${i + 1}_t`]}</div>
                    <div className="ct-track__desc">{t[`cf_tk${i + 1}_d`]}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="ct-card rv" ref={cardRef} tabIndex={-1}>
            <form onSubmit={onSubmit} noValidate aria-label={t.cf_form_label}>
              {!done && (
                <div className="ct-progress">
                  <span className="ct-progress__txt">{fill(t.cf_step, { n: pos + 1, total: STEPS.length })}</span>
                  <span className="ct-progress__bar" role="progressbar" aria-valuemin={1} aria-valuemax={STEPS.length} aria-valuenow={pos + 1}>
                    <span style={{ width: `${((pos + 1) / STEPS.length) * 100}%` }} />
                  </span>
                </div>
              )}

              {/* step 1: enquiry type */}
              {step === 1 && (
                <div>
                  <h2 tabIndex={-1} ref={headingRef}>{t.cf_s1_title}</h2>
                  <p className="ct-lead">{t.cf_s1_text}</p>
                  <div className="ct-dd" ref={ddRef} onKeyDown={onDdKey} onBlur={onDdBlur}>
                    <span className="cf-label" id="cf-dd-label">{t.cf_s1_label}</span>
                    <button
                      type="button"
                      ref={ddBtnRef}
                      className={`dd cin${type ? '' : ' is-empty'}`}
                      aria-haspopup="listbox"
                      aria-expanded={ddOpen}
                      aria-labelledby="cf-dd-label cf-dd-value"
                      onClick={() => setDdOpen((o) => !o)}
                    >
                      <span id="cf-dd-value">{typeLabel}</span>
                      <svg className={ddOpen ? 'is-open' : ''} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                    {ddOpen && (
                      <div className="ct-dd__list" role="listbox" aria-labelledby="cf-dd-label">
                        {TYPES.map((id) => {
                          const on = id === type;
                          return (
                            <button key={id} type="button" role="option" aria-selected={on} className={`ddo${on ? ' is-on' : ''}`} onClick={() => pickType(id)}>
                              <span>
                                <span className="ddo__t">{t[`cf_type_${id}`]}</span>
                                <span className="ddo__d">{t[`cf_type_${id}_d`]}</span>
                              </span>
                              <span className="ddo__tick"><Check size={16} /></span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* step 2: details by enquiry type */}
              {step === 2 && (
                <div>
                  <h2 tabIndex={-1} ref={headingRef} className="ct-h2--s2">{t[`cf_${block.k}_title`]}</h2>
                  <p className="ct-lead">{t[`cf_${block.k}_text`]}</p>
                  {block.groups.map((g) => chipGroup(g))}
                  <label className="cf-ta">
                    <span className="cf-label">
                      {type === 'other' ? t.cf_ta_msg : t.cf_ta_more} <span className="cf-opt">{t.cf_optional}</span>
                    </span>
                    <textarea
                      className="cin"
                      name="message"
                      rows={4}
                      value={message}
                      placeholder={t[`cf_ph_${type || 'other'}`]}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </label>
                </div>
              )}

              {/* step 4: contact details */}
              {step === 4 && (
                <div>
                  <h2 tabIndex={-1} ref={headingRef} className="ct-h2--s2">{t.cf_c_title}</h2>
                  <p className="ct-lead">{t.cf_c_text}</p>
                  <div className="cf-fields">
                    <div className="g2f">
                      <label><span className="cf-label">{t.cf_f_first}</span>
                        <input className="cin" type="text" name="first" autoComplete="given-name" value={fields.first} onChange={setField('first')} placeholder={t.cf_ph_first} /></label>
                      <label><span className="cf-label">{t.cf_f_last} <span className="cf-opt">{t.cf_optional}</span></span>
                        <input className="cin" type="text" name="last" autoComplete="family-name" value={fields.last} onChange={setField('last')} placeholder={t.cf_ph_last} /></label>
                    </div>
                    <div className="g2f">
                      <label><span className="cf-label">{t.cf_f_email}</span>
                        <input className="cin" type="email" name="email" dir="ltr" autoComplete="email" value={fields.email} onChange={setField('email')} placeholder={t.cf_ph_email} /></label>
                      <label><span className="cf-label">{t.cf_f_company}</span>
                        <input className="cin" type="text" name="company" autoComplete="organization" value={fields.company} onChange={setField('company')} placeholder={t.cf_ph_company} /></label>
                    </div>
                    <div className="g2f">
                      <label><span className="cf-label">{t.cf_f_role} <span className="cf-opt">{t.cf_optional}</span></span>
                        <input className="cin" type="text" name="role" autoComplete="organization-title" value={fields.role} onChange={setField('role')} placeholder={t.cf_ph_role} /></label>
                      <label><span className="cf-label">{t.cf_f_phone} <span className="cf-opt">{t.cf_optional}</span></span>
                        <input className="cin" type="tel" name="phone" dir="ltr" autoComplete="tel" value={fields.phone} onChange={setField('phone')} placeholder={t.cf_ph_phone} /></label>
                    </div>
                  </div>
                  <label className="cf-consent">
                    <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); setErr(''); }} />
                    <span>{t.cf_consent_pre}<Link to={PRIVACY_ROUTE}>{t.cf_consent_link}</Link>{t.cf_consent_post}</span>
                  </label>
                </div>
              )}

              {/* actions */}
              {!done && (
                <div>
                  {err && <div className="ct-err" role="alert">{err}</div>}
                  <div className="ct-actions">
                    {step > 1 && (
                      <button type="button" className="ct-back" onClick={() => goTo(STEPS[Math.max(0, pos - 1)])}>
                        <ArrowBack />{t.cf_back}
                      </button>
                    )}
                    {step === 1 && (
                      <span className="ct-alt">{t.cf_alt} <a href={`mailto:${EMAIL}`} dir="ltr">{EMAIL}</a></span>
                    )}
                    <button type="submit" className="btn btn-ac ct-next" disabled={sending}>
                      {sending ? t.cf_sending : step === 4 ? t.cf_send : t.cf_continue}
                      <Arrow />
                    </button>
                  </div>
                </div>
              )}

              {/* done */}
              {done && (
                <div className="ct-done">
                  <span className="ct-done__ic"><Check size={26} sw={3} /></span>
                  <h2 tabIndex={-1} ref={headingRef} role="status">{fill(t.cf_done_title, { name: (sent && sent.first) || t.cf_done_name })}</h2>
                  <p>{doneText[0]}<b dir="ltr">{(sent && sent.email) || t.cf_done_email}</b>{doneText[1]}</p>
                  <div className="ct-done__btns">
                    <Link className="btn btn-ac ct-done__a" to="/work">{t.cf_done_work} <Arrow /></Link>
                    <Link className="btn ct-done__b" to="/service">{t.cf_done_services}</Link>
                  </div>
                </div>
              )}
            </form>
          </div>

          <p className="ct-note rv">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
            {t.cf_privacy_note}
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;