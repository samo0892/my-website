"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Impressum = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white px-6 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text"
        >
          Legal Disclosure
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[#ADB7BE] text-base sm:text-lg space-y-6"
        >
          <p>
            <strong>Information in accordance with Section 5 TMG</strong>
            <br />
            Samed Baldede <br />
            sam.codes Web Development <br />
            Bismarckstr. 6 <br />
            10625 Berlin <br />
            Germany
          </p>

          <p>
            <strong>Contact Information</strong>
            <br />
            Phone: +49 (0) 15117822921<br />
            Email: hi@sam-codes.com <br />
          </p>

          <p>
            <strong>Responsible for content in accordance with § 55 Abs. 2 RStV</strong>
            <br />
            Samed Baldede <br />
            Bismarckstr. 6 <br />
            10625 Berlin <br />
            Germany
          </p>

          <p>
            <strong>Disclaimer</strong>
            <br />
            Despite careful content control, we assume no liability for the content of external links. The content of linked pages is the sole responsibility of their operators.
          </p>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-br from-green-500 to-emerald-500 text-white font-medium py-3 px-6 rounded-full hover:bg-emerald-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Impressum;
