import React from "react";
import { ArrowLeft, BarChart3, CheckCircle, AlertCircle, TrendingUp, Shield, Zap, GitBranch, Target, Brain, Layers } from "lucide-react";

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

export default function EvaluationAnalysis() {
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
            <div className="w-10 h-10 rounded-md border border-hair bg-info-10 flex items-center justify-center shrink-0">
              <Brain size={17} className="text-info" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Evaluation Analysis</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The evaluation results indicate that ensemble-based approaches outperform the baseline
            <strong className="text-ink"> Logistic Regression</strong> model. A detailed analysis of
            performance metrics, confusion matrices, and class imbalance effects provides insights into
            the strengths and trade-offs of each algorithm.
          </p>
        </section>

        {/* Key Findings Cards */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Key findings</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            What the metrics tell us
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Finding 1: Ensemble wins */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-safe" />
                <span className="font-mono text-xs uppercase tracking-wider text-safe">Finding 1</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">Ensemble Methods Lead</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Ensemble-based approaches (Random Forest, XGBoost, HistGradientBoosting) consistently
                outperform the baseline Logistic Regression model across all metrics.
              </p>
              <div className="mt-3 pt-3 border-t border-hair flex gap-4 text-xs font-mono text-mutedDim">
                <span>XGBoost: <span className="text-ink">F1 0.96</span></span>
                <span>Logistic: <span className="text-ink">F1 0.91</span></span>
              </div>
            </div>

            {/* Finding 2: XGBoost accuracy */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-alert" />
                <span className="font-mono text-xs uppercase tracking-wider text-alert">Finding 2</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">HistGradientBoosting – Highest Accuracy</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                HistGradientBoosting achieves the highest numerical accuracy and weighted F1‑score on the static
                test split, demonstrating its optimisation power for structured tabular data.
              </p>
              <div className="mt-3 pt-3 border-t border-hair text-xs font-mono text-mutedDim">
                Accuracy: <span className="text-ink">96%</span> &middot; Weighted F1: <span className="text-ink">0.96</span>
              </div>
            </div>

            {/* Finding 3: */}
            <div className="border border-hair rounded-lg p-5 bg-panel border-safe/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={18} className="text-safe" />
                <span className="font-mono text-xs uppercase tracking-wider text-safe">Finding 3</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">XGBoost – Superior Generalisation</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Despite HistGradientBoosting's statistical lead, XGBoost maintains superior performance on
                live inputs, achieving lower false negative rates.
              </p>
              <div className="mt-3 pt-3 border-t border-hair text-xs font-mono text-mutedDim">
                Phishing Recall: <span className="text-ink">0.90</span> &middot; FN: <span className="text-ink">72</span>
              </div>
            </div>

            {/* Finding 4: Class imbalance effect */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={18} className="text-data" />
                <span className="font-mono text-xs uppercase tracking-wider text-data">Finding 4</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">Class Imbalance Impact</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                The minority class (phishing instances, 3,453 samples) inherently affects macro average
                performance compared to weighted metrics due to class distribution variance.
              </p>
              <div className="mt-3 pt-3 border-t border-hair text-xs font-mono text-mutedDim">
                Legitimate: <span className="text-ink">6,491</span> &middot; Phishing: <span className="text-ink">3,453</span>
              </div>
            </div>
          </div>
        </section>

        {/*  Detailed Comparison */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">XGBoost vs HistGradientBoosting</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-panel2 p-5 rounded-lg border border-hair">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={20} className="text-alert" />
                <span className="font-mono text-sm text-ink font-semibold">HistGradientBoosting</span>
                <span className="ml-auto font-mono text-[10px] text-mutedDim bg-panel px-2 py-0.5 rounded">Statistical leader</span>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Highest accuracy on static test split</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Best weighted F1‑score (<span className="text-ink">0.93</span>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-data shrink-0 mt-0.5" />
                  <span>Optimised for structured tabular data</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-data shrink-0 mt-0.5" />
                  <span>Sequential boosting may overfit on complex patterns</span>
                </li>
              </ul>
            </div>


            <div className="bg-panel2 p-5 rounded-lg border border-hair border-safe/30">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={20} className="text-safe" />
                <span className="font-mono text-sm text-ink font-semibold">XGBoost</span>
                <span className="ml-auto font-mono text-[10px] text-safe bg-safe-10 px-2 py-0.5 rounded">Selected</span>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Superior generalisation on live inputs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Phishing recall (<span className="text-ink">0.90</span>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Lower false negatives (<span className="text-ink">69</span>)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Reduces variance & avoids over‑predicting majority class</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="font-body text-sm text-muted leading-relaxed mt-4 text-center">
            While HistGradientBoosting leads on the test split, XGBoost's superior lower
            false negative rate make it <strong className="text-safe">better suited for real‑world threat detection</strong>.
          </p>
        </section>

        {/* Confusion Matrix Insights */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Confusion matrix</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">Where misclassifications occur</h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            <div className="p-6">
              <p className="font-body text-sm text-muted leading-relaxed max-w-2xl">
                The confusion matrix analysis reveals that <strong className="text-ink">most misclassifications</strong>
                occur when phishing URLs share structural similarities with legitimate web patterns,
                reflecting subtle lexical and domain feature overlaps.
              </p>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="bg-panel2 p-4 rounded-lg border border-hair">
                  <p className="font-mono text-xs text-safe uppercase tracking-wider">Legitimate correctly identified</p>
                  <p className="font-display text-2xl text-safe mt-1">1,227</p>
                  <p className="text-xs text-muted">True Negatives (TN)</p>
                </div>
                <div className="bg-panel2 p-4 rounded-lg border border-hair">
                  <p className="font-mono text-xs text-safe uppercase tracking-wider">Phishing correctly identified</p>
                  <p className="font-display text-2xl text-safe mt-1">622</p>
                  <p className="text-xs text-muted">True Positives (TP)</p>
                </div>
                <div className="bg-panel2 p-4 rounded-lg border border-hair border-alert/30">
                  <p className="font-mono text-xs text-alert uppercase tracking-wider">Phishing misclassified</p>
                  <p className="font-display text-2xl text-alert mt-1">69</p>
                  <p className="text-xs text-muted">False Negatives (FN) — critical!</p>
                </div>
                <div className="bg-panel2 p-4 rounded-lg border border-hair">
                  <p className="font-mono text-xs text-data uppercase tracking-wider">Legitimate misclassified</p>
                  <p className="font-display text-2xl text-data mt-1">71</p>
                  <p className="text-xs text-muted">False Positives (FP)</p>
                </div>
              </div>

              <p className="font-body text-xs text-mutedDim mt-4 text-center">
                The minority class (phishing) affects macro average performance compared to weighted metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion — Recommendation */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8 border-safe/20">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={24} className="text-safe" />
            <h3 className="font-display text-xl text-ink">Final Recommendation</h3>
          </div>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              Despite HistGradientBoosting's statistical lead on the test split,{' '}
              <strong className="text-safe">XGBoost</strong> maintains superior generalisation
              on live inputs, achieving lower false negative rates —
              which are <strong className="text-ink">critical for real‑world threat detection</strong>.
            </p>
            <p>
              XGBoost avoids over‑predicting the majority
              legitimate class, making it the <strong className="text-ink">optimal choice</strong> for
              a production‑ready phishing detection system.
            </p>
            <div className="mt-4 pt-4 border-t border-hair flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-mutedDim">
              <span>✅ Highest phishing recall</span>
              <span>✅ Lowest false negative rate</span>
              <span>✅ Robust to class imbalance</span>
              <span>✅ Generalises to live inputs</span>
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}