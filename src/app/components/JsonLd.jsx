// Strukturierte Daten als <script type="application/ld+json">. "<" wird
// maskiert, damit ein "</script>" in Titel oder Beschreibung den Block
// nicht vorzeitig beendet.
const JsonLd = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    }}
  />
);

export default JsonLd;
