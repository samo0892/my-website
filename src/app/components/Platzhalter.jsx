// Markiert in Entwuerfen eine Stelle, die noch echten Inhalt braucht, z. B.
// einen Praxisfall. Gut sichtbar, damit sie in der Vorschau auffaellt.
// scripts/check-seo.py bricht den Build ab, solange ein Platzhalter im
// HTML steht, so geht kein Entwurf versehentlich live.
const Platzhalter = ({ children }) => (
  <aside
    data-platzhalter
    className="not-prose my-8 rounded-lg border-2 border-dashed border-yellow-400 bg-yellow-400/10 px-5 py-4 text-yellow-200"
  >
    <p className="font-semibold mb-1">Platzhalter</p>
    <div className="text-sm">{children}</div>
  </aside>
);

export default Platzhalter;
