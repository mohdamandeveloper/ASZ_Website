import prodCordon from '../assets/images/prod-cordon.webp';
import prodMediq from '../assets/images/mediq2.webp';
import prodJobscout from '../assets/images/prod-jobscout.webp';
import prodSafin from '../assets/images/prod-safin.webp';

// Single source of truth for the Products listing and the product detail pages.
// Order must match `prod_items` in Context/Translation.js.
//   detail     -> has a /products/:slug page (listing button goes there)
//   external   -> listing button opens `url` in a new tab
//   comingSoon -> shows a "Coming soon" badge (listing + detail page)
// Product names are brand names, so they stay in Latin in every language.
export const PRODUCTS = [
  { id: 'cordon', slug: 'cordon', name: 'Cordon', image: prodCordon, detail: true, comingSoon: false },
  { id: 'mediq', slug: 'mediq', name: 'MEDIQ', image: prodMediq, detail: true, comingSoon: true },
  { id: 'jobscout', slug: 'jobscout', name: 'JobScout', image: prodJobscout, detail: false, external: true, url: '#jobscout-website', comingSoon: false },
  { id: 'safin', slug: 'safin', name: 'Safin', image: prodSafin, detail: true, comingSoon: true },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);