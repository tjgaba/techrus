
Dynamic Data Models & Programmatic Pricing
Estimated Time: 5–6 hours
Builds On: Assignment 1.4
Module: Shopify Fundamentals & eCommerce Development
Context: Consumer Electronics Store
OBJECTIVE
In this assignment, you will extend the standard Shopify database schema by creating a
comprehensive custom data architecture using metafields, not just one or two fields,
but a complete structured data system for consumer electronics that handles
specifications, documentation, warranty terms, and sustainability certifications. You
will render this data dynamically in your Liquid theme with conditional logic, fallback
handling, and formatted output. Then you will implement programmatic pricing rules
using Shopify's automatic discount system with tiered thresholds, and demonstrate a
conceptual understanding of Shopify Functions architecture by writing the equivalent
logic in JavaScript, proving you can think beyond admin buttons and into backend code.
PROJECT CONTEXT
Your Consumer Electronics store has products with complex technical data that does
not fit into a single description field. A laptop has a processor, RAM, storage capacity,
screen size, battery life, weight, a downloadable spec sheet PDF, warranty terms that
vary by product tier, and an energy efficiency rating. Customers comparing a R12,000
laptop against a R25,000 laptop need structured, comparable data, not paragraphs of
marketing copy buried in descriptions.
Additionally, your store needs enterprise-grade promotions for events like Black Friday:
tiered discounts that scale with cart value, automatically applied without coupon
codes, and dynamically recalculated as customers add or remove items. The admin's
basic "percentage off" discount cannot express "10% off carts over R1,000, 15% off over
R3,000, 20% off over R7,000" you need programmatic logic.
REQUIREMENTS
1. Metafield Definition Architecture
Location: Settings → Custom data → Products
Create a comprehensive set of product-level metafield definitions that represent the
structured data a consumer electronics store actually needs. Do not create two generic
fields — build a real data schema.
Required definitions (minimum 6):
Name Namespace & Key Type Validation/Notes
Warranty
Period
custom.warranty_months Integer Number of months (e.g., 12,
24, 36). Do NOT use text — a
number type enables
comparison and sorting.
Warranty
Terms
custom.warranty_terms Rich text Detailed warranty conditions
(what's covered, what voids
it). Rich text allows bold,
lists, formatting.
Tech Spec
Sheet
custom.spec_sheet File (file
reference)
A downloadable PDF or
image of the full
specification sheet.
Customers expect this for
high-value electronics.
Energy
Rating
custom.energy_rating Single line
text
Values like "A++", "A+", "B".
Could also use a
dropdown/list if Shopify's
metafield type supports it in
your version.
Release
Year
custom.release_year Integer The product's release year
(e.g., 2025, 2026). Enables
"Show only 2026 models"
filtering in the future.
Is
Refurbished
custom.is_refurbished True or
false
Boolean toggle. Refurbished
products must be clearly
labeled — this is a legal
requirement in many
jurisdictions.
Why these specific types matter:
• Integer for warranty — not text. If a merchant types "12 months" as text, you
cannot compare "12 months" > "6 months" in Liquid. With an integer, 12 >
6 works. Always use the most constrained type.
• File for spec sheets — Shopify hosts the file on its CDN and provides a URL. You
render it as a download link. The merchant uploads a new PDF; the link updates
automatically.
• Boolean for refurbished — not a tag, not text. A boolean has exactly two states:
true or false. Tags are freeform strings that can be misspelled. A boolean cannot
be "tru" or "refurbishd."
2. Metafield Data Population
Populate metafield data on at least 4 products — with deliberate variation to test your
Liquid's conditional rendering.
Required population pattern:
Product Warranty Terms Spec
Sheet
Energy Year Refurbished
Product
A (e.g.,
Premium
Laptop)
24 Full rich text
terms
Upload a
sample
PDF
A++ 2026 false
Product
B (e.g.,
Budget
Tablet)
12 Full rich text
terms
Upload a
sample
PDF
B 2025 false
Product
C (e.g.,
Refurbished
Monitor)
6 Abbreviated
terms
NO file
uploaded
C 2023 true
Product
D (e.g.,
Phone Case)
Leave ALL
metafields
EMPTY
— — — — —
Why Product C and D matter:
• Product C tests partial data — some fields filled, some empty. Your Liquid must
handle this gracefully.
• Product D tests the complete absence of metafields. Your section must NOT
render at all — no empty headings, no broken layouts, no "undefined" text. If your
code crashes or shows artifacts on Product D, the implementation is wrong.
3. Liquid Rendering with Conditional Logic
Work in your local CLI environment (shopify theme dev). All file changes must go
through your Git pipeline.
Create file: /snippets/electronics-metafields.liquid
Build a comprehensive metafield display component with these requirements:
A. Outer conditional gate
Before rendering ANY metafield UI, check if the product has ANY metafield data. Assign
each metafield value to a short variable at the top of the snippet, then wrap the entire
section in a compound {% if %}:
{% assign has_warranty = product.metafields.custom.warranty_months.value %}
{% assign has_terms = product.metafields.custom.warranty_terms.value %}
{% assign has_spec = product.metafields.custom.spec_sheet.value %}
{% assign has_energy = product.metafields.custom.energy_rating.value %}
{% assign has_year = product.metafields.custom.release_year.value %}
{% assign is_refurbished = product.metafields.custom.is_refurbished.value %}
{% if has_warranty or has_terms or has_spec or has_energy or has_year or
is_refurbished %}
<!-- Render metafields section -->
{% endif %}
Product D (empty metafields) must produce ZERO rendered HTML.
B. Structured specifications table
Render non-empty metafields in a key-value table layout. Each row must be individually
wrapped in {% if %}:
{% if has_warranty %}
<tr>
<td>Warranty</td>
<td>{{ product.metafields.custom.warranty_months.value }} months</td>
</tr>
{% endif %}
The warranty value is an integer — append " months" in the template. Do NOT store "12
months" as text.
C. Rich text rendering with | metafield_tag
For the warranty terms (rich text), use the | metafield_tag filter — NOT .value. This filter
converts the rich text JSON into properly formatted HTML. Using .value on a rich text
metafield outputs raw JSON in the browser.
{% if has_terms %}
<div class="warranty-terms">
<h4>Warranty Terms</h4>
{{ product.metafields.custom.warranty_terms | metafield_tag }}
</div>
{% endif %}
D. File download link
For the spec sheet (file metafield), render a download link using the file's URL:
{% if has_spec %}
<a href="{{ product.metafields.custom.spec_sheet.value.url }}"
target="_blank"
download>
Download Specification Sheet (PDF)
</a>
{% endif %}
If the file metafield is empty (Product C and D), no broken link should appear.
E. Refurbished badge
If is_refurbished is true, render a prominent visual badge near the product title — styled
differently from sale badges. Refurbished status is a disclosure that affects purchase
decisions and has legal implications in some markets.
{% if is_refurbished == true %}
<span class="refurbished-badge" style="background: #ed8936; color: white; padding:
4px 12px; border-radius: 4px; font-size: 0.85rem;">
Certified Refurbished
</span>
{% endif %}
F. Energy rating with visual indicator
Do NOT just output the text "A++". Map the rating to a visual indicator — a colored bar, a
colored badge, or a star-based system:
Rating Color Label
A++ Green (#38a169) Excellent Efficiency
A+ Light green (#68d391) Very Good Efficiency
A Yellow (#ecc94b) Good Efficiency
B Orange (#ed8936) Average Efficiency
C or lower Red (#e53e3e) Below Average
Use {% case %} or {% if %} / {% elsif %} to map the string value to the correct color and
label.
G. Integration into the product template
Include the snippet in your product page. Either:
• Add {% render 'electronics-metafields' %} directly into your existing product
section
• Or create a wrapper section with a {% schema %} and add it to product.json (or
your custom product.electronics.json template)
4. Tiered Automatic Discounts
Location: Discounts in the admin
Create a tiered discount structure using Shopify's automatic discounts:
Required tiers:
Tier Name Discount Minimum Cart Total Applies To
TIER-10-OVER-1000 10% off R 1,000 Entire order, automatic
TIER-15-OVER-3000 15% off R 3,000 Entire order, automatic
TIER-20-OVER-7000 20% off R 7,000 Entire order, automatic
Create each as a separate automatic discount in Discounts → Create discount →
Amount off order → Automatic.
Important: Shopify applies only the BEST automatic discount for the customer when
multiple qualify. If the cart total is R8,000, only the 20% discount applies (not all three
stacked). Document this behavior in your submission.
5. Discount Testing & Documentation
Verify the discount flow end-to-end with at least 3 test scenarios:
Test 1: Below all thresholds
• Add a product under R1,000 to the cart
• Expected: No discount. Document with a screenshot.
Test 2: Middle tier
• Add products totaling between R3,000 and R6,999
• Expected: 15% discount appears automatically (the R3,000 tier). Not the 10%
tier — Shopify picks the best one.
• Remove items to drop below R3,000 — discount should disappear
• Document with screenshots (before and after removal)
Test 3: Top tier
• Add products totaling over R7,000
• Expected: 20% discount appears
• Document with a screenshot showing the discount line item and the final total
Test 4: Boundary behavior
• Add products totaling exactly R3,000.00 (or as close as your product prices
allow)
• Does the R3,000 tier activate at exactly R3,000 or only above R3,000? Document
the actual behavior.
EXTRA-CREDIT REQUIREMENT
Shopify Functions — Conceptual Implementation
You cannot deploy a live Shopify Function without a full app scaffold (which is beyond
this assignment's scope). But you CAN demonstrate that you understand the
architecture by writing the equivalent logic in JavaScript and explaining how it maps to
the Functions framework.
Requirements:
Write a JavaScript file (save it in your repository as docs/tiered-discount-function.js)
that implements the tiered discount logic as if it were a Shopify Function's run.js:
/**
* Shopify Function: Tiered Cart Discount
*
* This file demonstrates the logic that would run inside
* a Shopify Function deployed via the CLI. It is NOT executable
* on Shopify — it is a conceptual implementation for learning.
*
* In a real Function:
* - input comes from a GraphQL query (input.graphql)
* - output is a JSON object describing the discount
* - the Function compiles to WebAssembly for sub-5ms execution
*/
export function run(input) {
const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);
// Define the tiers (highest first for correct evaluation)
const tiers = [
{ threshold: 7000, percentage: 20, message: "VIP: 20% off orders over R7,000!" },
{ threshold: 3000, percentage: 15, message: "Premium: 15% off orders over R3,000!" },
{ threshold: 1000, percentage: 10, message: "Saver: 10% off orders over R1,000!" },
];
// Find the highest qualifying tier
const qualifyingTier = tiers.find(tier => cartTotal >= tier.threshold);
// If no tier qualifies, return empty discounts
if (!qualifyingTier) {
return {
discountApplicationStrategy: "MAXIMUM",
discounts: [],
};
}
// Return discount instructions (Shopify applies these)
return {
discountApplicationStrategy: "MAXIMUM",
discounts: [
{
message: qualifyingTier.message,
targets: [
{
orderSubtotal: {
excludedVariantIds: [],
},
},
],
value: {
percentage: {
value: qualifyingTier.percentage.toString(),
},
},
},
],
};
}
Additionally, write the companion input.graphql file (docs/tiered-discount-
input.graphql) that defines what data the Function receives:
query RunInput {
cart {
lines {
quantity
cost {
totalAmount {
amount
}
}
merchandise {
... on ProductVariant {
id
product {
title
}
}
}
}
cost {
totalAmount {
amount
}
}
}
}
Write a brief docs/FUNCTIONS-README.md (under 200 words) that explains:
1. What input.graphql does (defines the data the Function receives)
2. What run.js does (evaluates conditions and returns discount instructions)
3. Why the Function returns instructions instead of modifying the cart directly
(security, Shopify controls application)
4. How this would be deployed (shopify app deploy compiles to WASM)
This proves you understand the architecture conceptually — even if you haven't
deployed a live Function. In an interview, being able to explain Functions architecture is
more valuable than having copy-pasted a tutorial.
Metafield-Driven Comparison Widget
Build a snippet that renders a "Quick Compare" table when two or more products from
the same collection are viewed. Use metafields to populate the comparison.
Requirements:
Create a new snippet: /snippets/product-compare-specs.liquid
• Accept a list of product handles (or use the current collection's products)
• For each product, read the metafields: warranty, energy rating, release year,
refurbished status
• Render a comparison table where products are columns and metafield fields are
rows:
| Premium Laptop | Budget Tablet | Refurbished Monitor |
Warranty | 24 months | 12 months | 6 months |
Energy | A++ | B | C |
Year | 2026 | 2025 | 2023 |
Refurbished | No | No | Yes |
• Handle missing data gracefully — if a product doesn't have a metafield, display
"—" in that cell
• Add conditional row coloring — highlight the "best" value in each row (longest
warranty = green, best energy rating = green)
This demonstrates that metafields are not just for single-product display — they enable
cross-product features like comparison, filtering, and sorting.
SUBMISSION REQUIREMENTS
Submit your GitHub repository URL and the following evidence:
1. Metafield definitions screenshot — Settings → Custom data → Products
showing all 6 definitions with their types
2. Populated product screenshots — Admin product pages for all 4 products
showing metafield values (including Product C with partial data and Product D
with empty fields)
3. Liquid snippet code — /snippets/electronics-metafields.liquid in the repository
4. Storefront URLs for all 4 products demonstrating:
o Product A: all metafields rendering with spec sheet download link and
energy rating visual
o Product B: all metafields rendering with different values
o Product C: partial rendering (refurbished badge, abbreviated terms, no
spec sheet link)
o Product D: NO metafield section rendered at all
5. Discount screenshots — all 4 test scenarios documented with cart screenshots
6. Functions conceptual files — docs/tiered-discount-function.js, docs/tiered-
discount-input.graphql, and docs/FUNCTIONS-README.md in the repository
7. Git commit history — meaningful, incremental commits (not one giant commit)

2. Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

3. Authenticate with Shopify
Log in to your Shopify store:
shopify login --store your-store.myshopify.com

4. Start the local development server
shopify theme dev

5. Optional: Install Theme Check
gem install theme-check

then run
theme-check

install dependancies
npm install

to pull from shopify
npm install

list themes
shopify theme list

3. Pull a theme to your local directory
shopify theme pull --theme-id=THEME_ID

his will download the theme files into your current directory. You can now edit and develop locally. If you need to push changes back, use:

shopify theme push