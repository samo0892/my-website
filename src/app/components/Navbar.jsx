"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

// Zur Startseite fuehrt das Logo, deshalb kein eigener Home-Link.
const navLinks = [
  {
    title: "Leistungen",
    path: "/leistungen",
  },
  {
    title: "Über mich",
    path: "/#about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Kontakt",
    path: "/#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-5xl text-white font-semibold"
        >
          <img
            src="/images/sam-codes-logo.svg"
            alt="sam.codes – zur Startseite"
            width="200"
            height="40"
          />
        </Link>

        <div className="mobile-menu block md:hidden">
          <button
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
            aria-label={navbarOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Anker wie /#about wechseln die Seite nicht, die Navbar bleibt also
          gemountet. Ohne explizites Schliessen bliebe das Menue offen.
          Das Menue steht immer im DOM, damit aria-controls ein Ziel hat. */}
      <MenuOverlay
        id="mobile-menu"
        open={navbarOpen}
        links={navLinks}
        onLinkClick={() => setNavbarOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
