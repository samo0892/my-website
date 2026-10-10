import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeCodeLanguage from "../../../lib/rehypeCodeLanguage";
import rehypeHeadingIds from "../../../lib/rehypeHeadingIds";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EmailSection from "../../components/EmailSection";
import JsonLd from "../../components/JsonLd";
import ServiceCta from "../../components/ServiceCta";
import TableOfContents from "../../components/TableOfContents";
import {
  getAllPosts,
  getPost,
  formatDate,
  isoDateTime,
  socialImageFor,
} from "../../../lib/blog";
import {
  SITE_NAME,
  AUTHOR,
  FEED_ALTERNATE,
} from "../../../lib/site";
import { postGraph } from "../../../lib/schema";

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

// Seit Next 15 ist params ein Promise.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const socialImage = socialImageFor(post);

  return {
    // absolute statt Template: metaTitle ist schon auf die Laenge in
    // Suchergebnissen zugeschnitten, " | sam.codes" kaeme noch obendrauf.
    title: { absolute: post.metaTitle },
    description: post.description,
    keywords: post.keywords.length ? post.keywords : undefined,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: FEED_ALTERNATE,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: SITE_NAME,
      locale: "de_DE",
      type: "article",
      publishedTime: isoDateTime(post.date),
      modifiedTime: isoDateTime(post.updated ?? post.date),
      authors: [AUTHOR.url],
      images: [{ url: socialImage, width: 1200, height: 630, alt: post.title }],
    },
    // Muss der Artikel selbst setzen: Next mischt die twitter-Angaben des
    // Root-Layouts nicht in die Metadaten einer Unterseite.
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.description,
      images: [socialImage],
    },
  };
}

// Syntax-Highlighting laeuft komplett zur Build-Zeit ueber Shiki, es landet
// also kein Highlighter-JS im Bundle. keepBackground: false laesst den
// Codeblock-Hintergrund aus globals.css stehen, statt den des Themes zu
// uebernehmen; gefaerbt werden nur die Tokens.
// Komponenten, die die MDX-Artikel verwenden duerfen. Tabellen sind auf
// dem Handy oft breiter als die Textspalte, ohne Wrapper schneidet der
// Browser die rechten Spalten ab. tabIndex, damit sich der Bereich auch
// per Tastatur scrollen laesst. Kein role="region": Der braeuchte einen
// eindeutigen Namen, und das RAG-Tutorial hat zwei Tabellen.
const mdxComponents = {
  ServiceCta,
  table: (props) => (
    <div
      className="overflow-x-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  ),
};

// Kurze Artikel kommen ohne Inhaltsverzeichnis aus, dort waere es nur ein
// weiterer Kasten vor dem eigentlichen Text.
const MIN_TOC_HEADINGS = 4;

const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <JsonLd data={postGraph(post)} />
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 py-4">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-[#ADB7BE] hover:text-white transition"
            >
              ← Alle Artikel
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-4">
              {post.title}
            </h1>
            <p className="text-[#ADB7BE] text-lg">{post.description}</p>
            {/* Byline: Der Autor muss im sichtbaren Text stehen, nicht nur
                in den Metadaten, damit Leser und Suchmaschinen ihn sehen. */}
            <p className="text-sm text-slate-400 mt-4">
              Von{" "}
              <Link
                href="/#about"
                rel="author"
                className="text-[#ADB7BE] underline decoration-slate-600 underline-offset-4 hover:text-white transition"
              >
                {AUTHOR.name}
              </Link>
              {" · "}
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.updated && (
                <>
                  {" · aktualisiert am "}
                  <time dateTime={post.updated}>
                    {formatDate(post.updated)}
                  </time>
                </>
              )}
              {" · "}
              {post.readingTime} Min. Lesezeit
            </p>
            {post.shortAnswer && (
              <div className="mt-6 rounded-lg border-l-4 border-emerald-500 bg-[#181818] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-1">
                  Kurz gesagt
                </p>
                <p className="text-[#ADB7BE]">{post.shortAnswer}</p>
              </div>
            )}
            {post.testedWith.length > 0 && (
              <p className="mt-6 rounded-lg border border-[#33353F] bg-[#181818] px-4 py-3 text-sm text-[#ADB7BE]">
                <span className="font-semibold text-white">Getestet mit:</span>{" "}
                {post.testedWith.join(" · ")}
                {post.repo && (
                  <>
                    {" · "}
                    <a
                      href={post.repo}
                      className="font-semibold text-emerald-400 underline underline-offset-4 hover:text-emerald-300"
                    >
                      Code auf GitHub
                    </a>
                  </>
                )}
              </p>
            )}
          </header>

          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={630}
              className="rounded-lg mb-10 w-full h-auto"
              priority
            />
          )}

          {post.headings.length >= MIN_TOC_HEADINGS && (
            <TableOfContents headings={post.headings} />
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeHeadingIds,
                    [rehypePrettyCode, prettyCodeOptions],
                    rehypeCodeLanguage,
                  ],
                },
              }}
            />
          </div>

          {post.service && (
            <ServiceCta slug={post.service}>{post.serviceText}</ServiceCta>
          )}
        </article>

        <EmailSection utmContent={`post-${post.slug}`} />
      </div>
      <Footer />
    </main>
  );
}
