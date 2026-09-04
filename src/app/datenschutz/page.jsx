import React from "react";
import Datenschutz from "../components/Datenschutz";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von sam.codes – Informationen nach Art. 13 DSGVO. Keine Cookies, kein Tracking, keine externen Schriftarten.",
  alternates: {
    canonical: "/datenschutz",
  },
};

const DatenschutzPage = () => {
  return <Datenschutz />;
};

export default DatenschutzPage;
