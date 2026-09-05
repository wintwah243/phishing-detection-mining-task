import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

const logEntries = [
  {
    id: "week-2",
    date: "Week 2",
    title: "Data Preprocessing and Preparation",
    excerpt:
      "Handling missing values, Data transformation, Feature Selection, Data Normalization and Data Visualization.",
  },
  {
    id: "week-5",
    date: "Week 5",
    title: "Applied Methodologies and Mining",
    excerpt:
      "Descriptive mining, Modeling, Applied methodologies, Model Set up, Basline Model and Proposed Model",
  },
  {
    id: "week-8",
    date: "Week 8",
    title: "Evaluation",
    excerpt:
      "Performance metrics, Model Comparison, Evaluation analysis, ROC curve & AUC, Cross validation and Findings.",
  },
];

export default function MiningLog() {
  return (
    <section id="log" className="bg-panel border-y border-hair">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
              04 · Mining Log
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-ink max-w-xl">
              The lab notebook for this project, kept in the open.
            </h2>
          </div>

          <Link
            to="/log"
            className="font-mono text-xs flex items-center gap-1.5 text-muted hover:text-ink transition-colors shrink-0"
          >
            <BookOpen size={14} /> View all entries
          </Link>
        </div>

        {/* Log entries grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {logEntries.map((entry) => (
            <Link
              key={entry.id}
              to={`/preprocessingintro/${entry.id}`}
              className="group border border-hair rounded-lg p-6 bg-panel2 hover:border-mutedDim transition-colors flex flex-col"
            >
              {/* Date */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-mutedDim uppercase tracking-wider mb-4">
                <Calendar size={12} />
                {entry.date}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg text-ink mb-2">
                {entry.title}
              </h3>

              {/* Excerpt */}
              <p className="font-body text-sm text-muted leading-relaxed mb-6">
                {entry.excerpt}
              </p>

              {/* Read link */}
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