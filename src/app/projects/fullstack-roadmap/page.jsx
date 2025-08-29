// app/projects/menglu-paris/page.jsx
import Image from "next/image";

// 1. SEO / Metadata für diese Projektseite
export const metadata = {
  title: "M'ENGLŪ PARIS – Speed Optimization of Shop | Dein Name",
  description:
    "Case Study: Speed Optimization of the M'ENGLŪ PARIS Shopify Store. Erreiche bessere Performance, SEO-Rankings und Nutzererfahrung.",
  keywords: [
    "Shopify Speed Optimization",
    "Web Performance",
    "SEO Shopify",
    "E-Commerce Optimierung",
  ],
  openGraph: {
    title: "M'ENGLŪ PARIS – Shopify Speed Optimization",
    description:
      "Case Study: Performance-Optimierung für den M'ENGLŪ PARIS Onlineshop.",
    url: "https://deinedomain.com/projects/menglu-paris",
    siteName: "Dein Portfolio",
    images: [
      {
        url: "/images/projects/menglu_paris.webp",
        width: 1200,
        height: 630,
        alt: "Screenshot des M'ENGLŪ PARIS Shops",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M'ENGLŪ PARIS – Shopify Speed Optimization",
    description:
      "Performance-Optimierung und SEO-Verbesserung für den Shopify Shop von M'ENGLŪ PARIS.",
    images: ["/images/projects/menglu_paris.webp"],
  },
};

// 2. Projektseite selbst
export default function MengluParisPage() {
  return (
    <div className="text-white max-w-4xl mx-auto p-6">
      {/* Titel */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        M'ENGLŪ PARIS – Speed Optimization of Shop
      </h1>

      {/* Projektbild */}
      <Image
        src="/images/projects/menglu_paris.webp"
        alt="M'ENGLŪ PARIS Projekt Screenshot"
        width={1200}
        height={675}
        className="rounded-lg mb-8"
        priority
      />

      {/* Beschreibung */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Über das Projekt</h2>
        <p className="mb-4 leading-relaxed">
          Dieses Projekt konzentrierte sich auf die Optimierung der Ladezeiten
          und Performance des Shopify Stores von M'ENGLŪ PARIS. Ziel war es,
          die Core Web Vitals zu verbessern und die Conversion-Rate zu steigern.
        </p>
        <p className="leading-relaxed">
          Durch gezielte Maßnahmen wie Bildkomprimierung, Lazy Loading,
          Liquid-Code-Optimierung und Minimierung von Skripten konnte die
          Ladezeit um 65% reduziert werden.
        </p>
      </section>

      {/* Technische Details */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technologien & Tools</h2>
        <ul className="list-disc list-inside space-y-2 text-[#ADB7BE]">
          <li>Shopify Liquid</li>
          <li>JavaScript & Theme Optimization</li>
          <li>PageSpeed Insights Audits</li>
          <li>SEO Technical Fixes</li>
        </ul>
      </section>

      {/* Ergebnis */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Ergebnisse</h2>
        <p className="leading-relaxed">
          Die Optimierungen führten zu einem verbesserten Google Lighthouse
          Score von <strong>95+</strong> sowie einer deutlich reduzierten
          Bounce-Rate. Die SEO-Rankings verbesserten sich innerhalb von 4
          Wochen sichtbar.
        </p>
      </section>

      {/* Links */}
      <section className="flex gap-4 mt-8">
        <a
          href="https://github.com/deinuser/menglu-paris"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          GitHub
        </a>
        <a
          href="https://projekt1.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Live Demo
        </a>
      </section>
    </div>
  );
}
