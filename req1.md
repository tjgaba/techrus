1

2

3

4

5

6

7

ASSIGNMENT 1.2
Commercial Configuration & Automated Taxonomy
Estimated Time: 3–4 hours
Builds On: Assignment 1.1
Context: Consumer Electronics Store
OBJECTIVE
In this assignment, you will transition your Consumer Electronics store from a static
product catalog into a functional commerce platform by configuring the commercial
backend — payment processing, shipping logistics, and tax considerations. You will
then architect a self-maintaining product taxonomy using automated collections with
layered conditional rules that demonstrate boolean logic applied to real commerce.
When you are done, your store will be capable of processing a complete end-to-end test
transaction, and your product catalog will organize itself dynamically as new products
are added — without any manual intervention.
PROJECT CONTEXT
Your Consumer Electronics store from Assignment 1.1 has products, variants, and
images, but it cannot sell anything. If a customer tried to check out right now, they
would hit a dead end: no payment method configured, no shipping rates calculated, no
logical way to browse the catalog by category.
In the real world, a client hires you to build a Shopify store and expects it to be
commercially functional on launch day. "The products are on the site" is not "the store
is ready." A store is ready when a customer in any target market can browse by category,
add items to cart, see accurate shipping costs for their location, pay with their preferred
method, and receive an order confirmationall without a single manual intervention from
the merchant. That is what you are building today.
REQUIREMENTS
1. Payment Gateway Provisioning
Location: Settings → Payments
Before a storefront can process transactions, it must have a secure mechanism to
capture revenue. In a development store, you must NEVER connect a live payment
provider, you would risk processing real charges on a test environment.
Requirements:
• Activate the (for testing) Bogus Gateway as your payment provider
• Additionally, configure at least one manual payment method — choose either:
o Cash on Delivery (COD) — common in markets where credit card
penetration is low
o Bank Deposit / Bank Transfer — common in B2B electronics sales
2. Shipping Zone Architecture
Location: Settings → Shipping and delivery
Consumer electronics vary wildly in physical size, weight, and fragility. A pair of wireless
earbuds and a 32-inch gaming monitor cannot share a flat-rate shipping cost — the
logistics economics are completely different. Your shipping configuration must reflect
this reality.
Requirements:
Zone 1: Domestic
• Create a shipping zone for your store's primary country
• Configure three weight-based shipping rates within this zone:
Rate Name Weight
Range
Price Covers
Lightweight
Standard
0 kg – 2 kg A low price (e.g., R
75)
Earbuds, cables, phone cases,
small accessories
Standard
Shipping
2 kg – 10 kg A medium price
(e.g., R 150)
Laptops, tablets, keyboards,
small speakers
Heavy Goods 10 kg – 30
kg
A high price (e.g.,
R 350)
Desktop towers, monitors,
gaming chairs, printers
Zone 2: International
• Create a shipping zone for at least 3 specific countries (do NOT use "Rest of
world" — pick actual countries you would realistically ship electronics to)
• Configure two rates:
Rate Name Weight
Range
Price
International
Standard
0 kg – 5 kg A price reflecting international logistics (e.g., R
500)
International Heavy 5 kg – 20 kg A higher price (e.g., R 1,200)
Zone 3: Excluded / Restricted
• Create a third zone named Restricted Regions for at least 2 countries where you
explicitly do NOT ship
• Add zero shipping rates to this zone — this means customers from these
countries will see "We don't ship to your location" at checkout and cannot
complete the purchase
Product Type Realistic Weight
Wireless earbuds 0.05 – 0.15 kg
Phone case 0.05 – 0.1 kg
Laptop 1.5 – 2.5 kg
Tablet 0.4 – 0.7 kg
Desktop tower 8 – 15 kg
Monitor 5 – 10 kg
Keyboard 0.5 – 1.0 kg
Gaming headset 0.3 – 0.5 kg
3. End-to-End Checkout Test
Location: Storefront
Prove that your commercial configuration actually works by completing a full test
transaction.
Requirements:
• Navigate to your storefront and add a lightweight product (e.g., earbuds) to the
cart
• Proceed to checkout
• Enter a domestic shipping address within your primary zone
• Verify that the correct shipping rates appear:
o Lightweight Standard should appear (the earbuds weigh under 2 kg)
o Standard Shipping and Heavy Goods should NOT appear (weight is too
low for those brackets)
• Select the Lightweight Standard rate
• Enter Bogus Gateway test payment details (card number: 1, any name, any
future expiry, any CVV)
• Complete the transaction
• Verify the order appears in your admin under Orders with the correct product,
shipping rate, and payment status
Then complete a second test — add a heavy product (e.g., a desktop tower at 12 kg),
enter the same domestic address, and verify that only the Heavy Goods rate appears
(the product exceeds the weight limits of the other two rates).
4. Rule-Based Collection Architecture
Location: Products → Collections
A store with 50+ products and no organizational structure is unusable. Customers do
not browse every product — they browse categories. Your automated collections must
create a professional taxonomy that maintains itself as the catalog grows.
Requirements:
Prerequisite: Tag and categorize your products
Before building collections, ensure every product from Assignment 1.1 has:
• A Product
type (e.g., Laptop, Headphones, Monitor, Keyboard, Tablet, Accessory)
• At least 2 relevant
tags (e.g., gaming, pro, budget, wireless, apple, samsung, portable)
• A Vendor field set (e.g., Apple, Samsung, Sony, Logitech)
Inconsistent metadata breaks automated collections. If one laptop is tagged gaming
and another is tagged Gaming (capitalized), they will NOT match the same condition.
Establish a convention and follow it.
Collection 1 — Price-based: Budget Tech Under R1,000
• Type: Automated
• Condition: Product price → is less than → R 1,000
• Verification: Only products under R1,000 should appear. If you change a
product's price to R999, it should automatically enter this collection. If you raise
it to R1,001, it should automatically leave.
Collection 2 — Tag-based: Gaming Gear
• Type: Automated
• Condition: Product tag → is equal to → gaming
• Verification: Only products with the exact tag gaming appear. Products
tagged Gaming (capital G) do NOT appear — demonstrate this to prove case
sensitivity.
Collection 3 — Vendor-based: [Brand] Ecosystem (e.g., Apple Ecosystem or Samsung
Galaxy)
• Type: Automated
• Condition: Product vendor → is equal to → Apple (or your chosen brand)
• Verification: Every product from that vendor appears automatically, regardless
of product type.
Collection 4 — Multi-condition AND: Premium Laptops
• Type: Automated
• Products must match: all conditions
• Condition 1: Product type → is equal to → Laptop
• Condition 2: Product price → is greater than → R 10,000
• Verification: Only laptops above R10,000 appear. A R15,000 monitor does NOT
appear (wrong product type). A R8,000 laptop does NOT appear (price too low).
Both conditions must be met — this is boolean AND.
Collection 5 — Multi-condition OR: Portable Tech
• Type: Automated
• Products must match: any condition
• Condition 1: Product type → is equal to → Laptop
• Condition 2: Product type → is equal to → Tablet
• Condition 3: Product tag → is equal to → portable
• Verification: Any product that is a laptop, a tablet, OR tagged portable appears.
This is boolean OR — much broader than the AND collection.
EXTRA-CREDIT REQUIREMENT
Self-Maintaining Proof — Live Mutation Test
Automated collections are only valuable if they actually respond to data changes. You
must prove this with a documented mutation test.
Requirements:
1. Add a brand new product to your store that you have NOT created before (e.g.,
a Wireless Gaming Mouse priced at R599, tagged gaming and portable,
vendor Logitech, product type Accessory, weight 0.15 kg)
2. Do NOT manually add it to any collection
3. Take a screenshot of the following collections AFTER adding the product,
showing it appeared automatically:
o Budget Tech Under R1,000 — yes (R599 < R1,000)
o Gaming Gear — yes (tagged gaming)
o Portable Tech — yes (tagged portable)
o Premium Laptops — no (not a laptop, not over R10,000)
4. Now edit the product — change the price from R599 to R1,200
5. Screenshot Budget Tech Under R1,000 again — the product should
have disappeared without you touching the collection
6. Change the price back to R599 — it should reappear
Shipping Rate Conflict Stress Test
Create a scenario that exposes a gap in your shipping configuration, then fix it.
1. Add a product that weighs exactly 2.0 kg (the boundary between Lightweight
Standard and Standard Shipping)
2. Add it to the cart and proceed to checkout with a domestic address
3. Document which shipping rate(s) appear — does the product fall into the 0–2 kg
bracket, the 2–10 kg bracket, or both? Does it fall into neither (a gap)?
4. Shopify treats weight conditions as inclusive/exclusive at boundaries depending
on how you configured the ranges. Document the actual behavior.
5. If there is a gap (the product shows no available rates), fix your rate conditions to
eliminate it and document the fix
6. If both rates appear, explain whether that is the desired behavior and why
SUBMISSION REQUIREMENTS
Submit your development store URL and the following evidence:
1. A screenshot of Settings → Payments showing the Bogus Gateway activated
AND the manual payment method configured
2. A screenshot of Settings → Shipping and delivery showing all three zones
(Domestic, International, Restricted) with their respective rates
3. A screenshot of the Orders page showing at least two completed test orders
(one lightweight, one heavy product) proving the checkout flow and weight-
based rate selection works
4. The five collection URLs on your development storefront, each showing the
correct products populated dynamically
5. Screenshots of the mutation test — the new product appearing in collections
automatically, disappearing from the price-based collection after a price
change, and reappearing when reverted