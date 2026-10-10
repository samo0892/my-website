import { SITE_URL, SITE_NAME, CONTACT_EMAIL, AUTHOR } from "./site";
import { SKILLS, EDUCATION, SCHOOL, CERTIFICATIONS } from "./profile";
import { SERVICES } from "./services";
import { isoDateTime, socialImageFor } from "./blog";

// JSON-LD fuer Startseite, /blog und Artikel. Alles wird aus denselben
// Daten gebaut, die die Seiten sichtbar anzeigen (AUTHOR, Profil,
// Leistungen, Frontmatter), damit Schema und Text nicht auseinanderlaufen.
// Die Knoten verweisen per @id aufeinander: Person und Website stehen
// vollstaendig nur auf der Startseite, die anderen Seiten nennen sie kurz.

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BLOG_URL = `${SITE_URL}/blog`;
const BLOG_ID = `${BLOG_URL}#blog`;

const absolute = (path) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

// "@type" auch in der Kurzform: Ohne ihn liest Google den Autor auf Seiten
// ohne vollstaendigen Person-Knoten nur als "Thing".
const personRef = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
};

const graph = (...nodes) => ({ "@context": "https://schema.org", "@graph": nodes });

const breadcrumbs = (url, items) => ({
  "@type": "BreadcrumbList",
  "@id": `${url}#breadcrumb`,
  itemListElement: items.map(([name, item], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item,
  })),
});

const person = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR.name,
  url: AUTHOR.url,
  email: `mailto:${CONTACT_EMAIL}`,
  jobTitle: "Freelance Java-Backend-Entwickler",
  homeLocation: { "@type": "Place", name: "Berlin" },
  knowsAbout: SKILLS,
  alumniOf: { "@type": "CollegeOrUniversity", ...SCHOOL },
  hasCredential: [
    ...EDUCATION.map(({ degree }) => ({
      "@type": "EducationalOccupationalCredential",
      name: degree,
      credentialCategory: "degree",
      recognizedBy: { "@type": "CollegeOrUniversity", name: SCHOOL.name },
    })),
    ...CERTIFICATIONS.map((name) => ({
      "@type": "EducationalOccupationalCredential",
      name,
      credentialCategory: "certificate",
    })),
  ],
  sameAs: [AUTHOR.github.replace(/\/$/, ""), AUTHOR.linkedin],
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.teaser,
      provider: { "@id": PERSON_ID },
      areaServed: [
        { "@type": "City", name: "Berlin" },
        { "@type": "Country", name: "Deutschland" },
      ],
    },
  })),
});

const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "de-DE",
  publisher: { "@id": PERSON_ID },
});

export const homeGraph = ({ title, description }) => {
  const url = `${SITE_URL}/`;
  return graph(
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: title,
      description,
      inLanguage: "de-DE",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
    website(),
    person()
  );
};

// Alle Artikelbilder sind 1200x630 (scripts/make-og-card.sh).
const imageObject = (path) => ({
  "@type": "ImageObject",
  url: absolute(path),
  width: 1200,
  height: 630,
});

export const blogGraph = ({ title, description, posts }) =>
  graph(
    {
      "@type": "CollectionPage",
      "@id": BLOG_URL,
      url: BLOG_URL,
      name: title,
      description,
      inLanguage: "de-DE",
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": BLOG_ID },
      breadcrumb: { "@id": `${BLOG_URL}#breadcrumb` },
    },
    {
      "@type": "Blog",
      "@id": BLOG_ID,
      url: BLOG_URL,
      name: `${SITE_NAME} Blog`,
      inLanguage: "de-DE",
      author: personRef,
      publisher: personRef,
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": `${BLOG_URL}/${post.slug}#article`,
        url: `${BLOG_URL}/${post.slug}`,
        headline: post.title,
        description: post.description,
        image: imageObject(socialImageFor(post)),
        datePublished: isoDateTime(post.date),
        dateModified: isoDateTime(post.updated ?? post.date),
        author: personRef,
      })),
    },
    breadcrumbs(BLOG_URL, [
      ["Start", `${SITE_URL}/`],
      ["Blog", BLOG_URL],
    ])
  );

export const postGraph = (post) => {
  const url = `${BLOG_URL}/${post.slug}`;
  return graph(
    {
      "@type": "WebPage",
      "@id": url,
      url,
      name: post.metaTitle,
      description: post.description,
      inLanguage: "de-DE",
      isPartOf: { "@id": WEBSITE_ID },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@id": url },
      headline: post.title,
      description: post.description,
      image: imageObject(socialImageFor(post)),
      datePublished: isoDateTime(post.date),
      dateModified: isoDateTime(post.updated ?? post.date),
      author: personRef,
      publisher: personRef,
      inLanguage: "de-DE",
      keywords: post.keywords.length ? post.keywords : post.tags,
      isPartOf: { "@id": BLOG_ID },
    },
    breadcrumbs(url, [
      ["Start", `${SITE_URL}/`],
      ["Blog", BLOG_URL],
      [post.title, url],
    ])
  );
};
