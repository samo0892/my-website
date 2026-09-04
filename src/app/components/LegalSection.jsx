import React from "react";

// Gemeinsamer Abschnitts-Baustein fuer Impressum und Datenschutzerklaerung,
// damit beide Rechtsseiten im selben Stil bleiben.
const LegalSection = ({ title, children }) => (
  <section className="space-y-2">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

export default LegalSection;
