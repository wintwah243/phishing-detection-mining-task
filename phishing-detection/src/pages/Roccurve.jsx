import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Activity, TrendingUp, Shield, Target } from "lucide-react";

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
.code-scroll::-webkit-scrollbar { height: 6px; }
.code-scroll::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 4px; }
`;

// ROC Curve SVG Component with bright colors
function ROCCurve() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <svg viewBox="0 0 440 400" className="w-full h-auto">
        {/* Background grid */}
        <rect x="0" y="0" width="440" height="400" fill="transparent" />

        {/* Grid lines */}
        <g stroke="#2a3545" strokeWidth="0.8" opacity="0.6">
          <line x1="60" y1="50" x2="380" y2="50" />
          <line x1="60" y1="125" x2="380" y2="125" />
          <line x1="60" y1="200" x2="380" y2="200" />
          <line x1="60" y1="275" x2="380" y2="275" />
          <line x1="60" y1="350" x2="380" y2="350" />
          <line x1="60" y1="50" x2="60" y2="350" />
          <line x1="140" y1="50" x2="140" y2="350" />
          <line x1="220" y1="50" x2="220" y2="350" />
          <line x1="300" y1="50" x2="300" y2="350" />
          <line x1="380" y1="50" x2="380" y2="350" />
        </g>

        {/* Axes */}
        <line x1="50" y1="50" x2="50" y2="350" stroke="#8593A2" strokeWidth="2" />
        <line x1="50" y1="350" x2="380" y2="350" stroke="#8593A2" strokeWidth="2" />

        {/* Random Classifier (Orange dashed line) */}
        <line x1="50" y1="350" x2="380" y2="50" stroke="#FF6B4A" strokeWidth="2.5" strokeDasharray="6,6" />

        {/* AUC Shaded Area with bright cyan */}
        <path
          d="M 50 350 C 80 200, 180 100, 380 50 L 380 350 Z"
          fill="rgba(0, 212, 255, 0.12)"
        />

        {/* Random Forest ROC Curve (Bright Cyan solid line) */}
        <path
          d="M 50 350 C 80 220, 180 110, 380 50"
          fill="none"
          stroke="#00D4FF"
          strokeWidth="3.5"
        />

        {/* Axis Labels */}
        <text x="200" y="390" className="font-mono text-xs text-mutedDim" textAnchor="middle">False Positive Rate</text>
        <text x="20" y="200" className="font-mono text-xs text-mutedDim" textAnchor="middle" transform="rotate(-90, 20, 200)">True Positive Rate</text>

        {/* Axis Tick Labels */}
        <text x="50" y="370" className="font-mono text-[10px] text-mutedDim" textAnchor="middle">0.0</text>
        <text x="140" y="370" className="font-mono text-[10px] text-mutedDim" textAnchor="middle">0.2</text>
        <text x="220" y="370" className="font-mono text-[10px] text-mutedDim" textAnchor="middle">0.4</text>
        <text x="300" y="370" className="font-mono text-[10px] text-mutedDim" textAnchor="middle">0.6</text>
        <text x="380" y="370" className="font-mono text-[10px] text-mutedDim" textAnchor="middle">1.0</text>

        <text x="30" y="350" className="font-mono text-[10px] text-mutedDim" textAnchor="end">0.0</text>
        <text x="30" y="275" className="font-mono text-[10px] text-mutedDim" textAnchor="end">0.2</text>
        <text x="30" y="200" className="font-mono text-[10px] text-mutedDim" textAnchor="end">0.4</text>
        <text x="30" y="125" className="font-mono text-[10px] text-mutedDim" textAnchor="end">0.6</text>
        <text x="30" y="50" className="font-mono text-[10px] text-mutedDim" textAnchor="end">1.0</text>

        {/* Legend with bright colors */}
        <g transform="translate(195, 15)">
          <rect x="0" y="0" width="195" height="62" rx="6" fill="#161D28" stroke="#2a3545" strokeWidth="1.5" />

          <line x1="10" y1="18" x2="40" y2="18" stroke="#00D4FF" strokeWidth="3" />
          <text x="48" y="22" className="font-mono text-[10px] text-ink">Random Forest (AUC = 0.9734)</text>

          <line x1="10" y1="40" x2="40" y2="40" stroke="#FF6B4A" strokeWidth="2.5" strokeDasharray="4,4" />
          <text x="48" y="44" className="font-mono text-[10px] text-ink">Random Classifier</text>
        </g>
      </svg>
    </div>
  );
}

// Code Block Component (unchanged)
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // Clipboard may be unavailable in some environments — fail silently.
    }
  };

  const lines = code.replace(/\n$/, "").split("\n");

  return (
    <div className="border border-hair rounded-lg bg-panel overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-hair bg-panel2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.alert }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.data }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.safe }} />
          <span className="font-mono text-xs text-mutedDim ml-2">roc_auc_analysis.ipynb</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors"
        >
          {copied ? <Check size={13} className="text-safe" /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-x-auto code-scroll">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i}>
                <td className="select-none text-right pr-4 pl-4 py-0.5 font-mono text-xs text-mutedDim align-top w-10">
                  {i + 1}
                </td>
                <td className="pr-4 py-0.5 font-mono text-xs text-ink whitespace-pre align-top">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const COLAB_CODE = `# ============================================
# RANDOM FOREST - ROC CURVE & AUC
# ============================================

import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_curve, roc_auc_score


# ============================================
# 1. LOAD DATASET
# ============================================

df = pd.read_csv("phishing_website_cleaned.csv")


# ============================================
# 2. SELECT FEATURES
# ============================================

URL_FEATURES = [
    # URL features
    "qty_dot_url",
    "qty_hyphen_url",
    "qty_underline_url",
    "qty_slash_url",
    "qty_questionmark_url",
    "qty_equal_url",
    "qty_at_url",
    "qty_and_url",
    "qty_exclamation_url",
    "qty_space_url",
    "qty_tilde_url",
    "qty_comma_url",
    "qty_plus_url",
    "qty_asterisk_url",
    "qty_hashtag_url",
    "qty_dollar_url",
    "qty_percent_url",
    "length_url",

    # Domain features
    "qty_dot_domain",
    "qty_hyphen_domain",
    "qty_underline_domain",
    "qty_slash_domain",
    "qty_questionmark_domain",
    "qty_equal_domain",
    "qty_at_domain",
    "qty_and_domain",
    "qty_exclamation_domain",
    "qty_space_domain",
    "qty_tilde_domain",
    "qty_comma_domain",
    "qty_plus_domain",
    "qty_asterisk_domain",
    "qty_hashtag_domain",
    "qty_dollar_domain",
    "qty_percent_domain",

    # Domain / security features
    "qty_vowels_domain",
    "domain_length",
    "domain_in_ip",
    "server_client_domain",
    "email_in_url",
    "tls_ssl_certificate",
    "url_shortened"
]


# Keep only features available in dataset
available_features = [
    feature for feature in URL_FEATURES
    if feature in df.columns
]


X = df[available_features]
y = df["phishing"]


# ============================================
# 3. REMOVE CONSTANT FEATURES
# ============================================

constant_features = [
    column for column in X.columns
    if X[column].nunique() <= 1
]

X = X.drop(columns=constant_features)


# ============================================
# 4. TRAIN / TEST SPLIT
# ============================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# ============================================
# 5. TRAIN RANDOM FOREST
# ============================================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)


# ============================================
# 6. GET PREDICTED PROBABILITIES
# ============================================

y_prob = model.predict_proba(X_test)[:, 1]


# ============================================
# 7. CALCULATE ROC CURVE
# ============================================

fpr, tpr, thresholds = roc_curve(
    y_test,
    y_prob
)


# ============================================
# 8. CALCULATE AUC
# ============================================

auc_score = roc_auc_score(
    y_test,
    y_prob
)


print("=" * 60)
print("RANDOM FOREST - ROC CURVE & AUC")
print("=" * 60)

print(f"\nAUC Score: {auc_score:.4f}")


# ============================================
# 9. PLOT ROC CURVE
# ============================================

plt.figure(figsize=(8, 6))

plt.plot(
    fpr,
    tpr,
    label=f"Random Forest (AUC = {auc_score:.4f})"
)

# Random classifier reference line
plt.plot(
    [0, 1],
    [0, 1],
    linestyle="--",
    label="Random Classifier"
)

plt.xlabel("False Positive Rate")
plt.ylabel("True Positive Rate")

plt.title("ROC Curve - Random Forest")

plt.legend(
    loc="lower right"
)

plt.grid(True)

plt.tight_layout()

plt.show()`;

export default function Roccurve() {
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
              <Activity size={17} className="text-safe" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Evaluation
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">ROC Curve &amp; AUC</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Overview */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <p className="font-body text-sm text-muted leading-relaxed max-w-3xl">
            The predictive accuracy of <strong className="text-ink">Random Forest</strong> was further
            evaluated using the ROC and AUC metrics. The AUC values help understand how well the model
            can distinguish legitimate web targets from malicious phishing URLs across different
            classification thresholds.
          </p>
        </section>

        {/* ROC Curve Visualization */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Visualization</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            ROC Curve – Random Forest
          </h2>

          <div className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
            <ROCCurve />

            {/* AUC Score Highlight */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <div className="col-span-1 bg-panel2 rounded-lg border border-hair p-4 text-center">
                <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">AUC Score</p>
                <p className="font-display text-4xl text-safe mt-1">0.9734</p>
                <p className="font-body text-xs text-muted mt-1">Excellent discrimination</p>
              </div>
              <div className="col-span-2 bg-panel2 rounded-lg border border-hair p-4 flex items-center">
                <div className="space-y-1 text-sm text-muted">
                  <p className="flex items-center gap-2">
                    <span className="w-4 h-0.5 bg-[#00D4FF]" />
                    <span className="text-ink font-mono text-xs">Random Forest</span>
                    <span className="text-xs text-mutedDim">(AUC = 0.9734)</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-4 h-0.5 border-t-2 border-dashed border-alert" />
                    <span className="text-ink font-mono text-xs">Random Classifier</span>
                    <span className="text-xs text-mutedDim">(AUC = 0.5)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interpretation */}
        <section className="border border-hair rounded-lg bg-panel p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Target size={20} className="text-safe" />
            <h3 className="font-display text-xl text-ink">Interpretation</h3>
          </div>
          <div className="space-y-4 text-sm text-muted leading-relaxed">
            <p>
              The Random Forest model achieves a considerably high AUC of{' '}
              <strong className="text-ink">0.9734</strong>, implying that the algorithm can efficiently
              differentiate legitimate and phishing URL classes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-2">
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <span className="font-mono text-xs text-safe uppercase tracking-wider">High AUC</span>
                <p className="mt-1 text-muted">
                  An AUC close to 1.0 indicates excellent separability between classes.
                </p>
              </div>
              <div className="bg-panel2 p-4 rounded-lg border border-hair">
                <span className="font-mono text-xs text-info uppercase tracking-wider">Practical significance</span>
                <p className="mt-1 text-muted">
                  The model successfully distinguishes malicious URLs from legitimate ones, addressing the threat effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Cell */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Colab code used</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            The exact cell that produced this result.
          </h2>
          <CodeBlock code={COLAB_CODE} />
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}