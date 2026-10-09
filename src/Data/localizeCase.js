// Case-study copy lives in ./CaseStudies.js (English). To localise a story, add an entry to the
// locale file under `case_studies[slug]` with any top-level fields you want to replace
// (client, industry, service, teaser, teaserStat, card, hero, stats, challenge, solution, impact).
// Anything not overridden falls back to the English data, so partially translated stories still work.
export const localizeCase = (c, t) => {
  const o = t && t.case_studies && c ? t.case_studies[c.slug] : null;
  if (!o) return c;
  // `image` is merged field by field so a locale only needs to supply the translated `label`
  return { ...c, ...o, image: { ...c.image, ...(o.image || {}) } };
};

export const localizeCases = (list, t) => list.map((c) => localizeCase(c, t));