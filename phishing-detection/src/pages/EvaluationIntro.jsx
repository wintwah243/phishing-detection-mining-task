import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Puzzle,
  TrendingDown,
  SlidersHorizontal,
  Tags,
  Scale,
  Lock,
} from "lucide-react";

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


const STEPS = [
  {
    key: "Performance Metrics",
    icon: Puzzle,
    title: "Performance Metrics",
    desc: "The models were evaluated using binary classification metrics to assess the predictive performance on the URL categories.",
    status: "done",
    href: "/evaluation/performancemetrics",
    tone: "alert",
  },
  {
    key: "Model Comparison",
    icon: TrendingDown,
    title: "Model Comparison",
    desc: "The predictive performance of the four models was compared using the macro and weighted averages of precision, recall, and F1-score.",
    status: "done",
    href: "/evaluation/modelcomparison",
    tone: "info",
  },
  {
    key: "Evaluation Analysis",
    icon: SlidersHorizontal,
    title: "Evaluation Analysis",
    desc: "The evaluation results indicate that ensemble-based approaches outperform the baseline Logistic Regression model.",
    status: "done",
    href: "/evaluation/evaluationanalysis",
    tone: "info",
  },
  {
    key: "ROC Curve and AUC",
    icon: Tags,
    title: "ROC Curve and AUC",
    desc: "The predictive accuracy of XGBoost was further evaluated using the ROC and AUC metrics.",
    status: "done",
    href: "/evaluation/roccurve",
    tone: "info",
  },
  {
    key: "Cross Validation",
    icon: Puzzle,
    title: "Cross Validation",
    desc: "To evaluate model stability and generalization, 5-fold stratified cross-validation was performed for all models.",
    status: "done",
    href: "/evaluation/crossvalidation",
    tone: "info",
  },
{
    key: "Findings",
    icon: Tags,
    title: "Findings",
    desc: "XGBoost is the most practical classifier when it comes to real-time phishing URL detection.",
    status: "done",
    href: "/evaluation/findings",
    tone: "info",
  }
];

const toneText = (tone) =>
  tone === "alert" ? "text-alert" : tone === "safe" ? "text-safe" : tone === "data" ? "text-data" : "text-info";
const toneBg = (tone) =>
  tone === "alert" ? "bg-alert-10" : tone === "safe" ? "bg-safe-10" : tone === "data" ? "bg-data-10" : "bg-info-10";

export default function MethodologiesIntro() {
  const doneCount = STEPS.filter((s) => s.status === "done").length;

  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-hair"
        style={{ backgroundColor: "rgba(11,15,20,0.9)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5">
          <a
            href="/"
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4"
          >
            <ArrowLeft size={13} /> Back to home
          </a>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-2">
                Data Preprocessing
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">
                Every cleaning step, as it happens.
              </h1>
            </div>
            <div className="font-mono text-xs text-muted border border-hair rounded-full px-3.5 py-1.5">
              {doneCount} of {STEPS.length} steps documented
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <p className="font-body text-sm text-muted max-w-xl mb-10 leading-relaxed">
          Raw data rarely goes straight into a model. This section is a running
          record of every transformation applied to the dataset — what was
          changed, why, and the exact code used. New steps get added here as
          the project moves forward, so this page will keep growing.
        </p>

        {/* Step grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isDone = step.status === "done";
            const Wrapper = isDone ? "a" : "div";

            return (
              <Wrapper
                key={step.key}
                {...(isDone ? { href: step.href } : {})}
                className={`group relative border rounded-lg p-6 transition-colors ${
                  isDone
                    ? "border-hair bg-panel hover:border-mutedDim cursor-pointer"
                    : "border-hair bg-panel2 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-md border border-hair flex items-center justify-center ${toneBg(
                      isDone ? step.tone : "info"
                    )}`}
                  >
                    <Icon size={17} className={toneText(isDone ? step.tone : "info")} />
                  </div>

                  {isDone ? (
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-safe-10 text-safe">
                      Documented
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-hair text-mutedDim">
                      <Lock size={10} /> Planned
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg text-ink mb-1.5">{step.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed pr-4">{step.desc}</p>

                {isDone && (
                  <span className="mt-5 font-mono text-xs text-alert flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    View the process <ArrowRight size={13} />
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </main>

      <footer className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">
          Data Mining · University Name · 2026
        </p>
      </footer>
    </div>
  );
}