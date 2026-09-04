import React from "react";
import Impressum from "../components/Impressum";

export const metadata = {
  title: "Impressum",
  description:
    "Impressum von sam.codes – Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 2 MStV.",
  alternates: {
    canonical: "/impressum",
  },
};

const ImpressumPage = () => {
  return <Impressum />;
};

export default ImpressumPage;
