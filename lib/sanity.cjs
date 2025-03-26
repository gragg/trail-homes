// lib/sanity.cjs
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

async function sanityFetch(query, params = {}) {
  try {
    return await client.fetch(query, params);
  } catch (err) {
    console.error('Sanity fetch error:', err);
    throw new Error(`Failed to fetch from Sanity: ${err.message}`);
  }
}

module.exports = {
  sanityFetch,
  client
};