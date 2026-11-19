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
  'ASZ Technologies builds AI systems, smart security, custom software and enterprise platforms. 15+ years, 20+ countries. HQ Singapore. Start a conversation.';

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
    title: 'AI, Security & Software Engineering | ASZ Technologies',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    kind: 'about',
    crumb: 'About',
    title: 'About ASZ Technologies | Global Tech & Engineering Firm',
    description:
      '15+ years, 80+ professionals and clients in 20+ countries. Meet ASZ Technologies, with offices in Singapore, Dubai, Sydney and Bangalore.',
  },
  '/service': {
    kind: 'collection',
    crumb: 'Services',
    title: 'IT Services: AI, Security, ERP & Cloud | ASZ Technologies',
    description:
      'Six capabilities, one partner: AI systems, smart security, ERP, product engineering, cloud transformation and engineering teams, from strategy to execution.',
  },
  '/service/ai-intelligence': {
    kind: 'service',
    crumb: 'AI & Intelligent Systems',
    parent: '/service',
    serviceType: 'Artificial intelligence development',
    title: 'AI Development Services & AI Agents | ASZ Technologies',
    description:
      'AI agents, generative AI, machine learning and computer vision built for production. We engineer AI into the systems that run your business.',
  },
  '/service/smart-security': {
    kind: 'service',
    crumb: 'Smart Security Systems',
    parent: '/service',
    serviceType: 'Intelligent security systems',
    title: 'Smart Security Systems: ANPR & Face Recognition | ASZ',
    description:
      'AI security with vehicle number plate recognition (ANPR), facial recognition, access control and visitor management for buildings and campuses.',
  },
  '/service/enterprise-erp': {
    kind: 'service',
    crumb: 'Enterprise Systems & ERP',
    parent: '/service',
    serviceType: 'ERP implementation and CRM integration',
    title: 'ERP Implementation & CRM Integration | ASZ Technologies',
    description:
      'ERP implementation, CRM integration and enterprise systems integration that connect finance, operations, sales and supply chain on one platform.',
  },
  '/service/product-application': {
    kind: 'service',
    crumb: 'Product & Application Engineering',
    parent: '/service',
    serviceType: 'Custom software development',
    title: 'Custom Software & Product Development | ASZ Technologies',
    description:
      'Custom software, web and mobile apps, application modernization and API integration, engineered around how your business works, from concept to production.',
  },
  '/service/digital-transformation': {
    kind: 'service',
    crumb: 'Digital Transformation & Cloud',
    parent: '/service',
    serviceType: 'Digital transformation and cloud migration',
    title: 'Digital Transformation & Cloud Services | ASZ Technologies',
    description:
      'IT strategy, cloud migration, enterprise architecture and intelligent automation to modernize your technology and turn it into a business advantage.',
  },
  '/service/technology-talent': {
    kind: 'service',
    crumb: 'Technology Talent & Engineering',
    parent: '/service',
    serviceType: 'IT staff augmentation',
    title: 'Dedicated Engineering Teams & Staff Augmentation | ASZ',
    description:
      'Add experienced engineers fast: dedicated teams, staff augmentation and managed engineering teams that integrate with your organization.',
  },
  '/products': {
    kind: 'collection',
    crumb: 'Products',
    title: 'AI & Security Products: Cordon, MEDIQ, JobScout, Safin | ASZ',
    description:
      'Software built in-house and running in production: Cordon security, MEDIQ hospital self-service, JobScout careers and Safin smart water monitoring.',
  },
  '/products/cordon': {
    kind: 'product',
    crumb: 'Cordon',
    parent: '/products',
    productName: 'Cordon',
    title: 'Cordon: AI Access Control & Visitor Management System',
    description:
      'Cordon automates gate security with number plate recognition, facial recognition, visitor and vendor management, and real-time monitoring. Book a demo.',
  },
  '/products/mediq': {
    kind: 'product',
    crumb: 'MEDIQ',
    parent: '/products',
    productName: 'MEDIQ',
    title: 'MEDIQ: Hospital Self-Service Kiosk | ASZ Technologies',
    description:
      'MEDIQ lets patients register, pay, book appointments, check in and get queue tokens at a self-service kiosk, cutting front-desk queues. Book a demo.',
  },
  '/work': {
    kind: 'collection',
    crumb: 'Our Work',
    title: 'Case Studies: AI, Security & ERP Projects | ASZ Technologies',
    description:
      'See how organizations replaced manual processes with AI, security and enterprise systems built by ASZ: the challenge, the solution and the results.',
  },
  '/contact': {
    kind: 'contact',
    crumb: 'Contact',
    title: 'Contact ASZ Technologies | Start a Conversation',
    description:
      'Tell us about your project, team needs or a product demo. We reply within 1 business day. Offices in Singapore, Dubai, Sydney and Bangalore.',
  },
  '/privacy-policy': {
    kind: 'page',
    crumb: 'Privacy Policy',
    title: 'Privacy Policy | ASZ Technologies',
    description:
      'How ASZ Technologies collects, uses and protects personal information shared through asztechnologies.com, and how to exercise your privacy rights.',
  },
  '/terms-and-conditions': {
    kind: 'page',
    crumb: 'Terms and Conditions',
    title: 'Terms and Conditions | ASZ Technologies',
    description:
      'The terms that govern your use of asztechnologies.com, including website content, intellectual property, third-party links and governing law.',
  },
};

// Hand-written SEO for case studies, keyed by slug. A case study without an entry
// here falls back to a title/description generated from its data (loop below).
const CASE_SEO = {
  'mega-adventure-park': {
    title: 'Mega Adventure Park Case Study: 35% More Media Sales | ASZ',
    description:
      'How self-service kiosks and digital delivery lifted photo and video purchase conversion by 35% and revenue by 25% at Mega Adventure Park.',
  },
  'faith-based-organization': {
    title: 'Non-Profit ERP Case Study: 90% Less Admin | ASZ Technologies',
    description:
      'One ERP platform for members, donations and finance cut manual administration by 90% for a growing faith-based organization.',
  },
  '78-shenton-way': {
    title: '78 Shenton Way Visitor Management Case Study | ASZ',
    description:
      'A visitor management system for a high-security Singapore tower: 60% faster visitor processing, automated permits and a full audit trail.',
  },
};

// Keep descriptions inside Google's ~160 character snippet, cut on a word boundary.
const clamp = (text, max = 160) =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[s,.;:]+$/, '') + '…';

for (const c of CaseStudies) {
  PAGES[`/case-study/${c.slug}`] = {
    kind: 'article',
    crumb: c.client,
    parent: '/work',
    title: CASE_SEO[c.slug]?.title ?? `${c.card.sub} | Case Study`,
    description: CASE_SEO[c.slug]?.description ?? clamp(`${c.teaser} ${c.card.value} ${c.card.label} for ${c.client.replace(/^(A|An|The) /, (m) => m.toLowerCase())} (${c.industry}). An ASZ Technologies case study.`),
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
