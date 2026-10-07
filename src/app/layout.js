import './globals.css'
import { Inter } from 'next/font/google'
import { SITE_URL, SITE_NAME, siteOpenGraph } from '../lib/site'

const inter = Inter({ subsets: ['latin'] })

const SITE_TITLE = 'sam.codes – Java-Backend und KI'
const SITE_DESCRIPTION =
  'Samed Baldede entwickelt Backend-Systeme mit Java – Spring Boot, Quarkus, ' +
  'Jakarta EE – und beschäftigt sich mit der Integration von LLMs in ' +
  'bestehende Enterprise-Anwendungen.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Unterseiten setzen nur ihren eigenen Titel, z. B. "Blog | sam.codes".
  // Die Startseite selbst bekommt default.
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
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
