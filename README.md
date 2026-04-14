# Techrus Shopify Theme

This repository contains the Shopify theme for the Techrus consumer electronics store. The current branch focuses on Horizon theme customizations for the storefront.

## Delivered work

- Added global theme settings for the announcement bar and product card styling
- Added a reusable `announcement-bar` snippet and rendered it in the main layout
- Customized product cards with sale badges, vendor display, and global card radius controls
- Replaced the default desktop header menu output with a custom responsive mega menu
- Added a featured collections homepage section and connected it in `templates/index.json`
- Ignored `config/settings_data.json` to keep store-specific editor data out of Git

## Key files

- [config/settings_schema.json](./config/settings_schema.json)
- [layout/theme.liquid](./layout/theme.liquid)
- [snippets/announcement-bar.liquid](./snippets/announcement-bar.liquid)
- [snippets/product-card.liquid](./snippets/product-card.liquid)
- [snippets/mega-menu.liquid](./snippets/mega-menu.liquid)
- [blocks/_header-menu.liquid](./blocks/_header-menu.liquid)
- [sections/header.liquid](./sections/header.liquid)
- [sections/featured-collections-grid.liquid](./sections/featured-collections-grid.liquid)
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
- `config/settings_data.json` is intentionally ignored because it contains store-specific customization data.
