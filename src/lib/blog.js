import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { DEFAULT_OG_IMAGE } from "./site";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Kleines WebP neben der Titelkarte, erzeugt von scripts/make-og-card.sh.
// Fehlt es, zeigen die Karten die volle PNG.
const thumbnailFor = (image) => {
  if (!image) return null;
  const thumbnail = image.replace(/\.png$/, "-640.webp");
  return fs.existsSync(path.join(PUBLIC_DIR, thumbnail)) ? thumbnail : image;
};

// Unquotierte Datumsangaben im Frontmatter (updated: 2026-10-10) liest
// gray-matter als Date. Alles Weitere erwartet "YYYY-MM-DD".
const isoDate = (value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value ?? null;

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
    date: isoDate(data.date),
    // Nur bei inhaltlichen Aenderungen setzen, nicht fuer Tippfehler: Das
    // Datum steht sichtbar im Artikel, in og:modified_time und als lastmod
    // in der Sitemap.
    updated: isoDate(data.updated),
    // Versionen, mit denen der Code des Artikels zuletzt gelaufen ist,
    // z. B. ["Spring AI 2.0.1", "Spring Boot 4.0.8"]. Steht oben im Artikel.
    testedWith: data.testedWith ?? [],
    // image: Hero-Bild im Artikel. ogImage: Titelkarte fuer Social und
    // Uebersicht, ohne im Artikel selbst den Titel zu doppeln.
    image: data.image ?? null,
    ogImage: data.ogImage ?? null,
    thumbnail: thumbnailFor(data.ogImage ?? data.image),
    tags: data.tags ?? [],
    // Slug einer Leistung aus lib/services.js. Der Artikel endet dann mit
    // einem Hinweis auf diese Leistung, serviceText ersetzt deren Teaser.
    service: data.service ?? null,
    serviceText: data.serviceText ?? null,
    readingTime: readingTime(content),
  };
};

// Titelkarten und Hero-Bilder sind 1200x630, ebenso das Standardbild.
export const socialImageFor = (post) =>
  post.ogImage ?? post.image ?? DEFAULT_OG_IMAGE.url;

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

// Frontmatter-Daten haben keine Uhrzeit. JSON-LD und og:article wollen
// eine mit Zeitzone, sonst meldet Google "Zeitzone fehlt". Mitternacht in
// Berlin, Sommer- oder Winterzeit je nach Datum.
export const isoDateTime = (date) => {
  const offset = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find((part) => part.type === "timeZoneName")
    .value.replace("GMT", "");
  return `${date}T00:00:00${offset || "+00:00"}`;
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
