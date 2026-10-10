import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { CheckIcon } from "@heroicons/react/24/outline";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EmailSection from "../../components/EmailSection";
import PostCard from "../../components/PostCard";
import Platzhalter from "../../components/Platzhalter";
import JsonLd from "../../components/JsonLd";
import { pageMetadata, bookingUrl } from "../../../lib/site";
import { getAllServicePages, getServicePage, servicePath } from "../../../lib/leistungen";
import { getPost } from "../../../lib/blog";
import { serviceGraph } from "../../../lib/schema";

export const generateStaticParams = () =>
  getAllServicePages().map((page) => ({ slug: page.slug }));

// Seit Next 15 ist params ein Promise.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.description,
    path: servicePath(page.slug),
  });
}

// Komponenten, die die MDX-Texte der Leistungsseiten verwenden duerfen.
const mdxComponents = { Platzhalter };

export default async function LeistungPage({ params }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const relatedPosts = page.relatedPosts.map(getPost).filter(Boolean);

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <JsonLd data={serviceGraph(page)} />
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 py-4">
        <article className="max-w-3xl mx-auto">
          <header className="mb-10">
            <Link
              href="/leistungen"
              className="text-sm text-[#ADB7BE] hover:text-white transition"
            >
              ← Alle Leistungen
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-emerald-400">
              {page.label}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-2 mb-6">
              {page.heading}
            </h1>
            <p className="text-[#ADB7BE] text-lg">{page.intro}</p>
            <a
              href={bookingUrl(`leistung-${page.slug}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 hover:bg-green-600 text-[#121212] font-semibold"
            >
              Kostenloses Erstgespräch (30 Min)
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </header>

          <section className="mb-12 rounded-xl bg-[#181818] p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Das gehört dazu
            </h2>
            <ul className="space-y-2 text-[#ADB7BE]">
              {page.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <CheckIcon className="h-5 w-5 shrink-0 text-emerald-400 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400">
            <MDXRemote
              source={page.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {page.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-6">
                Häufige Fragen
              </h2>
              <dl className="space-y-6">
                {page.faq.map(({ frage, antwort }) => (
                  <div key={frage}>
                    <dt className="text-lg font-semibold text-white">{frage}</dt>
                    <dd className="mt-2 text-[#ADB7BE]">{antwort}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-center text-3xl font-bold text-white mb-8">
              Mehr dazu im Blog
            </h2>
            <ul className="flex flex-wrap justify-center gap-8">
              {relatedPosts.map((post) => (
                <li key={post.slug} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]">
                  <PostCard post={post} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        )}

        <EmailSection utmContent={`leistung-${page.slug}-kontakt`} />
      </div>
      <Footer />
    </main>
  );
}
