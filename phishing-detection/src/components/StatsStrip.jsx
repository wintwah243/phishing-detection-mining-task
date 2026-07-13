import React from "react";

const stats = [
  { value: "10,000+", label: "URLs sourced" },
  { value: "40+", label: "engineered features" },
  { value: "3", label: "models benchmarked" },
  { value: "97.8%", label: "best F1-score" },
];

export default function StatsStrip() {
  return (
    <section className="border-y border-hair bg-panel">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={i > 0 ? "sm:pl-6 sm:border-l border-hair" : ""}>
            <p className="font-display text-2xl sm:text-3xl text-ink">{s.value}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}