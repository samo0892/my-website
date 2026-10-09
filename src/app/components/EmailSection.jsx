import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { bookingUrl, CONTACT_EMAIL, mailtoHref } from "../../lib/site";

// utmContent ordnet Buchungen der Seite zu, auf der der Abschnitt steht.
const EmailSection = ({ utmContent = "kontakt" }) => {
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white my-2">
          Lass uns herausfinden, ob ich dir helfen kann.
        </h2>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          In 30 Minuten klären wir, was du vorhast und wie ich dich
          unterstützen kann. Kostenlos und unverbindlich. Ich bin verfügbar für
          neue Projekte, remote oder vor Ort in Berlin.
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/samo0892/">
            <Image src={GithubIcon} alt="GitHub-Profil von Samed Baldede" />
          </Link>
          <Link href="https://de.linkedin.com/in/samed-baldede">
            <Image src={LinkedinIcon} alt="LinkedIn-Profil von Samed Baldede" />
          </Link>
        </div>
      </div>
      <div className="z-10 flex flex-col justify-center items-start">
        <a
          href={bookingUrl(utmContent)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-lg w-full sm:w-fit text-center transition"
        >
          Erstgespräch buchen
          <span className="sr-only"> (öffnet in neuem Tab)</span>
        </a>
        <p className="text-[#ADB7BE] text-sm mt-4">
          Oder direkt an{" "}
          <a
            href={mailtoHref("Anfrage über sam.codes")}
            className="inline-block py-1 text-emerald-400 hover:text-emerald-300 underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
};

export default EmailSection;
