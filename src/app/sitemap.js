import { getAllPosts } from "../lib/blog";
import { getAllServicePages, servicePath } from "../lib/leistungen";
import { SITE_URL } from "../lib/site";

export default function sitemap() {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated ?? post.date,
  }));

  const services = getAllServicePages().map((page) => ({
    url: `${SITE_URL}${servicePath(page.slug)}`,
  }));

  return [
    // Mit Slash, so wie canonical und og:url der Startseite.
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/leistungen` },
    ...services,
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/impressum` },
    { url: `${SITE_URL}/datenschutz` },
    ...posts,
  ];
}
