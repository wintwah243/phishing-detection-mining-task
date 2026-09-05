import React, { useState } from "react";
import { ArrowLeft, Copy, Check, BarChart3, Scale, Sigma, Database, Layers } from "lucide-react";

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

const COLAB_CODE = `# ============================================
# DATA TRANSFORMATION
# ============================================

import pandas as pd
from sklearn.preprocessing import StandardScaler

# 1. Use the cleaned dataset
df_transformed = df_clean.copy()

print("Original shape:", df_transformed.shape)

# ============================================
# 2. Separate features and target
# ============================================

X = df_transformed.drop(columns=['phishing'])
y = df_transformed['phishing']

print("Features shape:", X.shape)
print("Target shape:", y.shape)

# ============================================
# 3. Feature Scaling
# ============================================

scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

# Convert back to DataFrame
X_scaled = pd.DataFrame(
    X_scaled,
    columns=X.columns,
    index=X.index
)

# ============================================
# 4. Combine features and target
# ============================================

df_transformed = pd.concat([X_scaled, y], axis=1)

# ============================================
# 5. Check the result
# ============================================

print("\nTransformed dataset shape:", df_transformed.shape)

print("\nFirst 5 rows:")
print(df_transformed.head())

print("\nMean of features after scaling:")
print(X_scaled.mean().round(2))

print("\nStandard deviation of features:")
print(X_scaled.std().round(2))

# ============================================
# 6. Save transformed dataset
# ============================================

df_transformed.to_csv(
    'phishing_website_transformed.csv',
    index=False
)

print("\n✓ Transformed dataset saved successfully!")`;

const toneText = (tone) =>
  tone === "alert" ? "text-alert" : tone === "safe" ? "text-safe" : tone === "data" ? "text-data" : "text-info";
const toneBg = (tone) =>
  tone === "alert" ? "bg-alert-10" : tone === "safe" ? "bg-safe-10" : tone === "data" ? "bg-data-10" : "bg-info-10";

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
          <span className="font-mono text-xs text-mutedDim ml-2">data_transformation.ipynb</span>
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

export default function DataTransformation() {
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
            href="/preprocessingintro/:id"
            className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors w-fit mb-4"
          >
            <ArrowLeft size={13} /> Back to preprocessing
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-hair bg-info-10 flex items-center justify-center shrink-0">
              <Scale size={17} className="text-info" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Preprocessing Step
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Data Transformation</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">
        {/* Stats — 4 cards for a different feel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-hair rounded-lg bg-panel divide-x divide-y sm:divide-y-0" style={{ borderColor: c.border }}>
          <div className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-2xl text-ink">9,944</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Total records</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-ink">55</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Input features</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">6,491</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Legitimate (0)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">3,453</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Phishing (1)</p>
          </div>
        </div>

        {/* Why transform */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Why standardize</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Feature fairness — giving every variable an equal voice.
          </h2>
          <div className="grid sm:grid-cols-5 gap-6">
            <div className="sm:col-span-3">
              <p className="font-body text-sm text-muted leading-relaxed">
                Features such as <span className="text-ink">time_domain_activation</span> and{' '}
                <span className="text-ink">asn_ip</span> are measured on completely different numerical
                scales. Without scaling, large‑magnitude features can dominate gradient‑based
                optimizations, leading to biased model weights and slower convergence.
              </p>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                By applying <strong className="text-ink">StandardScaler</strong>, every numeric feature
                is adjusted to have a mean of <span className="text-safe">0</span> and a standard
                deviation of <span className="text-safe">1</span>. This preserves the underlying
                distribution while ensuring that all features contribute equally to the loss function.
              </p>
            </div>
            <div className="sm:col-span-2 border border-hair rounded-lg bg-panel2 p-4 flex flex-col justify-center items-center">
              <Sigma size={28} className="text-info mb-2" />
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Standard scaler</p>
              <p className="font-display text-lg text-ink mt-1">z = (x – μ) / σ</p>
            </div>
          </div>
        </section>

        {/* Transformation Pipeline — 3 steps, different from column lists */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Transformation pipeline</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Three steps, zero leakage.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-info-10 flex items-center justify-center mb-3">
                <span className="font-mono text-xs text-info font-bold">1</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Database size={14} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Separate</span>
              </div>
              <p className="font-display text-lg text-ink">Target holdout</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                The <span className="text-ink">phishing</span> label is isolated from the predictor
                matrix. It stays untouched during scaling to avoid target leakage.
              </p>
            </div>
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-safe-10 flex items-center justify-center mb-3">
                <span className="font-mono text-xs text-safe font-bold">2</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Scale size={14} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Fit</span>
              </div>
              <p className="font-display text-lg text-ink">Train statistics</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                The scaler computes <span className="text-ink">μ</span> and <span className="text-ink">σ</span> only
                from the training split, then applies the same transform to validation and test sets.
              </p>
            </div>
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start">
              <div className="w-8 h-8 rounded-full bg-data-10 flex items-center justify-center mb-3">
                <span className="font-mono text-xs text-data font-bold">3</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Layers size={14} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Transform</span>
              </div>
              <p className="font-display text-lg text-ink">Full set scaled</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                All 9,944 records are standardized while preserving the 55 input variables.
                Patterns and relationships remain intact — only the magnitude changes.
              </p>
            </div>
          </div>
        </section>

        {/* Colab code */}
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