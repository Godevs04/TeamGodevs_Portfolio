# TeamGoDevs — SEO / AEO / GEO Setup Guide

This document explains what was implemented for search discovery and how to finish setup in Google Search Console and Bing Webmaster Tools.

Primary site: **https://www.teamgodevs.in/**

---

## A. What was implemented

- Canonical host standardized to **`https://www.teamgodevs.in/`**
- Homepage title, description, keywords, robots meta
- Open Graph + Twitter/X `summary_large_image` metadata
- Dedicated social preview image: `/og-image.png` (1200×630)
- `robots.txt` + `sitemap.xml`
- Organization / WebSite / WebPage / ProfessionalService JSON-LD
- Static JSON-LD + noscript content in `index.html` for SPA crawlability
- Meaningful project image alt text
- Stronger service copy (React, Next.js, React Native, SaaS, CRM, DevOps)
- Footer internal links to Services / Work / Contact
- Removed placeholder social `#` links (no verified social profiles yet)
- 404 page with Home / Work / Contact navigation (`noindex`)
- Vercel apex → www redirect + security headers (HSTS, nosniff, referrer, permissions, frame)
- Lightweight audit: `npm run seo:audit`

Visual design of the portfolio was intentionally preserved.

---

## B. Sitemap URL

https://www.teamgodevs.in/sitemap.xml

This is a single-page app. Only the homepage URL is listed. Section anchors (`#services`, `#projects`, etc.) are **not** separate indexable pages.

---

## C. Robots URL

https://www.teamgodevs.in/robots.txt

Crawlers are allowed. Sitemap is declared.

---

## D. Canonical strategy

**Canonical host:** `https://www.teamgodevs.in/` (with `www`, trailing slash on homepage)

Configured in:

- `src/lib/site.ts` → `SITE.url`
- `index.html`
- `public/sitemap.xml`
- `public/robots.txt`
- Vercel redirect from `teamgodevs.in` → `www.teamgodevs.in`

Keep internal references consistent with this host.

---

## E. Structured data

JSON-LD graph includes:

| Type | Purpose |
|------|---------|
| `Organization` | Brand identity, logo, email, phone, address |
| `WebSite` | Site entity |
| `WebPage` | Homepage |
| `ProfessionalService` | Service catalog + hours (matches visible offerings) |

**Not added (intentionally):**

- Fake AggregateRating / Review schema
- Fake SearchAction (no site search UI)
- Fake awards / certifications
- `llm.txt` / `ai.txt` gimmick files

Update `SITE.sameAs` in `src/lib/site.ts` when verified LinkedIn / GitHub / X profile URLs exist.

---

## F. Open Graph / social sharing

| Field | Value |
|-------|--------|
| `og:image` | https://www.teamgodevs.in/og-image.png |
| Size | 1200 × 630 |
| Twitter card | `summary_large_image` |

After deploy, validate with:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- WhatsApp: paste the homepage URL in a chat preview

---

## G. Analytics

Already configured in this project:

- **PostHog** (product analytics)
- **Microsoft Clarity** (session insights)

**Google Analytics 4 was not added** to avoid duplicate tracking stacks. If you later add GA4:

1. Create a GA4 property
2. Add the measurement ID via env only
3. Track events such as `contact_form_submitted`, `whatsapp_clicked`, `project_viewed`
4. Never send form message content to analytics

---

## H. Google Search Console — manual steps

Cursor/agents **cannot** complete DNS verification for you.

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add a **Domain** property: `teamgodevs.in` (covers www + apex)
3. Verify ownership via DNS TXT record at your domain registrar
4. After verification, open **Sitemaps**
5. Submit: `sitemap.xml` (or full `https://www.teamgodevs.in/sitemap.xml`)
6. Open **URL Inspection**
7. Inspect: `https://www.teamgodevs.in/`
8. Click **Request indexing**
9. Monitor:
   - Performance
   - Pages / Indexing
   - Sitemaps
   - Core Web Vitals
   - HTTPS
   - Manual actions
   - Security issues

Optional: also add a URL-prefix property for `https://www.teamgodevs.in/` if you prefer that view.

---

## I. Bing Webmaster Tools — manual steps

1. Open [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add `https://www.teamgodevs.in/` (or import from Google Search Console)
3. Verify ownership
4. Submit sitemap: `https://www.teamgodevs.in/sitemap.xml`
5. Use URL Inspection / Site Scan
6. Review SEO reports, crawl errors, and backlinks

### IndexNow (optional)

IndexNow can notify Bing/Yandex of URL updates. Only add it if you want automated pinging after deploys. It is **not required** for basic indexing. Prefer Search Console + Bing sitemap submission first.

---

## J. Google Business Profile

If TeamGoDevs has a **legitimate physical business presence** and an existing Google Business Profile:

- Match name: **TeamGoDevs**
- Match website: `https://www.teamgodevs.in/`
- Match phone / email / hours / address to `src/lib/site.ts`

If there is **no** legitimate physical profile, **do not create a fake listing**.

---

## K. Monthly SEO maintenance checklist

### Every month

- [ ] Search Console Performance (queries, CTR, impressions)
- [ ] Indexing errors / excluded pages
- [ ] Sitemap status
- [ ] Core Web Vitals
- [ ] Top landing pages
- [ ] Broken links / 404 spikes
- [ ] New backlinks / brand mentions
- [ ] Refresh project screenshots if products changed

### Every new portfolio project

1. Add project data + image
2. Add `imageAlt`
3. Write accurate description / problem / solution (no fabricated metrics)
4. Add live URL only if real
5. Ensure Work section internal links still make sense
6. Deploy
7. Request indexing of homepage (SPA) in Search Console if major content changed
8. Run `npm run seo:audit`

### Local audit command

```bash
npm run seo:audit
```

---

## Entity answers (for AEO / GEO clarity)

Use consistent language across the site and sales materials:

**Who is TeamGoDevs?**  
TeamGoDevs is a digital product studio that designs, builds, launches, and supports web applications, mobile apps, SaaS products, and growth systems.

**What does TeamGoDevs specialize in?**  
React / Next.js web apps, React Native mobile apps, SaaS platforms, CRMs, ecommerce, UI/UX, branding, SEO & growth, and cloud DevOps.

**Where is TeamGoDevs based?**  
HSR Layout, Bengaluru, Karnataka, India (per existing company configuration).

**How to contact TeamGoDevs?**  
hello@teamgodevs.in · +91 96777 23429 · WhatsApp available on the site.

---

## Remaining / unverified items

| Item | Status |
|------|--------|
| Official LinkedIn / X / GitHub URLs | Not verified — `SITE.sameAs` is empty |
| Privacy / Terms pages | Not created (dead footer placeholders removed) |
| Dedicated project routes | SPA sections only — no `/work/[slug]` pages |
| GA4 | Not added (PostHog + Clarity already present) |
| Google Business Profile | Owner must confirm legitimacy |
| Apex → www DNS / redirect | Configured in `vercel.json`; confirm after deploy |

---

## Do not

- Keyword stuff or hide text
- Add fake reviews, ratings, awards, or locations
- Guarantee rankings
- Expose API keys in frontend
- Block crawlers in robots.txt
- Create doorway pages or fake `llm.txt` ranking hacks
