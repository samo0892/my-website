import React from "react";
import ServiceCard from "./ServiceCard";
import { SERVICES } from "../../lib/services";
import { getAllServicePages, servicePath } from "../../lib/leistungen";

const ServicesSection = () => {
  const pageSlugs = new Set(getAllServicePages().map((page) => page.slug));

  return (
    <section id="leistungen" className="py-12 sm:py-16">
      <h2 className="text-center text-4xl font-bold text-white mb-8 md:mb-12">
        Wobei ich dir helfe
      </h2>
      {/* Vier Leistungen als 2x2-Raster: in vier Spalten waeren die Karten
          fuer ihre Listen zu schmal. */}
      <ul className="grid gap-8 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li key={service.label}>
            <ServiceCard
              service={service}
              href={pageSlugs.has(service.slug) ? servicePath(service.slug) : null}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesSection;
