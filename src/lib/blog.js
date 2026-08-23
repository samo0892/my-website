import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const readingTime = (content) => {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

const readPost = (fileName) => {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    content,
    title: data.title,
    // Optional: abweichender <title> fuer Suchergebnisse, falls die
    // H1 laenger sein soll als der Meta-Titel.
    metaTitle: data.metaTitle ?? data.title,
    description: data.description ?? "",
    keywords: data.keywords ?? [],
    date: data.date,
    image: data.image ?? null,
    tags: data.tags ?? [],
    readingTime: readingTime(content),
  };
};

export const getAllPosts = () =>
  fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug) => {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return null;
  return readPost(file);
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
