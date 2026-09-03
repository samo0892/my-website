import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeCodeLanguage from "../../../lib/rehypeCodeLanguage";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EmailSection from "../../components/EmailSection";
import { getAllPosts, getPost, formatDate } from "../../../lib/blog";

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};

  const socialImage = post.ogImage ?? post.image ?? "/images/sam-codes.png";

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords.length ? post.keywords : undefined,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "sam.codes",
      locale: "de_DE",
      type: "article",
      publishedTime: post.date,
      images: [{ url: socialImage, alt: post.title }],
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
const prettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: false,
};

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
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
            <p className="text-sm text-slate-500 mt-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {" · "}
              {post.readingTime} Min. Lesezeit
            </p>
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

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    [rehypePrettyCode, prettyCodeOptions],
                    rehypeCodeLanguage,
                  ],
                },
              }}
            />
          </div>
        </article>

        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
