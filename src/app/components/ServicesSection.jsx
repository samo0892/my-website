import React from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { SERVICES } from "../../lib/services";

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
