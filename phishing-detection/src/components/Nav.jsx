import React, { useState } from "react";
import { Link2, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/#overview", label: "Overview", isExternal: false },
    { href: "/#methodology", label: "Methodology", isExternal: false },
    { href: "/#dataset", label: "Dataset", isExternal: false },
    { href: "/#log", label: "Mining Log", isExternal: false },
    { href: "/#about", label: "About", isExternal: false },
    { href: "/dataset-dictionary", label: "Data Dictionary", isExternal: true },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b border-hair"
      style={{ backgroundColor: "rgba(11,15,20,0.85)", backdropFilter: "blur(10px)" }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="/#top" className="flex items-center gap-2 font-mono text-sm text-ink">
          <Link2 size={16} className="text-data" />
          <span className="tracking-tight">
            mining<span className="text-mutedDim">://</span>phish-url
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 font-body text-sm text-muted">
          {links.map((l) =>
            l.isExternal ? (
              <Link key={l.href} to={l.href} className="hover:text-ink transition-colors text-data">
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className="hover:text-ink transition-colors">
                {l.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-1.5 font-mono text-xs px-3.5 py-2 rounded-md border border-hair text-muted hover:text-ink hover:border-mutedDim transition-colors"
          >
            {/* Source icon can go here */}
          </a>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="md:hidden border-t border-hair bg-void px-5 py-4 flex flex-col gap-4 font-body text-sm text-muted">
          {links.map((l) =>
            l.isExternal ? (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-ink text-data"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-ink"
              >
                {l.label}
              </a>
            )
          )}
        </div>
      )}
    </header>
  );
}