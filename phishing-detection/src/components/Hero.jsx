import React from "react";
import { ArrowRight } from "lucide-react";
import UrlAnatomy from "./UrlAnatomy";
import FeatureVector from "./FeatureVector";
import { c } from "../constants/theme";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-texture pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <p className="rise rise-1 font-mono text-xs tracking-widest text-mutedDim uppercase mb-5">
          Data & Knowledge Mining · Final Year Project · NLP Lab
        </p>

        <h1 className="rise rise-2 font-display text-ink text-4xl sm:text-6xl leading-[1.08] max-w-3xl">
          Teaching a model to read{" "}
          <span className="italic text-data">between the lines</span> of a URL.
        </h1>

        <p className="rise rise-3 font-body text-muted text-base sm:text-lg max-w-xl mt-6 leading-relaxed">
          A mining pipeline that separates ordinary web addresses from phishing
          attempts and structural anomalies — built on lexical, host-based, and
          content-based features. Every experiment, failure, and result is
          logged here as the project develops.
        </p>

        <div className="rise rise-4 flex flex-wrap gap-3 mt-8">
          <a
            href="#log"
            className="flex items-center gap-2 font-mono text-sm px-5 py-3 rounded-md bg-data text-void font-medium hover:brightness-110 transition"
          >
            Open the mining log <ArrowRight size={15} />
          </a>
          <a
            href="#methodology"
            className="flex items-center gap-2 font-mono text-sm px-5 py-3 rounded-md border border-hair text-ink hover:border-mutedDim transition"
          >
            See the methodology
          </a>
        </div>

        <div className="rise rise-4 mt-14 border border-hair rounded-xl bg-panel p-5 sm:p-7">
          <p className="font-mono text-[11px] text-mutedDim uppercase tracking-wider mb-4">
            Sample input → feature extraction
          </p>
          <UrlAnatomy />
          <div className="h-px bg-hair my-5" style={{ backgroundColor: c.border }} />
          <FeatureVector />
        </div>
      </div>
    </section>
  );
}