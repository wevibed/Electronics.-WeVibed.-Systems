# WeVibed Electronics & Gadgets

WeVibed retail template: React 18 + Vite + Tailwind 3, deployed on Cloudflare Pages from GitHub.

> **UNVERIFIED until CI runs.** This project was written without being able to run `npm install` or `vite build`
> in the authoring environment. The first GitHub Actions run is the source of truth. If it fails, fix that first.

## Set up a new client

1. Create a new GitHub repo from this folder (or copy it) and push.
2. Edit `src/data/site.json` (name, WhatsApp number, colours, address, hours, hero text, domain).
3. Edit `src/data/products.json` (name, category, price or `null`, specifications, warranty and image path). Put photos in `public/images/products/` and set each `image` to a path relative to `public/`, e.g. `images/products/phone.webp`.
4. Replace `public/images/shop/shop-exterior.webp` and `public/images/shop/shop-interior.webp`, then update `visit.photos` in `src/data/site.json`. Product and shop photos in this demo are generated sample imagery; use the client's actual images before launch.
5. Set `contact.address`, `contact.mapDestination`, `contact.hours`, `contact.displayNumber` and `contact.whatsapp` in `src/data/site.json`. `mapDestination` should be the exact street address or verified coordinates used for both the map preview and directions link.
6. `npm install`, `npm run dev` to preview, `npm run check` to validate.

## Status flow (`site.json` -> `status`)

| status | indexed by Google | build rules |
|---|---|---|
| `demo` | no (noindex, robots disallow) | placeholders allowed. Use for prospect demos |
| `draft` | no | placeholders allowed |
| `live` | yes (sitemap, canonical) | `npm run build` FAILS while placeholders, the demo WhatsApp number, example/pages.dev domains or a missing hero/og image remain |

## Cloudflare Pages

- Connect the GitHub repo (Workers & Pages -> Create -> Pages -> Connect to Git).
- Build command: `npm run build`   Output directory: `dist`
- Environment variable: `NODE_VERSION` = `22`
- No secrets are needed. The site is static; there are no payments, accounts or stock sync.
- Custom domain: add it under the Pages project, then set `seo.domain` in `site.json` and `status` to `live`.

## CI

`.github/workflows/ci.yml` runs on push/PR: install, `npm run check`, `npm run build`, and uploads `dist` and `package-lock.json`.
After the first successful run, download the `package-lock` artifact and commit it so installs are reproducible.

## Included customer journey

- Local WebP images for all ten demo products plus storefront and store-interior images.
- Product detail modal with specifications, listed price, availability, warranty and a WhatsApp enquiry link.
- Product-specific WhatsApp enquiry buttons on product cards.
- Comparison for up to three products with an enquiry message listing every selected product.
- Find-the-shop gallery, opening hours, address, WhatsApp contact, lazy-loaded map preview and Google Maps directions.
- Delivery and collection information card (customize the wording to match the client's actual policy).

## Performance notes

Catalogue cards use local, compressed WebP assets and avoid backdrop filters and per-card scroll-reveal animation. The decorative background uses static radial gradients instead of large blurred fixed layers, the hero no longer runs a scroll-linked animation, and map loading is deferred with `loading="lazy"`. These changes aim to reduce scrolling and initial-render work; verify on the target device and deployed host after the client's content is added.
