import { getAllPosts } from "../lib/blog";

const SITE_URL = "https://www.sam-codes.com";

export default function sitemap() {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/impressum` },
    ...posts,
  ];
}
