# Techrus Shopify Theme

This repository contains the Shopify theme for the Techrus consumer electronics store. The current implementation extends the Horizon storefront with electronics-focused product metafields, a comparison widget, conceptual Shopify Functions discount documentation, and a refactored promo section for Lighthouse-focused performance, accessibility, and SEO improvements.

## Delivered work

- Added global theme settings for the announcement bar and product card styling
- Added a reusable `announcement-bar` snippet and rendered it in the main layout
- Customized product cards with sale badges, vendor display, and global card radius controls
- Replaced the default desktop header menu output with a custom responsive mega menu
- Added a featured collections homepage section and connected it in `templates/index.json`
- Added an electronics metafields snippet with gated rendering for warranty, energy rating, release year, spec sheet downloads, warranty terms, and refurbished disclosure
- Added a same-collection quick compare widget driven by product metafields
- Added conceptual Shopify Functions files for tiered automatic discount logic
- Added a homepage promo section and refactored it to use deferred JavaScript, extracted CSS, lazy-loaded images, stronger contrast, labeled form fields, descriptive alt text, and descriptive CTA copy
- Removed an unused stylesheet preload that was producing a browser preload warning
- Ignored `config/settings_data.json` to keep store-specific editor data out of Git

## 2.1 scope

This branch implements the theme-side deliverables for the consumer electronics metafields assignment:

- Product-level electronics metafield rendering in Liquid
- Conditional UI that hides the section when metafields are empty
- Refurbished badge disclosure and energy rating visual mapping
- Download link support for uploaded specification sheets
- Comparison table populated from metafields across products in the same collection
- Conceptual `run.js`, `input.graphql`, and README documentation for Shopify Functions tiered discounts

Admin-side setup such as creating metafield definitions, populating products, creating automatic discounts, and collecting submission screenshots must still be completed in Shopify admin.

## 2.2 scope

This branch also includes the theme-side deliverables for the promo section audit and refactor assignment:

- Added a dedicated `promo` section and connected it to the homepage template
- Moved promo styling out of inline `<style>` markup into a dedicated asset
- Replaced inline promo JavaScript with deferred asset loading
- Updated promo images to use explicit dimensions and lazy loading
- Improved promo contrast, form labeling, icon button accessibility, image alt text, and descriptive link text
- Removed the intentional promo JavaScript failure path and the unused global preload warning

Manual submission items for this assignment still need to be completed outside the repo:

- Capture a Google Lighthouse report for the page containing the promo section
- Verify scores of 90+ for Performance, Accessibility, Best Practices, and SEO
- Submit either the `sections/promo.liquid` code snippet or a GitHub Gist
- Capture the required screenshot evidence from the storefront or theme preview

## Key files

- [config/settings_schema.json](./config/settings_schema.json)
- [layout/theme.liquid](./layout/theme.liquid)
- [snippets/announcement-bar.liquid](./snippets/announcement-bar.liquid)
- [snippets/product-card.liquid](./snippets/product-card.liquid)
- [snippets/mega-menu.liquid](./snippets/mega-menu.liquid)
- [snippets/electronics-metafields.liquid](./snippets/electronics-metafields.liquid)
- [snippets/product-compare-specs.liquid](./snippets/product-compare-specs.liquid)
- [blocks/_header-menu.liquid](./blocks/_header-menu.liquid)
- [sections/header.liquid](./sections/header.liquid)
- [sections/featured-collections-grid.liquid](./sections/featured-collections-grid.liquid)
- [sections/product-electronics.liquid](./sections/product-electronics.liquid)
- [docs/tiered-discount-function.js](./docs/tiered-discount-function.js)
- [docs/tiered-discount-input.graphql](./docs/tiered-discount-input.graphql)
- [docs/FUNCTIONS-README.md](./docs/FUNCTIONS-README.md)
- [assets/promo.css](./assets/promo.css)
- [assets/heavy-lib.js](./assets/heavy-lib.js)
- [sections/promo.liquid](./sections/promo.liquid)
- [snippets/stylesheets.liquid](./snippets/stylesheets.liquid)
- [templates/index.json](./templates/index.json)

## Store details

- Store: `techrus-9387.myshopify.com`
- Live theme: `techrus/main` (`154233733275`)
- Development theme: `Development (c34878-Nur)` (`154234060955`)

## Local development

### Requirements

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)

### Run locally

```bash
shopify theme dev
```

### Pull the live theme

```bash
shopify theme pull --theme 154233733275 --path .
```

### Push to the development theme

```bash
shopify theme push --theme 154234060955
```

## Repository structure

```text
assets/
blocks/
config/
layout/
locales/
sections/
snippets/
templates/
```

## Notes

- Homepage collection cards require actual Shopify collections to be assigned in the theme editor.
- The promo section is theme-side only; Lighthouse screenshots and final audit evidence must be captured manually in the browser.
- `config/settings_data.json` is intentionally ignored because it contains store-specific customization data.
- The comparison widget works best when the products being tested belong to the same Shopify collection.
- The current git status may still include local-only files or unrelated working tree changes that are not part of the assignment deliverables.
