// Hebt die Sprache eines Codeblocks von <pre> auf die umschliessende
// <figure>, die rehype-pretty-code erzeugt.
//
// Das Badge wird per CSS als ::before der figure gerendert. Die figure
// braucht das Attribut deshalb selbst: attr() liest nur Attribute des
// eigenen Elements, und ein ::before im <pre> wuerde beim horizontalen
// Scrollen mit dem Code wegwandern.

// Fences wie ```java tragen den Shiki-Namen, im Badge soll die uebliche
// Schreibweise stehen. Sprachen ohne Eintrag werden unveraendert
// uebernommen.
const LABELS = {
  bash: "Bash",
  java: "Java",
  javascript: "JavaScript",
  json: "JSON",
  kotlin: "Kotlin",
  properties: "Properties",
  shell: "Shell",
  sql: "SQL",
  typescript: "TypeScript",
  xml: "XML",
  yaml: "YAML",
};

// Fuer die ASCII-Diagramme in den Artikeln waere ein Badge nur Rauschen.
const WITHOUT_BADGE = ["text", "plaintext", "txt", "plain"];

const isFigure = (node) =>
  node.type === "element" &&
  node.properties?.["data-rehype-pretty-code-figure"] !== undefined;

const label = (figure) => {
  const pre = figure.children.find(
    (child) => child.type === "element" && child.tagName === "pre"
  );
  const language = pre?.properties?.["data-language"];

  if (!language || WITHOUT_BADGE.includes(language)) return null;
  return LABELS[language] ?? language;
};

const visit = (node) => {
  if (isFigure(node)) {
    const text = label(node);
    if (text) node.properties["data-language-label"] = text;
  }

  node.children?.forEach(visit);
};

// Muss nach rehype-pretty-code laufen, vorher existiert die figure nicht.
export default function rehypeCodeLanguage() {
  return (tree) => {
    visit(tree);
  };
}
