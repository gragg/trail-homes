export const dynamic = "force-static";

import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({ apiVersion: "vX" }),
});