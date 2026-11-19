import LegalDoc from '../../components/LegalDoc/LegalDoc';

// Text lives in the translation files under the `pp_` keys:
// EN and AR in Context/Translation.js, SV in Context/locales/sv.js.
// Update this date whenever the policy text changes (in every language).
const UPDATED_ISO = '2026-11-20';

export default function PrivacyPolicy() {
  return <LegalDoc prefix="pp" updatedIso={UPDATED_ISO} relatedTo="/terms-and-conditions" />;
}
