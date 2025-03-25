import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { sanityFetch } from "../../lib/sanity";
import TrailHomeDetailClient from "@/components/TrailHomeDetailClient";

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
  const staticParamsPath = path.join(process.cwd(), "static-params.json");
  const staticParams = JSON.parse(fs.readFileSync(staticParamsPath, "utf-8"));

  const paths = staticParams.map(({ slug }: { slug: string }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

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

  return {
    props: { home },
  };
};

export default function TrailHomeDetailPage({ home }: { home: HandpickedHome }) {
  return <TrailHomeDetailClient home={home} />;
}
