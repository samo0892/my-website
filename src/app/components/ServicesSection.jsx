import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

// featured: Bauen ist das Hauptangebot und wird deshalb hervorgehoben.
const SERVICES = [
  {
    label: "Bauen",
    title: "MVPs und komplette Anwendungen",
    featured: true,
    teaser:
      "Du hast eine Idee oder einen Prozess, der Software braucht? Ich baue daraus ein lauffähiges Produkt, vom Proof of Concept bis zur Anwendung in Produktion.",
    points: [
      "Proof of Concept in 2–4 Wochen, zum Festpreis",
      "Full-Stack-MVPs mit Backend-Schwerpunkt: Java und Spring Boot, Frontend mit React und Next.js",
      "Modernisierung gewachsener Systeme: Tests nachziehen, Migrationen, etwa Jakarta EE nach Spring Boot",
      "Mit Tests, CI und Dokumentation, sodass dein Team übernehmen kann",
    ],
  },
  {
    label: "Integrieren",
    title: "KI in deine Java-Anwendung",
    teaser:
      "Deine Anwendung läuft, und jetzt soll sie Dokumente verstehen, Anfragen einordnen oder Fragen zu internem Wissen beantworten. Ich integriere LLMs dort, wo deine Fachlogik schon lebt, statt eine Python-Parallelwelt danebenzustellen.",
    points: [
      "Fragen an interne Dokumente (RAG)",
      "Daten aus Texten extrahieren und Anfragen klassifizieren",
      "Tool Calling: Das Modell nutzt deine bestehenden Services",
      "Spring AI oder LangChain4j, das Modell bleibt austauschbar",
      "Einstieg: Architektur-Check. Wo lohnt sich KI, was kostet sie, wie bleibt es DSGVO-konform?",
    ],
  },
  {
    label: "Befähigen",
    title: "KI-gestützte Entwicklung für dein Team",
    teaser:
      "Die KI-Tools sind installiert, aber wirklich schneller ist das Team nicht? Ich zeige euch, wie Entwicklung mit KI-Agenten im Alltag funktioniert, am eigenen Code statt an Spielzeugbeispielen.",
    points: [
      "Workshop (1 Tag): Grundlagen, Live-Demo, Übungen im eigenen Repository",
      "Begleitung (2–4 Wochen): gemeinsam am echten Backlog arbeiten",
      "Regeln und Setup: Projektkonventionen für die KI, Review-Prozess, Datenschutz",
      "Werkzeugoffen: Claude Code, GitHub Copilot oder Cursor, je nachdem, was bei euch erlaubt ist",
    ],
  },
  {
    label: "Automatisieren",
    title: "Service-as-Software (SaS)",
    teaser:
      "Statt Software, mit der dein Team eine Aufgabe erledigt, baue ich Software, die die Aufgabe selbst erledigt. KI-Agenten übernehmen wiederkehrende Dienstleistungen von Anfang bis Ende, Menschen geben nur dort frei, wo es darauf ankommt.",
    points: [
      "Agenten für wiederkehrende Arbeit: Anfragen bearbeiten, Dokumente prüfen, Berichte erstellen",
      "Angebunden an deine bestehenden Systeme über APIs, statt eines weiteren Tools daneben",
      "Menschliche Freigabe an kritischen Stellen und nachvollziehbare Protokolle",
      "Stabiles Fundament mit Java und Spring AI, mit Tests und Monitoring",
      "Grundlage für neue Geschäftsmodelle: Abrechnung nach Ergebnis statt nach Lizenz",
    ],
  },
];

const ServicesSection = () => {
  return (
    <section id="leistungen" className="py-12 sm:py-16">
      <h2 className="text-center text-4xl font-bold text-white mb-8 md:mb-12">
        Wobei ich dir helfe
      </h2>
      {/* Vier Leistungen als 2x2-Raster: in vier Spalten waeren die Karten
          fuer ihre Listen zu schmal. */}
      <ul className="grid gap-8 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li
            key={service.label}
            className={`rounded-xl bg-[#181818] p-6 ${
              service.featured ? "ring-1 ring-emerald-500/50" : ""
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              {service.label}
            </p>
            <h3 className="text-xl font-semibold text-white mb-3">
              {service.title}
            </h3>
            <p className="text-[#ADB7BE] mb-5">{service.teaser}</p>
            <ul className="space-y-2 text-sm text-[#ADB7BE]">
              {service.points.map((point) => (
                <li key={point} className="flex gap-2">
                  <CheckIcon className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesSection;
