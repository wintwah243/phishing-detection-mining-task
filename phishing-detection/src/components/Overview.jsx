import React from "react";
import { AlertTriangle, Shield } from "lucide-react";

export default function Overview() {
  return (
    <section id="overview" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
            01 · Overview
          </p>
          <h2 className="font-display text-3xl sm:text-4xl text-ink mb-5">
            Most phishing URLs look almost right.
          </h2>
          <p className="font-body text-muted leading-relaxed mb-4">
            Attackers rarely need a perfect copy of a domain — a misspelled brand
            name, an unfamiliar top-level domain, or an unusually long query
            string is often enough to fool a person in a hurry. This project
            treats that gap between "looks fine" and "is fine" as a data mining
            problem: extract structural signals from the URL itself and from
            what's known about its host, then classify or flag it as anomalous.
          </p>
          <p className="font-body text-muted leading-relaxed">
            The goal isn't just a working classifier — it's a documented mining
            process: what was tried, what failed, what the data actually looked
            like, and why the final approach was chosen.
          </p>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="border border-alert bg-alert-10 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-alert" />
              <span className="font-mono text-xs uppercase tracking-wider text-alert">
                Anomalous
              </span>
            </div>
            <p className="font-body text-sm text-muted">
              Unusual structure, mismatched brand keywords, suspicious host
              metadata — flagged for review or blocked outright.
            </p>
          </div>
          <div className="border border-safe bg-safe-10 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-safe" />
              <span className="font-mono text-xs uppercase tracking-wider text-safe">
                Legitimate
              </span>
            </div>
            <p className="font-body text-sm text-muted">
              Consistent structure and host signals matching known, trusted
              patterns in the training data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}