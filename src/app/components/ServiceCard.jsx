import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";

// Leistungskarte fuer Startseite und /leistungen. headingLevel wie bei
// PostCard: h3 unter dem h2 der Startseite, h2 unter dem h1 von
// /leistungen. href fehlt, solange die Leistung keine eigene Seite hat.
// compact: nur ein Satz statt Teaser und Liste, fuer die Startseite. Die
// Details stehen auf der Leistungsseite, doppelt muessen sie nicht sein.
const ServiceCard = ({ service, href, headingLevel = "h3", compact = false }) => {
  const Heading = headingLevel;

  return (
    <div
      className={`flex h-full flex-col rounded-xl bg-[#181818] p-6 ${
        service.featured ? "ring-1 ring-emerald-500/50" : ""
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
        {service.label}
      </p>
      <Heading className="text-xl font-semibold text-white mb-3">
        {service.title}
      </Heading>
      {compact ? (
        <p className="text-[#ADB7BE]">{service.summary}</p>
      ) : (
        <>
          <p className="text-[#ADB7BE] mb-5">{service.teaser}</p>
          <ul className="space-y-2 text-sm text-[#ADB7BE]">
            {service.points.map((point) => (
              <li key={point} className="flex gap-2">
                <CheckIcon className="h-5 w-5 shrink-0 text-emerald-400" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      {href && (
        <Link
          href={href}
          className="mt-auto inline-block pt-6 font-semibold text-emerald-400 hover:text-emerald-300 transition"
        >
          Mehr erfahren
          <span className="sr-only">: {service.title}</span> →
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
