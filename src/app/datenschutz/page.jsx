import React from "react";
import Datenschutz from "../components/Datenschutz";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von sam.codes – Informationen nach Art. 13 DSGVO. Keine Cookies, kein Tracking, keine externen Schriftarten.",
  path: "/datenschutz",
});

const DatenschutzPage = () => {
  return <Datenschutz />;
};

export default DatenschutzPage;
