import { createClient } from 'next-sanity';

// Ensure we have project ID for static builds
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!projectId && process.env.NODE_ENV === 'production') {
  console.error('Warning: No Sanity project ID found in environment variables');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03', // Use the latest API version
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production
});

export async function sanityFetch(query, params = {}) {
  try {
    // Add a cache-busting parameter
    const cacheKey = new Date().toISOString();
    
    // Check if we have a project ID before attempting to fetch
    if (!projectId) {
      throw new Error('Sanity project ID not configured');
    }
    
    // Include the cacheKey in params to prevent caching
    return await client.fetch(query, {...params, cacheKey});
  } catch (err) {
    console.error('Sanity fetch error:', err);
    // Return empty data to allow builds to continue
    if (query.includes('*[_type == "handpick"]')) {
      return [];
    }
    return null;
  }
}

export default client;