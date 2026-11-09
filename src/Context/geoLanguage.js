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

const GEO_CACHE_KEY = "asz_geo_country";
const GEO_CACHE_TTL = 24 * 60 * 60 * 1000; // 24h
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

function readCachedCountry() {
  try {
    const raw = localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const { country, ts } = JSON.parse(raw);
    if (Date.now() - ts > GEO_CACHE_TTL) return null;
    return country;
  } catch {
    return null;
  }
}

function writeCachedCountry(country) {
  try {
    localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ country, ts: Date.now() }));
  } catch {
    /* storage blocked – ignore */
  }
}

// Resolves to the visitor's ISO country code, or null if the lookup fails.
export async function detectCountryFromIP() {
  const cached = readCachedCountry();
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEO_TIMEOUT);
  try {
    const res = await fetch("https://api.country.is/", { signal: controller.signal });
    if (!res.ok) return null;
    const { country } = await res.json();
    if (!country) return null;
    writeCachedCountry(country);
    return country;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
