import React from "react";
import { ArrowLeft, Shield, TrendingUp, GitBranch, Zap, BarChart3, Target, Award, CheckCircle, Info } from "lucide-react";

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

const crossValidationData = [
  {
    model: "XGBoost",
    icon: <Zap size={18} className="text-alert" />,
    meanAccuracy: "95.52%",
    stability: "± 0.45%",
    color: "text-alert",
    bg: "bg-alert-10",
    rank: 1,
  },
  {
    model: "HistGradientBoosting",
    icon: <BarChart3 size={18} className="text-data" />,
    meanAccuracy: "93.05%",
    stability: "± 0.52%",
    color: "text-data",
    bg: "bg-data-10",
    rank: 2,
  },
  {
    model: "Random Forest",
    icon: <GitBranch size={18} className="text-safe" />,
    meanAccuracy: "92.74%",
    stability: "± 0.38%",
    color: "text-safe",
    bg: "bg-safe-10",
    rank: 3,
  },
  {
    model: "Logistic Regression",
    icon: <Target size={18} className="text-info" />,
    meanAccuracy: "90.85%",
    stability: "± 0.42%",
    color: "text-info",
    bg: "bg-info-10",
    rank: 4,
  },
];

// Sort by mean accuracy descending
crossValidationData.sort((a, b) => {
  const aVal = parseFloat(a.meanAccuracy);
  const bVal = parseFloat(b.meanAccuracy);
  return bVal - aVal;
});

export default function CrossValidation() {
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
            <div className="w-10 h-10 rounded-md border border-hair bg-safe-10 flex items-center justify-center shrink-0">
              <Shield size={17} className="text-safe" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Cross-Validation</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            To evaluate model stability and generalisation,{' '}
            <strong className="text-ink">5‑fold stratified cross‑validation</strong> was performed for
            all models. Each model was trained on four folds and validated on the remaining fold,
            repeating this process five times. The mean accuracy and standard deviation across folds
            are reported in the table below.
          </p>
        </section>

        {/* Cross-Validation Table */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Results</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Cross-Validation Accuracy &amp; Stability
          </h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-hair bg-panel2">
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-left">Model</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">Mean Accuracy</th>
                    <th className="font-mono text-xs text-mutedDim uppercase tracking-wider px-4 py-3 text-right">Stability (Std Dev)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hair">
                  {crossValidationData.map((item, index) => (
                    <tr key={item.model} className={`hover:bg-panel2/50 transition-colors ${index === 0 ? 'bg-panel2/30' : ''}`}>
                      <td className="px-4 py-3 font-mono text-sm text-ink flex items-center gap-2">
                        <span className={`${item.bg} p-1 rounded`}>{item.icon}</span>
                        {item.model}
                        {index === 0 && <span className="ml-2 font-mono text-[10px] text-data bg-data-10 px-2 py-0.5 rounded-full">Best</span>}
                      </td>
                      <td className="px-4 py-3 font-display text-lg text-ink text-right">{item.meanAccuracy}</td>
                      <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">{item.stability}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-hair bg-panel2">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="3">
                      Table 4.2: Cross-Validation Accuracy and Stability for All Models
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Visual Summary Cards */}
        <section className="grid sm:grid-cols-2 gap-5">
          {/* Highest Accuracy */}
          <div className="border border-hair rounded-lg bg-panel p-5 border-alert/30">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-alert" />
              <span className="font-mono text-xs uppercase tracking-wider text-alert">Highest accuracy</span>
            </div>
            <div>
              <p className="font-display text-xl text-ink">XGBoost</p>
              <p className="font-body text-sm text-muted">
                Mean accuracy: <span className="text-ink">95.52%</span> &middot; Std: <span className="text-ink">±0.45%</span>
              </p>
              <p className="font-body text-xs text-mutedDim mt-2">
                Achieves the highest mean accuracy while maintaining low variability across folds.
              </p>
            </div>
          </div>

          {/* Lowest Variance */}
          <div className="border border-hair rounded-lg bg-panel p-5 border-safe/30">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-safe" />
              <span className="font-mono text-xs uppercase tracking-wider text-safe">Most stable</span>
            </div>
            <div>
              <p className="font-display text-xl text-ink">Random Forest</p>
              <p className="font-body text-sm text-muted">
                Mean accuracy: <span className="text-ink">92.74%</span> &middot; Std: <span className="text-ink">±0.38%</span>
              </p>
              <p className="font-body text-xs text-mutedDim mt-2">
                Exhibits the lowest variance across folds, demonstrating excellent generalisation.
              </p>
            </div>
          </div>
        </section>

        {/* Interpretation */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">Interpretation</h3>
          </div>
          <div className="space-y-4 text-sm text-muted leading-relaxed">
            <p>
              The results indicate that <strong className="text-ink">XGBoost</strong> achieves the
              highest mean accuracy (<span className="text-ink">95.52%</span>) while maintaining low
              variability across folds (±0.45%), demonstrating both strong predictive performance and
              stable generalisation.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <span className="font-mono text-xs text-safe uppercase tracking-wider">Lowest variance</span>
                <p className="mt-1 text-muted">
                  <strong className="text-ink">Random Forest</strong> exhibits the lowest standard
                  deviation (±0.38%), making it the most stable model across folds.
                </p>
              </div>
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <span className="font-mono text-xs text-info uppercase tracking-wider">Baseline</span>
                <p className="mt-1 text-muted">
                  <strong className="text-ink">Logistic Regression</strong> performs slightly lower
                  (90.85%) with good stability (±0.42%), confirming its role as a reliable baseline.
                </p>
              </div>
            </div>
            <p className="mt-2">
              Random Forest and HistGradientBoosting also show competitive accuracy with higher
              stability, demonstrating that ensemble methods consistently outperform the baseline
              while maintaining robust generalisation.
            </p>
          </div>
        </section>

        {/* Quick Stats Footer */}
        <section className="grid sm:grid-cols-4 gap-3">
          <div className="border border-hair rounded-lg bg-panel2 p-4 text-center">
            <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Folds</p>
            <p className="font-display text-xl text-ink">5</p>
          </div>
          <div className="border border-hair rounded-lg bg-panel2 p-4 text-center">
            <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Best Model</p>
            <p className="font-display text-xl text-alert">XGBoost</p>
          </div>
          <div className="border border-hair rounded-lg bg-panel2 p-4 text-center">
            <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Highest Accuracy</p>
            <p className="font-display text-xl text-safe">95.52%</p>
          </div>
          <div className="border border-hair rounded-lg bg-panel2 p-4 text-center">
            <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Most Stable</p>
            <p className="font-display text-xl text-info">Random Forest</p>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}