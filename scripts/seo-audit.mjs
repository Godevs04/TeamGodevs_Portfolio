#!/usr/bin/env node
/**
 * Lightweight SEO readiness checks for the TeamGoDevs static site shell.
 * Run: npm run seo:audit
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

const read = (rel) => readFileSync(resolve(root, rel), 'utf8');

const requireFile = (rel, label = rel) => {
  if (!existsSync(resolve(root, rel))) errors.push(`Missing file: ${label}`);
};

requireFile('index.html');
requireFile('public/robots.txt');
requireFile('public/sitemap.xml');
requireFile('public/og-image.png');
requireFile('public/site.webmanifest');
requireFile('src/lib/site.ts');

const html = existsSync(resolve(root, 'index.html')) ? read('index.html') : '';
const robots = existsSync(resolve(root, 'public/robots.txt')) ? read('public/robots.txt') : '';
const sitemap = existsSync(resolve(root, 'public/sitemap.xml')) ? read('public/sitemap.xml') : '';
const siteTs = existsSync(resolve(root, 'src/lib/site.ts')) ? read('src/lib/site.ts') : '';
const caseStudies = existsSync(resolve(root, 'src/components/projects/caseStudies.ts'))
  ? read('src/components/projects/caseStudies.ts')
  : '';

const checks = [
  [html.includes('<title>') && !html.includes('<title></title>'), 'index.html has a title'],
  [html.includes('name="description"'), 'index.html has meta description'],
  [html.includes('rel="canonical"'), 'index.html has canonical'],
  [html.includes('og:title'), 'index.html has Open Graph title'],
  [html.includes('og:image'), 'index.html has Open Graph image'],
  [html.includes('twitter:card'), 'index.html has Twitter card'],
  [html.includes('application/ld+json'), 'index.html has JSON-LD'],
  [html.includes('<noscript>'), 'index.html has noscript crawl fallback'],
  [!/noindex/i.test(html.match(/name="robots"[^>]*>/i)?.[0] || ''), 'Homepage is not noindex'],
  [robots.includes('Allow: /'), 'robots.txt allows crawling'],
  [!robots.includes('Disallow: /'), 'robots.txt does not block all paths'],
  [robots.includes('Sitemap: https://www.teamgodevs.in/sitemap.xml'), 'robots.txt points to sitemap'],
  [sitemap.includes('https://www.teamgodevs.in/'), 'sitemap uses www canonical host'],
  [!sitemap.includes('localhost'), 'sitemap has no localhost URLs'],
  [siteTs.includes("url: 'https://www.teamgodevs.in'"), 'SITE.url uses www canonical'],
  [siteTs.includes('SITE_TITLE'), 'SITE_TITLE is defined'],
  [siteTs.includes('SITE_DESCRIPTION'), 'SITE_DESCRIPTION is defined'],
  [siteTs.includes("OG_IMAGE_PATH = '/og-image.png'"), 'OG image path is configured'],
];

for (const [ok, label] of checks) {
  if (!ok) errors.push(`Failed: ${label}`);
}

const altMatches = caseStudies.match(/imageAlt:/g) || [];
if (altMatches.length < 12) {
  warnings.push(`Expected imageAlt on 12 projects, found ${altMatches.length}`);
}

if (/https:\/\/teamgodevs\.in(?!\/)/.test(html) && !html.includes('https://www.teamgodevs.in')) {
  warnings.push('index.html may still reference non-www host');
}

console.log('TeamGoDevs SEO audit');
console.log('====================');
if (errors.length === 0) {
  console.log('✓ All required checks passed');
} else {
  console.log(`✗ ${errors.length} error(s):`);
  errors.forEach((e) => console.log(`  - ${e}`));
}
if (warnings.length) {
  console.log(`! ${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}

process.exit(errors.length ? 1 : 0);
