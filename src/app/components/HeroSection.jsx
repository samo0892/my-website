"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            Hi, ich bin{" "}
          </span>
          <br />
          <TypeAnimation
            sequence={[
              "Sam",
              1000,
              "Java-Entwickler",
              1000,
              "Backend-Architekt",
              1000,
              "KI-Integrator",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            Seit über sechs Jahren entwickle ich Backend-Systeme mit Java – von Jakarta-EE-Anwendungen
            bis zu Services mit Spring Boot und Quarkus. Aktuell verbinde ich das mit KI:
            Large Language Models dort nutzbar machen, wo gewachsene Fachlogik und
            Enterprise-Anforderungen längst bestehen.
        </p>
        <div>
          <Link
            href="/#contact"
            className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-green-500 to-emerald-500 hover:bg-green-600 text-white"
          >
            Kontakt
          </Link>
        </div>

        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/sam-codes.png"
              alt="Samed Baldede"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
