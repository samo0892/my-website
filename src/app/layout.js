import './globals.css'
import { Inter } from 'next/font/google'
import {
  SITE_URL,
  SITE_NAME,
  HOME_TITLE,
  HOME_DESCRIPTION,
  FEED_ALTERNATE,
  siteOpenGraph,
} from '../lib/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Unterseiten setzen nur ihren eigenen Titel, z. B. "Blog | sam.codes".
  // Die Startseite selbst bekommt default.
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  // Kein canonical hier: Den erbten sonst alle Seiten ohne eigene
  // alternates, etwa die 404-Seite. Die Startseite setzt ihn in page.js.
  alternates: {
    types: FEED_ALTERNATE,
  },
  openGraph: siteOpenGraph({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
