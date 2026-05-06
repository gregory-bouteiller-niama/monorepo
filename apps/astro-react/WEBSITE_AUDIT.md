# Astro Website Audit

Scope: `apps/astro`

Last updated: 2026-05-05

## Status Legend

- `Done`: implemented in the current Astro app
- `Open`: still recommended
- `Deferred`: intentionally postponed for now

## Current Snapshot

- Rendering mode: `output: "server"` with `@astrojs/cloudflare`
- Production URL: `https://niama.fr`
- Public pages currently prerendered:
  - `/`
  - `/mentions-legales`
- Shared domain data now lives in `packages/domain/src/functions`
- Shared UI/runtime behavior now lives mostly in `packages/ui/src/components/shared`
- Astro page-specific rendering remains in `apps/astro/src/pages` and `apps/astro/src/components`

## Current Build Snapshot

Measured from a successful local `bun run build` on 2026-05-05.

- Total client assets in `dist/client/_astro`: `630,596 B` raw, `187,728 B` gzip
- Client JavaScript: `514,090 B` raw, `169,981 B` gzip
- Client CSS: `116,506 B` raw, `17,747 B` gzip
- Largest client assets:
  - `contact-form.CoI7665c.js`: `229,411 B` raw, `75,947 B` gzip
  - `client.X8H3FKMo.js`: `182,310 B` raw, `57,440 B` gzip
  - `_public.C9RK9hfn.css`: `116,506 B` raw, `17,747 B` gzip
  - `embla-carousel-autoplay.esm.Bm2hiKiJ.js`: `26,501 B` raw, `10,658 B` gzip
  - `dropdown.astro_astro_type_script_index_0_lang.DmkexYNM.js`: `13,110 B` raw, `3,473 B` gzip

## Completed Work

### SEO

- `Done` Configure `site: "https://niama.fr"` in `apps/astro/astro.config.mjs`.
- `Done` Add sitemap generation with `@astrojs/sitemap`.
- `Done` Add `apps/astro/public/robots.txt` with the production sitemap URL.
- `Done` Add canonical URL generation in `apps/astro/src/pages/_root.astro`.
- `Done` Add page-aware `title`, `description`, and `robots` props in `apps/astro/src/pages/_root.astro`.
- `Done` Keep homepage metadata on the root defaults instead of duplicating it in `apps/astro/src/pages/index.astro`.
- `Done` Add Open Graph and Twitter title/description metadata.
- `Done` Add JSON-LD for `Organization` and `WebSite`.
- `Done` Move shared SEO/site identity data to `packages/domain/src/functions/site.ts`.
- `Done` Add shared `SITE_OWNER` and `SITE_ADDRESS` constants to avoid duplicated legal/SEO identity data.
- `Done` Publish a merged legal and privacy page at `apps/astro/src/pages/mentions-legales.astro`.
- `Done` Extract legal page content to `readLegalPage()` in `packages/domain/src/functions/pages.ts`.
- `Done` Keep only one footer legal link: `Mentions légales`.

### Optimization

- `Done` Prerender the current static public pages while keeping server output for Cloudflare.
- `Done` Add `vite.resolve.tsconfigPaths = true` in `apps/astro/astro.config.mjs`.
- `Done` Move shared carousel autoplay reduced-motion behavior into `packages/ui/src/components/shared/carousel.ts`.
- `Done` Move shared sky canvas runtime into `packages/ui/src/components/shared/sky.ts`.
- `Done` Pause the sky canvas animation when the tab is hidden.
- `Done` Disable the sky canvas animation for reduced-motion users.
- `Done` Redraw the sky canvas safely on resize with a `ResizeObserver`.
- `Done` Use `motion-safe:scroll-smooth` globally instead of overriding smooth scroll for reduced-motion users.
- `Done` Use `motion-safe:animate-float` for the floating logo animation.
- `Done` Keep public layout styling in `packages/ui/src/components/shared/public-layout.ts`.
- `Done` Extract shared legal page styles to `packages/ui/src/components/shared/page-mentions-legales.ts`.

### Accessibility

- `Done` Move the skip link into `apps/astro/src/pages/_public.astro`, next to the public `main` target.
- `Done` Render the skip link through `@niama/ui/astro/button`, while preserving anchor semantics with `href`.
- `Done` Make the skip-link target configurable through the public layout `skipTo` prop.
- `Done` Use `skipTo="#les-voies"` on the homepage because it is the first meaningful content after the hero/header area.
- `Done` Keep `<main id="main" tabindex="-1">` as the default public-layout fallback target.
- `Done` Allow React `Section` to forward native section props, so section anchors can receive `tabIndex={-1}`.
- `Done` Add `tabIndex={-1}` to the homepage `#les-voies` skip target.
- `Done` Add a labeled primary navigation in `apps/astro/src/pages/_public/_the-header.astro`.
- `Done` Localize the theme switcher accessible label to French.
- `Done` Sync theme switcher `aria-label`, `aria-pressed`, and visible screen-reader text from the shared theme store.
- `Done` Add shared theme-switcher behavior adapted to Astro, React/TanStack, and Svelte.
- `Done` Initialize active navigation state on first load in `packages/ui/src/components/shared/the-header.ts`.
- `Done` Respect reduced motion for carousel autoplay and theme transitions.

### Maintainability

- `Done` Remove Astro-only SEO helpers in favor of `packages/domain/src/functions/site.ts`.
- `Done` Extract legal data out of the Astro page so TanStack and Svelte can reuse the same text.
- `Done` DRY the Astro legal sections with `apps/astro/src/pages/_public/_legal-section.astro`.
- `Done` Consolidate shared theme switcher labels and styles in `packages/ui/src/components/shared/theme-switcher.ts`.
- `Done` Consolidate shared public-layout styles in `packages/ui/src/components/shared/public-layout.ts`.
- `Done` Consolidate shared sky styles/runtime in `packages/ui/src/components/shared/sky.ts`.

## Remaining Work

## SEO

### `Open` Add a real social share image

Current state:

- Open Graph and Twitter metadata exist.
- There is no dedicated share image yet.
- Twitter currently uses `summary`, not `summary_large_image`.

Why it matters:

- Shared links will be less compelling on social platforms and messaging apps.

Recommended change:

- Create a branded share image.
- Add:
  - `og:image`
  - `og:image:width`
  - `og:image:height`
  - `twitter:image`
  - possibly `twitter:card="summary_large_image"`

Suggested files:

- `apps/astro/public/`
- `packages/domain/src/functions/site.ts`
- `apps/astro/src/pages/_root.astro`

### `Open` Add page-specific structured data when detail pages exist

Current state:

- Root JSON-LD covers `Organization` and `WebSite`.
- There is no page-specific schema for future discipline or attendant detail pages.

Recommended change:

- Keep the global JSON-LD in the root layout.
- Add page-specific JSON-LD only when the content justifies it.
- Candidates:
  - discipline detail pages
  - attendant profile pages
  - contact/service pages

Suggested files:

- `packages/domain/src/functions/site.ts`
- future routes under `apps/astro/src/pages/`

### `Open` Create indexable detail pages for disciplines and attendants

Current state:

- The homepage still contains almost all indexable business content.
- Disciplines and attendants are carousel content, not standalone indexable pages.

Why it matters:

- This limits organic reach for long-tail searches around disciplines and practitioners.

Recommended change:

- Add one route per discipline.
- Add one route per attendant.
- Give each page unique title, description, canonical URL, and internal links.

Suggested files:

- `packages/domain/src/functions/disciplines.ts`
- `packages/domain/src/functions/attendants.ts`
- new routes under `apps/astro/src/pages/`

### `Open` Continue page-level metadata for every future route

Current state:

- `_root.astro` provides good defaults.
- `mentions-legales.astro` overrides title and description via `readLegalPage()`.
- `index.astro` correctly relies on defaults for now.

Recommended change:

- Use default metadata only when it is actually correct for the page.
- Add page-specific metadata as soon as new public routes are added.

## Optimization

### `Deferred` Remove or shrink the React contact form island

Current state:

- The contact form is still the dominant client-side JavaScript cost.
- `contact-form.CoI7665c.js` is `229,411 B` raw and `75,947 B` gzip.
- The React client runtime chunk is also significant at `182,310 B` raw and `57,440 B` gzip.

Why it matters:

- This is still the largest performance opportunity in the app.

Decision:

- Deferred intentionally because the form architecture and TanStack Form usage are still under consideration.
- Do not change the form until that decision is made.

Relevant files:

- `apps/astro/src/pages/index.astro`
- `apps/astro/src/components/contact-form.tsx`
- `packages/ui/src/components/react/contact-form.tsx`
- `apps/astro/src/actions/contact.ts`

### `Open` Reduce font preload scope

Current state:

- `_root.astro` preloads all three configured font variables globally:
  - `--font-heading`
  - `--font-logo`
  - `--font-sans`

Why it matters:

- Global preloading can increase above-the-fold network pressure.

Recommended change:

- Keep only the font families needed immediately above the fold.
- Recheck subsets and weights.

Relevant files:

- `apps/astro/src/pages/_root.astro`
- `apps/astro/astro.config.mjs`

### `Open` Use the existing blurhash placeholder data for attendant images

Current state:

- `packages/domain/src/functions/images.ts` exposes a generated `background` value.
- `apps/astro/src/components/attendants/carousel.astro` renders optimized Astro images, but does not use the placeholder background.

Why it matters:

- This is a low-risk perceived-performance improvement already backed by existing domain data.

Recommended change:

- Apply the blurhash-derived background to the image wrapper while the image loads.

Relevant files:

- `packages/domain/src/functions/images.ts`
- `apps/astro/src/components/attendants/carousel.astro`
- `packages/ui/src/components/shared/attendants/carousel.ts`

### `Open` Revisit carousel autoplay beyond reduced-motion users

Current state:

- Autoplay is disabled for reduced-motion users.
- Autoplay still runs for users without reduced motion when the carousel can move.

Recommended change:

- Consider pausing autoplay on hover and focus.
- Consider whether autoplay is necessary at all for this site.

Relevant files:

- `packages/ui/src/components/shared/carousel.ts`
- `apps/astro/src/components/attendants/carousel.astro`
- `apps/astro/src/components/disciplines/carousel.astro`

### `Open` Apply reduced-motion handling to CSS-only sky orbit animation

Current state:

- The sky canvas animation respects reduced motion.
- The decorative orbit rings in `SKY.orbit` still use `animate-spin`.

Why it matters:

- Reduced-motion users should not receive persistent decorative rotation.

Recommended change:

- Change the orbit animation to `motion-safe:animate-spin`.
- Confirm the custom duration utilities still apply correctly with the prefixed animation.

Relevant file:

- `packages/ui/src/components/shared/sky.ts`

## Accessibility

### `Open` Add clearer carousel semantics

Current state:

- Carousel controls and keyboard navigation exist.
- Carousel regions are not yet explicitly labeled as carousels.

Recommended change:

- Add:
  - `role="region"`
  - `aria-roledescription="carousel"`
  - an accessible label tied to the surrounding section heading

Relevant files:

- `apps/astro/src/components/attendants/carousel.astro`
- `apps/astro/src/components/disciplines/carousel.astro`
- `packages/ui/src/components/astro/carousel/`

### `Open` Review carousel card interaction semantics

Current state:

- Attendant cards are buttons with `aria-pressed` and flip state.
- This is usable, but the interaction should be manually checked with screen readers.

Recommended change:

- Confirm whether `aria-pressed` communicates the flipped/open state clearly enough.
- If not, consider `aria-expanded` with an associated description region.

Relevant file:

- `apps/astro/src/components/attendants/carousel.astro`

### `Open` Run a manual keyboard and screen-reader pass before publish

Recommended checks:

- Skip link to `#les-voies` on the homepage.
- Skip link fallback to `#main` on legal and future pages.
- Mobile menu.
- Theme switcher announcement.
- Carousel controls.
- Attendant card flip interaction.
- Form labels and error handling.
- Footer legal link.

Suggested environments:

- Safari + VoiceOver
- Chrome + NVDA

## Legal Note

- The merged legal/confidentiality page is implemented and publishable as a baseline.
- The content now comes from `readLegalPage()` so Astro, TanStack, and Svelte can reuse it.
- The wording should still be reviewed before final production launch if you want stricter coverage around:
  - subcontractors and data processors
  - retention policy details
  - future analytics or cookies
  - business registration details you may want to disclose

## Suggested Next Order Of Work

1. Decide whether the contact form stays as a React/TanStack island.
2. Add a dedicated social share image.
3. Add `motion-safe:` handling for the CSS sky orbit animation.
4. Add carousel region semantics.
5. Add detail pages for disciplines and attendants.
6. Revisit font preload scope.
7. Run a manual accessibility pass in real browsers and assistive tech.

## Verification Status

- `bun run build`: passing on 2026-05-05
- `@astrojs/sitemap`: generating `sitemap-index.xml`
- Focused Ultracite checks on recent Astro/domain/shared UI files: passing

## Docs Used

- Astro configuration: https://docs.astro.build/en/reference/configuration-reference/
- Astro configuration guide: https://docs.astro.build/en/guides/configuring-astro/
- Astro islands: https://docs.astro.build/en/concepts/islands/
- Astro client directives: https://docs.astro.build/en/reference/directives-reference/
- Astro images: https://docs.astro.build/en/guides/images/
- Astro sitemap integration: https://docs.astro.build/fr/guides/integrations-guide/sitemap/
