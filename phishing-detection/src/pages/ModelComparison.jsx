import React from "react";
import { ArrowLeft, Table, BarChart3, CheckCircle, AlertCircle, TrendingUp, Shield, Zap, GitBranch, Target } from "lucide-react";

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

const models = [
  {
    name: "XGBoost",
    icon: <Zap size={18} className="text-alert" />,
    macroPrecision: 0.92,
    macroRecall: 0.92,
    macroF1: 0.92,
    weightedPrecision: 0.93,
    weightedRecall: 0.93,
    weightedF1: 0.93,
    color: "text-alert",
    bg: "bg-alert-10",
  },
  {
    name: "HistGradientBoosting",
    icon: <BarChart3 size={18} className="text-data" />,
    macroPrecision: 0.93,
    macroRecall: 0.92,
    macroF1: 0.92,
    weightedPrecision: 0.93,
    weightedRecall: 0.93,
    weightedF1: 0.93,
    color: "text-data",
    bg: "bg-data-10",
  },
  {
    name: "Random Forest",
    icon: <GitBranch size={18} className="text-safe" />,
    macroPrecision: 0.92,
    macroRecall: 0.92,
    macroF1: 0.92,
    weightedPrecision: 0.93,
    weightedRecall: 0.93,
    weightedF1: 0.92,
    color: "text-safe",
    bg: "bg-safe-10",
  },
  {
    name: "Logistic Regression",
    icon: <Target size={18} className="text-info" />,
    macroPrecision: 0.92,
    macroRecall: 0.90,
    macroF1: 0.91,
    weightedPrecision: 0.92,
    weightedRecall: 0.92,
    weightedF1: 0.92,
    color: "text-info",
    bg: "bg-info-10",
  },
];

// Sort by macro F1 descending
models.sort((a, b) => b.macroF1 - a.macroF1);

export default function ModelComparison() {
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
            href="/preprocessingintro/week-8"
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4"
          >
            <ArrowLeft size={13} /> Back to evaluation
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-hair bg-data-10 flex items-center justify-center shrink-0">
              <Table size={17} className="text-data" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Model Comparison</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The predictive performance of the four models was compared using the macro and weighted averages
            of precision, recall, and F1‑score. The results are summarised in the table below.
          </p>
        </section>

        {/* Performance Table */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Comparison results</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Performance metrics side by side
          </h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hair bg-panel2">
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-left">Model</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right" colSpan="3">Macro</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right" colSpan="3">Weighted</th>
                  </tr>
                  <tr className="border-b border-hair bg-panel2">
                    <th className="px-4 py-2"></th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">Precision</th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">Recall</th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">F1</th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">Precision</th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">Recall</th>
                    <th className="font-mono text-[10px] text-mutedDim uppercase tracking-wider px-2 py-2 text-right">F1</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hair">
                  {models.map((model, index) => (
                    <tr key={model.name} className={`hover:bg-panel2/50 transition-colors ${index === 1 ? 'bg-panel2/30' : ''}`}>
                      <td className="px-4 py-3 font-mono text-sm text-ink flex items-center gap-2 whitespace-nowrap">
                        <span className={model.bg + " p-1 rounded"}>{model.icon}</span>
                        {model.name}
                        {index === 0 && <span className="ml-2 font-mono text-[10px] text-data bg-data-10 px-2 py-0.5 rounded-full">Best</span>}
                      </td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.macroPrecision.toFixed(2)}</td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.macroRecall.toFixed(2)}</td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.macroF1.toFixed(2)}</td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.weightedPrecision.toFixed(2)}</td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.weightedRecall.toFixed(2)}</td>
                      <td className="px-2 py-3 font-mono text-sm text-ink text-right">{model.weightedF1.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-hair bg-panel2">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="7">
                      Table 4.1: Performance Comparison of Classification Models
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Visual Summary — Best performer highlights */}
        <section className="grid sm:grid-cols-2 gap-5">
          <div className="border border-hair rounded-lg bg-panel p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-data" />
              <span className="font-mono text-xs uppercase tracking-wider text-data">Best overall</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap size={28} className="text-alert" />
              <div>
                <p className="font-display text-xl text-ink">HistGradientBoosting</p>
                <p className="font-body text-sm text-muted">
                  Weighted F1: <span className="text-ink">0.93</span> &middot; Macro F1: <span className="text-ink">0.92</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border border-hair rounded-lg bg-panel p-5 border-safe/30">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-safe" />
              <span className="font-mono text-xs uppercase tracking-wider text-safe">Proposed Model</span>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch size={28} className="text-safe" />
              <div>
                <p className="font-display text-xl text-ink">XGBoost</p>
                <p className="font-body text-sm text-muted">
                  Phishing Recall: <span className="text-ink">0.90</span> &middot; FN: <span className="text-ink">69</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle size={20} className="text-safe" />
            <h3 className="font-display text-xl text-ink">Why XGBoost?</h3>
          </div>
          <div className="space-y-4 text-sm text-muted leading-relaxed">
            <p>
              Based on the provided comparison, the application of ensemble methods significantly improves
              the results compared to the baseline model of Logistic Regression. While HistGradientBoosting achieved the
              highest overall accuracy, <strong className="text-ink">XGBoost</strong> demonstrated a
              lower FN for the <span className="text-alert">Phishing</span> class, making it better
              suited for the problem at hand.
            </p>
            <p>
              In phishing detection domains, minimising <strong className="text-alert">False Negatives (FN)</strong>
              — failing to detect an actual phishing URL — is far more critical than overall accuracy, as
              undetected malicious sites expose users to immediate security breaches.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <p className="font-mono text-xs text-safe uppercase tracking-wider">XGBoost</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-muted">
                  <li>Phishing Recall: <span className="text-ink">0.90</span></li>
                  <li>True Phishing: <span className="text-ink">622</span></li>
                  <li>False Negatives: <span className="text-ink">69</span></li>
                </ul>
              </div>
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <p className="font-mono text-xs text-data uppercase tracking-wider">HistGradientBoosting</p>
                <ul className="mt-2 space-y-1 list-disc list-inside text-muted">
                  <li>Phishing Recall: <span className="text-ink">0.92</span></li>
                  <li>True Phishing: <span className="text-ink">612</span></li>
                  <li>False Negatives: <span className="text-ink">79</span></li>
                </ul>
              </div>
            </div>
            <p>
              Consequently,{' '}
              <strong className="text-safe">XGBoost was selected as the proposed primary classification
              model for real‑time URL evaluation.</strong>
            </p>
          </div>
        </section>

        {/* Confusion Matrix Insight */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={20} className="text-info" />
            <h3 className="font-display text-xl text-ink">Confusion Matrix Insight</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-panel p-4 rounded-lg border border-hair">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Actual Legitimate</p>
              <p className="font-display text-xl text-safe mt-1">1,227</p>
              <p className="text-xs text-muted">Correctly predicted</p>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-hair">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Actual Phishing</p>
              <p className="font-display text-xl text-safe mt-1">622</p>
              <p className="text-xs text-muted">Correctly predicted</p>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-hair border-alert/30">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">False Negatives</p>
              <p className="font-display text-xl text-alert mt-1">69</p>
              <p className="text-xs text-muted">Phishing missed</p>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim text-center mt-4">
            XGBoost minimises False Negatives, which is critical for protecting users.
          </p>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}