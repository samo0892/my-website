"use client";
import Image from "next/image";

export default function BlogArticle({ title, description, date, author, image, children }) {
  return (
    <article className="prose lg:prose-xl mx-auto py-12">
      {/* Header */}
      <header>
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="text-sm text-gray-500 mt-2">
          {date} · von {author}
        </div>
      </header>

      {/* Hero Bild */}
      {image && (
        <div className="my-6">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={600}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      )}

      {/* Artikel-Inhalt */}
      <section className="mt-8">{children}</section>
    </article>
  );
}
