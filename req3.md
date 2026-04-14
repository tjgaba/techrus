ASSIGNMENT 1.4
Professional Workflows & Advanced UI Architecture
Estimated Time: 5–6 hours Builds On: Assignment 1.3 Module: Shopify Fundamentals
& eCommerce Development Context: Consumer Electronics Store
OBJECTIVE
In this assignment, you will abandon the browser-based code editor and transition to a
professional local development environment using the Shopify CLI, VS Code, and Git.
You will establish a version-controlled deployment pipeline where code pushed to
GitHub automatically deploys to your store. Then, using this professional workflow, you
will customize the Horizon theme by configuring global merchant-facing settings,
building a responsive mega menu navigation, and constructing a custom homepage
section — all tested locally with hot reload before deploying through your pipeline.
When you are done, you will have a workflow identical to what agencies use to manage
Shopify stores for enterprise clients — local development, feature branches, pull
requests, and automated deployment.
PROJECT CONTEXT
Your Consumer Electronics store has products, collections, payments, shipping, and
custom Liquid templates. But all of your development has been done in Shopify's
browser-based code editor — a tool designed for quick fixes, not sustained
development. It has no version control, no undo beyond Ctrl+Z, no multi-file search, no
linting, and no way to collaborate with other developers.
In the real world, you will never build a client's store in the browser editor. Agencies use
local development with hot reload for speed, Git for version control and collaboration,
and GitHub-to-Shopify pipelines for automated deployment. A single developer mistake
on a live theme can take down a client's revenue stream — version control and
deployment pipelines prevent that.
Today you build the infrastructure that every subsequent assignment will use. From this
point forward, all theme development happens locally.
BEFORE YOU START: Prerequisites
Verify the following are installed on your machine:
Tool Check Command Install From
Node.js (v18+) node --version https://nodejs.org/ (LTS)
npm npm --version Comes with Node.js
Git git --version https://git-scm.com/
VS Code code --version https://code.visualstudio.com/
If any of these are missing, install them before proceeding. The Shopify CLI requires
Node.js.
REQUIREMENTS
1. Shopify CLI Installation & Authentication
Install the Shopify CLI globally:
npm install -g @shopify/cli @shopify/theme
Verify:
shopify version
You should see @shopify/cli/3.x.x or similar.
Authenticate with your development store:
shopify auth login --store YOUR-STORE-NAME.myshopify.com
Replace YOUR-STORE-NAME with your actual store URL. A browser window opens —
sign in with your Shopify Partner credentials. Once authenticated, the CLI stores the
token locally.
Verify the connection:
shopify theme list
This should display the themes installed on your store (Dawn, Horizon, etc.).
2. Install & Pull the Horizon Theme
If you haven't already installed the Horizon theme on your store:
1. Go to Online Store → Themes → Add theme → Explore free themes
2. Find and install Horizon
Pull the theme locally:
mkdir ~/consumer-electronics-theme
cd ~/consumer-electronics-theme
shopify theme pull
Select the Horizon theme when prompted. The CLI downloads all theme files to your
local directory.
Open in VS Code:
code .
Install the Shopify Liquid VS Code extension (search "Shopify Liquid" in the
Extensions marketplace) for syntax highlighting and autocomplete.
3. Git Repository & Deployment Pipeline
Initialize Git and create a proper .gitignore:
git init
Create file: .gitignore
config/settings_data.json
node_modules/
.shopify/
Why exclude settings_data.json? This file contains the merchant's actual saved
settings — their chosen colors, text, section configurations. If you commit and push it,
you overwrite the merchant's live customizations with your development values. The
settings_schema.json (what settings exist) IS tracked. The data file (what values the
merchant chose) is NOT. This distinction is critical in production.
Initial commit and push:
git add .
git commit -m "Initial commit: Horizon theme for Consumer Electronics store"
Create a new repository on GitHub (e.g., consumer-electronics-theme), then:
git remote add origin https://github.com/YOUR-USERNAME/consumer-electronics-
theme.git
git branch -M main
git push -u origin main
Connect Shopify to GitHub:
1. Navigate to Online Store → Themes in the admin
2. Scroll down to Theme library
3. Click Add theme → Connect from GitHub
4. Authorize Shopify to access your GitHub account
5. Select your repository and the main branch
6. Shopify creates a connected theme in your library
Test the pipeline:
1. In VS Code, make a visible change to any file (e.g., add a comment
to layout/theme.liquid)
2. Commit and push:
3. git add .
4. git commit -m "Test deployment pipeline"
5. git push
6. In the Shopify admin, check the connected theme — the change should appear
within 30–60 seconds
From this point forward, every code change goes through: VS Code → Git commit →
GitHub push → Shopify auto-deploys.
4. Local Development Server
Start the hot-reload dev server:
shopify theme dev
The CLI outputs a local preview URL (e.g., http://127.0.0.1:9292) and a shareable store
URL with a preview theme ID. Open the local URL in your browser.
Verify hot reload works:
1. Open any Liquid file in VS Code
2. Make a visible change
3. Save (Ctrl+S)
4. The browser preview updates within seconds
All remaining tasks in this assignment must be developed using shopify theme dev —
NOT the browser code editor. The browser editor is now off-limits for this course.
5. Global Theme Settings Configuration
File: config/settings_schema.json
Open this file in VS Code. Add the following custom settings groups to the schema array.
These settings must be usable by the merchant in the Theme Editor and must be
connected to actual UI elements in the theme.
Required settings group 1: "Store Announcement"
Setting Type ID Default Purpose
Show
announcement
checkbox show_announcement true Toggle
visibility
Announcement
text
text announcement_text "Free
shipping
on orders
over
R1,000"
The message
Background
color
color announcement_bg #0a0a23 Bar
background
Text color color announcement_text_color #ffffff Text/link
color
Link URL url announcement_link (empty) Optional
click
destination
Required settings group 2: "Product Card Style"
Setting Type ID Default Purpose
Show sale
badges
checkbox show_sale_badges true Toggle sale
badges on
product cards
globally
Sale
badge
color
color sale_badge_color #e53e3e Badge background
color
Card
border
radius
range card_border_radius 8 (min: 0,
max: 24, step:
4, unit: "px")
Controls card
rounded corners
globally
Show
vendor on
cards
checkbox show_vendor_on_cards true Toggle brand
name visibility on
cards
Implementation requirement: These settings must not just exist in the schema — they
must be connected to actual UI elements. Specifically:
• Create a /snippets/announcement-bar.liquid snippet that reads from the
"Store Announcement" settings and renders a conditional announcement bar.
Include it in /layout/theme.liquid after the <body> tag.
• The "Product Card Style" settings must be referenced in your product card
markup. Create or modify a /snippets/product-card.liquid snippet that uses {{
settings.card_border_radius }}px for border radius, {{ settings.sale_badge_color
}} for badge background, and conditionally shows/hides vendor text based on {{
settings.show_vendor_on_cards }}.
Verification: Open the Theme Editor (Online Store → Themes → Customize) and
confirm both settings groups appear in the sidebar under Theme Settings. Change
values and verify the preview updates in real time.
6. Mega Menu Navigation
Build a responsive mega menu that handles the dense category structure of a
consumer electronics store. Electronics stores typically have deep navigation:
Computers → Laptops → Gaming Laptops, or Audio → Headphones → Wireless Over-Ear.
Step 1: Set up the navigation data in the admin
Navigate to Online Store → Navigation → Main menu and create a nested structure with
at least 3 top-level items, each with 3+ sub-items:
Main Menu:
├── Computers → /collections/computers
│ ├── Laptops → /collections/laptops
│ ├── Desktops → /collections/desktops
│ ├── Monitors → /collections/monitors
│ └── Accessories → /collections/computer-accessories
├── Audio → /collections/audio
│ ├── Headphones → /collections/headphones
│ ├── Speakers → /collections/speakers
│ └── Earbuds → /collections/earbuds
├── Mobile → /collections/mobile
│ ├── Smartphones → /collections/smartphones
│ ├── Tablets → /collections/tablets
│ └── Wearables → /collections/wearables
└── Deals → /collections/deals
The collection URLs do not need to point to real collections (they can be placeholder
URLs like # for now) — the navigation structure is what matters.
Step 2: Build the mega menu
Create file: /snippets/mega-menu.liquid
Requirements:
• Loop through linklists['main-menu'].links for top-level items
• For each top-level item that has child links (link.links.size > 0), render a
dropdown panel containing the child links
• Use link.active and link.child_active to highlight the current navigation item (bold
text or underline for the active state)
• The dropdown must appear on hover using CSS :hover (not JavaScript)
• Each dropdown panel must display child links in a vertical list (not a single
horizontal row)
Step 3: Make it responsive
Requirements:
• On desktop (above 768px): the mega menu displays as a horizontal nav bar with
hover dropdowns
• On mobile (768px and below): the mega menu is completely hidden using a
CSS media query. Mobile users rely on the theme's built-in hamburger/drawer
menu — you do NOT need to build a mobile menu
• The responsive hiding must use @media (max-width: 768px) — not JavaScript,
not inline styles toggled by a flag
Step 4: Include in the header
Open the Horizon theme's header section (check /sections/header.liquid or similar).
Add {% render 'mega-menu' %} in an appropriate location — after the logo, before the
cart/account icons.
Verification: With shopify theme dev running, resize the browser between desktop and
mobile widths. The mega menu should appear on desktop and disappear on mobile.
Hover over a top-level item with children — the dropdown should appear with the sub-
items listed.
7. Custom Homepage Section
Build a custom "Featured Collections" section for the homepage that demonstrates
blocks, responsive layout, and merchant configurability.
Create file: /sections/featured-collections-grid.liquid
Requirements:
• The section renders a responsive grid of collection cards
• Each card is a block (type: collection_card) — the merchant adds, removes, and
reorders cards in the Theme Editor
• Each block has settings for:
o collection (type: collection) — the merchant picks which collection the
card represents
o button_text (type: text, default: "Shop Now") — customizable CTA
• The card displays:
o The collection's image (using collection.image | image_url: width: 600)
with a fallback to the first product's image if no collection image exists
o The collection title ({{ collection.title }})
o The product count ({{ collection.products_count }} products)
o The button linking to {{ collection.url }}
• Responsive CSS Grid layout:
o Mobile: 1 column
o Tablet (600px+): 2 columns
o Desktop (900px+): 3 columns
• Section-level settings for heading text and subheading text
• A {% schema %} block with a presets array so the section appears in the Theme
Editor's "Add section" menu
• {{ block.shopify_attributes }} on each block's container element (required for the
Theme Editor to identify blocks)
Verification: In the Theme Editor, add the section to your homepage, configure 3–4
blocks with different collections, and verify the responsive grid works at all viewport
sizes.
8. Commit and Deploy Through the Pipeline
After completing all tasks, commit your work with meaningful commit messages and
push through the pipeline:
git add .
git commit -m "Add announcement bar, product card settings, mega menu, and
featured collections section"
git push
Verify in the Shopify admin that the connected GitHub theme updates with your
changes.
EXTRA-CREDIT REQUIREMENT
Feature Branch Workflow with a Deliberate Rollback
Professional teams never push directly to main. They use feature branches, review
changes, and merge via pull requests. You must demonstrate this workflow — and prove
you can use it to recover from a mistake.
Requirements:
1. Create a feature branch from main:
2. git checkout -b feature/experimental-header
3. Make a deliberate breaking change on this branch — for example, change the
mega menu's CSS to make all text color: transparent (invisible), or set the
announcement bar background to the same color as the text (unreadable)
4. Commit and push the broken branch:
5. git add .
6. git commit -m "Experimental header changes (intentionally broken for rollback
demo)"
7. git push -u origin feature/experimental-header
8. Create a pull request on GitHub from feature/experimental-header → main. Take
a screenshot of the PR showing the diff.
9. Do NOT merge the PR. Instead, close it without merging. This simulates a code
review rejection.
10. Switch back to main and verify the store is unaffected:
11. git checkout main
12. Now simulate a real recovery scenario: make the same breaking change
directly on main, commit, and push. The store breaks.
13. Revert the commit:
14. git revert HEAD
15. git push
Shopify pulls the reverted code, and the store returns to its working state.
Deliverable: Screenshots showing:
• The feature branch PR on GitHub with the diff
• The broken store after pushing the bad commit to main
• The reverted commit in the Git log
• The restored store after the revert
Multi-Column Mega Menu with Featured Product
Upgrade your mega menu so that categories with many sub-items display in a multi-
column grid layout instead of a single list. Additionally, for one specific top-level
category, display a featured product alongside the navigation links — with an image,
title, price, and "Shop Now" link.
Requirements:
• If a top-level link has more than 4 child links, render them in a 2-column CSS
Grid within the dropdown
• For one specific top-level link (identified by its handle — e.g., {% if link.handle ==
'computers' %}), add a "Featured Product" panel alongside the navigation
columns:
o Display the first product from the linked
collection: collections[link.handle].products.first
o Show the product image, title, price (formatted with | money), and a link to
the product page
• The featured product panel should sit to the right of the navigation columns in a
wider dropdown
This demonstrates that mega menus are not just navigation — they are merchandising
tools. Amazon, Best Buy, and Newegg all use mega menus to promote products inline
with navigation.
SUBMISSION REQUIREMENTS
Submit your GitHub repository URL and the following evidence:
1. Terminal screenshot — the shopify theme dev server running successfully with
the preview URL visible
2. GitHub repository — containing the full theme code with a meaningful commit
history (not a single giant commit)
3. settings_schema.json additions — the two custom settings groups (Store
Announcement, Product Card Style) viewable in the repo
4. Announcement bar snippet — /snippets/announcement-bar.liquid using global
settings, viewable in the repo
5. Product card snippet — demonstrating usage of the global card settings
6. Mega menu snippet — /snippets/mega-menu.liquid with nested loops and
responsive CSS
7. Featured collections section — /sections/featured-collections-grid.liquid with
blocks and responsive grid
8. Live storefront URL — showing the mega menu, announcement bar, and
featured collections functioning
9. Rollback proof — screenshots of the PR, the broken state, the revert commit,
and the restored state