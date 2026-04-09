Assignment 1.1 : Architecting the Foundation
Objective: Provision a secure Shopify development environment, construct a complex
product taxonomy, and establish a local, version-controlled command-line workflow.
Task 1: Enterprise Environment Provisioning
• Log into your Shopify Partner Dashboard and create a new development store.
• Select the "Test and build" purpose. This creates a secure sandbox environment
where you can safely build themes and test apps without risking live production
data.
• Choose the "empty store" build option rather than populating it with test data, as
you must learn to architect the catalog manually.
Task 2: Complex Catalog Architecture
• Consumer electronics require dense product data. Create a catalog of at least 5
hardware products (e.g., Laptops, Headphones, Smartwatches).
• For at least two products, generate a complex variant matrix using multiple
option attributes. For example, create a Laptop product with options for
"Processor", "RAM", and "Storage Capacity". Shopify will automatically generate a
matrix of all possible combinations.
• Configure an automated collection titled "High-Performance Gear." Instead of
manually selecting products, set conditional rules so the collection
automatically populates (e.g., Product tag is equal to "Pro" AND Price is greater
than $500).
Task 3: CLI Initialization and Version Control
• Install the Shopify CLI 3.0 globally via your terminal using a package manager
(e.g., npm install -g @shopify/cli@latest or yarn global add @shopify/cli@latest).
• Authenticate your environment and clone the standard Dawn reference theme
using the shopify theme init command.
• Initialize a Git repository in your new local theme directory, commit the base
Dawn code, and push it to a new remote GitHub repository. Establishing this
version control early is a critical industry standard.
• In your Shopify Admin panel, navigate to Online Store > Themes and connect
your store directly to your new GitHub repository's main branch to establish a
continuous deployment pipeline.
• Finally, run shopify theme dev in your terminal to start your local hot-reloading
server, verify the connection, and preview the store locally.
Deliverables for Review:
1. The myshopify.com URL of your development store.
2. A link to your connected GitHub repository.
3. A screenshot of your local terminal successfully running the shopify theme dev
server.

 npm install -g @shopify/cli@latest
shopify auth login
shopify theme init dawn
cd dawn
git init
git add .
git commit -git push -u origin mainm "Initial Dawn theme"


git branch -M main
git remote add origin <your-github-repo-url>


password: nowshu

