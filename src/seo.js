// Per-page <head> data used by the build-time prerender (scripts/prerender.js).
// Add an entry here whenever you add a page, so crawlers / AI agents / link
// previews get a proper title and description for it.
import CaseStudies from './Data/CaseStudies';
import { PRODUCTS } from './Data/ProductData';

export const SITE_URL = 'https://asztechnologies.com';
export const SITE_NAME = 'ASZ Technologies';
const DEFAULT_IMAGE = '/og-image.png';

const DEFAULT_DESCRIPTION =
  'ASZ Technologies builds AI systems, intelligent security, digital products and enterprise technology: secure, scalable software that solves complex business challenges.';

const PAGES = {
  '/': {
    title: 'ASZ Technologies | AI, Intelligent Security & Enterprise Software',
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: 'About Us | ASZ Technologies',
    description:
      'We design, engineer and scale mission-critical technology powered by AI, cloud and modern engineering, helping businesses move faster, stay resilient and grow.',
  },
  '/service': {
    title: 'Services | ASZ Technologies',
    description:
      'End-to-end technology delivery: AI & intelligent systems, smart security, enterprise ERP, product engineering, digital transformation & cloud, and engineering talent.',
  },
  '/service/ai-intelligence': {
    title: 'AI & Intelligent Systems | ASZ Technologies',
    description:
      'AI agents, generative AI and machine learning engineered into production systems, not proof-of-concept demos.',
  },
  '/service/smart-security': {
    title: 'Smart Security Systems | ASZ Technologies',
    description:
      'Intelligent physical security: facial recognition, vehicle recognition (ANPR), access control and visitor management.',
  },
  '/service/enterprise-erp': {
    title: 'Enterprise Systems & ERP | ASZ Technologies',
    description:
      'ERP implementation and CRM integration that centralise operations, finance and reporting across your organisation.',
  },
  '/service/product-application': {
    title: 'Product & Application Engineering | ASZ Technologies',
    description:
      'Product development and application modernisation: web, mobile and platform engineering from discovery to production.',
  },
  '/service/digital-transformation': {
    title: 'Digital Transformation & Cloud | ASZ Technologies',
    description:
      'Technology strategy and cloud transformation: modernise infrastructure, adopt DevOps and move workloads to the cloud safely.',
  },
  '/service/technology-talent': {
    title: 'Technology Talent & Engineering | ASZ Technologies',
    description:
      'Dedicated engineering teams and staff augmentation that work as an extension of your team.',
  },
  '/products': {
    title: 'Products | ASZ Technologies',
    description:
      'Cordon intelligent security, MEDIQ smart healthcare, JobScout AI career platform and Safin smart water intelligence.',
  },
  '/products/cordon': {
    title: 'Cordon: Zero-Touch Intelligent Security | ASZ Technologies',
    description: 'Cordon is AI-powered security and access control for modern premises.',
  },
  '/products/mediq': {
    title: 'MEDIQ: Smart Healthcare Self-Service | ASZ Technologies',
    description:
      'MEDIQ is self-service technology for hospital registration, payments and patient services.',
  },
  '/work': {
    title: 'Our Work & Case Studies | ASZ Technologies',
    description:
      'Case studies from ASZ Technologies: self-service media commerce, centralised ERP and visitor management systems delivered for real clients.',
  },
  '/contact': {
    title: 'Contact Us | ASZ Technologies',
    description:
      "Let's scope your project. We'll have a team proposal ready within 48 hours, no commitment required. Email info@asztechnologies.com.",
  },
  '/privacy-policy': { title: 'Privacy Policy | ASZ Technologies', noindex: true },
  '/terms-and-conditions': { title: 'Terms & Conditions | ASZ Technologies', noindex: true },
  '/home': { title: 'ASZ Technologies | AI, Intelligent Security & Enterprise Software', description: DEFAULT_DESCRIPTION, canonical: '/', noindex: true },
};

for (const c of CaseStudies) {
  PAGES[`/case-study/${c.slug}`] = {
    title: `${c.card.sub} | Case Study | ASZ Technologies`,
    description: `${c.teaser} ${c.client} (${c.industry}): ${c.card.value} ${c.card.label}. Delivered by ASZ Technologies' ${c.service} team.`,
    type: 'article',
  };
}

// Every URL that gets its own static HTML file at build time.
export const PRERENDER_PATHS = [
  ...Object.keys(PAGES),
  ...PRODUCTS.filter((p) => p.detail).map((p) => `/products/${p.slug}`),
].filter((p, i, all) => all.indexOf(p) === i);

export function getSeo(path) {
  const page = PAGES[path] ?? {};
  return {
    title: page.title ?? SITE_NAME,
    description: page.description ?? DEFAULT_DESCRIPTION,
    canonical: SITE_URL + (page.canonical ?? (path === '/' ? '/' : path)),
    image: SITE_URL + (page.image ?? DEFAULT_IMAGE),
    type: page.type ?? 'website',
    noindex: !!page.noindex,
  };
}
