import React from "react";
import NavLink from "./NavLink";

// Ein- und ausgeblendet ueber die Klasse statt ueber das hidden-Attribut:
// Tailwinds flex wuerde das hidden-Attribut sonst ueberstimmen.
const MenuOverlay = ({ id, open, links, onLinkClick }) => {
  return (
    <ul
      id={id}
      className={open ? "flex flex-col py-4 items-center md:hidden" : "hidden"}
    >
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} onClick={onLinkClick} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
