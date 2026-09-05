import React, { useState } from "react";
import { ArrowLeft, Copy, Check, TrendingUp, Link2, PieChart, Zap, Shield, Globe, Layers } from "lucide-react";

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

// Colab code for association rule mining
const COLAB_CODE = `# ============================================================
# ASSOCIATION PATTERN MINING
# ============================================================

# Install mlxtend if needed
!pip install mlxtend -q


# ============================================================
# STEP 1: IMPORT LIBRARIES
# ============================================================

import pandas as pd
import numpy as np

from mlxtend.frequent_patterns import apriori, association_rules


# ============================================================
# STEP 2: LOAD DATASET
# ============================================================

df = pd.read_csv(
    'phishing_website_feature_selected.csv'
)

print("=" * 70)
print("ASSOCIATION PATTERN MINING")
print("=" * 70)

print("\nOriginal dataset shape:", df.shape)


# ============================================================
# STEP 3: CHECK TARGET VALUES
# ============================================================

print("\nTarget distribution:")
print(df['phishing'].value_counts())

# Remove rows with missing target
df = df.dropna(subset=['phishing']).copy()

# Make sure target is integer
df['phishing'] = df['phishing'].astype(int)


# ============================================================
# STEP 4: SEPARATE FEATURES
# ============================================================

X = df.drop(columns=['phishing']).copy()


# ============================================================
# STEP 5: REMOVE CONSTANT FEATURES
# ============================================================

constant_features = [
    col for col in X.columns
    if X[col].nunique() <= 1
]

if constant_features:
    X = X.drop(columns=constant_features)

print("\nConstant features removed:", len(constant_features))


# ============================================================
# STEP 6: SELECT FEATURES FOR ASSOCIATION MINING
# ============================================================

# Select top 15 non-constant features with highest variance

feature_variance = X.var().sort_values(ascending=False)

top_features = feature_variance.head(15).index.tolist()

print("\nFeatures selected for association mining:")

for col in top_features:
    print("✓", col)


# ============================================================
# STEP 7: DISCRETIZE NUMERIC FEATURES
# ============================================================

print("\n" + "=" * 70)
print("DISCRETIZING FEATURES")
print("=" * 70)

transaction_df = pd.DataFrame(index=df.index)


for col in top_features:

    values = X[col].copy()

    unique_count = values.nunique()

    # --------------------------------------------------------
    # Case 1: Binary feature
    # --------------------------------------------------------

    if unique_count == 2:

        unique_values = sorted(values.unique())

        transaction_df[col] = np.where(
            values == unique_values[0],
            "Low",
            "High"
        )

    # --------------------------------------------------------
    # Case 2: Very few unique values
    # --------------------------------------------------------

    elif unique_count <= 5:

        transaction_df[col] = values.astype(str)

    # --------------------------------------------------------
    # Case 3: Continuous feature
    # --------------------------------------------------------

    else:

        try:

            transaction_df[col] = pd.qcut(
                values.rank(method='first'),
                q=3,
                labels=[
                    'Low',
                    'Medium',
                    'High'
                ]
            )

        except Exception as e:

            print(
                f"Warning: Could not discretize {col}"
            )

            median_value = values.median()

            transaction_df[col] = np.where(
                values <= median_value,
                "Low",
                "High"
            )


# ============================================================
# STEP 8: ADD TARGET
# ============================================================

transaction_df['phishing'] = np.where(
    df['phishing'] == 1,
    'Phishing',
    'Legitimate'
)


print("\nSample discretized data:")
print(transaction_df.head())


# ============================================================
# STEP 9: CHECK VALUE DISTRIBUTION
# ============================================================

print("\n" + "=" * 70)
print("DISCRETIZATION CHECK")
print("=" * 70)

for col in top_features[:5]:

    print(f"\n{col}:")

    print(
        transaction_df[col]
        .value_counts()
    )


# ============================================================
# STEP 10: ONE-HOT ENCODE TRANSACTION DATA
# ============================================================

print("\n" + "=" * 70)
print("CREATING TRANSACTION MATRIX")
print("=" * 70)

transaction_encoded = pd.get_dummies(
    transaction_df,
    prefix_sep="="
).astype(bool)


print("\nTransaction matrix shape:")
print(transaction_encoded.shape)

print("\nSample columns:")
print(
    transaction_encoded.columns.tolist()[:20]
)


# ============================================================
# STEP 11: FIND FREQUENT ITEMSETS
# ============================================================

print("\n" + "=" * 70)
print("FINDING FREQUENT ITEMSETS")
print("=" * 70)

frequent_itemsets = apriori(
    transaction_encoded,
    min_support=0.05,
    use_colnames=True,
    max_len=3
)

frequent_itemsets['length'] = (
    frequent_itemsets['itemsets']
    .apply(len)
)

print(
    "\nFrequent itemsets found:",
    len(frequent_itemsets)
)

print("\nTop frequent itemsets:")

print(
    frequent_itemsets
    .sort_values(
        by='support',
        ascending=False
    )
    .head(10)
)


# ============================================================
# STEP 12: GENERATE ASSOCIATION RULES
# ============================================================

print("\n" + "=" * 70)
print("GENERATING ASSOCIATION RULES")
print("=" * 70)

rules = association_rules(
    frequent_itemsets,
    metric='confidence',
    min_threshold=0.60
)


# ============================================================
# IMPORTANT: CHECK RULE COLUMNS
# ============================================================

print("\nAvailable rule columns:")

print(
    rules.columns.tolist()
)


# Check required columns

required_columns = [
    'antecedents',
    'consequents',
    'support',
    'confidence',
    'lift'
]

missing_columns = [
    col for col in required_columns
    if col not in rules.columns
]

if missing_columns:

    print(
        "\nERROR: Missing columns:",
        missing_columns
    )

    print(
        "\nAssociation rules could not be generated correctly."
    )

else:

    print(
        "\nTotal association rules found:",
        len(rules)
    )


    # ========================================================
    # HELPER FUNCTION
    # ========================================================

    def contains_item(itemset, target_item):

        return any(
            str(item) == target_item
            for item in itemset
        )


    # ========================================================
    # PATTERN 1: PHISHING ASSOCIATION
    # ========================================================

    print("\n" + "=" * 70)
    print("PATTERN 1: PHISHING ASSOCIATION PATTERNS")
    print("=" * 70)


    phishing_rules = rules[
        rules['consequents'].apply(
            lambda x: contains_item(
                x,
                'phishing=Phishing'
            )
        )
    ].copy()


    # Remove rules where phishing is also in antecedent

    phishing_rules = phishing_rules[
        ~phishing_rules['antecedents'].apply(
            lambda x: contains_item(
                x,
                'phishing=Phishing'
            )
        )
    ]


    print(
        "\nPhishing rules found:",
        len(phishing_rules)
    )


    if len(phishing_rules) > 0:

        phishing_rules = (
            phishing_rules
            .sort_values(
                by=[
                    'lift',
                    'confidence'
                ],
                ascending=False
            )
        )


        print(
            phishing_rules[
                [
                    'antecedents',
                    'consequents',
                    'support',
                    'confidence',
                    'lift'
                ]
            ]
            .head(10)
        )

    else:

        print(
            "\nNo phishing rules found."
        )


    # ========================================================
    # PATTERN 2: LEGITIMATE ASSOCIATION
    # ========================================================

    print("\n" + "=" * 70)
    print("PATTERN 2: LEGITIMATE ASSOCIATION PATTERNS")
    print("=" * 70)


    legitimate_rules = rules[
        rules['consequents'].apply(
            lambda x: contains_item(
                x,
                'phishing=Legitimate'
            )
        )
    ].copy()


    legitimate_rules = legitimate_rules[
        ~legitimate_rules['antecedents'].apply(
            lambda x: contains_item(
                x,
                'phishing=Legitimate'
            )
        )
    ]


    print(
        "\nLegitimate rules found:",
        len(legitimate_rules)
    )


    if len(legitimate_rules) > 0:

        legitimate_rules = (
            legitimate_rules
            .sort_values(
                by=[
                    'lift',
                    'confidence'
                ],
                ascending=False
            )
        )


        print(
            legitimate_rules[
                [
                    'antecedents',
                    'consequents',
                    'support',
                    'confidence',
                    'lift'
                ]
            ]
            .head(10)
        )

    else:

        print(
            "\nNo legitimate rules found."
        )


    # ========================================================
    # PATTERN 3: FEATURE-TO-FEATURE ASSOCIATION
    # ========================================================

    print("\n" + "=" * 70)
    print("PATTERN 3: FEATURE-TO-FEATURE ASSOCIATION")
    print("=" * 70)


    def contains_target(itemset):

        return any(
            str(item).startswith('phishing=')
            for item in itemset
        )


    feature_rules = rules[
        ~rules['antecedents'].apply(
            contains_target
        )
        &
        ~rules['consequents'].apply(
            contains_target
        )
    ].copy()


    print(
        "\nFeature association rules found:",
        len(feature_rules)
    )


    if len(feature_rules) > 0:

        feature_rules = (
            feature_rules
            .sort_values(
                by=[
                    'lift',
                    'confidence'
                ],
                ascending=False
            )
        )


        print(
            feature_rules[
                [
                    'antecedents',
                    'consequents',
                    'support',
                    'confidence',
                    'lift'
                ]
            ]
            .head(10)
        )

    else:

        print(
            "\nNo feature association rules found."
        )


    # ========================================================
    # STEP 13: SELECT 3 FINAL PATTERNS
    # ========================================================

    print("\n" + "=" * 70)
    print("FINAL 3 ASSOCIATION PATTERNS")
    print("=" * 70)


    pattern_candidates = []


    # Best phishing pattern

    if len(phishing_rules) > 0:

        pattern_candidates.append(
            (
                "PHISHING PATTERN",
                phishing_rules.iloc[0]
            )
        )


    # Best legitimate pattern

    if len(legitimate_rules) > 0:

        pattern_candidates.append(
            (
                "LEGITIMATE PATTERN",
                legitimate_rules.iloc[0]
            )
        )


    # Best feature pattern

    if len(feature_rules) > 0:

        pattern_candidates.append(
            (
                "FEATURE ASSOCIATION PATTERN",
                feature_rules.iloc[0]
            )
        )


    for i, (
        pattern_type,
        rule
    ) in enumerate(
        pattern_candidates,
        start=1
    ):

        print(
            f"\n{'-' * 50}"
        )

        print(
            f"PATTERN {i}: "
            f"{pattern_type}"
        )

        print(
            f"{'-' * 50}"
        )

        print(
            "\nIF:"
        )

        print(
            list(
                rule['antecedents']
            )
        )

        print(
            "\nTHEN:"
        )

        print(
            list(
                rule['consequents']
            )
        )

        print(
            f"\nSupport: "
            f"{rule['support']:.4f}"
        )

        print(
            f"Confidence: "
            f"{rule['confidence']:.4f}"
        )

        print(
            f"Lift: "
            f"{rule['lift']:.4f}"
        )


    # ========================================================
    # STEP 14: SAVE RESULTS
    # ========================================================

    rules.to_csv(
        'all_association_rules.csv',
        index=False
    )


    phishing_rules.to_csv(
        'phishing_association_patterns.csv',
        index=False
    )


    legitimate_rules.to_csv(
        'legitimate_association_patterns.csv',
        index=False
    )


    feature_rules.to_csv(
        'feature_association_patterns.csv',
        index=False
    )


    print("\n" + "=" * 70)
    print("ASSOCIATION MINING COMPLETED")
    print("=" * 70)

    print(
        "\nFiles saved successfully."
    )`;

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
          <span className="font-mono text-xs text-mutedDim ml-2">association_mining.ipynb</span>
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

export default function DescriptiveMining() {
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
            <ArrowLeft size={13} /> Back to methodologies
          </a>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-hair bg-data-10 flex items-center justify-center shrink-0">
              <Link2 size={17} className="text-data" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Descriptive Mining
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Association Rule Mining</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-hair rounded-lg bg-panel divide-x divide-y sm:divide-y-0" style={{ borderColor: c.border }}>
          <div className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-2xl text-ink">9,944</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Instances</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-ink">15</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Attributes (discretized)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">6,040</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Association rules</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">3</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Core patterns identified</p>
          </div>
        </div>

        {/* Process Overview */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Mining process</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            From continuous features to actionable rules.
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-info-10 flex items-center justify-center text-info font-mono text-xs font-bold">1</div>
              <div className="flex items-center gap-2 mb-2">
                <Layers size={16} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Discretization</span>
              </div>
              <p className="font-display text-lg text-ink mb-1">Continuous → Categorical</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Numerical features (e.g., <span className="text-ink">qty_slash_url</span>) are binned into <span className="text-ink">low</span>, <span className="text-ink">medium</span>, <span className="text-ink">high</span> categories to create a binary transaction matrix.
              </p>
            </div>

            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-safe-10 flex items-center justify-center text-safe font-mono text-xs font-bold">2</div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Frequent Itemsets</span>
              </div>
              <p className="font-display text-lg text-ink mb-1">Apriori algorithm</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Identifies combinations of attribute‑value pairs that occur together frequently across the 9,944 instances.
              </p>
            </div>

            <div className="border border-hair rounded-lg p-5 bg-panel flex flex-col items-start relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-data-10 flex items-center justify-center text-data font-mono text-xs font-bold">3</div>
              <div className="flex items-center gap-2 mb-2">
                <PieChart size={16} className="text-mutedDim" />
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">Rule Generation</span>
              </div>
              <p className="font-display text-lg text-ink mb-1">6,040 rules</p>
              <p className="font-body text-sm text-muted leading-relaxed">
                Rules are filtered by <span className="text-ink">support</span>, <span className="text-ink">confidence</span> and <span className="text-ink">lift</span> to capture high‑probability feature relationships.
              </p>
            </div>
          </div>
        </section>

        {/* Core Patterns — displayed as tables */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Discovered patterns</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Three core association patterns emerge from the data.
          </h2>

          <div className="grid grid-cols-1 gap-8">

            {/* PATTERN 1: PHISHING */}
            <div className="border border-hair rounded-lg bg-panel2 overflow-hidden">
              <div className="p-5 border-b border-hair flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-alert" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-alert">Pattern 1</span>
                    <h3 className="font-display text-xl text-ink">Phishing Association Patterns</h3>
                  </div>
                </div>
                <span className="font-mono text-sm bg-alert-10 text-alert px-3 py-1 rounded-full">40 rules</span>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hair text-left">
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 pr-4">Antecedents</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4">Consequents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hair">
                    {[
                      ["(domain_spf=High, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(asn_ip=Medium, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_redirects=Low, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_ip_resolved=Medium, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_dot_url=Low, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_ip_resolved=Low, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_mx_servers=Medium, qty_slash_url=High)", "(phishing=Phishing)"],
                      ["(qty_slash_url=High, qty_mx_servers=Low)", "(phishing=Phishing)"],
                      ["(qty_vowels_domain=High, qty_mx_servers=Low)", "(phishing=Phishing)"],
                      ["(qty_vowels_domain=Medium, qty_slash_url=High)", "(phishing=Phishing)"],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-panel/50 transition-colors">
                        <td className="font-mono text-xs text-ink py-2 pr-4">{row[0]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="font-mono text-xs text-mutedDim mt-3 text-right">Showing 10 of 40 rules</p>
              </div>
            </div>

            {/* PATTERN 2: LEGITIMATE */}
            <div className="border border-hair rounded-lg bg-panel2 overflow-hidden">
              <div className="p-5 border-b border-hair flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-safe" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-safe">Pattern 2</span>
                    <h3 className="font-display text-xl text-ink">Legitimate Association Patterns</h3>
                  </div>
                </div>
                <span className="font-mono text-sm bg-safe-10 text-safe px-3 py-1 rounded-full">539 rules</span>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hair text-left">
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 pr-4">Antecedents</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4">Consequents</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4 text-right">Support</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4 text-right">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hair">
                    {[
                      ["(qty_equal_url=Low)", "(qty_and_url=Low, phishing=Legitimate)", "0.224", "0.672"],
                      ["(qty_hyphen_url=Low)", "(qty_hyphen_domain=Low, phishing=Legitimate)", "0.220", "0.660"],
                      ["(qty_equal_url=Low)", "(qty_hyphen_domain=Low, phishing=Legitimate)", "0.218", "0.653"],
                      ["(qty_equal_url=Medium)", "(qty_hyphen_domain=Medium, phishing=Legitimate)", "0.215", "0.646"],
                      ["(qty_and_url=Low)", "(qty_equal_url=Low, phishing=Legitimate)", "0.224", "0.672"],
                      ["(qty_equal_url=Medium)", "(qty_and_url=Medium, phishing=Legitimate)", "0.213", "0.641"],
                      ["(qty_and_url=Low)", "(qty_hyphen_domain=Low, phishing=Legitimate)", "0.210", "0.631"],
                      ["(qty_hyphen_domain=Low)", "(qty_and_url=Low, phishing=Legitimate)", "0.210", "0.631"],
                      ["(qty_hyphen_domain=Low)", "(qty_equal_url=Low, phishing=Legitimate)", "0.218", "0.653"],
                      ["(qty_hyphen_domain=Medium)", "(qty_equal_url=Medium, phishing=Legitimate)", "0.215", "0.646"],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-panel/50 transition-colors">
                        <td className="font-mono text-xs text-ink py-2 pr-4">{row[0]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4">{row[1]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4 text-right">{row[2]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4 text-right">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="font-mono text-xs text-mutedDim mt-3 text-right">Showing 10 of 539 rules</p>
              </div>
            </div>

            {/* PATTERN 3: FEATURE-TO-FEATURE */}
            <div className="border border-hair rounded-lg bg-panel2 overflow-hidden">
              <div className="p-5 border-b border-hair flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Link2 size={20} className="text-info" />
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-info">Pattern 3</span>
                    <h3 className="font-display text-xl text-ink">Feature‑to‑Feature Association</h3>
                  </div>
                </div>
                <span className="font-mono text-sm bg-info-10 text-info px-3 py-1 rounded-full">4,912 rules</span>
              </div>
              <div className="overflow-x-auto p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hair text-left">
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 pr-4">Antecedents</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4">Consequents</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4 text-right">Support</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4 text-right">Confidence</th>
                      <th className="font-mono text-xs text-mutedDim uppercase tracking-wider py-2 px-4 text-right">Lift</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hair">
                    {[
                      ["(qty_slash_url=Low, qty_ip_resolved=Medium)", "(qty_and_url=Medium)", "0.112", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_ip_resolved=Medium)", "(qty_equal_url=Medium)", "0.112", "1.000", "3.001"],
                      ["(qty_redirects=Low, qty_hyphen_url=Medium)", "(qty_hyphen_domain=Medium)", "0.051", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_hyphen_domain=Medium)", "(qty_and_url=Medium)", "0.129", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_hyphen_url=Medium)", "(qty_hyphen_domain=Medium)", "0.111", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_hyphen_domain=Medium)", "(qty_equal_url=Medium)", "0.129", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_hyphen_url=Medium)", "(qty_and_url=Medium)", "0.111", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_equal_url=Medium)", "(qty_and_url=Medium)", "0.141", "1.000", "3.001"],
                      ["(qty_slash_url=Low, qty_hyphen_url=Medium)", "(qty_equal_url=Medium)", "0.111", "1.000", "3.001"],
                      ["(qty_and_url=Medium, qty_hyphen_url=Medium)", "(qty_hyphen_domain=Medium)", "0.229", "1.000", "3.001"],
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-panel/50 transition-colors">
                        <td className="font-mono text-xs text-ink py-2 pr-4">{row[0]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4">{row[1]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4 text-right">{row[2]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4 text-right">{row[3]}</td>
                        <td className="font-mono text-xs text-ink py-2 px-4 text-right">{row[4]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="font-mono text-xs text-mutedDim mt-3 text-right">Showing 10 of 4,912 rules</p>
              </div>
            </div>

          </div>
        </section>

        {/* Code Block */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Colab code used</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            The exact cell that produced these results.
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