import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 flex-grow flex items-center justify-center py-24">
        <div className="text-center max-w-xl">
          <p className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">
            Diese Seite gibt es nicht
          </h1>
          <p className="text-[#ADB7BE] mb-8">
            Der Link ist entweder veraltet oder enthält einen Tippfehler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 hover:bg-green-600 text-white"
            >
              Zur Startseite
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3 rounded-full border border-[#33353F] text-[#ADB7BE] hover:text-white hover:border-white transition"
            >
              Zum Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
