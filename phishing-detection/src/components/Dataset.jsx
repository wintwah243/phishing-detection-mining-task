import React from "react";

const featureCategories = [
  { title: "Lexical features", tone: "data", items: ["URL length", "Dot / hyphen count", "Digit ratio", "Subdomain depth", "Character entropy"] },
  { title: "Host-based features", tone: "alert", items: ["IP address as host", "Domain age", "TLD rarity", "DNS record count", "ASN reputation"] },
  { title: "Content-based features", tone: "safe", items: ["Form-to-link ratio", "External resource ratio", "Title / domain match", "Redirect count"] },
];

export default function Dataset() {
  return (
    <section id="dataset" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
        03 · Dataset &amp; Features
      </p>
      <h2 className="font-display text-3xl sm:text-4xl text-ink mb-12 max-w-xl">
        Every URL becomes a row of numbers before it becomes a decision.
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {featureCategories.map((cat, i) => (
          <div key={i} className="border border-hair rounded-lg p-6 bg-panel">
            <span
              className={`font-mono text-[11px] uppercase tracking-wider ${
                cat.tone === "alert" ? "text-alert" : cat.tone === "safe" ? "text-safe" : "text-data"
              }`}
            >
              {cat.title}
            </span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {cat.items.map((it, j) => (
                <li key={j} className="font-body text-sm text-muted flex items-start gap-2">
                  <span className="text-mutedDim mt-1.5">·</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}