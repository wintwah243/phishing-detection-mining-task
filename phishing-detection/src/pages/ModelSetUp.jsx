import React from "react";
import { ArrowLeft, Split, Target, Settings, Cpu, Check, ArrowRight, Layers, BarChart3, TrendingUp, Zap } from "lucide-react";

const c = {
  void: "#0B0F14",
  panel: "#121821",
  panel2: "#161D28",
  border: "#212B37",
  ink: "#E7E9EC",
  muted: "#8593A2",
  mutedDim: "#57636F",
  alert: "#FF6B4A",
  safe: "#3ECF8E",
  data: "#FFC857",
  info: "#8AB4F8",
};

const globalCss = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
:root { color-scheme: dark; }
.font-display { font-family: 'Fraunces', serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }
.font-body { font-family: 'Inter', sans-serif; }
.bg-void { background-color: ${c.void}; }
.bg-panel { background-color: ${c.panel}; }
.bg-panel2 { background-color: ${c.panel2}; }
.border-hair { border-color: ${c.border}; }
.text-ink { color: ${c.ink}; }
.text-muted { color: ${c.muted}; }
.text-mutedDim { color: ${c.mutedDim}; }
.text-alert { color: ${c.alert}; }
.text-safe { color: ${c.safe}; }
.text-data { color: ${c.data}; }
.text-info { color: ${c.info}; }
.bg-alert-10 { background-color: rgba(255,107,74,0.10); }
.bg-safe-10 { background-color: rgba(62,207,142,0.10); }
.bg-data-10 { background-color: rgba(255,200,87,0.10); }
.bg-info-10 { background-color: rgba(138,180,248,0.10); }
a { text-decoration: none; }
`;

export default function ModelSetup() {
  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-hair"
        style={{ backgroundColor: "rgba(11,15,20,0.9)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-5">
          <a
            href="/preprocessingintro/week-5"
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4"
          >
            <ArrowLeft size={13} /> Back to methodologies
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-hair bg-data-10 flex items-center justify-center shrink-0">
              <Settings size={17} className="text-data" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Model Setup
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Setting Up the Pipeline</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The model setup defines how the preprocessed data is used to train machine learning models
            for classifying website legitimacy. This pipeline ensures that the data is correctly split,
            labelled, transformed and fed into the chosen algorithms for reliable phishing detection.
          </p>
        </section>

        {/* Step 1: Data Splitting */}
        <section>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-info-10 flex items-center justify-center shrink-0 mt-1">
              <Split size={20} className="text-info" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl text-ink">Data Splitting</h2>
                <span className="font-mono text-xs bg-panel2 text-mutedDim px-3 py-1 rounded-full border border-hair">Step 1</span>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-4">
                <div className="bg-panel2 p-4 rounded-lg border border-hair">
                  <p className="font-mono text-xs text-safe uppercase tracking-wider">Training set</p>
                  <p className="font-display text-2xl text-ink mt-1">80%</p>
                  <p className="font-body text-sm text-muted mt-1">Used to fit the model parameters.</p>
                </div>
                <div className="bg-panel2 p-4 rounded-lg border border-hair">
                  <p className="font-mono text-xs text-alert uppercase tracking-wider">Test set</p>
                  <p className="font-display text-2xl text-ink mt-1">20%</p>
                  <p className="font-body text-sm text-muted mt-1">Held out for final evaluation.</p>
                </div>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                Stratified sampling ensures both subsets maintain similar class proportions as the original
                data. A fixed <span className="text-ink">random state of 42</span> guarantees reproducible
                partitions across all analyses.
              </p>
            </div>
          </div>
        </section>

        {/* Step 2: Target Labels */}
        <section className="border-t border-hair pt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-safe-10 flex items-center justify-center shrink-0 mt-1">
              <Target size={20} className="text-safe" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl text-ink">Target Labels</h2>
                <span className="font-mono text-xs bg-panel2 text-mutedDim px-3 py-1 rounded-full border border-hair">Step 2</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-4">
                <div className="bg-panel2 p-4 rounded-lg border border-hair flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-safe-10 flex items-center justify-center">
                    <span className="font-mono text-sm text-safe font-bold">0</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-safe uppercase tracking-wider">Legitimate</p>
                    <p className="font-body text-sm text-muted">Safe, normal URLs</p>
                  </div>
                </div>
                <div className="bg-panel2 p-4 rounded-lg border border-hair flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-alert-10 flex items-center justify-center">
                    <span className="font-mono text-sm text-alert font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-alert uppercase tracking-wider">Phishing</p>
                    <p className="font-body text-sm text-muted">Suspicious, fraudulent URLs</p>
                  </div>
                </div>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                The target variable is binary encoded. Extracted lexical, structural and domain features
                are evaluated against these ground truth labels.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3: Feature Extraction */}
        <section className="border-t border-hair pt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-data-10 flex items-center justify-center shrink-0 mt-1">
              <Layers size={20} className="text-data" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl text-ink">Feature Extraction</h2>
                <span className="font-mono text-xs bg-panel2 text-mutedDim px-3 py-1 rounded-full border border-hair">Step 3</span>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="bg-panel2 p-3 rounded-lg border border-hair">
                  <span className="font-mono text-xs text-info uppercase tracking-wider">Character-based</span>
                  <p className="font-body text-sm text-muted mt-0.5">URL length, special character counts</p>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair">
                  <span className="font-mono text-xs text-safe uppercase tracking-wider">Domain-level</span>
                  <p className="font-body text-sm text-muted mt-0.5">Domain length, TLD, subdomains</p>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair">
                  <span className="font-mono text-xs text-data uppercase tracking-wider">Security features</span>
                  <p className="font-body text-sm text-muted mt-0.5">HTTPS, SPF, redirects, IP presence</p>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair">
                  <span className="font-mono text-xs text-alert uppercase tracking-wider">Network indicators</span>
                  <p className="font-body text-sm text-muted mt-0.5">ASN, TTL, response time</p>
                </div>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                Continuous variables are standardised using <span className="text-ink">StandardScaler</span>,
                fitted only on the training set. Zero‑variance features are removed to reduce dimensionality.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: Model Training */}
        <section className="border-t border-hair pt-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-alert-10 flex items-center justify-center shrink-0 mt-1">
              <Cpu size={20} className="text-alert" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-display text-2xl text-ink">Model Training</h2>
                <span className="font-mono text-xs bg-panel2 text-mutedDim px-3 py-1 rounded-full border border-hair">Step 4</span>
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="bg-panel2 p-3 rounded-lg border border-hair flex items-center gap-2">
                  <BarChart3 size={16} className="text-info" />
                  <span className="font-mono text-sm text-ink">Logistic Regression</span>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair flex items-center gap-2">
                  <Split size={16} className="text-safe" />
                  <span className="font-mono text-sm text-ink">Random Forest</span>
                  <span className="font-mono text-[10px] text-mutedDim ml-auto">n_estimators=100</span>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair flex items-center gap-2">
                  <TrendingUp size={16} className="text-data" />
                  <span className="font-mono text-sm text-ink">HistGradientBoosting</span>
                </div>
                <div className="bg-panel2 p-3 rounded-lg border border-hair flex items-center gap-2">
                  <Zap size={16} className="text-alert" />
                  <span className="font-mono text-sm text-ink">XGBoost</span>
                </div>
              </div>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                All algorithms are trained on the preprocessed feature vectors. An inference pipeline
                continuously extracts character distribution, domain‑level properties, IP presence,
                SSL and shortening services from the input URL to produce the final phishing probability.
              </p>
            </div>
          </div>
        </section>

        {/* Visual summary — pipeline flow */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8">
          <h3 className="font-display text-lg text-ink mb-4">End‑to‑End Pipeline</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-mutedDim">
            <span className="bg-panel px-3 py-2 rounded border border-hair">Raw URL</span>
            <ArrowRight size={14} className="text-mutedDim" />
            <span className="bg-panel px-3 py-2 rounded border border-hair">Preprocessing</span>
            <ArrowRight size={14} className="text-mutedDim" />
            <span className="bg-panel px-3 py-2 rounded border border-hair">Feature Extraction</span>
            <ArrowRight size={14} className="text-mutedDim" />
            <span className="bg-panel px-3 py-2 rounded border border-hair">Standardization</span>
            <ArrowRight size={14} className="text-mutedDim" />
            <span className="bg-panel px-3 py-2 rounded border border-hair border-data text-data">Model Training</span>
            <ArrowRight size={14} className="text-mutedDim" />
            <span className="bg-panel px-3 py-2 rounded border border-hair border-safe text-safe">Phishing Probability</span>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}