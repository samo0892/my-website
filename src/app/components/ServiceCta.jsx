import Link from "next/link";
import { SERVICES } from "../../lib/services";
import { servicePath } from "../../lib/leistungen";

// Hinweis auf eine Leistung, mitten im Artikel per MDX
// (<ServiceCta slug="...">Text</ServiceCta>) oder am Ende ueber das
// Frontmatter-Feld service. children ersetzt den Teaser der Leistung,
// damit der Text zum Abschnitt passt. Der Linktext nennt die Leistung,
// statt nur "Mehr erfahren".
const ServiceCta = ({ slug, children }) => {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) throw new Error(`ServiceCta: unbekannte Leistung "${slug}"`);

  return (
    <aside
      data-service-cta
      className="not-prose my-10 rounded-xl border border-emerald-500/40 bg-[#181818] p-6"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
        {service.label}
      </p>
      {/* div statt p: MDX packt mehrzeiligen Text selbst in ein <p>, und
          ein <p> im <p> korrigiert der Browser, sodass die Hydrierung
          scheitert. */}
      <div className="text-[#ADB7BE] mb-4">{children ?? service.teaser}</div>
      <Link
        href={servicePath(slug)}
        className="font-semibold text-emerald-400 hover:text-emerald-300 transition"
      >
        {service.title} →
      </Link>
    </aside>
  );
};

export default ServiceCta;
