import React from "react";
import Impressum from "../components/Impressum";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  title: "Impressum",
  description:
    "Impressum von sam.codes – Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 2 MStV.",
  path: "/impressum",
});

const ImpressumPage = () => {
  return <Impressum />;
};

export default ImpressumPage;
