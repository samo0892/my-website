import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/24/outline";
import { bookingUrl } from "../../lib/site";

const PROMISES = [
  "Festpreis-Angebot nach dem Erstgespräch",
  "Der Code gehört dir",
  "Remote oder vor Ort in Berlin",
];

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      {/* Zweispaltig erst ab lg: darunter ist die rechte Spalte schmaler als
          der Avatar-Kreis, und der Kreis schiebt sich ueber den Text. */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Bewusst ohne Einblend-Animation: Text und Bild sind das LCP-Element
            und sollen mit dem ersten Paint sichtbar sein, nicht erst nach
            dem Laden des JavaScripts. */}
        <div
          className="lg:col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <p className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            Hi, ich bin Sam.
          </p>
          <h1 className="text-white mb-6 text-3xl sm:text-4xl lg:text-5xl leading-tight font-extrabold">
            Software schneller bauen – mit KI und ohne Abstriche bei der
            Qualität.
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-8 lg:text-xl">
            Ich bin Backend-Entwickler mit über sechs Jahren Erfahrung in Java,
            Spring Boot und Quarkus. Ich entwickle MVPs und komplette
            Anwendungen mit KI-Agenten wie Claude Code, bringe LLMs in
            bestehende Systeme und zeige Teams, wie sie selbst schneller werden.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
            <a
              href={bookingUrl("home-hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 w-full sm:w-fit rounded-full bg-gradient-to-br from-green-500 to-emerald-500 hover:bg-green-600 text-white text-center"
            >
              Kostenloses Erstgespräch (30 Min)
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
            <Link
              href="/#leistungen"
              className="px-6 py-3 w-full sm:w-fit rounded-full border border-[#33353F] text-[#ADB7BE] hover:text-white hover:border-white transition text-center"
            >
              Leistungen ansehen
            </Link>
          </div>
          <ul className="mt-6 flex flex-col items-center sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-sm text-[#ADB7BE]">
            {PROMISES.map((promise) => (
              <li key={promise} className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 shrink-0 text-emerald-400" />
                {promise}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4 place-self-center mt-8 lg:mt-0">
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[400px] xl:h-[400px] relative">
            <Image
              src="/images/sam-codes.webp"
              alt="Samed Baldede"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
