import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://www.sam-codes.com'
const SITE_NAME = 'sam.codes'
const SITE_TITLE = 'sam.codes – Java-Backend und KI'
const SITE_DESCRIPTION =
  'Samed Baldede entwickelt Backend-Systeme mit Java – Spring Boot, Quarkus, ' +
  'Jakarta EE – und beschäftigt sich mit der Integration von LLMs in ' +
  'bestehende Enterprise-Anwendungen.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/sam-codes.png',
        width: 500,
        height: 500,
        alt: 'sam.codes – Java-Backend und KI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/sam-codes.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
