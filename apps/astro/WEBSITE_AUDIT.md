# Astro Website Audit

Scope: `apps/astro`

Last updated: 2026-05-04

## Status legend

- `Done`: implemented in the current Astro app
- `Open`: still recommended
- `Deferred`: intentionally postponed for now

## Current snapshot

- Rendering mode: `output: "server"` with `@astrojs/cloudflare`
- Production site URL configured: `https://niama.fr`
- Public pages currently prerendered:
  - `/`
  - `/mentions-legales`
- SEO infrastructure now in place:
  - canonical URLs
  - sitemap integration
  - `robots.txt`
  - basic Open Graph and Twitter metadata
  - JSON-LD for `Organization` and `WebSite`
- Accessibility infrastructure now in place:
  - skip link
  - `main` landmark
  - labeled primary navigation
  - localized theme-switcher accessibility text
  - reduced-motion handling for major decorative motion

## Current build snapshot

Measured from a successful local `bun run build` on 2026-05-04.

- Total client assets in `dist/client/_astro`: `627,375 B` raw
- Client JavaScript: `509,883 B` raw
- Client CSS: `117,492 B` raw
- Largest client chunks:
  - `contact-form.CoI7665c.js`: `229,411 B` raw, `75,972 B` gzip
  - `client.X8H3FKMo.js`: `182,310 B` raw, `57,459 B` gzip
  - `_public.CO-Kjycr.css`: `117,492 B` raw, `17,926 B` gzip
  - `embla-carousel-autoplay.esm.DdjRAWJ-.js`: `26,432 B` raw

## Completed work

### SEO

- `Done` Configure the production `site` URL in `apps/astro/astro.config.mjs`.
- `Done` Add sitemap generation with `@astrojs/sitemap`.
- `Done` Add canonical URLs in `apps/astro/src/pages/_root.astro`.
- `Done` Replace the old homepage-only metadata with page-aware `title` and `description` props in:
  - `apps/astro/src/pages/_root.astro`
  - `apps/astro/src/pages/_public.astro`
  - `apps/astro/src/pages/index.astro`
- `Done` Add basic Open Graph and Twitter metadata.
- `Done` Add JSON-LD in `apps/astro/src/lib/seo.ts` and inject it in the root layout.
- `Done` Add `robots.txt` at `apps/astro/public/robots.txt`.
- `Done` Publish:
  - `apps/astro/src/pages/mentions-legales.astro`
- `Done` Update footer legal links in `apps/astro/src/pages/_public/_the-footer.astro`.

### Optimization

- `Done` Prerender static public pages while keeping server output for the app.
- `Done` Add `vite.resolve.tsconfigPaths = true` in `apps/astro/astro.config.mjs` to keep the current Astro/Vite/Tailwind build stable.
- `Done` Add reduced-motion-aware carousel autoplay initialization in:
  - `apps/astro/src/components/attendants/carousel.astro`
  - `apps/astro/src/components/disciplines/carousel.astro`
- `Done` Make the animated background cheaper by:
  - pausing when the tab is hidden
  - disabling animation for reduced-motion users
  - redrawing safely on resize

### Accessibility

- `Done` Add a skip link in `apps/astro/src/pages/_root.astro`.
- `Done` Add a real `<main id="main-content">` landmark in `apps/astro/src/pages/_public.astro`.
- `Done` Add a labeled primary navigation in `apps/astro/src/pages/_public/_the-header.astro`.
- `Done` Localize the theme switcher accessible text to French.
- `Done` Sync theme switcher `aria-label` and `aria-pressed` state in `packages/ui/src/components/shared/theme.ts`.
- `Done` Initialize active navigation state on first load in `packages/ui/src/components/shared/the-header.ts`.
- `Done` Respect reduced motion for:
  - theme transitions
  - the animated background
  - carousel autoplay

## Remaining work

## SEO

### `Open` Add a real social share image

Current state:

- Open Graph and Twitter metadata exist, but there is no dedicated share image yet.

Why it matters:

- Shared links will be less compelling on social platforms and messaging apps.

Recommended change:

- Create a branded image for sharing.
- Add:
  - `og:image`
  - `twitter:image`
  - optionally `og:image:width` and `og:image:height`

Suggested files:

- `apps/astro/public/`
- `apps/astro/src/lib/seo.ts`
- `apps/astro/src/pages/_root.astro`

### `Open` Create indexable detail pages for disciplines and attendants

Current state:

- The homepage still contains almost all indexable business content.

Why it matters:

- This limits organic reach for long-tail searches around disciplines and practitioners.

Recommended change:

- Add one route per discipline.
- Add one route per attendant.
- Give each page unique title, description, canonical, and internal links.

Suggested files:

- `packages/domain/src/functions/disciplines.ts`
- `packages/domain/src/functions/attendants.ts`
- new routes under `apps/astro/src/pages/`

### `Open` Add page-level metadata beyond the homepage and legal pages

Current state:

- Metadata is now page-aware, but only three public pages currently exist.

Recommended change:

- Continue using the same metadata pattern for every future route.

## Optimization

### `Deferred` Remove or shrink the React contact form island

Current state:

- The contact form is still the dominant client-side JavaScript cost.

Why it matters:

- It remains the biggest performance opportunity in the app.

Decision:

- Deferred intentionally for now because the form architecture is still under consideration.

Relevant files:

- `apps/astro/src/pages/index.astro`
- `apps/astro/src/components/contact-form.tsx`
- `packages/ui/src/components/react/contact-form.tsx`
- `apps/astro/src/actions/contact.ts`

### `Open` Reduce font preload scope

Current state:

- `_root.astro` still preloads all three custom font variables globally.

Why it matters:

- This can increase above-the-fold network pressure.

Recommended change:

- Preload only the families needed in the first viewport.
- Recheck font subsets and weights.

Relevant files:

- `apps/astro/src/pages/_root.astro`
- `apps/astro/astro.config.mjs`

### `Open` Use the existing blurhash placeholder data for attendant images

Current state:

- `packages/domain/src/functions/images.ts` exposes a generated `background` value.
- The Astro image cards still do not use it.

Why it matters:

- This is a low-risk perceived-performance improvement that is already backed by existing data.

Recommended change:

- Apply the blurhash-derived background to the image wrapper while the image loads.

Relevant files:

- `packages/domain/src/functions/images.ts`
- `apps/astro/src/components/attendants/carousel.astro`

### `Open` Revisit autoplay behavior beyond reduced-motion users

Current state:

- Autoplay is disabled for reduced-motion users only.

Recommended change:

- Consider also pausing autoplay on hover and focus.
- Consider whether autoplay is necessary at all for this site.

Relevant files:

- `apps/astro/src/components/attendants/carousel.astro`
- `apps/astro/src/components/disciplines/carousel.astro`

## Accessibility

### `Open` Add clearer carousel semantics

Current state:

- Keyboard support exists, but the carousel regions are not yet explicitly labeled as carousels.

Recommended change:

- Add:
  - `role="region"`
  - `aria-roledescription="carousel"`
  - an accessible label tied to the section heading

Relevant files:

- `apps/astro/src/components/attendants/carousel.astro`
- `apps/astro/src/components/disciplines/carousel.astro`

### `Open` Run a manual keyboard and screen-reader pass before publish

Recommended checks:

- skip link
- mobile menu
- theme switcher announcement
- carousel controls
- form labels and error handling
- footer legal links

Suggested environments:

- Safari + VoiceOver
- Chrome + NVDA

## Legal note

- The merged legal/confidentiality page is now implemented and publishable as a baseline.
- They should still be reviewed before final production launch if you want stricter wording around:
  - subcontractors and data processors
  - retention policy details
  - future analytics or cookies
  - any business registration details you may want to disclose

## Suggested next order of work

1. Decide whether the contact form stays as a TanStack/React island.
2. Add a dedicated social share image.
3. Add detail pages for disciplines and attendants.
4. Revisit font preload scope.
5. Run a manual accessibility pass in real browsers and assistive tech.

## Verification status

- `bun run build`: passing
- `@astrojs/sitemap`: generating `sitemap-index.xml`
- targeted `bun x ultracite check` on touched Astro SEO/legal files: passing

## Docs used

- Astro configuration: https://docs.astro.build/en/reference/configuration-reference/
- Astro configuration guide: https://docs.astro.build/en/guides/configuring-astro/
- Astro islands: https://docs.astro.build/en/concepts/islands/
- Astro client directives: https://docs.astro.build/en/reference/directives-reference/
- Astro images: https://docs.astro.build/en/guides/images/
- Astro sitemap integration: https://docs.astro.build/fr/guides/integrations-guide/sitemap/
