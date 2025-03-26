import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { sanityFetch } from "../../lib/sanity";
import TrailHomeDetailClient from "../../components/TrailHomeDetailClient";
import Head from "next/head";

// Copy this from TrailHomeDetailClient
type GalleryImage = { url: string };

type HandpickedHome = {
  _id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  squareFeet: number;
  acreage: string;
  description?: string;
  gallery: GalleryImage[];
  trailName?: string;
  distanceToTrail?: number;
  rideWithGPSID?: string;
  listingAgent?: string;
  date?: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Add a cache-busting parameter and ensure we're getting all published documents
    const timestamp = new Date().toISOString();
    const query = `*[_type == "handpick" && defined(slug.current)]{ 
      "slug": slug.current,
      _updatedAt
    }`;
    
    const slugs = await sanityFetch(query);
    console.log(`Found ${slugs.length} static paths to generate`);
    console.log('Slugs:', JSON.stringify(slugs));
    
    const paths = slugs.map(({ slug }: { slug: string }) => ({
      params: { slug },
    }));
    
    return { 
      paths, 
      fallback: 'blocking' // This allows new paths to be generated on demand
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug;

    if (!slug) {
      return { notFound: true };
    }

    // Create a fallback home if needed for build
    const fallbackHome = {
      _id: "fallback",
      address: `${slug}`,
      price: 0,
      beds: 0,
      baths: 0,
      squareFeet: 0,
      acreage: "0",
      description: "Details coming soon",
      gallery: [{ url: "/fallback-image.jpg" }],
      trailName: "Unknown Trail",
      distanceToTrail: 0,
      rideWithGPSID: "0",
      listingAgent: "Jenna Gragg"
    };

    try {
      // Fetch the home data from Sanity
      const query = `
        *[_type == "handpick" && slug.current == "${slug}"][0]{
          _id,address,price,beds,baths,squareFeet,acreage,description,
          "gallery": gallery[]{ "url": asset->url },
          trailName,distanceToTrail,rideWithGPSID,listingAgent
        }
      `;
      
      const home = await sanityFetch(query);

      if (!home) {
        return { notFound: true };
      }

      // Return the home data as props
      return {
        props: { 
          home,
          slug // Include the slug in props for future reference
        }
      };
    } catch (error) {
      console.error(`Error fetching home data for ${slug}:`, error);
      return {
        props: { 
          home: fallbackHome,
          slug
        }
      };
    }
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return { notFound: true };
  }
};

export default function TrailHomeDetailPage({ home }: { home: HandpickedHome }) {
  return (
    <>
      <Head>
        <title>{home.address} | Trail Homes</title>
        <meta name="description" content={`${home.address} - ${home.beds} beds, ${home.baths} baths, ${home.squareFeet} sq ft`} />
      </Head>
      <TrailHomeDetailClient home={home} />
    </>
  );
}