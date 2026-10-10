import React from "react";
import Image from "next/image";

// Alles steht direkt im HTML statt in Tabs: Abschluesse und Zertifikate
// waren vorher nur nach einem Klick sichtbar und fehlten damit im
// ausgelieferten HTML, das Suchmaschinen und KI-Systeme lesen.
const SKILLS = [
  "Java",
  "Spring Boot",
  "Quarkus",
  "Jakarta EE",
  "REST- und API-Design",
  "JPA / Hibernate",
  "SQL / relationale Datenbanken",
  "Testing (JUnit, Integrationstests)",
  "Docker / Containerisierung",
  "LLM-Integration in Java-Anwendungen",
  "KI-gestützte Entwicklung",
];

const EDUCATION = [
  "M.Sc. Medieninformatik – BHT Berlin",
  "B.Eng. Technische Informatik – BHT Berlin",
];

const CERTIFICATIONS = ["Scrum Master"];

const SubHeading = ({ children }) => (
  <h3 className="text-lg font-semibold text-white mb-3">{children}</h3>
);

const AboutSection = () => {
  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {/* Illustration ohne Aussage ueber die Person, deshalb leeres alt. */}
        <Image src="/images/about-me.webp" alt="" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Über mich</h2>
          <p className="text-base lg:text-lg">
            Ich bin Backend-Entwickler mit Schwerpunkt Java und einem Master in Medieninformatik.
            Seit rund sechs Jahren baue ich Anwendungen, die in Produktion laufen und
            gepflegt werden müssen – mit Jakarta EE, Spring Boot und Quarkus, meist in
            Umgebungen mit gewachsener Fachlogik, echten Datenmengen und entsprechenden
            Anforderungen an Nachvollziehbarkeit.
          </p>
          <p className="text-base lg:text-lg mt-4">
            Mein aktueller Fokus liegt auf der Verbindung von KI und Enterprise-Backend:
            Wie lassen sich Large Language Models sinnvoll in bestehende Java-Systeme
            integrieren, und wie verändert KI-gestützte Entwicklung die Arbeit in Teams,
            die keine grüne Wiese vor sich haben? Über beides schreibe ich hier.
          </p>
          <div className="mt-8">
            <SubHeading>Skills</SubHeading>
            <ul className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-[#33353F] px-3 py-1 text-sm text-[#ADB7BE]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <SubHeading>Bildung</SubHeading>
              <ul className="list-disc pl-5 space-y-1 text-[#ADB7BE]">
                {EDUCATION.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
            <div>
              <SubHeading>Zertifizierungen</SubHeading>
              <ul className="list-disc pl-5 space-y-1 text-[#ADB7BE]">
                {CERTIFICATIONS.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
