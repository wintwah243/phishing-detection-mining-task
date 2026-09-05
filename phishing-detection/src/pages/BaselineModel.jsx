import React from "react";
import { ArrowLeft, Split, Target, Settings, Cpu, BarChart3, TrendingUp, Zap, Shield, Award, Layers } from "lucide-react";

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

export default function BaselineModel() {
  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>

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
            <div className="w-10 h-10 rounded-md border border-hair bg-info-10 flex items-center justify-center shrink-0">
              <Award size={17} className="text-info" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Model Setup
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Baseline Model</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            A baseline model was established using <strong className="text-ink">Logistic Regression</strong>,
            which serves as a reference for comparison with more elaborate algorithms. Logistic Regression
            predicts the likelihood of a URL being legitimate or phishing based on lexical, structural,
            and network characteristics of the domain.
          </p>
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl mt-3">
            The baseline model acts as a simple descriptive model, against which the performance of more
            complex algorithms such as <span className="text-ink">Random Forest</span>,{' '}
            <span className="text-ink">HistGradientBoosting</span> and{' '}
            <span className="text-ink">XGBoost</span> can be compared, thus enabling an assessment of
            the added value of each subsequent algorithm.
          </p>
        </section>

        {/* Pipeline Flow */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8">
          <h3 className="font-display text-lg text-ink mb-4">Model Pipeline</h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-mutedDim">
            <span className="bg-panel px-3 py-2 rounded border border-hair">Raw URL</span>
            <ArrowLeft size={14} className="text-mutedDim rotate-180" />
            <span className="bg-panel px-3 py-2 rounded border border-hair">Preprocessing</span>
            <ArrowLeft size={14} className="text-mutedDim rotate-180" />
            <span className="bg-panel px-3 py-2 rounded border border-hair">Feature Extraction</span>
            <ArrowLeft size={14} className="text-mutedDim rotate-180" />
            <span className="bg-panel px-3 py-2 rounded border border-hair border-info text-info">Logistic Regression</span>
            <ArrowLeft size={14} className="text-mutedDim rotate-180" />
            <span className="bg-panel px-3 py-2 rounded border border-hair border-safe text-safe">Phishing Probability</span>
          </div>
        </section>

        {/* Results Summary */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Performance metrics</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Logistic Regression Results
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Accuracy</p>
              <p className="font-display text-3xl text-safe mt-1">91.10%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Precision</p>
              <p className="font-display text-3xl text-info mt-1">89.78%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Recall</p>
              <p className="font-display text-3xl text-data mt-1">83.94%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">F1-Score</p>
              <p className="font-display text-3xl text-alert mt-1">86.76%</p>
            </div>
          </div>
        </section>

        {/* Classification Report Table */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Detailed breakdown</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Classification Report
          </h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hair bg-panel2">
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-left">Class</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">Precision</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">Recall</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">F1-Score</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hair">
                  <tr className="hover:bg-panel2/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-safe flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-safe" />
                      Legitimate
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.92</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.95</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.93</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">1,298</td>
                  </tr>
                  <tr className="hover:bg-panel2/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-alert flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-alert" />
                      Phishing
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.90</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.84</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.87</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">691</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-hair bg-panel2">
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm text-ink font-bold">Accuracy</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right" colSpan="3">0.91</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">1,989</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="5">Macro avg: precision 0.91 · recall 0.89 · f1-score 0.90</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="5">Weighted avg: precision 0.91 · recall 0.91 · f1-score 0.91</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Model Comparison Preview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Cpu size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">Next Steps: Model Comparison</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-muted leading-relaxed">
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-safe uppercase tracking-wider">Random Forest</span>
              <p className="mt-1">Ensemble of decision trees. Expected to improve accuracy by capturing non‑linear relationships.</p>
            </div>
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-data uppercase tracking-wider">HistGradientBoosting</span>
              <p className="mt-1">Histogram‑based gradient boosting. Designed for speed and memory efficiency with skewed data.</p>
            </div>
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-alert uppercase tracking-wider">XGBoost</span>
              <p className="mt-1">Extreme Gradient Boosting. Optimised for complex feature interactions and structured data.</p>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim mt-4 text-center">
            The baseline model will be compared against these algorithms to assess the added value of each.
          </p>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}