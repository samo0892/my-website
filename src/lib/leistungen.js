import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SERVICES } from "./services";

const SERVICES_DIR = path.join(process.cwd(), "content", "leistungen");

// Eine Leistungsseite besteht aus dem Eintrag in SERVICES (Label, Titel,
// Teaser, Stichpunkte) und dem MDX-Langtext mit Meta-Angaben und FAQ.
// Reihenfolge und Auswahl bestimmt SERVICES: Eine Leistung ohne MDX-Datei
// bekommt keine eigene Seite.
const readService = (service) => {
  const file = path.join(SERVICES_DIR, `${service.slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));

  return {
    ...service,
    content,
    // h1 der Seite, darf laenger sein als der Kartentitel.
    heading: data.heading ?? service.title,
    // <title> ohne " | sam.codes", das haengt das Template an.
    metaTitle: data.metaTitle ?? service.title,
    description: data.description ?? service.teaser,
    // Kurze Antwort direkt unter dem h1: Was ist das, fuer wen?
    intro: data.intro ?? service.teaser,
    faq: data.faq ?? [],
    // Slugs von Blogartikeln, die unter "Mehr dazu im Blog" stehen.
    relatedPosts: data.relatedPosts ?? [],
  };
};

export const getAllServicePages = () =>
  SERVICES.map(readService).filter(Boolean);

export const getServicePage = (slug) => {
  const service = SERVICES.find((s) => s.slug === slug);
  return service ? readService(service) : null;
};

export const servicePath = (slug) => `/leistungen/${slug}`;
