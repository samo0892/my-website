export const SITE_URL = "https://www.sam-codes.com";
export const SITE_NAME = "sam.codes";
export const CONTACT_EMAIL = "hi@sam-codes.com";
export const BOOKING_URL =
  "https://calendly.com/samisfreelancing/sam-codes-erstgesprach";

export const mailtoHref = (subject) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

// Next uebernimmt openGraph pro Seite nur als Ganzes: Setzt eine Unterseite
// eigene Werte, fehlt alles, was nur im Root-Layout stand. Ohne eigenes
// openGraph erbt sie dagegen Titel, Beschreibung und URL der Startseite.
// Deshalb bauen Layout und Unterseiten ihr openGraph auf derselben Basis.
const BASE_OPEN_GRAPH = {
  siteName: SITE_NAME,
  locale: "de_DE",
  type: "website",
  images: [
    {
      url: "/images/sam-codes.png",
      width: 500,
      height: 500,
      alt: "sam.codes – Java-Backend und KI",
    },
  ],
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
  },
  openGraph: siteOpenGraph({
    title: `${title} | ${SITE_NAME}`,
    description,
    url: path,
  }),
});
