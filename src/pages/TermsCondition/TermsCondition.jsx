import LegalDoc from '../../components/LegalDoc/LegalDoc';

// Text lives in the translation files under the `tc_` keys:
// EN and AR in Context/Translation.js, SV in Context/locales/sv.js.
// Update this date whenever the terms text changes (in every language).
const UPDATED_ISO = '2026-11-20';

export default function TermsCondition() {
  return <LegalDoc prefix="tc" updatedIso={UPDATED_ISO} relatedTo="/privacy-policy" />;
}
