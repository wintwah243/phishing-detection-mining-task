import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

const logEntries = [
  { id: "week-2", date: "Week 2", title: "Sourcing & first look at the data", excerpt: "Merged phishing and legitimate URL sources into one corpus. Class imbalance was worse than expected — about 1:6." },
  { id: "week-5", date: "Week 5", title: "First feature-extraction pass", excerpt: "Lexical features implemented and sanity-checked against known phishing samples. Entropy alone was surprisingly weak." },
  { id: "week-8", date: "Week 8", title: "Benchmarking three models", excerpt: "Compared a tree ensemble against an anomaly-detection baseline. Documented where each one fails." },
];

export default function MiningLog() {
  return (
    <section id="log" className="bg-panel border-y border-hair">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
              04 · Mining Log
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink max-w-xl">
              The lab notebook for this project, kept in the open.
            </h2>
          </div>

          <Link to="/log" className="font-mono text-xs flex items-center gap-1.5 text-muted hover:text-ink transition-colors shrink-0">
            <BookOpen size={14} /> View all entries
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {logEntries.map((e) => (

            <Link key={e.id} to={`/preprocessingintro/${e.id}`} className="group border border-hair rounded-lg p-6 bg-panel2 hover:border-mutedDim transition-colors flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-mutedDim uppercase tracking-wider mb-4">
                <Calendar size={12} />
                {e.date}
              </div>
              <h3 className="font-display text-lg text-ink mb-2">{e.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">{e.excerpt}</p>
              <span className="mt-auto font-mono text-xs text-data flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Read entry <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}