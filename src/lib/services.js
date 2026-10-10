// Leistungen der Startseite. Die Karten in ServicesSection und die
// Angebote im JSON-LD (lib/schema.js) lesen beide von hier.
// featured: Bauen ist das Hauptangebot und wird deshalb hervorgehoben.
export const SERVICES = [
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
