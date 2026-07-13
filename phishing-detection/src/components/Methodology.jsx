import React from "react";
import { Database, Wrench, BarChart3, ClipboardCheck, Link2 } from "lucide-react";
import { c } from "../constants/theme";

const steps = [
  { n: "01", icon: Database, title: "Data Collection", desc: "Labeled URLs pulled from phishing feeds and legitimate-site rankings, then merged into one working corpus." },
  { n: "02", icon: Wrench, title: "Preprocessing", desc: "Deduplication, normalization, and handling class imbalance between phishing and legitimate samples." },
  { n: "03", icon: Link2, title: "Feature Extraction", desc: "Lexical, host-based, and content-based features derived from each URL's structure and metadata." },
  { n: "04", icon: BarChart3, title: "Modeling", desc: "Classification and anomaly-detection models trained and compared under the same evaluation protocol." },
  { n: "05", icon: ClipboardCheck, title: "Evaluation", desc: "Precision, recall, and F1 measured per model; false positives and negatives reviewed and documented." },
];

export default function Methodology() {
  return (
    <section id="methodology" className="bg-panel border-y border-hair">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
          02 · Methodology
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-12 max-w-xl">
          Five stages, in the order the data actually moves through them.
        </h2>

        <div className="grid md:grid-cols-5 gap-6 md:gap-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-5 left-[calc(100%-0.5rem)] w-full h-px"
                    style={{ backgroundColor: c.border }}
                  />
                )}
                <div className="flex md:flex-col gap-4 md:gap-0">
                  <div className="flex items-center gap-3 md:mb-4">
                    <div className="w-10 h-10 rounded-md border border-hair bg-panel2 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-data" />
                    </div>
                    <span className="font-mono text-xs text-mutedDim md:hidden">{s.n}</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-mutedDim mb-1 hidden md:block">{s.n}</p>
                    <h3 className="font-display text-lg text-ink mb-1.5">{s.title}</h3>
                    <p className="font-body text-sm text-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}