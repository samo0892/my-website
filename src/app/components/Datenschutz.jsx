"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LegalSection from "./LegalSection";

const STAND = "September 2026";

const ExtLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-emerald-400 hover:text-emerald-300 underline"
  >
    {children}
  </a>
);

const Datenschutz = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white px-6 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text"
        >
          Datenschutzerklärung
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-[#ADB7BE] text-base sm:text-lg space-y-10"
        >
          <LegalSection title="1. Verantwortlicher">
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO)
              ist:
            </p>
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
            <p>
              E-Mail:{" "}
              <a
                href="mailto:hi@sam-codes.com"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                hi@sam-codes.com
              </a>
              <br />
              Telefon:{" "}
              <a
                href="tel:+4915117822921"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                +49 151 17822921
              </a>
            </p>
            <p>
              Weitere Angaben finden Sie im{" "}
              <Link
                href="/impressum"
                className="text-emerald-400 hover:text-emerald-300 underline"
              >
                Impressum
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection title="2. Überblick">
            <p>
              Diese Website ist bewusst datensparsam aufgebaut. Sie ist eine
              rein statische Seite ohne Nutzerkonten, ohne Kontaktformular und
              ohne Kommentarfunktion. Konkret bedeutet das:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Es werden keine Cookies gesetzt.</li>
              <li>
                Es findet keine Reichweitenmessung, keine Analyse und kein
                Tracking statt.
              </li>
              <li>
                Es werden keine externen Schriftarten, Skripte oder
                Content-Delivery-Netzwerke von Drittanbietern nachgeladen.
              </li>
              <li>
                Beim bloßen Aufruf der Seite werden keine Daten an Dritte
                übertragen – mit Ausnahme des Hosting-Anbieters, der die Seite
                technisch ausliefert (siehe Ziffer 3).
              </li>
            </ul>
            <p>
              Die folgenden Abschnitte beschreiben die verbleibenden
              Verarbeitungen im Einzelnen.
            </p>
          </LegalSection>

          <LegalSection title="3. Hosting und Server-Logfiles">
            <p>
              Diese Website wird als statische Website bei GitHub Pages
              gehostet. Anbieter ist die GitHub, Inc., 88 Colin P. Kelly Jr.
              Street, San Francisco, CA 94107, USA, ein Unternehmen der
              Microsoft Corporation.
            </p>
            <p>
              Beim Aufruf der Website erhebt und speichert der Hosting-Anbieter
              automatisch Informationen, die Ihr Browser übermittelt
              (Server-Logfiles):
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP-Adresse des anfragenden Endgeräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Name und URL der abgerufenen Datei</li>
              <li>Referrer-URL (die zuvor besuchte Seite)</li>
              <li>Browsertyp, Browserversion und Betriebssystem</li>
              <li>übertragene Datenmenge und HTTP-Statuscode</li>
            </ul>
            <p>
              Diese Daten sind technisch erforderlich, um die Website
              auszuliefern, ihre Stabilität und Sicherheit zu gewährleisten und
              Angriffe abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
              DSGVO. Mein berechtigtes Interesse liegt in der technisch
              fehlerfreien und sicheren Bereitstellung dieser Website.
            </p>
            <p>
              Ich selbst habe keinen Zugriff auf diese Logfiles, werte sie nicht
              aus und führe sie nicht mit anderen Daten zusammen. Die
              Speicherdauer richtet sich nach den Vorgaben des
              Hosting-Anbieters.
            </p>
            <p>
              GitHub stellt für die Nutzung als Auftragsverarbeiter ein Data
              Protection Agreement bereit, das Bestandteil der
              GitHub-Nutzungsbedingungen ist. Da die Verarbeitung auch in den
              USA erfolgen kann, stützt sich die Übermittlung auf das EU-U.S.
              Data Privacy Framework sowie ergänzend auf die
              Standardvertragsklauseln der Europäischen Kommission.
            </p>
            <p>
              Einzelheiten zur Datenverarbeitung durch GitHub finden Sie in der{" "}
              <ExtLink href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement">
                Datenschutzerklärung von GitHub
              </ExtLink>
              .
            </p>
          </LegalSection>

          <LegalSection title="4. Schriftarten">
            <p>
              Diese Website verwendet die Schriftart „Inter“. Die Schriftdateien
              werden beim Erstellen der Seite fest eingebunden und von demselben
              Server ausgeliefert wie die Website selbst. Es wird{" "}
              <strong className="text-white">keine</strong> Verbindung zu
              Servern von Google oder anderen Anbietern aufgebaut, und es werden
              insbesondere keine IP-Adressen an Google übertragen.
            </p>
          </LegalSection>

          <LegalSection title="5. Keine Cookies, kein Tracking">
            <p>
              Diese Website setzt keine Cookies und speichert keine
              Informationen im Local Storage oder Session Storage Ihres
              Endgeräts. Es werden keine Analyse- oder Trackingdienste
              eingesetzt, es findet kein Profiling statt und es werden keine
              Nutzungsprofile erstellt.
            </p>
            <p>
              Eine Einwilligung nach § 25 Abs. 1 TDDDG ist daher nicht
              erforderlich; aus demselben Grund gibt es auf dieser Website kein
              Einwilligungsbanner.
            </p>
          </LegalSection>

          <LegalSection title="6. Kontaktaufnahme per E-Mail oder Telefon">
            <p>
              Wenn Sie mich per E-Mail oder telefonisch kontaktieren,
              verarbeite ich die von Ihnen dabei übermittelten Daten – etwa
              Ihren Namen, Ihre E-Mail-Adresse oder Telefonnummer und den Inhalt
              Ihrer Anfrage – ausschließlich zur Bearbeitung Ihres Anliegens.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre
              Anfrage der Anbahnung oder Durchführung eines Vertrags dient. In
              allen übrigen Fällen ist Rechtsgrundlage Art. 6 Abs. 1 lit. f
              DSGVO aufgrund meines berechtigten Interesses an der Beantwortung
              von Anfragen.
            </p>
            <p>
              Ich lösche diese Daten, sobald Ihr Anliegen abschließend
              bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
              entgegenstehen. Für geschäftliche Korrespondenz gelten
              handels- und steuerrechtliche Aufbewahrungsfristen von bis zu
              zehn Jahren (§ 257 HGB, § 147 AO).
            </p>
            <p>
              Bitte beachten Sie, dass die Übertragung unverschlüsselter
              E-Mails Sicherheitslücken aufweisen kann. Ein lückenloser Schutz
              vor dem Zugriff Dritter ist bei unverschlüsselter E-Mail nicht
              möglich.
            </p>
            <p>
              <strong className="text-white">E-Mail-Hosting:</strong> Den
              E-Mail-Dienst für die Adresse hi@sam-codes.com betreibe ich nicht
              selbst. Anbieter ist die IONOS SE, Elgendorfer Straße 57, 56410
              Montabaur, Deutschland. IONOS verarbeitet die Inhalts- und
              Verkehrsdaten Ihrer E-Mails ausschließlich weisungsgebunden für
              mich, um die Nachrichten entgegenzunehmen, zu speichern und
              zuzustellen. Grundlage ist ein Vertrag über Auftragsverarbeitung
              nach Art. 28 DSGVO. Da IONOS ein Unternehmen mit Sitz in der
              Europäischen Union ist und die Daten nach Angaben des Anbieters in
              Rechenzentren innerhalb der EU verarbeitet werden, findet insoweit
              keine Übermittlung in ein Drittland statt. Einzelheiten finden Sie
              in den{" "}
              <ExtLink href="https://www.ionos.de/terms-gtc/datenschutzerklaerung/">
                Datenschutzhinweisen von IONOS
              </ExtLink>
              .
            </p>
          </LegalSection>

          <LegalSection title="7. Externe Links">
            <p>
              Diese Website enthält Links zu externen Angeboten, unter anderem
              zu GitHub und LinkedIn sowie zu Fachquellen in den
              Blogbeiträgen. Es handelt sich dabei ausschließlich um einfache
              Verlinkungen; es sind keine Social-Media-Plugins eingebunden, die
              bereits beim Laden dieser Seite Daten übertragen würden.
            </p>
            <p>
              Eine Verbindung zum jeweiligen Anbieter wird erst hergestellt,
              wenn Sie den Link aktiv anklicken. Dabei wird Ihre IP-Adresse an
              den Anbieter der Zielseite übermittelt. Auf die dortige
              Datenverarbeitung habe ich keinen Einfluss; es gelten die
              Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </LegalSection>

          <LegalSection title="8. Verschlüsselung">
            <p>
              Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung
              (HTTPS). Sie erkennen eine verschlüsselte Verbindung an dem
              Präfix „https://“ in der Adresszeile und am Schlosssymbol Ihres
              Browsers. Daten, die Sie an diese Website übermitteln, können
              dadurch nicht ohne Weiteres von Dritten mitgelesen werden.
            </p>
          </LegalSection>

          <LegalSection title="9. Ihre Rechte als betroffene Person">
            <p>Ihnen stehen gegenüber mir folgende Rechte zu:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
              <li>
                Einschränkung der Verarbeitung (Art. 18 DSGVO)
              </li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>
                Widerruf einer erteilten Einwilligung mit Wirkung für die
                Zukunft (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p>
              Zur Ausübung dieser Rechte genügt eine formlose Nachricht an die
              oben genannten Kontaktdaten.
            </p>
            <p>
              Unabhängig davon haben Sie das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Die
              für mich zuständige Aufsichtsbehörde ist:
            </p>
            <p>
              Berliner Beauftragte für Datenschutz und Informationsfreiheit
              <br />
              Alt-Moabit 59–61
              <br />
              10555 Berlin
              <br />
              <ExtLink href="https://www.datenschutz-berlin.de">
                www.datenschutz-berlin.de
              </ExtLink>
            </p>
          </LegalSection>

          <LegalSection title="10. Widerspruchsrecht nach Art. 21 DSGVO">
            <p className="border-l-2 border-emerald-500 pl-4">
              <strong className="text-white">
                Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
                Situation ergeben, jederzeit gegen die Verarbeitung Sie
                betreffender personenbezogener Daten Widerspruch einzulegen,
                die auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO erfolgt.
              </strong>{" "}
              Lege ich Widerspruch ein, werden Ihre personenbezogenen Daten
              nicht mehr auf dieser Grundlage verarbeitet, es sei denn, ich kann
              zwingende schutzwürdige Gründe für die Verarbeitung nachweisen,
              die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
              Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung
              von Rechtsansprüchen.
            </p>
          </LegalSection>

          <LegalSection title="11. Stand und Änderungen dieser Erklärung">
            <p>
              Stand dieser Datenschutzerklärung: {STAND}. Ich passe diese
              Erklärung an, sobald sich die technische Umsetzung der Website
              oder die rechtlichen Vorgaben ändern.
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

export default Datenschutz;
