# SvelteKit Website Audit

Scope: `apps/sveltekit` compared against `apps/astro` as the reference implementation.

Last updated: 2026-05-06

## Verdict

- `apps/sveltekit` is not yet at feature parity with `apps/astro`.
- The homepage content, shared domain data, theme switcher, sky background, and contact API flow are ported.
- `bun run --cwd apps/sveltekit build` passes.
- `bun run --cwd apps/sveltekit check` passes.
- The most urgent route-parity, package-resolution, baseline SEO, and main image-loading regressions have been fixed in these passes.

## Findings

### Resolved In This Pass

#### 1. The legal/privacy route now exists and the footer points to it

Implemented:

- Added `apps/sveltekit/src/routes/mentions-legales/+page.ts`.
- Added `apps/sveltekit/src/routes/mentions-legales/+page.svelte`.
- Added `apps/sveltekit/src/lib/components/legal-section.svelte`.
- Fixed the footer legal link in `apps/sveltekit/src/lib/components/the-footer.svelte`.

#### 2. The public layout shell now has skip-link and landmark parity

Implemented:

- Added the skip link to `apps/sveltekit/src/routes/+layout.svelte`.
- Wrapped routed content in `<main id="main" tabindex="-1">`.
- Added route-driven `skipTo` support.
- Made the homepage `#les-voies` section focusable and removed incorrect object spreading into the Svelte `Section` DOM element.

#### 3. Type checking and package resolution now pass

Implemented:

- Fixed the `@niama/ui` Svelte export surface in `packages/ui/package.json`.
- Normalized `@niama/ui/svelte/*` imports in the SvelteKit app to extensionless subpaths.
- Added `@types/node` to `apps/sveltekit/package.json`.
- Refreshed the workspace install and lockfile.

Validation:

- `bun run --cwd apps/sveltekit check` passes.
- `bun run --cwd apps/sveltekit build` passes.

#### 4. Baseline SEO and crawl/discovery parity are now in place

Implemented:

- Added canonical URL, Open Graph, Twitter, and route-driven `robots` metadata in `apps/sveltekit/src/routes/+layout.svelte`.
- Added `sitemap-index.xml` and `sitemap-0.xml` endpoints in:
  - `apps/sveltekit/src/routes/sitemap-index.xml/+server.ts`
  - `apps/sveltekit/src/routes/sitemap-0.xml/+server.ts`
- Updated `apps/sveltekit/static/robots.txt` to advertise the production sitemap URL.

Validation:

- `bun run --cwd apps/sveltekit build` emits both sitemap endpoints.

#### 5. The attendants carousel no longer regresses to raw eager images

Implemented:

- Added `apps/sveltekit/src/lib/components/image.svelte` with ImageKit/Unpic-based responsive image generation.
- Switched `apps/sveltekit/src/lib/components/attendants-carousel.svelte` from raw eager `<img>` tags to the new responsive image component.
- Kept the existing blurhash-derived background placeholder behavior from the shared domain image data.
- Added the explicit SvelteKit image dependencies in `apps/sveltekit/package.json`.

Validation:

- `bun run --cwd apps/sveltekit check` passes.
- `bun run --cwd apps/sveltekit build` passes.

### High

### Medium

#### 6. The theme bootstrap is implemented in a brittle way

Evidence:

- Astro injects the theme bootstrap as a normal inline script in `apps/astro/src/pages/_root.astro:40`.
- SvelteKit injects a nested raw HTML script string inside `<svelte:head>` in `apps/sveltekit/src/routes/+layout.svelte:35`.

Impact:

- This pattern is harder to reason about and has already been fragile during local dev tooling.
- It is an unnecessary divergence from the reference implementation.

What to do:

- Move the theme bootstrap to a safer inline-script strategy in SvelteKit, ideally closer to `src/app.html` or a plain head script pattern that does not rely on nested `{@html}`.

#### 6. Header accessibility is improved but not fully aligned with Astro

Current state:

- The SvelteKit header now labels both desktop and mobile navigation as `Navigation principale`.
- The mobile trigger now uses `aria-controls`, `aria-expanded`, `aria-haspopup`, and `aria-label="Menu principal"`.
- The mobile menu can now close on `Escape` and outside pointer interaction.
- The interaction model is still a custom conditional nav rather than the structured dropdown used in Astro.

What remains:

- Revisit whether the mobile menu should converge on the same dropdown/menu primitive used by the Astro app.
- Keep the current active-link/stain behavior, but continue narrowing semantic differences where the shared UI layer allows it.

## What Already Matches Well

- Public layout data comes from the shared domain layer through `readPublicLayout()` in `apps/sveltekit/src/routes/+layout.ts:1-3`.
- Homepage content comes from `readIndexPage()` in `apps/sveltekit/src/routes/+page.ts:1-3`.
- The contact flow has been ported to a SvelteKit endpoint in `apps/sveltekit/src/routes/api/contact/+server.ts:1-26`.
- The main homepage sections are present in `apps/sveltekit/src/routes/+page.svelte:32-49`.
- The project builds successfully for Cloudflare with the current adapter setup.

## Recommended Execution Order

1. Fix the broken route parity:
   legal page route, legal footer link, and public layout shell.
2. Fix the foundation:
   `@niama/ui` Svelte exports, `svelte-check`, and Node typings.
3. Port SEO parity:
   canonical tags, Open Graph, Twitter metadata, sitemap, and production `robots.txt`.
4. Remove the main performance regressions:
   raw eager carousel images and any remaining head/bootstrap brittleness.
5. Finish accessibility polish:
   skip link parity, focusable section target, nav labels, and mobile menu semantics.
