import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import ApproachSection from "./components/ApproachSection";
import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <HeroSection />
        <ServicesSection />
        <ApproachSection />
        <AboutSection />
        <BlogSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
