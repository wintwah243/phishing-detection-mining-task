import React, { useState } from "react";
import { ArrowLeft, Copy, Check, BarChart3, ArrowUpDown, Minus, Plus, Percent } from "lucide-react";

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
# DATA NORMALIZATION
# ============================================

import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# ============================================
# STEP 1: Load Feature-Selected Dataset
# ============================================

df_normalization = pd.read_csv(
    'phishing_website_feature_selected.csv'
)

print("=" * 70)
print("DATA NORMALIZATION")
print("=" * 70)

print("\nOriginal feature-selected dataset shape:")
print(df_normalization.shape)


# ============================================
# STEP 2: Separate Features and Target
# ============================================

X = df_normalization.drop(columns=['phishing'])
y = df_normalization['phishing']

print("\nFeatures shape:", X.shape)
print("Target shape:", y.shape)


# ============================================
# STEP 3: Check Feature Range Before Normalization
# ============================================

print("\n" + "=" * 70)
print("STEP 1: Before Normalization")
print("=" * 70)

print("\nFeature minimum values:")
print(X.min().head())

print("\nFeature maximum values:")
print(X.max().head())


# ============================================
# STEP 4: Apply Min-Max Normalization
# ============================================

print("\n" + "=" * 70)
print("STEP 2: Applying Min-Max Normalization")
print("=" * 70)

# MinMaxScaler transforms values to range [0, 1]
scaler = MinMaxScaler()

X_normalized = pd.DataFrame(
    scaler.fit_transform(X),
    columns=X.columns,
    index=X.index
)

print("✓ Min-Max Normalization completed!")


# ============================================
# STEP 5: Combine Normalized Features with Target
# ============================================

df_normalized = pd.concat(
    [
        X_normalized,
        y
    ],
    axis=1
)

print("\n" + "=" * 70)
print("STEP 3: Final Normalized Dataset")
print("=" * 70)

print("\nNormalized dataset shape:")
print(df_normalized.shape)

print("\nFirst 5 rows:")
print(df_normalized.head())


# ============================================
# STEP 6: Verify Normalization
# ============================================

print("\n" + "=" * 70)
print("STEP 4: Verify Normalization")
print("=" * 70)

print(
    "\nMinimum feature value:",
    X_normalized.min().min()
)

print(
    "Maximum feature value:",
    X_normalized.max().max()
)

print(
    "\nMissing values:",
    df_normalized.isna().sum().sum()
)

print(
    "\nTarget values:"
)

print(
    df_normalized['phishing'].value_counts()
)


# ============================================
# STEP 7: Save Normalized Dataset
# ============================================

output_file = 'phishing_website_normalized.csv'

df_normalized.to_csv(
    output_file,
    index=False
)

print("\n" + "=" * 70)
print("DATA NORMALIZATION COMPLETE")
print("=" * 70)

print(
    f"\n✓ Normalized dataset saved as: "
    f"{output_file}"
)`;

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
          <span className="font-mono text-xs text-mutedDim ml-2">data_normalization.ipynb</span>
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

export default function DataNormalization() {
  const totalRecords = 9944;
  const totalFeatures = 25;
  const legitimate = 6491;
  const phishing = 3453;

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
            <div className="w-10 h-10 rounded-md border border-hair bg-safe-10 flex items-center justify-center shrink-0">
              <ArrowUpDown size={17} className="text-safe" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Preprocessing Step
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Data Normalization</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">
        {/* Stats — 4 cards with target distribution */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-hair rounded-lg bg-panel divide-x divide-y sm:divide-y-0" style={{ borderColor: c.border }}>
          <div className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-2xl text-ink">{totalRecords}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Total records</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-ink">{totalFeatures}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Features (after selection)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">{legitimate}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Legitimate (0)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">{phishing}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Phishing (1)</p>
          </div>
        </div>

        {/* Why normalize */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Why normalize</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Bring everything to the same scale — without changing the story.
          </h2>
          <div className="grid sm:grid-cols-5 gap-6">
            <div className="sm:col-span-3">
              <p className="font-body text-sm text-muted leading-relaxed">
                Features like <span className="text-ink">length_url</span>,{' '}
                <span className="text-ink">time_domain_activation</span> and symbol counts are measured
                on vastly different scales. Min‑Max normalization rescales every attribute to a uniform
                interval <span className="text-safe">[0, 1]</span>, ensuring that no single feature
                dominates the learning process due to its magnitude.
              </p>
              <p className="font-body text-sm text-muted leading-relaxed mt-3">
                The target label <span className="text-ink">phishing</span> is <strong className="text-ink">not</strong>{' '}
                normalized — it remains as binary ground truth to preserve the class distribution
                (<span className="text-safe">6,491</span> legitimate vs{' '}
                <span className="text-alert">3,453</span> phishing).
              </p>
            </div>
            <div className="sm:col-span-2 border border-hair rounded-lg bg-panel2 p-4 flex flex-col justify-center items-center">
              <p className="font-mono text-xs text-mutedDim uppercase tracking-wider">Min‑Max scaling</p>
              <p className="font-display text-lg text-ink mt-1 text-center">
                x' = (x – x<sub>min</sub>) / (x<sub>max</sub> – x<sub>min</sub>)
              </p>
              <p className="font-mono text-xs text-mutedDim mt-2">maps to [0, 1]</p>
            </div>
          </div>
        </section>

        {/* Before / After range example — different layout */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Range transformation</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Example: <span className="text-ink">qty_dot_url</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Before */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-alert-10 flex items-center justify-center">
                  <span className="text-alert font-mono text-[10px] font-bold">B</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Before</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-mono text-sm text-mutedDim">Min</p>
                  <p className="font-display text-xl text-alert">-0.969730</p>
                </div>
                <div className="text-mutedDim">→</div>
                <div>
                  <p className="font-mono text-sm text-mutedDim">Max</p>
                  <p className="font-display text-xl text-alert">31.728844</p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-alert-10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-alert/30" style={{ width: "100%" }} />
              </div>
            </div>
            {/* After */}
            <div className="border border-hair rounded-lg p-5 bg-panel">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-safe-10 flex items-center justify-center">
                  <span className="text-safe font-mono text-[10px] font-bold">A</span>
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">After</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-mono text-sm text-mutedDim">Min</p>
                  <p className="font-display text-xl text-safe">0.0</p>
                </div>
                <div className="text-mutedDim">→</div>
                <div>
                  <p className="font-mono text-sm text-mutedDim">Max</p>
                  <p className="font-display text-xl text-safe">1.0</p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full bg-safe-10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-safe/40" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
          <p className="font-body text-xs text-mutedDim mt-3 text-center">
            All 24 selected predictors are rescaled to [0, 1] using the same transformation.
          </p>
        </section>

        {/* Final dataset info */}
        <section>
          <div className="border border-hair rounded-lg p-5 bg-panel2 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-safe-10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-safe" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-safe">Normalized dataset</p>
                <p className="font-body text-sm text-muted">
                  <strong className="text-ink">(9,944 rows × 25 columns)</strong> — no missing values, all
                  features scaled to <span className="text-safe">[0, 1]</span>, target untouched.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-mutedDim">ready for model training</span>
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