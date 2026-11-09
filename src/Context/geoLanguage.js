// ─── Geo-location → language detection ───────────────────────────────────────
// The site is served as static files, so detection runs in the browser:
//   1. detectLangFromTimezone() – instant, no network (used for the first render)
//   2. detectLangFromIP()       – async IP → country lookup that confirms/corrects it
//
// To add a country, add its ISO code to COUNTRY_TO_LANG (and its IANA
// timezone(s) to TIMEZONE_TO_COUNTRY for the instant guess).

// ISO 3166-1 alpha-2 country → language code (must exist in LANGUAGES)
export const COUNTRY_TO_LANG = {
  // Gulf Cooperation Council → Arabic
  SA: "AR", // Saudi Arabia
  AE: "AR", // United Arab Emirates
  QA: "AR", // Qatar
  KW: "AR", // Kuwait
  BH: "AR", // Bahrain
  OM: "AR", // Oman
  // Sweden → Swedish
  SE: "SV",
};

const TIMEZONE_TO_COUNTRY = {
  "Asia/Riyadh": "SA",
  "Asia/Dubai": "AE",
  "Asia/Qatar": "QA",
  "Asia/Kuwait": "KW",
  "Asia/Bahrain": "BH",
  "Asia/Muscat": "OM",
  "Europe/Stockholm": "SE",
};

const LEGACY_GEO_CACHE_KEY = "asz_geo_country";
const GEO_TIMEOUT = 3000;

export function langFromCountry(country) {
  return COUNTRY_TO_LANG[(country ?? "").toUpperCase()] ?? null;
}

// Returns a language code, "" when we're sure the country has no mapping, or
// null when the timezone tells us nothing.
export function detectLangFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const country = TIMEZONE_TO_COUNTRY[tz];
    return country ? langFromCountry(country) : null;
  } catch {
    return null;
  }
}

// Resolves to the visitor's ISO country code, or null if the lookup fails.
// Not cached on purpose: a cached country goes stale when the visitor travels
// or switches VPN, and the lookup only runs on a fresh load with no ?lang=.
export async function detectCountryFromIP() {
  // Remove the country cache left by earlier versions of the site.
  try { localStorage.removeItem(LEGACY_GEO_CACHE_KEY); } catch { /* ignore */ }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT);
  try {
    const res = await fetch("https://api.country.is/", { signal: controller.signal });
    if (!res.ok) return null;
    const { country } = await res.json();
    return country || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
