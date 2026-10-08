import React from "react";
import Link from "next/link";
import PostCard from "./PostCard";
import { getAllPosts } from "../../lib/blog";

const MAX_POSTS = 4;

const BlogSection = () => {
  // getAllPosts liefert neueste zuerst, die ersten vier sind also die
  // aktuellsten Artikel.
  const posts = getAllPosts();
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-12 sm:py-16">
      <h2 className="text-center text-4xl font-bold text-white mb-4 md:mb-6">
        Aus dem Blog
      </h2>
      <p className="text-center text-[#ADB7BE] max-w-2xl mx-auto mb-8 md:mb-12">
        Notizen zu Java-Backend-Entwicklung und dem Einsatz von KI in
        gewachsenen Systemen.
      </p>
      {/* Flex mit festen Kartenbreiten statt Grid, damit eine unvollstaendige
          letzte Reihe zentriert steht, z. B. drei Artikel bei vier Spalten.
          Die calc-Abzuege verteilen gap-8 (2rem): bei zwei Spalten eine
          Luecke auf zwei Karten, bei vier Spalten drei Luecken auf vier. */}
      <ul className="flex flex-wrap justify-center gap-8">
        {posts.slice(0, MAX_POSTS).map((post) => (
          <li
            key={post.slug}
            className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(25%-1.5rem)]"
          >
            <PostCard post={post} headingLevel="h3" />
          </li>
        ))}
      </ul>
      {posts.length > MAX_POSTS && (
        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-full border border-[#33353F] text-[#ADB7BE] hover:text-white hover:border-white transition"
          >
            Alle anzeigen
          </Link>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
