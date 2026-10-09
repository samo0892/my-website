import './globals.css'
import { Inter } from 'next/font/google'
import { SITE_URL, SITE_NAME, FEED_ALTERNATE, siteOpenGraph } from '../lib/site'

const inter = Inter({ subsets: ['latin'] })

// Rolle und Ort vorne, damit der Titel zu Suchen wie "Java Freelancer
// Berlin" passt. Wird er in den Ergebnissen gekuerzt, faellt die Marke weg.
const SITE_TITLE = 'Java-Entwickler Berlin (Freelance): Spring Boot & KI | sam.codes'
// Hoechstens ~155 Zeichen, sonst kuerzt Google die Beschreibung.
const SITE_DESCRIPTION =
  'Freelance Java-Backend-Entwickler in Berlin: MVPs zum Festpreis, ' +
  'LLM-Integration mit Spring AI und Workshops für KI-gestützte Entwicklung.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Unterseiten setzen nur ihren eigenen Titel, z. B. "Blog | sam.codes".
  // Die Startseite selbst bekommt default.
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  // Kein canonical hier: Den erbten sonst alle Seiten ohne eigene
  // alternates, etwa die 404-Seite. Die Startseite setzt ihn in page.js.
  alternates: {
    types: FEED_ALTERNATE,
  },
  openGraph: siteOpenGraph({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  }),
  // Nur der Kartentyp: Titel, Beschreibung und Bild fuellt Next pro Seite
  // aus deren openGraph auf. Stuenden sie hier, erbten alle Unterseiten
  // ohne eigenes twitter die Angaben der Startseite.
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
