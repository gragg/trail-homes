// scripts/generate-static-routes.cjs
const fs = require("fs-extra");
const path = require("path");
const { sanityFetch } = require("../lib/sanity");

async function main() {
  const slugs = await sanityFetch(`*[_type == "handpick"]{ "slug": slug.current }`);
  const staticParams = slugs.map(({ slug }) => ({ slug }));
  const outPath = path.join(process.cwd(), "static-params.json");
  await fs.writeJSON(outPath, staticParams, { spaces: 2 });
  console.log("✅ Static params saved to static-params.json");
}

main().catch((err) => {
  console.error("❌ Failed to generate static params", err);
  process.exit(1);
});
