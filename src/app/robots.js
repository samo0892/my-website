import { SITE_URL } from "../lib/site";

// Seit Next 15 Pflicht beim statischen Export (output: "export").
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
