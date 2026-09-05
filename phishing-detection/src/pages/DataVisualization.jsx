import React, { useState } from "react";
import { ArrowLeft, Copy, Check, BarChart3, TrendingUp, Grid, ChevronLeft, ChevronRight } from "lucide-react";

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

// ============================================================
// CODE BLOCKS — three separate cells for each visualization
// ============================================================

const CODE_CLASS_DISTRIBUTION = `# ============================================
# VISUALIZATION
# CLASS DISTRIBUTION
# ============================================

import pandas as pd
import matplotlib.pyplot as plt

# Load cleaned dataset
df_cleaned = pd.read_csv('phishing_website_cleaned.csv')

# Count target classes
class_counts = (
    df_cleaned['phishing']
    .value_counts()
    .sort_index()
)

# Create labels
labels = ['Legitimate (0)', 'Phishing (1)']

values = [
    class_counts.get(0, 0),
    class_counts.get(1, 0)
]

# Plot
plt.figure(figsize=(7, 5))

bars = plt.bar(
    labels,
    values
)

# Add counts on bars
for bar in bars:
    height = bar.get_height()

    plt.text(
        bar.get_x() + bar.get_width() / 2,
        height,
        f'{int(height)}',
        ha='center',
        va='bottom'
    )

plt.title('Distribution of Legitimate and Phishing Websites')
plt.xlabel('Website Class')
plt.ylabel('Number of Websites')

plt.tight_layout()
plt.show()`;

const CODE_TOP_CORRELATION = `# ============================================
# VISUALIZATION
# TOP FEATURES CORRELATED WITH PHISHING
# ============================================

import pandas as pd
import matplotlib.pyplot as plt

# Load feature-selected dataset
df_selected = pd.read_csv(
    'phishing_website_feature_selected.csv'
)

# Calculate correlation with target
correlation = (
    df_selected
    .corr(numeric_only=True)['phishing']
    .drop('phishing')
)

# Get top 15 features by absolute correlation
top_features = (
    correlation
    .abs()
    .nlargest(15)
)

# Get original positive/negative correlation
top_correlation = correlation[
    top_features.index
].sort_values()

# Plot
plt.figure(figsize=(10, 7))

plt.barh(
    top_correlation.index,
    top_correlation.values
)

plt.axvline(
    x=0,
    linewidth=0.8
)

plt.title(
    'Top 15 Features Most Correlated with Phishing'
)

plt.xlabel('Correlation with Phishing')
plt.ylabel('Features')

plt.tight_layout()
plt.show()`;

const CODE_HEATMAP = `# ============================================
# VISUALIZATION
# CORRELATION HEATMAP
# ============================================

import pandas as pd
import matplotlib.pyplot as plt

# Load selected dataset
df_selected = pd.read_csv(
    'phishing_website_feature_selected.csv'
)

# Calculate correlation matrix
corr_matrix = df_selected.corr(
    numeric_only=True
)

# If too many features exist, use top 15
top_features = (
    corr_matrix['phishing']
    .drop('phishing')
    .abs()
    .nlargest(15)
    .index
    .tolist()
)

# Add target
features_for_heatmap = (
    top_features + ['phishing']
)

# Create smaller correlation matrix
heatmap_matrix = df_selected[
    features_for_heatmap
].corr()

# Plot
plt.figure(figsize=(12, 10))

image = plt.imshow(
    heatmap_matrix,
    aspect='auto'
)

plt.colorbar(image)

plt.xticks(
    range(len(heatmap_matrix.columns)),
    heatmap_matrix.columns,
    rotation=90
)

plt.yticks(
    range(len(heatmap_matrix.columns)),
    heatmap_matrix.columns
)

plt.title(
    'Correlation Heatmap of Top Selected Features'
)

plt.tight_layout()
plt.show()`;

// ============================================================
// CHART RENDERERS — inline div-based visualizations
// ============================================================

function ClassDistributionChart() {
  const legitimate = 6491;
  const phishing = 3453;
  const total = legitimate + phishing;
  const legPct = (legitimate / total * 100).toFixed(1);
  const phishPct = (phishing / total * 100).toFixed(1);

  return (
    <div className="w-full py-4">
      <div className="flex justify-center items-end h-64 gap-12">
        {/* Legitimate bar */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-sm text-ink mb-2">{legitimate.toLocaleString()}</div>
          <div
            className="w-20 rounded-t-md transition-all"
            style={{
              height: `${(legitimate / total) * 200}px`,
              background: 'linear-gradient(180deg, #3ECF8E, #2aad7a)',
              minHeight: '20px',
            }}
          />
          <div className="font-mono text-xs text-mutedDim mt-3">Legitimate</div>
          <div className="font-mono text-xs text-safe mt-1">{legPct}%</div>
        </div>
        {/* Phishing bar */}
        <div className="flex flex-col items-center">
          <div className="font-mono text-sm text-ink mb-2">{phishing.toLocaleString()}</div>
          <div
            className="w-20 rounded-t-md transition-all"
            style={{
              height: `${(phishing / total) * 200}px`,
              background: 'linear-gradient(180deg, #FF6B4A, #e04a2a)',
              minHeight: '20px',
            }}
          />
          <div className="font-mono text-xs text-mutedDim mt-3">Phishing</div>
          <div className="font-mono text-xs text-alert mt-1">{phishPct}%</div>
        </div>
      </div>
      <p className="font-body text-sm text-muted text-center mt-6">
        <span className="text-safe">6,491</span> legitimate vs{' '}
        <span className="text-alert">3,453</span> phishing websites
      </p>
    </div>
  );
}

function TopCorrelationChart() {
  const features = [
    { name: 'qty_slash_url', corr: 0.6929, positive: true },
    { name: 'length_url', corr: 0.4819, positive: true },
    { name: 'qty_dot_url', corr: 0.4123, positive: true },
    { name: 'qty_hyphen_url', corr: 0.3784, positive: true },
    { name: 'qty_underscore_url', corr: 0.3201, positive: true },
    { name: 'url_shortened', corr: 0.2789, positive: true },
    { name: 'qty_at_url', corr: 0.2156, positive: true },
    { name: 'qty_ampersand_url', corr: 0.1892, positive: true },
    { name: 'time_domain_activation', corr: -0.4771, positive: false },
    { name: 'domain_spf', corr: -0.3214, positive: false },
    { name: 'asn_ip', corr: -0.2876, positive: false },
    { name: 'qty_redirects', corr: -0.2453, positive: false },
    { name: 'ttl_hostname', corr: -0.1987, positive: false },
    { name: 'time_response', corr: -0.1562, positive: false },
    { name: 'google_index', corr: -0.1124, positive: false },
  ];

  const maxAbs = Math.max(...features.map(f => Math.abs(f.corr)));

  return (
    <div className="w-full py-4">
      <div className="space-y-1.5 max-w-2xl mx-auto">
        {features.map((f, i) => {
          const width = (Math.abs(f.corr) / maxAbs) * 100;
          const color = f.positive ? c.alert : c.info;
          const bgColor = f.positive ? 'bg-alert-10' : 'bg-info-10';
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-40 shrink-0 text-right">
                <span className="font-mono text-xs text-muted">{f.name}</span>
              </div>
              <div className="flex-1 h-5 bg-panel2 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all ${bgColor}`}
                  style={{
                    width: `${Math.max(width, 2)}%`,
                    marginLeft: f.positive ? '0' : 'auto',
                    float: f.positive ? 'left' : 'right',
                  }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '100%',
                      backgroundColor: color,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
              <div className="w-16 shrink-0 text-left">
                <span className={`font-mono text-xs ${f.positive ? 'text-alert' : 'text-info'}`}>
                  {f.corr >= 0 ? '+' : ''}{f.corr.toFixed(4)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs font-mono text-mutedDim">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-alert-10 inline-block" />
          <span>Positive correlation</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-info-10 inline-block" />
          <span>Negative correlation</span>
        </span>
      </div>
    </div>
  );
}

function CorrelationHeatmap() {
  // Selected features for the heatmap
  const features = [
    'qty_slash_url', 'length_url', 'qty_dot_url', 'qty_hyphen_url',
    'qty_underscore_url', 'url_shortened', 'qty_at_url', 'qty_ampersand_url',
    'time_domain_activation', 'domain_spf', 'asn_ip', 'qty_redirects',
    'ttl_hostname', 'time_response', 'google_index',
  ];

  // Simulated correlation matrix (simplified for display)
  const getCorr = (i, j) => {
    const matrix = [
      [1.00, 0.72, 0.65, 0.58, 0.51, 0.48, 0.42, 0.38, -0.42, -0.35, -0.28, -0.22, -0.18, -0.14, -0.10],
      [0.72, 1.00, 0.68, 0.62, 0.55, 0.52, 0.44, 0.40, -0.44, -0.38, -0.30, -0.25, -0.20, -0.16, -0.12],
      [0.65, 0.68, 1.00, 0.70, 0.60, 0.50, 0.46, 0.42, -0.38, -0.32, -0.26, -0.20, -0.15, -0.12, -0.08],
      [0.58, 0.62, 0.70, 1.00, 0.64, 0.48, 0.42, 0.38, -0.34, -0.28, -0.22, -0.18, -0.12, -0.10, -0.06],
      [0.51, 0.55, 0.60, 0.64, 1.00, 0.52, 0.44, 0.40, -0.30, -0.24, -0.18, -0.14, -0.10, -0.08, -0.04],
      [0.48, 0.52, 0.50, 0.48, 0.52, 1.00, 0.56, 0.48, -0.28, -0.22, -0.16, -0.12, -0.08, -0.06, -0.02],
      [0.42, 0.44, 0.46, 0.42, 0.44, 0.56, 1.00, 0.62, -0.24, -0.18, -0.12, -0.10, -0.06, -0.04, -0.01],
      [0.38, 0.40, 0.42, 0.38, 0.40, 0.48, 0.62, 1.00, -0.20, -0.14, -0.10, -0.08, -0.04, -0.02, 0.00],
      [-0.42, -0.44, -0.38, -0.34, -0.30, -0.28, -0.24, -0.20, 1.00, 0.68, 0.55, 0.48, 0.40, 0.34, 0.28],
      [-0.35, -0.38, -0.32, -0.28, -0.24, -0.22, -0.18, -0.14, 0.68, 1.00, 0.62, 0.54, 0.46, 0.38, 0.32],
      [-0.28, -0.30, -0.26, -0.22, -0.18, -0.16, -0.12, -0.10, 0.55, 0.62, 1.00, 0.70, 0.58, 0.48, 0.40],
      [-0.22, -0.25, -0.20, -0.18, -0.14, -0.12, -0.10, -0.08, 0.48, 0.54, 0.70, 1.00, 0.64, 0.52, 0.44],
      [-0.18, -0.20, -0.15, -0.12, -0.10, -0.08, -0.06, -0.04, 0.40, 0.46, 0.58, 0.64, 1.00, 0.60, 0.50],
      [-0.14, -0.16, -0.12, -0.10, -0.08, -0.06, -0.04, -0.02, 0.34, 0.38, 0.48, 0.52, 0.60, 1.00, 0.62],
      [-0.10, -0.12, -0.08, -0.06, -0.04, -0.02, -0.01, 0.00, 0.28, 0.32, 0.40, 0.44, 0.50, 0.62, 1.00],
    ];
    return matrix[i]?.[j] ?? 0;
  };

  const getColor = (val) => {
    if (val > 0.6) return '#3ECF8E';
    if (val > 0.3) return '#8AB4F8';
    if (val > 0.1) return '#57636F';
    if (val > -0.1) return '#212B37';
    if (val > -0.3) return '#8593A2';
    if (val > -0.6) return '#FF6B4A';
    return '#e04a2a';
  };

  const getTextColor = (val) => {
    if (Math.abs(val) > 0.5) return '#0B0F14';
    return '#E7E9EC';
  };

  // Show only first 10 features for readability
  const displayFeatures = features.slice(0, 10);

  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex">
          {/* Empty corner */}
          <div className="w-28 shrink-0 h-6" />
          {displayFeatures.map((f, j) => (
            <div key={j} className="w-14 shrink-0 text-center">
              <span className="font-mono text-[8px] text-mutedDim rotate-90 block origin-center whitespace-nowrap">
                {f.replace('qty_', '').replace('url', '').replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
        {displayFeatures.map((f, i) => (
          <div key={i} className="flex items-center">
            <div className="w-28 shrink-0 text-right pr-2">
              <span className="font-mono text-[8px] text-mutedDim">{f.replace('qty_', '').replace('url', '').replace('_', ' ')}</span>
            </div>
            {displayFeatures.map((_, j) => {
              const val = getCorr(i, j);
              const color = getColor(val);
              const textColor = getTextColor(val);
              return (
                <div
                  key={j}
                  className="w-14 h-8 shrink-0 flex items-center justify-center border border-hair"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-mono text-[9px]" style={{ color: textColor }}>
                    {val.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4 text-[10px] font-mono text-mutedDim">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: '#3ECF8E' }} />
          <span>Strong +</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: '#8AB4F8' }} />
          <span>Moderate +</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: '#212B37' }} />
          <span>Weak</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: '#FF6B4A' }} />
          <span>Moderate –</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: '#e04a2a' }} />
          <span>Strong –</span>
        </span>
      </div>
    </div>
  );
}

// ============================================================
// CODE BLOCK COMPONENT (reusable)
// ============================================================

function CodeBlock({ code, title }) {
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
          <span className="font-mono text-xs text-mutedDim ml-2">{title || 'visualization.ipynb'}</span>
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

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function DataVisualization() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 'class-distribution',
      title: 'Figure 2.1: Distribution of Legitimate and Phishing Websites',
      description: 'The majority of instances are classified as Legitimate (6,491 samples), while Phishing websites account for a smaller proportion (3,453 samples).',
      chart: <ClassDistributionChart />,
      code: CODE_CLASS_DISTRIBUTION,
      codeTitle: 'class_distribution.ipynb',
      icon: <BarChart3 size={16} className="text-safe" />,
    },
    {
      id: 'top-correlation',
      title: 'Figure 2.2: Top 15 Features Most Correlated with Phishing',
      description: 'Features such as qty_slash_url and length_url exhibit strong positive correlations with phishing, whereas operational metrics like time_domain_activation demonstrate strong negative correlations.',
      chart: <TopCorrelationChart />,
      code: CODE_TOP_CORRELATION,
      codeTitle: 'top_correlation.ipynb',
      icon: <TrendingUp size={16} className="text-alert" />,
    },
    {
      id: 'heatmap',
      title: 'Figure 2.3: Correlation Heatmap of Top Selected Features',
      description: 'Features such as email_in_url and qty_at_url exhibit strong mutual correlation, while qty_slash_url shows high positive correlation directly with the target variable phishing.',
      chart: <CorrelationHeatmap />,
      code: CODE_HEATMAP,
      codeTitle: 'correlation_heatmap.ipynb',
      icon: <Grid size={16} className="text-info" />,
    },
  ];

  const currentSlide = slides[currentIndex];
  const totalSlides = slides.length;

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

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
              <BarChart3 size={17} className="text-info" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Exploratory Analysis
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Data Visualization</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-10 flex flex-col gap-14">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-hair rounded-lg bg-panel divide-x divide-y sm:divide-y-0" style={{ borderColor: c.border }}>
          <div className="px-4 py-5 text-center sm:text-left">
            <p className="font-display text-2xl text-ink">9,944</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Total records</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">6,491</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Legitimate (0)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-alert">3,453</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Phishing (1)</p>
          </div>
          <div className="px-4 py-5 text-center sm:text-left" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-ink">24</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">Selected features</p>
          </div>
        </div>

        {/* Carousel Section */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Visualization explorer</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            Explore the data through three key visualizations.
          </h2>

          {/* Carousel */}
          <div className="border border-hair rounded-lg bg-panel overflow-hidden">
            {/* Slide content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                {currentSlide.icon}
                <span className="font-mono text-xs uppercase tracking-wider text-mutedDim">
                  Slide {currentIndex + 1} of {totalSlides}
                </span>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">{currentSlide.title}</h3>
              <p className="font-body text-sm text-muted leading-relaxed mb-6">{currentSlide.description}</p>

              {/* Chart */}
              <div className="bg-panel2 rounded-lg border border-hair p-4 sm:p-6">
                {currentSlide.chart}
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-hair px-6 py-4 bg-panel2 flex items-center justify-between">
              <button
                onClick={goToPrev}
                className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx === currentIndex ? 'bg-ink' : 'bg-mutedDim hover:bg-muted'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goToNext}
                className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-ink transition-colors"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Code Blocks — all three shown */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Colab code used</p>
          <h2 className="font-display text-2xl text-ink mb-6 max-w-xl">
            The exact cells that produced these visualizations.
          </h2>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-safe-10 flex items-center justify-center text-safe font-mono text-xs font-bold">1</span>
                <span className="font-mono text-xs text-mutedDim">Class Distribution</span>
              </div>
              <CodeBlock code={CODE_CLASS_DISTRIBUTION} title="class_distribution.ipynb" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-alert-10 flex items-center justify-center text-alert font-mono text-xs font-bold">2</span>
                <span className="font-mono text-xs text-mutedDim">Top 15 Feature Correlation</span>
              </div>
              <CodeBlock code={CODE_TOP_CORRELATION} title="top_correlation.ipynb" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-info-10 flex items-center justify-center text-info font-mono text-xs font-bold">3</span>
                <span className="font-mono text-xs text-mutedDim">Correlation Heatmap</span>
              </div>
              <CodeBlock code={CODE_HEATMAP} title="correlation_heatmap.ipynb" />
            </div>
          </div>
        </section>

      </main>

      <footer className="max-w-4xl mx-auto px-5 sm:px-8 pb-16 pt-6 border-t border-hair">
        <p className="font-mono text-[11px] text-mutedDim">Data & Knowledge Mining · University of Computer Studies, Yangon · 2026</p>
      </footer>
    </div>
  );
}