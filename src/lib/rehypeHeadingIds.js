import { createSlugger } from "./slugify";

// Setzt ids auf h2 und h3 der Artikel, damit das Inhaltsverzeichnis und
// geteilte Links direkt auf einen Abschnitt springen koennen. Die Liste fuer
// das Inhaltsverzeichnis baut lib/blog.js aus dem Markdown, mit demselben
// Slugger.

const textOf = (node) =>
  node.type === "text"
    ? node.value
    : (node.children ?? []).map(textOf).join("");

const visit = (node, slug) => {
  if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
    node.properties = { ...node.properties, id: slug(textOf(node).trim()) };
  }
  node.children?.forEach((child) => visit(child, slug));
};

export default function rehypeHeadingIds() {
  return (tree) => {
    visit(tree, createSlugger());
  };
}
