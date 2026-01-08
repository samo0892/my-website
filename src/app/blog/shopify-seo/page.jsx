// app/blogs/shopify-seo/page.tsx
import Image from "next/image";
import Script from "next/script";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TestimonialsSection from "../../components/TestimonialsSection";
import EmailSection from "../../components/EmailSection";

const site = {
  name: "Mein Shopify Blog",
  // Wichtig: echte Domain + https
  url: "https://deinshop.de",
};

const article = {
  slug: "/blogs/shopify-seo",
  title: "Shopify SEO: 5 Tipps für bessere Sichtbarkeit",
  description:
    "So optimierst du deinen Shopify-Shop für Google & Co. und gewinnst mehr Besucher.",
  image: {
    path: "/shopify-seo.jpg",
    width: 1200,
    height: 630,
    alt: "Shopify SEO Tipps",
  },
  author: {
    name: "Max Mustermann",
    // optional: author page
    url: `${site.url}/autor/max-mustermann`,
  },
  // ISO 8601 für Structured Data
  publishedTime: "2025-08-28T00:00:00.000Z",
  modifiedTime: "2025-08-28T00:00:00.000Z",
  category: "SEO",
};

const canonicalUrl = `${site.url}${article.slug}`;
const ogImageUrl = `${site.url}${article.image.path}`;

// Optional: Für SEO oft sinnvoll – statisch ausliefern
export const dynamic = "force-static";

export const metadata = {
  title: article.title,
  description: article.description,

  alternates: {
    canonical: canonicalUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: article.title,
    description: article.description,
    url: canonicalUrl,
    siteName: site.name,
    locale: "de_DE",
    type: "article",
    images: [
      {
        url: ogImageUrl,
        width: article.image.width,
        height: article.image.height,
        alt: article.image.alt,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: article.title,
    description: article.description,
    images: [ogImageUrl],
  },
};

function formatDateDE(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export default function ShopifySeoArticlePage() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: article.title,
    description: article.description,
    image: [ogImageUrl],
    author: {
      "@type": "Person",
      name: article.author.name,
      url: article.author.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        // optional: echtes Logo hinterlegen
        url: `${site.url}/logo.png`,
      },
    },
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime,
    inLanguage: "de-DE",
    articleSection: article.category,
  };

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${site.url}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD: Article + Breadcrumbs */}
      <Script
        id="jsonld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <Script
        id="jsonld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }}
      />

      <div className="min-h-screen bg-[#121212] text-white">
        <header>
          <Navbar />
        </header>

        <main id="main-content">
          {/* Hero */}
          <section
            aria-label="Artikel Header"
            className="relative w-full h-[52vh] md:h-[62vh]"
          >
            <Image
              src={article.image.path}
              alt={article.image.alt}
              fill
              priority
              className="object-cover brightness-75"
              // wichtig für CLS & Performance
              sizes="100vw"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl px-4 text-center">
                <p className="mb-3 inline-flex items-center gap-2 text-sm text-gray-200">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    {article.category}
                  </span>
                </p>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  {article.title}
                </h1>

                <p className="mt-5 text-lg md:text-xl text-gray-200 mx-auto max-w-2xl">
                  {article.description}
                </p>

                <div className="mt-6 text-sm text-gray-300">
                  <span>Veröffentlicht am </span>
                  <time dateTime={article.publishedTime}>
                    {formatDateDE(article.publishedTime)}
                  </time>
                  <span> · von </span>
                  <a
                    href={article.author.url}
                    className="underline underline-offset-4 hover:text-white"
                    rel="author"
                  >
                    {article.author.name}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
              <article className="prose prose-lg prose-invert max-w-none">
                <p>
                  Viele Shopify-Händler verlassen sich nur auf Social Media oder
                  bezahlte Werbung, um Kunden zu gewinnen. Doch langfristig ist
                  Suchmaschinenoptimierung (SEO) einer der wichtigsten Kanäle,
                  um kostenlosen Traffic zu generieren.
                </p>

                <h2 id="sprechende-urls">1. Nutze sprechende URLs</h2>
                <p>
                  Statt kryptischer Links solltest du in Shopify SEO-freundliche
                  URLs verwenden. Beispiel: <code>/products/sommerkleid</code>{" "}
                  ist besser als <code>/products/12345</code>.
                </p>

                <h2 id="produktbeschreibungen">2. Optimiere Produktbeschreibungen</h2>
                <p>
                  Google liebt einzigartige Inhalte. Schreibe ausführliche,
                  ansprechende Texte zu deinen Produkten – statt nur die
                  Herstellerbeschreibung zu übernehmen.
                </p>

                <h2 id="strukturierte-daten">3. Verwende strukturierte Daten</h2>
                <p>
                  Rich Snippets wie Sternebewertungen oder Preisangaben können
                  deine Klickrate in den Suchergebnissen deutlich erhöhen.
                </p>

                <h2 id="pagespeed">4. Ladegeschwindigkeit verbessern</h2>
                <p>
                  Ein schneller Shopify-Shop wirkt sich positiv auf deine
                  Rankings und deine Conversion-Rate aus. Nutze optimierte
                  Bilder und ein performantes Theme.
                </p>

                <h2 id="bloggen">5. Bloggen für mehr Reichweite</h2>
                <p>
                  Mit regelmäßigen Blogartikeln kannst du Keywords abdecken, die
                  deine Produkte nicht direkt bedienen, und so neue Kunden auf
                  deinen Shop aufmerksam machen.
                </p>
              </article>

              {/* Sidebar (UX + SEO: Inhaltsverzeichnis, interne Links, CTA) */}
              <aside className="lg:sticky lg:top-24 h-fit rounded-2xl bg-white/5 p-6">
                <h2 className="text-base font-semibold">Inhaltsverzeichnis</h2>
                <nav aria-label="Inhaltsverzeichnis" className="mt-4 text-sm">
                  <ul className="space-y-2 text-gray-200">
                    <li>
                      <a className="hover:text-white" href="#sprechende-urls">
                        1. Sprechende URLs
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="#produktbeschreibungen">
                        2. Produktbeschreibungen
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="#strukturierte-daten">
                        3. Strukturierte Daten
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="#pagespeed">
                        4. Pagespeed
                      </a>
                    </li>
                    <li>
                      <a className="hover:text-white" href="#bloggen">
                        5. Bloggen
                      </a>
                    </li>
                  </ul>
                </nav>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-sm text-gray-200">
                    Willst du mehr SEO-Tipps & Checklisten?
                  </p>
                  <div className="mt-4">
                    <EmailSection />
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* Social Proof */}
          <section className="container mx-auto px-4 pb-16">
            <TestimonialsSection />
          </section>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}
