# Shopify Functions Overview

`input.graphql` declares the cart data the Function is allowed to read, such as line items, quantities, variant IDs, product titles, and the total amount. Shopify resolves that query before execution and passes the result into the Function.

`run.js` evaluates the cart total against the tier rules and returns discount instructions for the best qualifying tier.

The Function does not edit the cart directly. It returns instructions because Shopify remains the system of record, validates the result, and decides whether and how the discount is applied.

In a real app workflow, the Function would be scaffolded with Shopify CLI and deployed with `shopify app deploy`, which compiles the Function to WebAssembly for Shopify to run securely and efficiently.
