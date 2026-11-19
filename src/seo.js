// Single source of truth for every page's <head>: title, description, canonical,
// Open Graph / Twitter tags and JSON-LD structured data.
//
// Used in two places:
//   - scripts/prerender.js  -> writes the tags into each static HTML file at build time
//   - components/Seo/SeoHead -> keeps the tags in sync during client-side navigation
//
// Add an entry to PAGES whenever you add a page.
//   title       <= 60 characters, primary keyword first, brand last
//   description 120-160 characters, says what the page offers + a reason to click
import CaseStudies from './Data/CaseStudies';
import { PRODUCTS } from './Data/ProductData';

export const SITE_URL = 'https://asztechnologies.com';
export const SITE_NAME = 'ASZ Technologies';
const EMAIL = 'info@asztechnologies.com';
const DEFAULT_IMAGE = '/og-image.jpg';
const DEFAULT_IMAGE_ALT = 'ASZ Technologies: AI, intelligent security and enterprise software';

// Add the company's public profiles here (LinkedIn, X, Instagram, Crunchbase,
// Clutch...). Google uses them to connect the site to the brand's Knowledge Panel.
const SAME_AS = [];

const DEFAULT_DESCRIPTION =
  'Software development company building AI systems, intelligent security, ERP and custom enterprise software. Offices in Singapore, Dubai, Sydney & Bangalore.';

const OFFICES = [
  { city: 'Singapore', street: '156 MacPherson Rd', postal: '348528', country: 'SG' },
  { city: 'Bangalore', street: 'No.106, 4th Floor, 10th Cross, Ganganagar', postal: '560032', region: 'Karnataka', country: 'IN' },
  { city: 'Dubai', street: 'Unit #18-01, 18th Floor, Ontario Tower, Business Bay', country: 'AE' },
  { city: 'Sydney', street: 'Suite 4.02, Level 4, 55 Market Street', postal: '2000', region: 'NSW', country: 'AU' },
];

const SERVICE_AREAS = ['Singapore', 'United Arab Emirates', 'Australia', 'India'];

// kind: 'home' | 'about' | 'contact' | 'collection' | 'service' | 'product' | 'article' | 'page'
// crumb: label used in the BreadcrumbList; parent: path of the parent breadcrumb.
const PAGES = {
  '/': {
    kind: 'home',
    title: 'ASZ Technologies | AI, Security & Enterprise Software',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    kind: 'about',
    crumb: 'About',
    title: 'About ASZ Technologies | Global Technology Company',
    description:
      'ASZ Technologies engineers and scales mission-critical software with AI, cloud and modern engineering, from offices in Singapore, Dubai, Sydney and Bangalore.',
  },
  '/service': {
    kind: 'collection',
    crumb: 'Services',
    title: 'Software Development & AI Services | ASZ Technologies',
    description:
      'Technology services end to end: AI development, smart security systems, ERP implementation, product engineering, cloud transformation and dedicated teams.',
  },
  '/service/ai-intelligence': {
    kind: 'service',
    crumb: 'AI & Intelligent Systems',
    parent: '/service',
    serviceType: 'Artificial intelligence development',
    title: 'AI Development Services: Agents, GenAI & ML | ASZ',
    description:
      'AI development company building production AI agents, generative AI, machine learning and computer vision that automate workflows and act on business data.',
  },
  '/service/smart-security': {
    kind: 'service',
    crumb: 'Smart Security Systems',
    parent: '/service',
    serviceType: 'Intelligent security systems',
    title: 'Smart Security Systems: Face Recognition & ANPR | ASZ',
    description:
      'AI-powered physical security: facial recognition, ANPR vehicle recognition, access control and visitor management systems for offices, campuses and buildings.',
  },
  '/service/enterprise-erp': {
    kind: 'service',
    crumb: 'Enterprise Systems & ERP',
    parent: '/service',
    serviceType: 'ERP implementation and CRM integration',
    title: 'ERP Implementation & CRM Integration | ASZ Technologies',
    description:
      'ERP implementation and CRM integration services that connect operations, finance and reporting into one source of truth across your whole organisation.',
  },
  '/service/product-application': {
    kind: 'service',
    crumb: 'Product & Application Engineering',
    parent: '/service',
    serviceType: 'Custom software development',
    title: 'Custom Software & App Development | ASZ Technologies',
    description:
      'Custom software development and application modernisation: web, mobile and platform engineering from discovery and design through to production and support.',
  },
  '/service/digital-transformation': {
    kind: 'service',
    crumb: 'Digital Transformation & Cloud',
    parent: '/service',
    serviceType: 'Digital transformation and cloud migration',
    title: 'Digital Transformation & Cloud Migration | ASZ',
    description:
      'Technology strategy, cloud migration and DevOps: modernise legacy infrastructure and move workloads to the cloud safely, with measurable business outcomes.',
  },
  '/service/technology-talent': {
    kind: 'service',
    crumb: 'Technology Talent & Engineering',
    parent: '/service',
    serviceType: 'IT staff augmentation',
    title: 'Dedicated Developers & IT Staff Augmentation | ASZ',
    description:
      'Hire dedicated software engineers through IT staff augmentation. Vetted engineering teams that work as an extension of yours, without the hiring bottleneck.',
  },
  '/products': {
    kind: 'collection',
    crumb: 'Products',
    title: 'Products: Cordon, MEDIQ, JobScout & Safin | ASZ',
    description:
      'Products built by ASZ Technologies: Cordon intelligent security, MEDIQ smart healthcare kiosks, JobScout AI career platform and Safin smart water monitoring.',
  },
  '/products/cordon': {
    kind: 'product',
    crumb: 'Cordon',
    parent: '/products',
    productName: 'Cordon',
    title: 'Cordon: AI Access Control & Visitor Management | ASZ',
    description:
      'Cordon is zero-touch intelligent security: AI facial recognition, access control and visitor management in one platform for modern offices and premises.',
  },
  '/products/mediq': {
    kind: 'product',
    crumb: 'MEDIQ',
    parent: '/products',
    productName: 'MEDIQ',
    title: 'MEDIQ: Hospital Self-Service Kiosk Software | ASZ',
    description:
      'MEDIQ is smart healthcare self-service: patient registration, payments and hospital services at a kiosk, cutting queues and front-desk workload.',
  },
  '/work': {
    kind: 'collection',
    crumb: 'Our Work',
    title: 'Case Studies & Client Work | ASZ Technologies',
    description:
      'Real projects, real results: self-service media commerce, centralised ERP and visitor management systems delivered by ASZ Technologies for clients worldwide.',
  },
  '/contact': {
    kind: 'contact',
    crumb: 'Contact',
    title: 'Contact ASZ Technologies | Get a Project Proposal',
    description:
      "Tell us what you're building and get a team proposal within 48 hours, no commitment. Offices in Singapore, Dubai, Sydney and Bangalore. info@asztechnologies.com",
  },
  '/privacy-policy': { kind: 'page', crumb: 'Privacy Policy', title: 'Privacy Policy | ASZ Technologies', noindex: true },
  '/terms-and-conditions': { kind: 'page', crumb: 'Terms & Conditions', title: 'Terms & Conditions | ASZ Technologies', noindex: true },
};

// Keep descriptions inside Google's ~160 character snippet, cut on a word boundary.
const clamp = (text, max = 160) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[s,.;:]+$/, '') + '…';

for (const c of CaseStudies) {
  PAGES[`/case-study/${c.slug}`] = {
    kind: 'article',
    crumb: c.client,
    parent: '/work',
    title: `${c.card.sub} | Case Study`,
    description: clamp(`${c.teaser} ${c.card.value} ${c.card.label} for ${c.client.replace(/^(A|An|The) /, (m) => m.toLowerCase())} (${c.industry}). An ASZ Technologies case study.`),
  };
}

// Every URL that gets its own static HTML file at build time.
export const PRERENDER_PATHS = [
  ...Object.keys(PAGES),
  ...PRODUCTS.filter((p) => p.detail).map((p) => `/products/${p.slug}`),
].filter((p, i, all) => all.indexOf(p) === i);

const abs = (p) => SITE_URL + p;
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const postalAddress = (o) => ({
  '@type': 'PostalAddress',
  streetAddress: o.street,
  addressLocality: o.city,
  ...(o.region && { addressRegion: o.region }),
  ...(o.postal && { postalCode: o.postal }),
  addressCountry: o.country,
});

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
  image: abs(DEFAULT_IMAGE),
  email: EMAIL,
  description:
    'Global technology and engineering company delivering AI systems, intelligent security, digital products and enterprise technology.',
  address: postalAddress(OFFICES[0]),
  location: OFFICES.map((o) => ({ '@type': 'Place', name: `${SITE_NAME} ${o.city}`, address: postalAddress(o) })),
  areaServed: SERVICE_AREAS,
  knowsAbout: [
    'Artificial intelligence', 'Generative AI', 'Machine learning', 'Computer vision',
    'Facial recognition', 'ANPR', 'Access control', 'Visitor management systems',
    'ERP implementation', 'CRM integration', 'Custom software development',
    'Cloud migration', 'Digital transformation', 'IT staff augmentation',
  ],
  contactPoint: [{ '@type': 'ContactPoint', email: EMAIL, contactType: 'sales', areaServed: SERVICE_AREAS, availableLanguage: ['English', 'Arabic', 'Swedish'] }],
  ...(SAME_AS.length && { sameAs: SAME_AS }),
};

const website = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en',
};

function breadcrumbs(path) {
  const trail = [];
  for (let p = path; p && p !== '/'; p = PAGES[p]?.parent) {
    trail.unshift({ path: p, name: PAGES[p]?.crumb ?? PAGES[p]?.title ?? p });
  }
  trail.unshift({ path: '/', name: 'Home' });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(path)}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path === '/' ? '/' : t.path) })),
  };
}

const WEBPAGE_TYPE = { home: 'WebPage', about: 'AboutPage', contact: 'ContactPage', collection: 'CollectionPage' };

function structuredData(path, page, s) {
  const url = s.canonical;
  const graph = [organization, website];
  const webPage = {
    '@type': WEBPAGE_TYPE[page.kind] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: s.title,
    description: s.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: s.image },
    inLanguage: 'en',
  };
  if (path !== '/') {
    graph.push(breadcrumbs(path));
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
  }

  if (page.kind === 'service') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: page.crumb,
      serviceType: page.serviceType,
      description: s.description,
      url,
      provider: { '@id': ORG_ID },
      areaServed: SERVICE_AREAS,
    });
    webPage.mainEntity = { '@id': `${url}#service` };
  }

  if (page.kind === 'product') {
    webPage.about = { '@type': 'Brand', name: page.productName, description: s.description };
  }

  if (page.kind === 'article') {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: s.title.slice(0, 110),
      description: s.description,
      image: [s.image],
      url,
      mainEntityOfPage: { '@id': `${url}#webpage` },
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      inLanguage: 'en',
    });
  }

  if (page.kind === 'collection' && path === '/service') {
    webPage.hasPart = Object.entries(PAGES)
      .filter(([, p]) => p.kind === 'service')
      .map(([p, v]) => ({ '@type': 'WebPage', name: v.crumb, url: abs(p) }));
  }

  graph.push(webPage);
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function isKnownPath(path) {
  return path in PAGES;
}

export function getSeo(rawPath) {
  const path = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
  const page = PAGES[path];
  if (!page) {
    // Unknown URL -> the 404 page. Never index it.
    return {
      title: 'Page Not Found | ASZ Technologies',
      description: DEFAULT_DESCRIPTION,
      canonical: null,
      image: abs(DEFAULT_IMAGE),
      imageAlt: DEFAULT_IMAGE_ALT,
      type: 'website',
      noindex: true,
      jsonLd: null,
    };
  }
  const s = {
    title: page.title ?? SITE_NAME,
    description: page.description ?? DEFAULT_DESCRIPTION,
    canonical: abs(page.canonical ?? path),
    image: abs(page.image ?? DEFAULT_IMAGE),
    imageAlt: page.imageAlt ?? DEFAULT_IMAGE_ALT,
    type: page.kind === 'article' ? 'article' : 'website',
    noindex: !!page.noindex,
  };
  s.jsonLd = structuredData(path, page, s);
  return s;
}

// The tags written into <head>. Shared by the prerender (as an HTML string) and
// SeoHead (applied to the live DOM), so both always match.
export function headTagList(s) {
  const robots = s.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  return [
    { tag: 'meta', attrs: { name: 'description', content: s.description } },
    { tag: 'meta', attrs: { name: 'robots', content: robots } },
    ...(s.canonical ? [{ tag: 'link', attrs: { rel: 'canonical', href: s.canonical } }] : []),
    { tag: 'meta', attrs: { property: 'og:type', content: s.type } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
    { tag: 'meta', attrs: { property: 'og:locale', content: 'en_US' } },
    { tag: 'meta', attrs: { property: 'og:title', content: s.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: s.description } },
    ...(s.canonical ? [{ tag: 'meta', attrs: { property: 'og:url', content: s.canonical } }] : []),
    { tag: 'meta', attrs: { property: 'og:image', content: s.image } },
    { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
    { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
    { tag: 'meta', attrs: { property: 'og:image:alt', content: s.imageAlt } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: s.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: s.description } },
    { tag: 'meta', attrs: { name: 'twitter:image', content: s.image } },
    { tag: 'meta', attrs: { name: 'twitter:image:alt', content: s.imageAlt } },
  ];
}
