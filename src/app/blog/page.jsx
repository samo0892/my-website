import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmailSection from "../components/EmailSection";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../../lib/blog";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Artikel zu Java-Backend-Entwicklung, Spring Boot, Quarkus und der Integration von LLMs in bestehende Systeme.",
  path: "/blog",
});

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
              {posts.map((post, index) => (
                <li key={post.slug}>
                  <PostCard post={post} priority={index === 0} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <EmailSection utmContent="blog-kontakt" />
      </div>
      <Footer />
    </main>
  );
}
