import Image from "next/image";
import BlogArticle from "../../components/BlogArticle";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EmailSection from "../../components/EmailSection";

export const metadata = {
  title: "Shopify SEO: 5 Tipps für bessere Sichtbarkeit",
  description: "So optimierst du deinen Shopify-Shop für Google & Co. und gewinnst mehr Besucher.",
  alternates: {
    canonical: "/blog/shopify-seo",
  },
  openGraph: {
    title: "Shopify SEO: 5 Tipps für bessere Sichtbarkeit",
    description: "Mehr Reichweite für deinen Shopify-Shop durch gezielte SEO-Strategien.",
    url: "/blog/shopify-seo",
    siteName: "sam.codes",
    images: [
      {
        url: "/images/projects/menglu_paris.webp",
        width: 3024,
        height: 1646,
        alt: "Shopify SEO",
      },
    ],
    locale: "de_DE",
    type: "article",
  },
};

export default function ShopifySeoArticle() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <section className="relative w-full h-[50vh] md:h-[60vh]">
        <Image
          src="/shopify-seo.jpg"
          alt="Shopify SEO Tipps"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shopify SEO: 5 Tipps für bessere Sichtbarkeit
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            Mit diesen SEO-Strategien holst du mehr Traffic auf deinen Shopify-Shop.
          </p>
          <span className="text-sm text-gray-400 mt-4">
            28. August 2025 · von Max Mustermann
          </span>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <article className="prose prose-lg prose-invert max-w-3xl mx-auto">
          <p>
            Viele Shopify-Händler verlassen sich nur auf Social Media oder bezahlte Werbung, 
            um Kunden zu gewinnen. Doch langfristig ist Suchmaschinenoptimierung (SEO) einer 
            der wichtigsten Kanäle, um kostenlosen Traffic zu generieren.
          </p>

          <h2>1. Nutze sprechende URLs</h2>
          <p>
            Statt kryptischer Links solltest du in Shopify SEO-freundliche URLs verwenden. 
            Beispiel: <code>/products/sommerkleid</code> ist besser als <code>/products/12345</code>.
          </p>

          <h2>2. Optimiere deine Produktbeschreibungen</h2>
          <p>
            Google liebt einzigartige Inhalte. Schreibe ausführliche, ansprechende Texte zu deinen Produkten –
            statt nur die Herstellerbeschreibung zu übernehmen.
          </p>

          <h2>3. Verwende strukturierte Daten</h2>
          <p>
            Rich Snippets wie Sternebewertungen oder Preisangaben können deine Klickrate
            in den Suchergebnissen deutlich erhöhen.
          </p>

          <h2>4. Ladegeschwindigkeit verbessern</h2>
          <p>
            Ein schneller Shopify-Shop wirkt sich positiv auf deine Rankings und deine Conversion-Rate aus.
            Nutze optimierte Bilder und ein performantes Theme.
          </p>

          <h2>5. Bloggen für mehr Reichweite</h2>
          <p>
            Mit regelmäßigen Blogartikeln (wie diesem 😉) kannst du Keywords abdecken, die deine Produkte
            nicht direkt bedienen, und so neue Kunden auf deinen Shop aufmerksam machen.
          </p>
        </article>
      </section>
    <div className="container mt-24 mx-auto px-12 py-4">
        <EmailSection />
        <Footer />
    </div>
    </main>
  );
}
