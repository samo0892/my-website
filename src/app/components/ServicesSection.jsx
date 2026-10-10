import React from "react";
import Link from "next/link";
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
      {/* Vier kompakte Karten als 2x2-Raster. Die Stichpunkte stehen auf
          /leistungen und den einzelnen Leistungsseiten. */}
      <ul className="grid gap-8 md:grid-cols-2">
        {SERVICES.map((service) => (
          <li key={service.label}>
            <ServiceCard
              service={service}
              href={pageSlugs.has(service.slug) ? servicePath(service.slug) : null}
              compact
            />
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link
          href="/leistungen"
          className="font-semibold text-emerald-400 hover:text-emerald-300 transition"
        >
          Alle Leistungen im Überblick →
        </Link>
      </p>
    </section>
  );
};

export default ServicesSection;
