import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmailSection from "../components/EmailSection";
import { getAllPosts, formatDate } from "../../lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Artikel zu Java-Backend-Entwicklung, Spring Boot, Quarkus und der Integration von LLMs in bestehende Systeme.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 py-4">
        <section className="mt-12">
          <h1 className="text-center text-4xl font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-center text-[#ADB7BE] max-w-2xl mx-auto mb-12">
            Notizen zu Java-Backend-Entwicklung und dem Einsatz von KI in
            gewachsenen Systemen.
          </p>

          {posts.length === 0 ? (
            <p className="text-center text-[#ADB7BE]">
              Noch keine Artikel veröffentlicht.
            </p>
          ) : (
            <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-xl bg-[#181818] overflow-hidden hover:ring-1 hover:ring-emerald-500/50 transition"
                  >
                    {(post.ogImage ?? post.image) && (
                      <Image
                        src={post.ogImage ?? post.image}
                        alt={post.title}
                        width={600}
                        height={340}
                        className="aspect-[1200/630] w-full object-cover"
                      />
                    )}
                    <div className="p-5">
                      <p className="text-xs text-slate-500 mb-2">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        {" · "}
                        {post.readingTime} Min.
                      </p>
                      <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition">
                        {post.title}
                      </h2>
                      <p className="text-[#ADB7BE] text-sm">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
