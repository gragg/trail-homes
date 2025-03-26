// scripts/generate-static-routes.cjs
const fs = require("fs-extra");
const path = require("path");

// Import your Sanity client
let sanityFetch;

try {
  // Try to import from different possible locations
  try {
    const { sanityFetch: fetch } = require("../lib/sanity");
    sanityFetch = fetch;
  } catch (e) {
    try {
      const { sanityFetch: fetch } = require("../src/lib/sanity");
      sanityFetch = fetch;
    } catch (e) {
      console.error("❌ Could not find sanity client module. Please check the path.");
      process.exit(1);
    }
  }

  async function main() {
    try {
      console.log("🔍 Fetching slugs from Sanity...");
      
      // Fetch all slugs from Sanity
      const slugs = await sanityFetch(`*[_type == "handpick"]{ "slug": slug.current }`);
      
      // Format them for static params
      const staticParams = slugs.map(({ slug }) => ({ slug }));
      
      // Write to JSON file
      const outPath = path.join(process.cwd(), "static-params.json");
      await fs.writeJSON(outPath, staticParams, { spaces: 2 });
      
      console.log(`✅ Successfully generated static params for ${slugs.length} routes`);
      console.log(`📝 Saved to ${outPath}`);
    } catch (error) {
      console.error("❌ Failed to generate static params:", error);
      process.exit(1);
    }
  }

  main();
} catch (error) {
  console.error("❌ Script error:", error);
  process.exit(1);
}