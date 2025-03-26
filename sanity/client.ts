export const dynamic = "force-static";

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6j5zhc3g",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});