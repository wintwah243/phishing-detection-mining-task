import React from "react";
import { ArrowLeft, Shield, TrendingUp, GitBranch, Zap, BarChart3, Target, Award, CheckCircle, AlertCircle, Info, Brain, Layers } from "lucide-react";

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

export default function Findings() {
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
              <Brain size={17} className="text-data" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Findings &amp; Recommendations</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Executive Summary */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The evaluation reveals that while <strong className="text-ink">XGBoost</strong> showcases
            exceptional numeric performance on static benchmarks,{' '}
            <strong className="text-safe">Random Forest</strong> emerges as the most practical
            classifier for <span className="text-ink">real‑time phishing URL detection</span>.
          </p>
        </section>

        {/* Key Findings Cards */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Key insights</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            What the evaluation reveals
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Finding 1: XGBoost Performance */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-alert" />
                <span className="font-mono text-xs uppercase tracking-wider text-alert">Finding 1</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">XGBoost Leads on Benchmarks</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                XGBoost achieves the highest numeric performance on static benchmarks with{' '}
                <span className="text-ink">95.78%</span> test accuracy and{' '}
                <span className="text-ink">95.52% ± 0.45%</span> cross‑validation accuracy.
              </p>
            </div>

            {/* Finding 2: Random Forest Practicality */}
            <div className="border border-hair rounded-lg p-5 bg-panel border-safe/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield size={18} className="text-safe" />
                <span className="font-mono text-xs uppercase tracking-wider text-safe">Finding 2</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">Random Forest for Real‑World</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Random Forest achieves better results for the positive class with higher phishing
                recall (<span className="text-ink">0.90</span>) and lower false negatives
                (<span className="text-ink">72</span> vs <span className="text-ink">79</span> for HGB).
              </p>
            </div>

            {/* Finding 3: Structural Similarities */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={18} className="text-data" />
                <span className="font-mono text-xs uppercase tracking-wider text-data">Finding 3</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">Misclassification Patterns</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                Most misclassifications occur due to structural similarities between legitimate and
                phishing URLs, reflecting subtle lexical and domain feature overlaps.
              </p>
            </div>

            {/* Finding 4: ROC-AUC Performance */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-info" />
                <span className="font-mono text-xs uppercase tracking-wider text-info">Finding 4</span>
              </div>
              <h3 className="font-display text-lg text-ink mb-1">Excellent Class Separation</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                High ROC‑AUC values (<span className="text-ink">0.9734</span>) across all models highlight
                the classifiers' ability to distinguish between legitimate and phishing classes.
              </p>
            </div>
          </div>
        </section>

        {/* XGBoost vs Random Forest Deep Dive */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">XGBoost vs Random Forest</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* XGBoost */}
            <div className="bg-panel2 p-5 rounded-lg border border-hair">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={20} className="text-alert" />
                <span className="font-mono text-sm text-ink font-semibold">XGBoost</span>
                <span className="ml-auto font-mono text-[10px] text-mutedDim bg-panel px-2 py-0.5 rounded">Benchmark leader</span>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-alert shrink-0 mt-0.5" />
                  <span>Test accuracy: <span className="text-ink">95.78%</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-alert shrink-0 mt-0.5" />
                  <span>CV accuracy: <span className="text-ink">95.52% ± 0.45%</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-data shrink-0 mt-0.5" />
                  <span>Focuses on global performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle size={16} className="text-data shrink-0 mt-0.5" />
                  <span>Variance can reach <span className="text-ink">15%</span> depending on training set</span>
                </li>
              </ul>
            </div>

            {/* Random Forest */}
            <div className="bg-panel2 p-5 rounded-lg border border-hair border-safe/30">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch size={20} className="text-safe" />
                <span className="font-mono text-sm text-ink font-semibold">Random Forest</span>
                <span className="ml-auto font-mono text-[10px] text-safe bg-safe-10 px-2 py-0.5 rounded">Recommended</span>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Phishing recall: <span className="text-ink">0.90</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>False negatives: <span className="text-ink">72</span> (vs 79 for HGB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Bagging reduces variance during training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-safe shrink-0 mt-0.5" />
                  <span>Better performance on unseen data / production</span>
                </li>
              </ul>
            </div>
          </div>

          <p className="font-body text-sm text-muted leading-relaxed mt-4 text-center">
            Random Forest's bagging algorithm reduces variance, avoiding over‑emphasis on the majority class
            and achieving better performance in production environments.
          </p>
        </section>

        {/* Variance Analysis */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-info" />
            <h3 className="font-display text-xl text-ink">Variance Analysis</h3>
          </div>
          <div className="space-y-4 text-sm text-muted leading-relaxed">
            <p>
              The variance analysis uncovers that variations in boosted trees' performance can be as
              high as <span className="text-ink">15%</span>, suggesting that results can significantly
              depend on the peculiarities of the training set.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <span className="font-mono text-xs text-alert uppercase tracking-wider">Boosted Trees</span>
                <p className="mt-1 text-muted">
                  Performance variance up to <span className="text-ink">15%</span> — results depend
                  heavily on training set characteristics.
                </p>
              </div>
              <div className="bg-panel2 p-4 rounded-lg border border-hair border-safe/30">
                <span className="font-mono text-xs text-safe uppercase tracking-wider">Random Forest (Bagging)</span>
                <p className="mt-1 text-muted">
                  Reduces variance during training — becomes particularly beneficial when making
                  predictions on unseen data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Recommendation */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8 border-safe/20">
          <div className="flex items-center gap-3 mb-4">
            <Award size={24} className="text-safe" />
            <h3 className="font-display text-xl text-ink">Final Recommendation</h3>
          </div>
          <div className="space-y-3 text-sm text-muted leading-relaxed">
            <p>
              The overall evaluation demonstrates that <strong className="text-safe">Random Forest</strong>{' '}
              provides reliable accuracy, precision, and recall, making it a{' '}
              <strong className="text-ink">good candidate for a real‑time phishing URL detection system</strong>.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <div className="bg-panel p-3 rounded-lg border border-hair text-center">
                <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Accuracy</p>
                <p className="font-display text-lg text-ink">92.86%</p>
              </div>
              <div className="bg-panel p-3 rounded-lg border border-hair text-center">
                <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Phishing Recall</p>
                <p className="font-display text-lg text-safe">0.90</p>
              </div>
              <div className="bg-panel p-3 rounded-lg border border-hair text-center">
                <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">ROC-AUC</p>
                <p className="font-display text-lg text-info">0.9734</p>
              </div>
            </div>
            <p className="mt-3">
              Its performance characteristics are better in most considered dimensions compared to
              other classifiers, making it a viable option for solving the phishing detection problem.
            </p>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}