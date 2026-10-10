import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmailSection from "../components/EmailSection";
import ServiceCard from "../components/ServiceCard";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../../lib/site";
import { getAllServicePages, servicePath } from "../../lib/leistungen";
import { servicesHubGraph } from "../../lib/schema";

const TITLE = "Leistungen: Java-Entwicklung und KI-Integration";
const DESCRIPTION =
  "MVPs mit Java und Spring Boot, LLM-Integration in bestehende Anwendungen, Workshops für KI-gestützte Entwicklung und Service-as-Software aus Berlin.";

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/leistungen",
});

export default function LeistungenPage() {
  const pages = getAllServicePages();

  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <JsonLd data={servicesHubGraph({ title: TITLE, description: DESCRIPTION, pages })} />
      <Navbar />
      <div className="container mt-24 mx-auto px-6 md:px-12 py-4">
        <section className="mt-12">
          <h1 className="text-center text-4xl font-bold text-white mb-4">
            Leistungen
          </h1>
          <p className="text-center text-[#ADB7BE] max-w-2xl mx-auto mb-12">
            Ich bin Freelance-Entwickler für Java-Backends und KI-Integration
            in Berlin. Ich baue neue Anwendungen, bringe LLMs in bestehende
            Systeme und zeige Teams, wie Entwicklung mit KI-Agenten im Alltag
            funktioniert.
          </p>
          <ul className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {pages.map((page) => (
              <li key={page.slug}>
                <ServiceCard
                  service={page}
                  href={servicePath(page.slug)}
                  headingLevel="h2"
                />
              </li>
            ))}
          </ul>
        </section>

        <EmailSection utmContent="leistungen-kontakt" />
      </div>
      <Footer />
    </main>
  );
}
