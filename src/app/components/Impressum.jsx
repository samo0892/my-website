"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LegalSection from "./LegalSection";

const UST_ID = "DE348179706";

const Impressum = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white px-6 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text"
        >
          Impressum
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[#ADB7BE] text-base sm:text-lg space-y-10"
        >
          <LegalSection title="Angaben gemäß § 5 DDG">
            <p>
              Samed Baldede
              <br />
              sam.codes Web Development
              <br />
              Bismarckstraße 6
              <br />
              10625 Berlin
              <br />
              Deutschland
            </p>
          </LegalSection>

          <LegalSection title="Kontakt">
            <p>
              Telefon:{" "}
              <a
                href="tel:+4915117822921"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                +49 151 17822921
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hi@sam-codes.com"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                hi@sam-codes.com
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Umsatzsteuer-Identifikationsnummer">
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              <br />
              {UST_ID}
            </p>
          </LegalSection>

          <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>
              Samed Baldede
              <br />
              Bismarckstraße 6
              <br />
              10625 Berlin
              <br />
              Deutschland
            </p>
          </LegalSection>

          <LegalSection title="Streitbeilegung">
            <p>
              Die Europäische Kommission hat ihre Plattform zur
              Online-Streitbeilegung (OS-Plattform) zum 20. Juli 2025
              eingestellt. Eine Verlinkung ist daher nicht mehr möglich.
            </p>
            <p>
              Ich bin nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </LegalSection>

          <LegalSection title="Haftung für Inhalte">
            <p>
              Als Diensteanbieter bin ich gemäß § 7 Abs. 1 DDG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 DDG bin ich als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
              Informationen nach den allgemeinen Gesetzen bleiben hiervon
              unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
              Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
              Bei Bekanntwerden entsprechender Rechtsverletzungen werde ich
              diese Inhalte umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection title="Haftung für Links">
            <p>
              Dieses Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese
              fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich. Die verlinkten Seiten wurden zum
              Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft;
              rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar.
            </p>
            <p>
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist
              ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar.
              Bei Bekanntwerden von Rechtsverletzungen werde ich derartige Links
              umgehend entfernen.
            </p>
          </LegalSection>

          <LegalSection title="Urheberrecht">
            <p>
              Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p>
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
              wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
              werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              dennoch auf eine Urheberrechtsverletzung aufmerksam werden, bitte
              ich um einen entsprechenden Hinweis. Bei Bekanntwerden von
              Rechtsverletzungen werde ich derartige Inhalte umgehend entfernen.
            </p>
          </LegalSection>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-br from-green-500 to-emerald-500 text-white font-medium py-3 px-6 rounded-full hover:bg-emerald-700 transition"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Impressum;
