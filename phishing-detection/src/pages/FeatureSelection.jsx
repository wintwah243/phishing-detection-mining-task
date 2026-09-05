import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Filter, TrendingUp, TrendingDown, Minus, Percent } from "lucide-react";

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
# FEATURE SELECTION
# ============================================

import pandas as pd
import numpy as np

# ============================================
# STEP 1: Load the transformed dataset
# ============================================

df_feature = pd.read_csv('phishing_website_transformed.csv')

print("=" * 70)
print("FEATURE SELECTION")
print("=" * 70)

print("\nOriginal transformed dataset shape:")
print(df_feature.shape)


# ============================================
# STEP 2: Separate features and target
# ============================================

X = df_feature.drop(columns=['phishing'])
y = df_feature['phishing']

print("\nNumber of features before selection:", X.shape[1])


# ============================================
# STEP 3: Remove constant features
# ============================================

print("\n" + "=" * 70)
print("STEP 1: Removing Constant Features")
print("=" * 70)

# Find features with only one unique value
constant_features = [
    col for col in X.columns
    if X[col].nunique() <= 1
]

print(f"\nConstant features found: {len(constant_features)}")

if constant_features:
    print("\nFeatures to remove:")
    for col in constant_features:
        print("  ✗", col)

    X = X.drop(columns=constant_features)

else:
    print("✓ No constant features found.")


# ============================================
# STEP 4: Correlation with target
# ============================================

print("\n" + "=" * 70)
print("STEP 2: Feature Correlation with Target")
print("=" * 70)

# Calculate correlation between each feature and phishing
correlation = X.corrwith(y)

# Sort by absolute correlation
correlation_sorted = correlation.abs().sort_values(
    ascending=False
)

print("\nTop 15 features based on correlation:")

for feature in correlation_sorted.head(15).index:
    print(
        f"  {feature}: "
        f"{correlation[feature]:.4f}"
    )


# ============================================
# STEP 5: Select important features
# ============================================

print("\n" + "=" * 70)
print("STEP 3: Selecting Important Features")
print("=" * 70)

# Minimum correlation threshold
CORRELATION_THRESHOLD = 0.05

selected_features = correlation[
    correlation.abs() >= CORRELATION_THRESHOLD
].index.tolist()

print(
    f"\nCorrelation threshold: "
    f"{CORRELATION_THRESHOLD}"
)

print(
    f"Features selected: "
    f"{len(selected_features)}"
)

print("\nSelected features:")

for feature in selected_features:
    print("  ✓", feature)


# ============================================
# STEP 6: Create selected feature dataset
# ============================================

X_selected = X[selected_features]

df_selected = pd.concat(
    [
        X_selected,
        y.rename('phishing')
    ],
    axis=1
)

print("\n" + "=" * 70)
print("STEP 4: Final Feature Selection Result")
print("=" * 70)

print(
    f"\nBefore feature selection: "
    f"{df_feature.shape[1] - 1} features"
)

print(
    f"After feature selection: "
    f"{X_selected.shape[1]} features"
)

print(
    f"Rows: "
    f"{df_selected.shape[0]}"
)

print(
    f"Final dataset shape: "
    f"{df_selected.shape}"
)


# ============================================
# STEP 7: Display selected dataset
# ============================================

print("\nFirst 5 rows of selected dataset:")
print(df_selected.head())


# ============================================
# STEP 8: Save selected dataset
# ============================================

output_file = 'phishing_website_feature_selected.csv'

df_selected.to_csv(
    output_file,
    index=False
)

print(
    f"\n✓ Feature-selected dataset saved as: "
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
          <span className="font-mono text-xs text-mutedDim ml-2">feature_selection.ipynb</span>
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

export default function FeatureSelection() {
  const totalBefore = 56;
  const constantRemoved = 15;
  const lowCorrRemoved = 16; // 56 - 15 - 25 = 16
  const finalFeatures = 25;

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
            <div className="w-10 h-10 rounded-md border border-hair bg-data-10 flex items-center justify-center shrink-0">
              <Filter size={17} className="text-data" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Preprocessing Step
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Feature Selection</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">
        {/* Stats — 4 cards with different grouping */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-hair rounded-lg bg-panel divide-x divide-y sm:divide-y-0" style={{ borderColor: c.border }}>
          <div className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-2xl text-ink">{totalBefore}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Total features</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">{constantRemoved}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Constant (variance=0)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">{lowCorrRemoved}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">|corr| &lt; 0.05</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">{finalFeatures}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Features kept</p>
          </div>
        </div>

        {/* Why feature selection */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Why select features</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Less is more — remove noise, avoid overfitting.
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-6">
            Including irrelevant or weak predictors increases the risk of overfitting and reduces
            generalisation. By removing constant features and those with low correlation to the target,
            we keep only the most informative attributes, improving both model performance and
            interpretability.
          </p>
        </section>

        {/* Three steps — horizontal flow */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Selection pipeline</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Three filters, one clear outcome.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Step 1: Constant */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-alert-10 flex items-center justify-center text-alert font-mono text-xs font-bold">1</div>
              <div className="flex items-center gap-2 mb-2">
                <Minus size={16} className="text-alert" />
                <span className="font-mono text-xs uppercase tracking-wider text-alert">Variance = 0</span>
              </div>
              <p className="font-display text-lg text-ink">Constant features</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                <strong className="text-ink">15</strong> attributes like{' '}
                <span className="text-ink">qty_hashtag_url</span>, <span className="text-ink">qty_slash_domain</span>,{' '}
                <span className="text-ink">qty_questionmark_domain</span> and{' '}
                <span className="text-ink">qty_equal_domain</span> were removed because they never change.
              </p>
            </div>
            {/* Step 2: Low correlation */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-alert-10 flex items-center justify-center text-alert font-mono text-xs font-bold">2</div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={16} className="text-alert" />
                <span className="font-mono text-xs uppercase tracking-wider text-alert">|corr| &lt; 0.05</span>
              </div>
              <p className="font-display text-lg text-ink">Weak predictors</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                <strong className="text-ink">16</strong> features with absolute correlation below{' '}
                <span className="text-ink">0.05</span> were dropped because they carry little to no
                predictive signal.
              </p>
            </div>
            {/* Step 3: High correlation */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-safe-10 flex items-center justify-center text-safe font-mono text-xs font-bold">3</div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-safe" />
                <span className="font-mono text-xs uppercase tracking-wider text-safe">|corr| ≥ 0.05</span>
              </div>
              <p className="font-display text-lg text-ink">Keep informative</p>
              <p className="font-body text-sm text-muted leading-relaxed mt-1">
                <strong className="text-ink">25</strong> features retained, including{' '}
                <span className="text-ink">qty_slash_url</span> (r=0.69),{' '}
                <span className="text-ink">length_url</span> (r=0.48), and{' '}
                <span className="text-ink">time_domain_activation</span> (r=-0.48).
              </p>
            </div>
          </div>
          {/* Final shape card */}
          <div className="mt-4 border border-hair rounded-lg p-5 bg-panel2 flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-safe-10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-safe" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-safe">Final dataset</p>
                <p className="font-body text-sm text-muted">
                  <strong className="text-ink">(9,944 rows × 25 features)</strong> — reduced from{' '}
                  <span className="text-mutedDim">(9,944 × 56)</span> by removing{' '}
                  <span className="text-alert">31</span> features.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-mutedDim">shape after selection</span>
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