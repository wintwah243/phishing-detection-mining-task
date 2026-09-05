import React from "react";
import {
  ArrowLeft,
  BarChart,
  GitBranch,
  TrendingUp,
  Zap,
  Shield,
  Bot,
  Cpu,
  Sparkles,
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

:root {
  color-scheme: dark;
}

.font-display {
  font-family: 'Fraunces', serif;
}

.font-mono {
  font-family: 'IBM Plex Mono', monospace;
}

.font-body {
  font-family: 'Inter', sans-serif;
}

.bg-void {
  background-color: ${c.void};
}

.bg-panel {
  background-color: ${c.panel};
}

.bg-panel2 {
  background-color: ${c.panel2};
}

.border-hair {
  border-color: ${c.border};
}

.text-ink {
  color: ${c.ink};
}

.text-muted {
  color: ${c.muted};
}

.text-mutedDim {
  color: ${c.mutedDim};
}

.text-alert {
  color: ${c.alert};
}

.text-safe {
  color: ${c.safe};
}

.text-data {
  color: ${c.data};
}

.text-info {
  color: ${c.info};
}

.bg-alert-10 {
  background-color: rgba(255, 107, 74, 0.10);
}

.bg-safe-10 {
  background-color: rgba(62, 207, 142, 0.10);
}

.bg-data-10 {
  background-color: rgba(255, 200, 87, 0.10);
}

.bg-info-10 {
  background-color: rgba(138, 180, 248, 0.10);
}

a {
  text-decoration: none;
}
`;

const algorithmIcons = {
  "Logistic Regression": <BarChart size={24} />,
  "Random Forest": <GitBranch size={24} />,
  HistGradientBoosting: <TrendingUp size={24} />,
  XGBoost: <Zap size={24} />,
};

const algorithmColors = {
  "Logistic Regression": "text-info",
  "Random Forest": "text-safe",
  HistGradientBoosting: "text-data",
  XGBoost: "text-alert",
};

const algorithmBg = {
  "Logistic Regression": "bg-info-10",
  "Random Forest": "bg-safe-10",
  HistGradientBoosting: "bg-data-10",
  XGBoost: "bg-alert-10",
};

const algorithms = [
  {
    name: "Logistic Regression",
    description:
      "A linear classifier that predicts the likelihood of a URL being phishing based on weighted feature contributions. Serves as a baseline reference for comparing more complex models.",
  },
  {
    name: "Random Forest",
    description:
      "An ensemble of decision trees trained on random subsets of data. Captures non-linear relationships and reduces overfitting through bagging and aggregation.",
  },
  {
    name: "HistGradientBoosting",
    description:
      "A histogram-based gradient boosting method that discretizes continuous features into bins, speeding up training with low memory usage — ideal for tabular data with skewed distributions.",
  },
  {
    name: "XGBoost",
    description:
      "An optimized gradient boosting framework that builds trees sequentially, correcting previous errors. Excels at capturing complex feature interactions with gradient-based optimization.",
  },
];

export default function AppliedMethodologies() {
  return (
    <div className="bg-void min-h-screen font-body">
      <style>{globalCss}</style>

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-hair"
        style={{
          backgroundColor: "rgba(11,15,20,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-5">
          <a
            href="/preprocessingintro/week-5"
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4"
          >
            <ArrowLeft size={13} />
            Back to methodologies
          </a>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-hair bg-safe-10 flex items-center justify-center shrink-0">
              <Cpu size={17} className="text-safe" />
            </div>

            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Applied Methodologies
              </p>

              <h1 className="font-display text-2xl sm:text-3xl text-ink">
                Algorithms
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">
        {/* Mascot Section */}
        <section className="relative border border-hair rounded-lg bg-panel overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center bg-panel2 rounded-full border-2 border-hair">
              <svg
                viewBox="0 0 100 100"
                className="w-24 h-24 sm:w-28 sm:h-28"
              >
                <rect
                  x="20"
                  y="25"
                  width="60"
                  height="50"
                  rx="12"
                  fill="#161D28"
                  stroke="#212B37"
                  strokeWidth="2"
                />

                <circle cx="38" cy="48" r="6" fill="#8AB4F8" />
                <circle cx="62" cy="48" r="6" fill="#8AB4F8" />

                <circle cx="38" cy="48" r="3" fill="#0B0F14" />
                <circle cx="62" cy="48" r="3" fill="#0B0F14" />

                <rect
                  x="47"
                  y="10"
                  width="6"
                  height="15"
                  rx="3"
                  fill="#212B37"
                />

                <circle cx="50" cy="8" r="6" fill="#FFC857" />

                <path
                  d="M 35 63 Q 50 72 65 63"
                  stroke="#3ECF8E"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                <path
                  d="M 44 75 L 50 82 L 56 75"
                  stroke="#3ECF8E"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles size={18} className="text-data" />

                <span className="font-mono text-xs tracking-widest text-data uppercase">
                  Meet Shi Shi Bot
                </span>
              </div>

              <h2 className="font-display text-2xl text-ink mt-1">
                Your friendly cybersecurity assistant
              </h2>

              <p className="font-body text-sm text-muted leading-relaxed mt-2 max-w-xl">
                I've analysed the URL features and selected the best algorithms
                for the job. Here's the lineup — each one brings a unique
                superpower to the table.
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-info-10 opacity-20" />
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-safe-10 opacity-20" />
        </section>

        {/* Algorithm Cards */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
            The lineup
          </p>

          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Four algorithms, each with a distinct edge.
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {algorithms.map((algo) => {
              const Icon = algorithmIcons[algo.name] || <Cpu size={24} />;
              const color = algorithmColors[algo.name] || "text-muted";
              const bg = algorithmBg[algo.name] || "bg-panel2";

              return (
                <div
                  key={algo.name}
                  className="border border-hair rounded-lg p-6 bg-panel2 hover:border-mutedDim transition-colors flex flex-col"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${bg} flex items-center justify-center mb-4`}
                  >
                    <div className={color}>{Icon}</div>
                  </div>

                  <h3 className="font-display text-xl text-ink mb-2">
                    {algo.name}
                  </h3>

                  <p className="font-body text-sm text-muted leading-relaxed flex-1">
                    {algo.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-hair flex items-center gap-2">
                    <Shield size={14} className="text-mutedDim" />

                    <span className="font-mono text-[10px] text-mutedDim uppercase tracking-wider">
                      {algo.name === "Logistic Regression"
                        ? "Baseline"
                        : algo.name === "Random Forest"
                        ? "Ensemble"
                        : algo.name === "HistGradientBoosting"
                        ? "Histogram-based"
                        : "Gradient Boosting"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why these algorithms? */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Bot size={24} className="text-data" />

            <h2 className="font-display text-xl text-ink">
              Why these algorithms?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted leading-relaxed">
            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-info uppercase tracking-wider">
                Lexical + structural
              </span>

              <p className="mt-1">
                The selected algorithms are well-suited for the mix of lexical,
                structural and network features extracted from URLs.
              </p>
            </div>

            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-safe uppercase tracking-wider">
                Speed & memory
              </span>

              <p className="mt-1">
                HistGradientBoosting and XGBoost are optimised for large-scale
                tabular data with many features and skewed distributions.
              </p>
            </div>

            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-data uppercase tracking-wider">
                Non-linearity
              </span>

              <p className="mt-1">
                Random Forest and XGBoost capture complex, non-linear
                relationships between URL attributes and the target class.
              </p>
            </div>

            <div className="bg-panel2 p-4 rounded-lg border border-hair">
              <span className="font-mono text-xs text-alert uppercase tracking-wider">
                Interpretability
              </span>

              <p className="mt-1">
                Logistic Regression provides a transparent baseline, making it
                easy to compare and interpret feature importance.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">
          Data & Knowledge Mining · University of Computer Studies, Yangon ·
          2026
        </p>
      </footer>
    </div>
  );
}