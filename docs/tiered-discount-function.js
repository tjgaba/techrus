/**
 * Shopify Function: Tiered Cart Discount
 *
 * This file demonstrates the logic that would run inside
 * a Shopify Function deployed via the CLI. It is NOT executable
 * on Shopify - it is a conceptual implementation for learning.
 *
 * In a real Function:
 * - input comes from a GraphQL query (input.graphql)
 * - output is a JSON object describing the discount
 * - the Function compiles to WebAssembly for sub-5ms execution
 */
export function run(input) {
  const cartTotal = parseFloat(input.cart.cost.totalAmount.amount);

  const tiers = [
    { threshold: 7000, percentage: 20, message: "VIP: 20% off orders over R7,000!" },
    { threshold: 3000, percentage: 15, message: "Premium: 15% off orders over R3,000!" },
    { threshold: 1000, percentage: 10, message: "Saver: 10% off orders over R1,000!" },
  ];

  const qualifyingTier = tiers.find((tier) => cartTotal >= tier.threshold);

  if (!qualifyingTier) {
    return {
      discountApplicationStrategy: "MAXIMUM",
      discounts: [],
    };
  }

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
