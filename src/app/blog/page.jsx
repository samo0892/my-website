"use client";
import BlogsSection from "../components/BlogSection"; // Pfad anpassen, falls nötig
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import TestimonialsSection from "../components/TestimonialsSection";
import EmailSection from "../components/EmailSection";


export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <BlogsSection />
        <TestimonialsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}