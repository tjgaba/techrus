Assignment 2.2: Auditing & Refactoring for Performance
Objective: Transform a poorly written, non-compliant Liquid section into an enterprise-
grade, highly performant component by resolving all Lighthouse audit failures.
Task 1: Performance Refactoring You must eliminate render-blocking resources and
optimize the media delivery in the promo.liquid file.
• Modify the <script> tag loading heavy-lib.js so that it defers execution until the
HTML parsing is complete.
• Refactor all <img> tags to include explicit width and height attributes, and apply
loading="lazy" to ensure they do not bottleneck the initial page load.
• Extract the inline <style> block and move it to a dedicated CSS file, or utilize
Shopify's modern stylesheet_tag approach to ensure it only loads when
necessary.
Task 2: Accessibility & SEO Compliance The storefront must be fully navigable by
screen readers and optimized for search engine indexing.
• Update the CSS to ensure all text colors (currently utilizing #ccc and #ddd) meet
the standard WCAG contrast ratio requirements.
• Add descriptive alt attributes to all images.
• Add aria-label attributes to the icon-only buttons and proper <label> tags to the
form inputs.
• Replace the generic "click here" text with descriptive, SEO-friendly anchor text.
Task 3: Best Practices & Error Handling
• Resolve the intentional JavaScript error caused by the doPromo() function
executing an undefinedFunction().
Deliverables for Review:
1. A code snippet or GitHub Gist of your newly refactored promo.liquid section.
2. A screenshot of your final Google Lighthouse audit running on the page
containing the promo section, demonstrating passing scores (90+) across
Performance, Accessibility, Best Practices, and SEO.