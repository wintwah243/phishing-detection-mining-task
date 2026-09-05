import React from "react";
import { ArrowLeft, Split, Target, Settings, Cpu, BarChart3, TrendingUp, Zap, Shield, Award, Layers, GitBranch, CheckCircle, Info } from "lucide-react";

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

export default function ProposedModel() {
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
            <div className="w-10 h-10 rounded-md border border-hair bg-safe-10 flex items-center justify-center shrink-0">
              <GitBranch size={17} className="text-safe" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Proposed Model
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Random Forest</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-safe-10 flex items-center justify-center shrink-0 mt-1">
              <Shield size={20} className="text-safe" />
            </div>
            <div>
              <h2 className="font-display text-2xl text-ink mb-2">Why Random Forest?</h2>
              <p className="font-body text-sm text-muted leading-relaxed">
                The proposed model for this project is <strong className="text-ink">Random Forest</strong> due to its ability
                to capture non‑linear relationships between the lexical, structural, and network features
                and its effectiveness on highly structured data such as URLs. This ensemble method trains
                multiple decision trees on various subsets of the data and averages their results to reduce
                variance and avoid overfitting.
              </p>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                The Random Forest algorithm was used for both classification and feature importance analysis.
                Results show that structural parameters are the most relevant for the classification task —
                features like <span className="text-ink">URL length</span>,{' '}
                <span className="text-ink">domain slashes</span>,{' '}
                <span className="text-ink">number of special symbols</span>, and{' '}
                <span className="text-ink">HTTPS status</span> are the most informative.
              </p>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Performance</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">Model Evaluation</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Accuracy</p>
              <p className="font-display text-3xl text-safe mt-1">92.86%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Precision (macro)</p>
              <p className="font-display text-3xl text-info mt-1">92%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Recall (macro)</p>
              <p className="font-display text-3xl text-data mt-1">92%</p>
            </div>
            <div className="border border-hair rounded-lg bg-panel p-5 text-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">F1-Score (macro)</p>
              <p className="font-display text-3xl text-alert mt-1">92%</p>
            </div>
          </div>
        </section>

        {/* Classification Report Table */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Detailed breakdown</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">Classification Report</h2>

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
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.94</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.95</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.95</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">1,298</td>
                  </tr>
                  <tr className="hover:bg-panel2/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm text-alert flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-alert" />
                      Phishing
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.91</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.89</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right">0.90</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">691</td>
                  </tr>
                </tbody>
                <tfoot className="border-t-2 border-hair bg-panel2">
                  <tr>
                    <td className="px-4 py-3 font-mono text-sm text-ink font-bold">Accuracy</td>
                    <td className="px-4 py-3 font-mono text-sm text-ink text-right" colSpan="3">0.93</td>
                    <td className="px-4 py-3 font-mono text-sm text-mutedDim text-right">1,989</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="5">Macro avg: precision 0.92 · recall 0.92 · f1-score 0.92</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs text-mutedDim" colSpan="5">Weighted avg: precision 0.93 · recall 0.93 · f1-score 0.93</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Confusion Matrix */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Confusion matrix</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">Prediction Breakdown</h2>

          <div className="border border-hair rounded-lg bg-panel overflow-hidden max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-0">
              <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-xs text-mutedDim uppercase tracking-wider">
                Actual \ Predicted
              </div>
              <div className="bg-panel2 p-3 border-b border-hair text-center font-mono text-xs text-safe uppercase tracking-wider">
                Legitimate
              </div>
              <div className="bg-panel2 p-3 border-b border-hair text-center font-mono text-xs text-alert uppercase tracking-wider">
                Phishing
              </div>

              <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-xs text-safe uppercase tracking-wider">
                Legitimate
              </div>
              <div className="p-3 border-r border-b border-hair text-center font-display text-2xl text-safe">1235</div>
              <div className="p-3 border-b border-hair text-center font-display text-2xl text-alert">63</div>

              <div className="bg-panel2 p-3 border-r border-b border-hair text-center font-mono text-xs text-alert uppercase tracking-wider">
                Phishing
              </div>
              <div className="p-3 border-r border-b border-hair text-center font-display text-2xl text-safe">79</div>
              <div className="p-3 border-b border-hair text-center font-display text-2xl text-alert">612</div>
            </div>
            <div className="p-3 bg-panel2 border-t border-hair text-center font-mono text-xs text-mutedDim">
              Correct predictions: <span className="text-safe">1235</span> (legit) + <span className="text-safe">612</span> (phish) = <span className="text-ink">1847</span>
              &nbsp;·&nbsp; Incorrect: <span className="text-alert">79</span> + <span className="text-alert">63</span> = <span className="text-ink">142</span>
            </div>
          </div>
        </section>

        {/* Feature Importance */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} className="text-data" />
            <h3 className="font-display text-xl text-ink">Key Feature Insights</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted leading-relaxed">
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-info uppercase tracking-wider">Structural</span>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>URL length</li>
                <li>Number of slashes in domain</li>
                <li>Special symbols count</li>
                <li>Presence of query parameters</li>
              </ul>
            </div>
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-safe uppercase tracking-wider">Lexical</span>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Character distribution</li>
                <li>Vowel/consonant ratio</li>
                <li>Entropy of the URL</li>
              </ul>
            </div>
            <div className="bg-panel2 p-4 rounded-lg border border-hair sm:col-span-2">
              <span className="font-mono text-xs text-data uppercase tracking-wider">Network & Security</span>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>HTTPS status</li>
                <li>Domain SPF records</li>
                <li>Number of redirects</li>
                <li>IP address presence</li>
              </ul>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim mt-4 text-center">
            These features contribute most to the Random Forest’s classification decisions, confirming that
            structural attributes are the strongest predictors.
          </p>
        </section>

        {/* Comparison with Baseline */}
        <section className="border border-hair rounded-lg bg-panel2 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp size={20} className="text-safe" />
            <h3 className="font-display text-xl text-ink">Compared to Baseline (Logistic Regression)</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-panel p-4 rounded-lg border border-hair">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Baseline</p>
              <p className="font-display text-lg text-ink mt-1">91.10% accuracy</p>
              <p className="font-body text-muted text-xs">Logistic Regression</p>
            </div>
            <div className="bg-panel p-4 rounded-lg border border-hair border-safe">
              <p className="font-mono text-xs text-safe uppercase tracking-wider">Proposed</p>
              <p className="font-display text-lg text-safe mt-1">92.86% accuracy</p>
              <p className="font-body text-muted text-xs">Random Forest</p>
            </div>
          </div>
          <p className="font-body text-sm text-muted leading-relaxed mt-4">
            The Random Forest model achieves a <span className="text-safe">+1.76%</span> improvement in accuracy
            over the baseline, with notable gains in phishing recall (<span className="text-safe">+5.06%</span>)
            and F1-score for the phishing class (<span className="text-safe">+3.24%</span>), demonstrating its
            effectiveness for this task.
          </p>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}