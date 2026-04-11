ASSIGNMENT 1.3 
Liquid Templating & Custom JSON Architectures 
Estimated Time: 4–5 hours  
Builds On: Assignment 1.2  
Context: Consumer Electronics Store 
OBJECTIVE 
In this assignment, you will cross from backend configuration into frontend theme 
development. You will build a custom product template specifically designed for 
consumer electronics, a product category that requires dense technical specifications, 
complex variant matrices, and conditional UI logic that standard templates cannot 
handle. You will write Liquid from scratch objects, filters, tags, loops, conditionals, and 
variable assignments to create a section that dynamically renders product data from 
the admin without any hardcoded content. When you are done, a merchant will be able 
to assign your custom template to any electronics product, and the layout will 
automatically adapt to that product's data,  its specs, its variants, its pricing, its stock 
status, without touching a line of code. 
PROJECT CONTEXT 
Your Consumer Electronics store has products with complex variant matrices (storage 
capacities × colors × connectivity options), technical specifications that customers 
compare before purchasing, and pricing that varies dramatically between variants (a 
128GB laptop and a 1TB laptop are the same product with a R5,000 price difference). 
The default Shopify product template treats all products the same, it does not 
distinguish between a R200 phone case and a R25,000 laptop. 
Professional electronics retailers like Apple, Samsung, and Best Buy use product 
templates tailored to electronics: specification tables, variant-aware pricing that 
updates when the customer selects a different configuration, conditional badges for 
new arrivals and sale items, and stock indicators per variant. You are building the 
foundation of that experience today. 
REQUIREMENTS 
1. Theme Architecture Audit 
Before writing any code, you must understand the existing theme structure. Open the 
code editor for your active theme and document the architecture. 
Requirements: 
• Open your theme's code editor (Online Store → Themes → ⋮ → Edit code) 
• Open /layout/theme.liquid — find the {{ content_for_layout }} tag and 
understand its role (this is where page content is injected) 
• Open /templates/product.json — study the JSON structure. Identify which 
section(s) it references and in what order 
• Open the section file that product.json references (likely /sections/main
product.liquid) — note the {% schema %} block at the bottom and identify at 
least 3 Liquid objects used in the markup 
Deliverable: A brief written summary (5–8 sentences) explaining the rendering flow: 
how a customer visiting a product URL triggers the template, which loads the section, 
which renders the Liquid, which is inserted into the layout. Include the specific file 
names from your theme. This proves you understand the architecture, not just individual 
f
iles. 
2. Custom Section Development 
Create file: /sections/product-electronics.liquid 
Build a complete, self-contained section designed for electronics products. This 
section must demonstrate every Liquid concept from the demo — objects, filters, tags, 
loops, conditionals, and assignments — applied to a real use case. 
Required elements (in order): 
A. Product Badges — Conditional rendering 
Render badges above the product title based on data conditions: 
Condition 
Badge Text 
product.compare_at_price > 
product.price 
SALE — Save X% (calculated 
dynamically) 
Badge Color 
Red 
background 
product.tags contains 'new-arrival' 
New Arrival 
Blue 
background 
product.tags contains 'best-seller' 
Best Seller 
Green 
background 
product.available == false (use {% 
unless %}) 
Sold Out 
Grey 
background 
The percentage discount must be calculated in Liquid using {% assign %}, not 
hardcoded. Chain the minus, times, divided_by, and round filters to compute it. 
B. Product Header — Objects and filters 
Render the following using Liquid objects: 
Data 
Liquid 
Filter(s) 
Product title 
{{ product.title }} 
None 
Vendor/Brand 
{{ product.vendor }} 
{{ product.vendor | upcase 
}} 
Product type 
Price 
{{ product.type }} 
{{ product.price }} 
None 
| money 
Compare-at price (if on 
sale) 
{{ product.compare_at_price 
}} 
| money with strikethrough 
styling 
Featured image 
Date added 
{{ product.featured_image }} 
{{ product.created_at }} 
| image_url: width: 600 
C. Product Description — with truncated preview 
| date: "%B %d, %Y" 
• Render the full description in a div 
• ALSO render a short preview (first 120 characters, HTML stripped) using chained 
f
ilters: {{ product.description | strip_html | truncate: 120 }} 
• The preview and full description should be visually distinct (e.g., preview above a 
"Read more" section, or preview in a card and full description below) 
D. Technical Specifications Table — structured data display 
Build a specifications table that displays product metadata. Since Shopify does not 
have a built-in "specs" field for products, use product tags as structured data. 
Tag your electronics products with spec-formatted tags like: 
• spec:Processor:Apple M3 Pro 
• spec:RAM:16GB 
• spec:Storage:512GB SSD 
• spec:Display:14.2-inch Retina 
• spec:Battery:18 hours 
In your Liquid section, loop through product.tags, check if each tag starts with spec:, 
and split it to render a specifications table: 
{% for tag in product.tags %} 
{% if tag contains 'spec:' %} 
{% assign parts = tag | split: ':' %} 
{% if parts.size >= 3 %} 
<tr> 
<td>{{ parts[1] }}</td> 
<td>{{ parts[2] }}</td> 
</tr> 
{% endif %} 
{% endif %} 
{% endfor %} 
This is a real-world pattern used by Shopify stores that need structured specifications 
without installing a metafields app. The tags are freeform, so you parse them yourself 
with Liquid's split filter. 
E. Variant Selector — for loop with option groups 
Build a variant selector that renders separate dropdowns for each product option (not 
a single flat list of all variants): 
{% for option in product.options_with_values %} 
<label>{{ option.name }}</label> 
<select> 
{% for value in option.values %} 
<option value="{{ value }}">{{ value }}</option> 
{% endfor %} 
</select> 
{% endfor %} 
Liquid 
Additionally, render a variant details table below the selector that loops through 
product.variants and displays: 
Column 
Variant name {{ variant.title }} 
SKU 
{{ variant.sku | default: 'N/A' }} 
Price 
{{ variant.price | money }} 
Stock status {% if variant.available %} In Stock {% else %} Sold Out {% endif %} 
Include a total variant count using the size filter: {{ product.variants | size }} 
configurations available 
F. Image Gallery — loop with CDN optimization 
Loop through product.images and render each as an optimized thumbnail: 
{% for image in product.images %} 
<img  
src="{{ image | image_url: width: 200 }}"  
alt="{{ image.alt | default: product.title }}" 
loading="lazy" 
> 
{% endfor %} 
The loading="lazy" attribute tells the browser to defer loading images that are off-screen 
— a web performance best practice. 
G. Add to Cart Form 
Wrap the variant selector and a submit button in a {% form 'product', product %} tag — 
this generates the correct form action and CSRF token for Shopify's cart system: 
{% form 'product', product %} 
<!-- variant selector here --> 
<input type="hidden" name="id" value="{{ 
product.selected_or_first_available_variant.id }}"> 
<button type="submit"> 
{% if product.available %} 
Add to Cart — {{ product.selected_or_first_available_variant.price | money }} 
{% else %} 
Sold Out 
{% endif %} 
</button> 
{% endform %} 
H. Schema Block 
End the section with a {% schema %} block that defines: 
• The section name (e.g., "Electronics Product Display") 
• At least 2 settings that the merchant can configure in the Theme Editor: 
o A checkbox setting: "Show specifications table" (default: true) 
o A text setting: "Specs section heading" (default: "Technical 
Specifications") 
• A presets array so the section is available in the Theme Editor 
Use these settings in your Liquid code — wrap the specs table in {% if 
section.settings.show_specs %} so the merchant can toggle it on/off without editing 
code. 
3. Custom JSON Template Creation 
Create file: /templates/product.electronics.json 
Build a JSON template that loads your custom section as the main content for 
electronics product pages. 
Requirements: 
{ 
"sections": { 
"main": { 
"type": "product-electronics", 
"settings": { 
"show_specs": true, 
"specs_heading": "Technical Specifications" 
} 
} 
}, 
"order": ["main"] 
} 
• The type must exactly match your section filename (minus the .liquid extension) 
• The settings must match the setting IDs defined in your {% schema %} block 
• After creating the template, assign it to at least 2 electronics products in the 
admin (Products → [product] → Theme template → electronics) 
4. Template Verification & Cross-Product Testing 
Prove that your template works dynamically across different products — not just the 
one you were looking at while building it. 
Requirements: 
• Assign the electronics template to a simple product (e.g., Wireless Earbuds with 
2 color variants) AND a complex product (e.g., a Laptop with storage × color × 
RAM variants) 
• View both product pages on the storefront and verify: 
o Titles, prices, and descriptions are different on each page (proving the 
template reads from the product context, not from hardcoded data) 
o The variant selector correctly shows 2 options for earbuds and 3 options 
for the laptop 
o The variant table shows the correct number of rows for each product 
o Sale badges appear only on products with a compare-at price set 
o Tag-based badges (new-arrival, best-seller) appear only on products with 
those tags 
o The specs table renders different specs for each product (because each 
product has different spec: tags) 
EXTRA-CREDIT REQUIREMENT 
Variant-Aware Price Range Display 
When a product has variants with different prices (common in electronics — a 128GB 
model costs less than a 1TB model), displaying a single {{ product.price | money }} is 
misleading. The customer sees the cheapest variant's price and feels deceived when 
they select the configuration they actually want. 
Implement a price range display that shows the minimum and maximum variant 
prices: 
From R12,999.00 — R24,999.00 
Requirements: 
• Use {% assign %} and Liquid logic to find the minimum and maximum prices 
across all variants 
• If all variants have the same price, display just: R12,999.00 
• If variants have different prices, display: From R12,999.00 — R24,999.00 
• The range must be calculated dynamically — do NOT hardcode any prices 
Hint: Liquid does not have a built-in min/max function. You need to loop through 
product.variants, compare each variant.price to a running minimum and maximum, and 
update the values: 
{% assign min_price = product.variants[0].price %} 
{% assign max_price = product.variants[0].price %} 
{% for variant in product.variants %} 
{% if variant.price < min_price %} 
{% assign min_price = variant.price %} 
{% endif %} 
{% if variant.price > max_price %} 
{% assign max_price = variant.price %} 
{% endif %} 
{% endfor %} 
This is an algorithm problem solved in a templating language — it proves you can think 
programmatically within Liquid's constraints, not just use its convenience features. 
Dynamic Specification Comparison Badges 
Using the spec tags you created (e.g., spec:RAM:16GB, spec:Storage:512GB SSD), 
implement conditional badges that highlight key specs: 
Condition (parsed from tags) 
Badge 
Storage contains "1TB" or "2TB" High Capacity 
RAM contains "32GB" or "64GB" Pro Performance 
Battery contains "18" or higher 
All-Day Battery 
This requires parsing tag values inside the loop, using contains on the extracted value, 
and conditionally rendering badges. It demonstrates that Liquid's string manipulation 
capabilities are sufficient for real product intelligence — not just display formatting. 
SUBMISSION REQUIREMENTS 
Submit your development store URL and the following: 
1. Architecture summary — 5–8 sentence written explanation of the rendering 
f
low (template → section → layout) with specific filenames from your theme 
2. Section code — the full /sections/product-electronics.liquid file, either as a 
GitHub Gist or committed to a repository 
3. JSON template — the /templates/product.electronics.json file 
4. Storefront URLs — live URLs to at least 2 different products using 
the electronics template, proving the template renders different data for each 
product 
5. Screenshot — the Theme Editor showing the custom template active on a 
product, with your schema settings visible in the sidebar 