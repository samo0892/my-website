import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex justify-between">
        <span>                            <img src="/images/sam-codes-logo.svg" alt="sam.codes Logo" width="200" height="40" />
</span>
        <p className="text-slate-600">All rights reserved.</p>
        <div className="flex flex-row gap-4">
          <a
            href="/feed.xml"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            RSS
          </a>
          <Link
            href="/impressum"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
