import React from "react";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";

const CONTACT_EMAIL = "hi@sam-codes.com";
const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Anfrage über sam.codes"
)}`;

const EmailSection = () => {
  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Lass uns in Kontakt treten

        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">
          {" "}
          Ich bin derzeit auf der Suche nach neuen Herausforderungen, mein Posteingang ist immer offen. 
          Ob Du eine Frage hast oder einfach nur Hallo sagen möchtest, ich werde mich bemühen, 
          Dir so schnell wie möglich zu antworten!
        </p>
        <div className="socials flex flex-row gap-2">
          <Link href="https://github.com/samo0892/">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link href="https://de.linkedin.com/in/samed-baldede">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div className="z-10 flex flex-col justify-center items-start">
        <a
          href={MAILTO_HREF}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-lg w-full sm:w-fit text-center transition"
        >
          Schreib mir eine E-Mail
        </a>
        <p className="text-[#ADB7BE] text-sm mt-4">
          Oder direkt an{" "}
          <a
            href={MAILTO_HREF}
            className="text-emerald-400 hover:text-emerald-300 underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
};

export default EmailSection;
