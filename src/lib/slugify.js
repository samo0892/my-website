// Anker fuer Ueberschriften. Umlaute werden umschrieben statt
// prozentkodiert, damit Sprunglinks wie #schritt-4-dokumente-mit-spring-ai
// lesbar bleiben, wenn jemand sie teilt.
const UMLAUTS = { ä: "ae", ö: "oe", ü: "ue", ß: "ss" };

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => UMLAUTS[c])
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Gleiche Ueberschriften bekommen -2, -3 ... angehaengt. Inhaltsverzeichnis
// und Rehype-Schritt muessen dieselbe Reihenfolge durchlaufen (h2 und h3),
// sonst zeigen die Links auf die falsche Stelle.
export const createSlugger = () => {
  const seen = new Map();
  return (text) => {
    const base = slugify(text) || "abschnitt";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };
};
