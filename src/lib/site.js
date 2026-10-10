export const SITE_URL = "https://www.sam-codes.com";
export const SITE_NAME = "sam.codes";
export const CONTACT_EMAIL = "hi@sam-codes.com";

// Autor aller Artikel. Byline, Kontaktbereich und Metadaten lesen von hier,
// damit Name und Profile ueberall gleich lauten.
export const AUTHOR = {
  name: "Samed Baldede",
  url: `${SITE_URL}/#about`,
  github: "https://github.com/samo0892/",
  linkedin: "https://de.linkedin.com/in/samed-baldede",
};

export const BOOKING_URL =
  "https://calendly.com/samisfreelancing/sam-codes-erstgesprach";

// Calendly speichert utm_*-Parameter an der Buchung. utm_content nennt die
// Stelle, von der aus gebucht wurde, z. B. "home-hero" oder "post-<slug>".
export const bookingUrl = (utmContent) =>
  `${BOOKING_URL}?utm_source=sam-codes.com&utm_content=${encodeURIComponent(
    utmContent
  )}`;

export const mailtoHref = (subject) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

// Next uebernimmt alternates pro Seite nur als Ganzes: Setzt eine Seite
// einen eigenen canonical, faellt der RSS-Link aus dem Root-Layout weg.
// Deshalb geben alle Seiten mit canonical diesen Eintrag selbst mit.
export const FEED_ALTERNATE = {
  "application/rss+xml": `${SITE_URL}/feed.xml`,
};

// Fallback fuer alle Seiten ohne eigenes Bild, im Format der Artikelkarten
// (scripts/make-og-card.sh), damit summary_large_image nichts abschneidet.
export const DEFAULT_OG_IMAGE = {
  url: "/images/og/default.png",
  width: 1200,
  height: 630,
  alt: "sam.codes – Java-Backend-Entwicklung und KI-Integration",
};

// Next uebernimmt openGraph pro Seite nur als Ganzes: Setzt eine Unterseite
// eigene Werte, fehlt alles, was nur im Root-Layout stand. Ohne eigenes
// openGraph erbt sie dagegen Titel, Beschreibung und URL der Startseite.
// Deshalb bauen Layout und Unterseiten ihr openGraph auf derselben Basis.
const BASE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: "de_DE",
  type: "website",
  images: [DEFAULT_OG_IMAGE],
};

export const siteOpenGraph = ({ title, description, url }) => ({
  ...BASE_OPEN_GRAPH,
  title,
  description,
  url,
});

// Metadaten einer einfachen Unterseite. og:title haengt den Seitennamen so
// an, wie es das title.template im Root-Layout fuer <title> tut.
export const pageMetadata = ({ title, description, path }) => ({
  title,
  description,
  alternates: {
    canonical: path,
    types: FEED_ALTERNATE,
  },
  openGraph: siteOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description,
    url: path,
  }),
});
