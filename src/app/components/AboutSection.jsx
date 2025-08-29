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
          <li>Liquid</li>
          <li>Shopify CLI</li>
          <li>JavaScript / TypeScript</li>
          <li>HTML / CSS / SCSS</li>
          <li>Tailwind CSS</li>
          <li>React / Hydrogen</li>
          <li>Shopify API</li>
          <li>Node.js (Apps)</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Scrum Master</li>
        <li>Universität in Berlin, Germany</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>Headless at Shopify for Developers</li>
        <li>Shopify Development Fundamentals</li>
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
        <Image src="/images/about-me.webp" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">Über mich</h2>
          <p className="text-base lg:text-lg">
            Ich bin ein Shopify-Entwickler mit einem starken Fokus auf der Erstellung schneller, skalierbarer und konversionsoptimierter Online-Shops. 
            Ich arbeite mit Liquid, JavaScript, React und den APIs von Shopify, um benutzerdefinierte Designs und Headless-Storefronts zu erstellen. 
            Ich habe Erfahrung mit Tools wie Shopify CLI, Tailwind CSS und Node.js für die App-Entwicklung. 
            Ich lerne schnell, arbeite detailorientiert und bin stets auf der Suche nach neuen Möglichkeiten, um die Benutzererfahrung und die Leistung von Shops zu verbessern. 
            Ich arbeite gerne mit anderen zusammen, um wirkungsvolle E-Commerce-Lösungen zu entwickeln.
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
