import React from "react";

const STEPS = [
  {
    title: "Erst denken, dann generieren.",
    text: "Anforderungen, Architektur und Schnittstellen stehen, bevor der Agent eine Zeile schreibt.",
  },
  {
    title: "Kleine Schritte.",
    text: "Umgesetzt wird in überschaubaren Paketen, jedes für sich prüfbar.",
  },
  {
    title: "Tests als Sicherheitsnetz.",
    text: "Jede Funktion kommt mit Tests, die automatisch in der CI laufen.",
  },
  {
    title: "Jede Zeile im Review.",
    text: "Ins Repository kommt nur Code, den ich gelesen und verstanden habe.",
  },
  {
    title: "Übergabe ohne Abhängigkeit.",
    text: "Code, Dokumentation und Projektregeln liegen in deinem Repository. Dein Team kann ohne mich weitermachen.",
  },
];

const ApproachSection = () => {
  return (
    <section id="arbeitsweise" className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
          So arbeite ich mit KI
        </p>
        <h2 className="text-center text-4xl font-bold text-white mb-4 md:mb-6">
          Schnell durch KI. Solide durch Engineering.
        </h2>
        <p className="text-center text-[#ADB7BE] mb-8 md:mb-12">
          Ich entwickle mit KI-Agenten, aber die Verantwortung für den Code
          bleibt bei mir. So geht Tempo nicht auf Kosten der Wartbarkeit:
        </p>
        <ol className="space-y-6">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              <span className="font-mono text-lg font-semibold text-emerald-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[#ADB7BE]">
                <strong className="text-white">{step.title}</strong>{" "}
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ApproachSection;
