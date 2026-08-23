"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
          <li>Java</li>
          <li>Spring Boot</li>
          <li>Quarkus</li>
          <li>Jakarta EE</li>
          <li>REST- und API-Design</li>
          <li>JPA / Hibernate</li>
          <li>SQL / relationale Datenbanken</li>
          <li>Testing (JUnit, Integrationstests)</li>
          <li>Docker / Containerisierung</li>
          <li>LLM-Integration in Java-Anwendungen</li>
          <li>KI-gestützte Entwicklung</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>M.Sc. Medieninformatik – BHT Berlin</li>
        <li>B.Eng. Technische Informatik – BHT Berlin</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Scrum Master</li>
        <li>Shopify Development Fundamentals</li>
        <li>Headless at Shopify for Developers</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-me.webp"
          alt="Samed Baldede bei der Arbeit"
          width={500}
          height={500}
        />
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
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Bildung{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Zertifizierungen{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
