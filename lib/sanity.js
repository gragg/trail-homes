const projectId = "6j5zhc3g";
const dataset = "production";

async function sanityFetch(query) {
  const url = `https://${projectId}.api.sanity.io/v2024-11-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { cache: "force-cache" });

  if (!res.ok) {
    const err = await res.text();
    console.error("Sanity error:", err);
    throw new Error(`Sanity fetch failed: ${res.status}`);
  }

  const { result } = await res.json();
  return result;
}

module.exports = { sanityFetch };
