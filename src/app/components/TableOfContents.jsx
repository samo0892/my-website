// Inhaltsverzeichnis fuer lange Artikel. <details> statt eines
// Client-Toggles: kein JavaScript, und die Links stehen trotzdem im HTML,
// auch wenn die Liste zugeklappt ist. Google nutzt solche Sprunglinks fuer
// "Springe zu"-Links in den Suchergebnissen.
const TableOfContents = ({ headings }) => (
  <nav
    aria-label="Inhaltsverzeichnis"
    className="not-prose mb-10 rounded-lg border border-[#33353F] bg-[#181818]"
  >
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
        <span>
          Inhalt{" "}
          <span className="font-normal text-[#ADB7BE]">
            ({headings.length} Abschnitte)
          </span>
        </span>
        <span
          aria-hidden="true"
          className="inline-block text-emerald-400 transition group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <ol className="list-decimal space-y-2 border-t border-[#33353F] py-4 pl-10 pr-5 text-[#ADB7BE] marker:text-slate-400">
        {headings.map(({ id, text }) => (
          <li key={id}>
            <a href={`#${id}`} className="hover:text-emerald-400 transition">
              {text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  </nav>
);

export default TableOfContents;
