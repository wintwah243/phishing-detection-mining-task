import React from "react";
import { ArrowLeft, Target, BarChart3, CheckCircle, AlertCircle, PieChart, Grid, Layers, Info } from "lucide-react";

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

export default function PerformanceMetric() {
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
              <BarChart3 size={17} className="text-info" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Performance Metrics</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The models were evaluated using binary classification metrics to assess the predictive
            performance on the URL categories. The evaluation includes{' '}
            <strong className="text-ink">Accuracy</strong>,{' '}
            <strong className="text-ink">Precision</strong>,{' '}
            <strong className="text-ink">Recall</strong> and{' '}
            <strong className="text-ink">F1 Score</strong>. To provide a balanced assessment of
            class imbalance cases, both <span className="text-info">macro</span> and{' '}
            <span className="text-data">weighted</span> averages were reported.
          </p>
        </section>

        {/* Four Metrics Cards */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Key metrics</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Four pillars of evaluation
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Accuracy */}
            <div className="border border-hair rounded-lg p-5 bg-panel hover:border-mutedDim transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} className="text-safe" />
                <span className="font-mono text-xs uppercase tracking-wider text-safe">Metric 1</span>
              </div>
              <h3 className="font-display text-xl text-ink mb-1">Accuracy</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                The proportion of all predictions that are correct. It measures overall effectiveness
                but can be misleading in imbalanced datasets.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                (TP + TN) / (TP + TN + FP + FN)
              </div>
            </div>

            {/* Precision */}
            <div className="border border-hair rounded-lg p-5 bg-panel hover:border-mutedDim transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} className="text-info" />
                <span className="font-mono text-xs uppercase tracking-wider text-info">Metric 2</span>
              </div>
              <h3 className="font-display text-xl text-ink mb-1">Precision</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                The proportion of positive predictions that are actually correct. It measures the
                model's accuracy in identifying the positive class.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                TP / (TP + FP)
              </div>
            </div>

            {/* Recall */}
            <div className="border border-hair rounded-lg p-5 bg-panel hover:border-mutedDim transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={18} className="text-data" />
                <span className="font-mono text-xs uppercase tracking-wider text-data">Metric 3</span>
              </div>
              <h3 className="font-display text-xl text-ink mb-1">Recall (Sensitivity)</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                The proportion of actual positive cases that are correctly identified. It measures
                the model's ability to find all relevant instances.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                TP / (TP + FN)
              </div>
            </div>

            {/* F1 Score */}
            <div className="border border-hair rounded-lg p-5 bg-panel hover:border-mutedDim transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <PieChart size={18} className="text-alert" />
                <span className="font-mono text-xs uppercase tracking-wider text-alert">Metric 4</span>
              </div>
              <h3 className="font-display text-xl text-ink mb-1">F1 Score</h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                The harmonic mean of Precision and Recall. It provides a balanced single metric
                that penalises extreme values.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                2 × (Precision × Recall) / (Precision + Recall)
              </div>
            </div>
          </div>
        </section>

        {/* Macro vs Weighted Averages */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">Macro vs Weighted Averages</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 text-sm text-muted leading-relaxed">
            <div className="bg-panel2 p-5 rounded-lg border border-hair">
              <span className="font-mono text-xs text-info uppercase tracking-wider">Macro Average</span>
              <p className="mt-2">
                The mean of the metric values for each class, treating both classes equally regardless
                of their size. This gives equal weight to <span className="text-ink">Legitimate</span> and{' '}
                <span className="text-ink">Phishing</span> classes.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                (Metric_Legitimate + Metric_Phishing) / 2
              </div>
              <div className="mt-2 bg-panel p-2 rounded border border-hair text-center">
                <span className="font-mono text-xs text-mutedDim">Example: F1 (macro) = (0.95 + 0.90) / 2 = 0.92</span>
              </div>
            </div>
            <div className="bg-panel2 p-5 rounded-lg border border-hair">
              <span className="font-mono text-xs text-data uppercase tracking-wider">Weighted Average</span>
              <p className="mt-2">
                The mean of the metric values weighted by the number of samples in each class.
                This accounts for class imbalance by giving more importance to the majority class.
              </p>
              <div className="mt-3 pt-3 border-t border-hair font-mono text-xs text-mutedDim">
                Σ (Metric_i × Support_i) / Σ Support_i
              </div>
              <div className="mt-2 bg-panel p-2 rounded border border-hair text-center">
                <span className="font-mono text-xs text-mutedDim">Example: F1 (weighted) = (0.95×1298 + 0.90×691) / 1989 = 0.93</span>
              </div>
            </div>
          </div>
        </section>

        {/* Confusion Matrix Explanation */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Visualising predictions</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">Confusion Matrix</h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-0 max-w-md mx-auto">
                <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-[10px] text-mutedDim uppercase tracking-wider">
                  Actual \ Predicted
                </div>
                <div className="bg-panel2 p-3 border-b border-hair text-center font-mono text-[10px] text-safe uppercase tracking-wider">
                  Legitimate
                </div>
                <div className="bg-panel2 p-3 border-b border-hair text-center font-mono text-[10px] text-alert uppercase tracking-wider">
                  Phishing
                </div>

                <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-[10px] text-safe uppercase tracking-wider">
                  Legitimate
                </div>
                <div className="p-3 border-r border-b border-hair text-center">
                  <span className="font-display text-2xl text-safe">TP</span>
                  <div className="font-mono text-[10px] text-mutedDim">True Positive</div>
                </div>
                <div className="p-3 border-b border-hair text-center">
                  <span className="font-display text-2xl text-alert">FP</span>
                  <div className="font-mono text-[10px] text-mutedDim">False Positive</div>
                </div>

                <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-[10px] text-alert uppercase tracking-wider">
                  Phishing
                </div>
                <div className="p-3 border-r border-b border-hair text-center">
                  <span className="font-display text-2xl text-alert">FN</span>
                  <div className="font-mono text-[10px] text-mutedDim">False Negative</div>
                </div>
                <div className="p-3 border-b border-hair text-center">
                  <span className="font-display text-2xl text-safe">TN</span>
                  <div className="font-mono text-[10px] text-mutedDim">True Negative</div>
                </div>
              </div>
            </div>
            <div className="bg-panel2 border-t border-hair px-6 py-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-mutedDim">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-safe-10 border border-safe" />
                Correct predictions
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-alert-10 border border-alert" />
                Incorrect predictions
              </span>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim text-center mt-3">
            The confusion matrix displays the class distribution at the prediction stage, visualising
            where the model succeeds and where it misclassifies.
          </p>
        </section>

        {/* Example Results Reference */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} className="text-info" />
            <h3 className="font-display text-xl text-ink">Example: XGBoost Results</h3>
          </div>
          <div className="grid sm:grid-cols-4 gap-3 text-sm">
            <div className="bg-panel p-3 rounded-lg border border-hair text-center">
              <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Accuracy</p>
              <p className="font-display text-xl text-safe">92.96%</p>
            </div>
            <div className="bg-panel p-3 rounded-lg border border-hair text-center">
              <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Precision (macro)</p>
              <p className="font-display text-xl text-info">92%</p>
            </div>
            <div className="bg-panel p-3 rounded-lg border border-hair text-center">
              <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">Recall (macro)</p>
              <p className="font-display text-xl text-data">92%</p>
            </div>
            <div className="bg-panel p-3 rounded-lg border border-hair text-center">
              <p className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">F1 (macro)</p>
              <p className="font-display text-xl text-alert">92%</p>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim mt-3 text-center">
            These metrics demonstrate the model's strong performance in distinguishing legitimate
            from phishing websites.
          </p>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}