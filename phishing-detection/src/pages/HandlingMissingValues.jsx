import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, AlertTriangle, Shield, Database } from "lucide-react";

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

const REASONS = [
  {
    key: "high_missing",
    label: "High missingness (>50%)",
    tone: "alert",
    desc: "Directory and parameter attributes (e.g. qty_dot_directory, file_length, params_length) have >50% missing. These are dropped to avoid bias.",
  },
  {
    key: "median_impute",
    label: "Median imputation",
    tone: "safe",
    desc: "Skewed numeric features (e.g. domain_spf, time_domain_activation, time_domain_expiration) are imputed with the median (e.g. 5,181.0 days).",
  },
  {
    key: "mode_impute",
    label: "Mode imputation",
    tone: "data",
    desc: "Discrete/categorical fields (e.g. time_response, asn_ip, qty_redirects, Google index) are filled with the most frequent value.",
  },
  {
    key: "leakage_prevent",
    label: "Avoid leakage",
    tone: "info",
    desc: "Imputation statistics are computed only on the training set, then applied to validation/test to prevent data leakage.",
  },
];

const COLAB_CODE = `# ============================================
# MISSING VALUES HANDLING
# ============================================

import pandas as pd
import numpy as np
from google.colab import files

# ============================================
# STEP 1: Load dataset
# ============================================

df = pd.read_csv('phishing_website_full.csv')

# IMPORTANT:
# df_clean is the dataset that will be used
# for ALL following preprocessing steps.
df_clean = df.copy()

print("=" * 70)
print("STEP 1: Identifying columns with encoded missing values (-1)")
print("=" * 70)

missing_cols = []

for col in df_clean.columns:

    # Skip target variable
    if col == 'phishing':
        continue

    if (df_clean[col] == -1).sum() > 0:
        missing_cols.append(col)

print(f"\nFound {len(missing_cols)} columns with -1 values:")
print("-" * 70)

for col in missing_cols:
    missing_count = (df_clean[col] == -1).sum()
    missing_pct = missing_count / len(df_clean) * 100

    print(
        f"  • {col}: "
        f"{missing_count:,} missing "
        f"({missing_pct:.2f}%)"
    )


# ============================================
# STEP 2: Decide handling strategy
# ============================================

print("\n" + "=" * 70)
print("STEP 2: Handling strategy")
print("=" * 70)

DROP_THRESHOLD = 50

cols_to_drop = []
cols_to_impute_median = []
cols_to_impute_mode = []

for col in missing_cols:

    missing_pct = (
        (df_clean[col] == -1).sum()
        / len(df_clean)
        * 100
    )

    if missing_pct > DROP_THRESHOLD:

        cols_to_drop.append(col)

        print(
            f"  → {col}: "
            f"{missing_pct:.1f}% missing "
            f"→ WILL BE DROPPED"
        )

    elif missing_pct > 10:

        cols_to_impute_median.append(col)

        print(
            f"  → {col}: "
            f"{missing_pct:.1f}% missing "
            f"→ MEDIAN IMPUTATION"
        )

    else:

        cols_to_impute_mode.append(col)

        print(
            f"  → {col}: "
            f"{missing_pct:.1f}% missing "
            f"→ MODE IMPUTATION"
        )


# ============================================
# STEP 3: Drop columns
# ============================================

print("\n" + "=" * 70)
print("STEP 3: Applying handling strategies")
print("=" * 70)

if cols_to_drop:

    print(
        f"\nDropping {len(cols_to_drop)} columns "
        f"with >{DROP_THRESHOLD}% missing values:"
    )

    for col in cols_to_drop:
        print(f"  ✗ Dropped: {col}")

    df_clean = df_clean.drop(
        columns=cols_to_drop
    )

else:

    print("\nNo columns need to be dropped.")


# ============================================
# STEP 4: Median Imputation
# ============================================

if cols_to_impute_median:

    print(
        f"\nImputing {len(cols_to_impute_median)} "
        f"columns with MEDIAN:"
    )

    for col in cols_to_impute_median:

        # Calculate median excluding -1
        col_data = df_clean.loc[
            df_clean[col] != -1,
            col
        ]

        median_val = col_data.median()

        # Replace -1 with median
        missing_mask = df_clean[col] == -1

        missing_count = missing_mask.sum()

        df_clean.loc[
            missing_mask,
            col
        ] = median_val

        print(
            f"  ✓ {col}: "
            f"Replaced {missing_count:,} "
            f"values with median = {median_val}"
        )


# ============================================
# STEP 5: Mode Imputation
# ============================================

if cols_to_impute_mode:

    print(
        f"\nImputing {len(cols_to_impute_mode)} "
        f"columns with MODE:"
    )

    for col in cols_to_impute_mode:

        # Calculate mode excluding -1
        col_data = df_clean.loc[
            df_clean[col] != -1,
            col
        ]

        mode_values = col_data.mode()

        if len(mode_values) > 0:
            mode_val = mode_values.iloc[0]
        else:
            mode_val = 0

        # Replace -1 with mode
        missing_mask = df_clean[col] == -1

        missing_count = missing_mask.sum()

        df_clean.loc[
            missing_mask,
            col
        ] = mode_val

        print(
            f"  ✓ {col}: "
            f"Replaced {missing_count:,} "
            f"values with mode = {mode_val}"
        )


# ============================================
# STEP 6: Remove duplicate rows
# ============================================

print("\n" + "=" * 70)
print("STEP 6: Handling duplicate rows")
print("=" * 70)

duplicates_before = df_clean.duplicated().sum()

print(
    f"\n• Duplicate rows before removal: "
    f"{duplicates_before:,}"
)

if duplicates_before > 0:

    df_clean = df_clean.drop_duplicates()

    duplicates_after = df_clean.duplicated().sum()

    print(
        f"• Duplicate rows after removal: "
        f"{duplicates_after:,}"
    )

    print(
        f"• Removed {duplicates_before:,} "
        f"duplicate rows"
    )

else:

    print("• No duplicate rows to remove.")


# ============================================
# STEP 7: Final verification
# ============================================

print("\n" + "=" * 70)
print("STEP 7: Final verification")
print("=" * 70)

# Check remaining -1 values
remaining_minus_one = (
    df_clean == -1
).sum().sum()

print(
    f"\n• Remaining -1 values: "
    f"{remaining_minus_one:,}"
)

# Check remaining NaN values
remaining_nan = df_clean.isna().sum().sum()

print(
    f"• Remaining NaN values: "
    f"{remaining_nan:,}"
)

# Shape comparison
print(
    f"• Original dataset shape: "
    f"{df.shape}"
)

print(
    f"• Cleaned dataset shape: "
    f"{df_clean.shape}"
)

print(
    f"• Rows removed: "
    f"{df.shape[0] - df_clean.shape[0]:,}"
)

print(
    f"• Columns removed: "
    f"{df.shape[1] - df_clean.shape[1]}"
)


# ============================================
# STEP 8: Target verification
# ============================================

print("\n" + "=" * 70)
print("TARGET VARIABLE")
print("=" * 70)

print(
    f"\n• Target data type: "
    f"{df_clean['phishing'].dtype}"
)

print(
    f"\n• Target distribution:"
)

print(
    df_clean['phishing'].value_counts()
)


# ============================================
# STEP 9: Display cleaned dataset
# ============================================

print("\n" + "=" * 70)
print("CLEANED DATASET PREVIEW")
print("=" * 70)

display(df_clean.head())


# ============================================
# STEP 10: SAVE CLEANED DATASET
# ============================================

output_file = 'phishing_website_cleaned.csv'

df_clean.to_csv(
    output_file,
    index=False
)

print(
    f"\n✓ Cleaned dataset saved successfully as:"
    f" {output_file}"
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
          <span className="font-mono text-xs text-mutedDim ml-2">missing_handling.ipynb</span>
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

export default function HandlingMissingValues() {
  const totalBefore = 112;
  const colsDropped = 56;
  const totalAfter = totalBefore - colsDropped;

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
              <Shield size={17} className="text-safe" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Preprocessing Step
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Handling Missing Values</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">
        {/* Stats */}
        <div className="grid grid-cols-3 border border-hair rounded-lg bg-panel divide-x" style={{ borderColor: c.border }}>
          <div className="px-5 py-5">
            <p className="font-display text-2xl text-ink">{totalBefore}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">columns before</p>
          </div>
          <div className="px-5 py-5" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">{colsDropped}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">columns dropped</p>
          </div>
          <div className="px-5 py-5" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">{totalAfter}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">columns remaining</p>
          </div>
        </div>

        {/* Why */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Why handle missing data</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Missingness is signal — but only if you treat it right.
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-6">
            In the raw dataset, missing observations are explicitly encoded using placeholder values
            (specifically -1). It is vital to preprocess these data points because of the possible
            appearance of biased estimations during training algorithms.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {REASONS.map((r) => (
              <div key={r.key} className="border border-hair rounded-lg p-4 bg-panel flex gap-3">
                <div className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${toneBg(r.tone)}`}>
                  <AlertTriangle size={14} className={toneText(r.tone)} />
                </div>
                <div>
                  <p className={`font-mono text-xs uppercase tracking-wider mb-1 ${toneText(r.tone)}`}>
                    {r.label}
                  </p>
                  <p className="font-body text-sm text-muted leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process summary */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Handling strategy summary</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            A three‑step approach to missing values.
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Drop */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-alert-10 flex items-center justify-center shrink-0">
                  <Trash2 size={14} className="text-alert" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-alert">Drop</span>
              </div>
              <p className="font-display text-2xl text-ink">56</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Columns with &gt;50% missing values (e.g. <span className="text-ink">qty_dot_directory</span>, <span className="text-ink">file_length</span>, <span className="text-ink">params_length</span>) were removed to avoid bias.
              </p>
            </div>
            {/* Median imputation */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-safe-10 flex items-center justify-center shrink-0">
                  <Database size={14} className="text-safe" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-safe">Median</span>
              </div>
              <p className="font-display text-2xl text-ink">—</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Skewed numeric features (<span className="text-ink">domain_spf</span>, <span className="text-ink">time_domain_activation</span>, <span className="text-ink">time_domain_expiration</span>) imputed with median (e.g. 5,181.0 days).
              </p>
            </div>
            {/* Mode imputation */}
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-data-10 flex items-center justify-center shrink-0">
                  <Database size={14} className="text-data" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wider text-data">Mode</span>
              </div>
              <p className="font-display text-2xl text-ink">—</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Discrete/categorical fields (<span className="text-ink">time_response</span>, <span className="text-ink">asn_ip</span>, <span className="text-ink">qty_redirects</span>, Google index) filled with the most frequent value.
              </p>
            </div>
          </div>
          {/* Duplicate rows & final shape */}
          <div className="mt-4 border border-hair rounded-lg p-5 bg-panel flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-info-10 flex items-center justify-center shrink-0">
                <Check size={14} className="text-info" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-info">Duplicate rows removed</p>
                <p className="font-body text-sm text-muted">
                  <strong className="text-ink">55</strong> duplicate records removed, resulting in a refined shape of{' '}
                  <strong className="text-ink">9,944 rows</strong> and <strong className="text-ink">56 features</strong>.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-mutedDim">step 6 in code</span>
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