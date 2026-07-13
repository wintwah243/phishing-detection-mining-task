import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Trash2, AlertTriangle } from "lucide-react";

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
    key: "missing",
    label: "High missingness",
    tone: "alert",
    desc: "Too many rows were empty for this column to be reliably imputed.",
  },
  {
    key: "variance",
    label: "Low variance",
    tone: "info",
    desc: "The value barely changed across samples, so it carried little signal.",
  },
  {
    key: "redundant",
    label: "Redundant",
    tone: "data",
    desc: "Strongly correlated with another column that was kept instead.",
  },
  {
    key: "leakage",
    label: "Data leakage",
    tone: "alert",
    desc: "The value would only be known after a site was already flagged — unfair for training.",
  },
];


const DELETED_COLUMNS = [
  {
    name: "qty_params",
    reason: "low variance",
    detail: "Nearly every initial phishing link or clean landing page completely lacks a query string, leaving almost no parameter counts to learn from.",
  },
  {
    name: "tld_present_params",
    reason: "low variance",
    detail: "Because parameter sections are rarely present on entry links, looking for a Top-Level Domain (like .com) inside a non-existent parameter string leaves virtually no signal to learn from.",
  },
  {
    name: "params_length",
    reason: "low variance",
    detail: "The vast majority of phishing links do not append dynamic query parameters.",
  },
  {
    name: "qty_percent_params",
    reason: "low variance",
    detail: "Phishing links rarely contain query strings, tracking encoded characters inside a non-existent parameter section leaves almost no signal to learn from.",
  },
  {
    name: "qty_dollar_params",
    reason: "low variance",
    detail: "A scam link has no dynamic parameter variables passing dollar sign data.",
  },
  {
    name: "qty_hashtag_params",
    reason: "low variance",
    detail: "A scam link has no dynamic parameter variables passing hashtag data.",
  },
{
    name: "qty_asterisk_params",
    reason: "low variance",
    detail: "A scam link has no dynamic parameter variables passing asterisk data.",
  },
{
    name: "qty_plus_params",
    reason: "low variance",
    detail: "A scam link has no dynamic parameter variables passing plus sign.",
  },
];

const COLAB_CODE = `import pandas as pd

df = pd.read_csv('phishing_website_full.csv')

threshold = 0.7
cols_to_drop = [col for col in df.columns if (df[col] == -1).mean() > threshold]

df_cleaned = df.drop(columns=cols_to_drop)
print(f"no of rows that are deleted: {len(cols_to_drop)}")


from sklearn.feature_selection import VarianceThreshold

numeric_df = df_cleaned.select_dtypes(include=['number'])

selector = VarianceThreshold(threshold=0)
selector.fit(numeric_df)

constant_cols = [col for col in numeric_df.columns if col not in numeric_df.columns[selector.get_support()]]
df_cleaned = df_cleaned.drop(columns=constant_cols)
`;

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
          <span className="font-mono text-xs text-mutedDim ml-2">preprocessing.ipynb</span>
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

export default function DeletedColumnsPreprocessing() {
  const totalBefore = 112;
  const totalAfter = totalBefore - 35;

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
            <div className="w-10 h-10 rounded-md border border-hair bg-alert-10 flex items-center justify-center shrink-0">
              <Trash2 size={17} className="text-alert" />
            </div>
            <div>
              <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-1">
                Preprocessing Step
              </p>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">Deleted Columns</h1>
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
            <p className="font-display text-2xl text-alert">35</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">columns removed</p>
          </div>
          <div className="px-5 py-5" style={{ borderColor: c.border }}>
            <p className="font-display text-2xl text-safe">{totalAfter}</p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-mutedDim mt-1">columns remaining</p>
          </div>
        </div>

        {/* Why */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">Why these columns</p>
          <h2 className="font-display text-2xl text-ink mb-4 max-w-xl">
            Every drop had a reason — nothing removed just to tidy up.
          </h2>
          <p className="font-body text-sm text-muted leading-relaxed max-w-2xl mb-6">
            Each column below was removed for one of four reasons found during
            exploratory data analysis. The goal was to keep only features that
            carry real, trainable signal without leaking information the model
            shouldn't have access to at prediction time.
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

        {/* List of deleted columns */}
        <section>
          <p className="font-mono text-xs tracking-widest text-mutedDim uppercase mb-4">
            Removed columns (35)
          </p>
          <div className="border border-hair rounded-lg overflow-hidden bg-panel divide-y" style={{ borderColor: c.border }}>
            {DELETED_COLUMNS.map((col, i) => {
              const reason = REASONS.find((r) => r.key === col.reason);
              return (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 px-5 py-4" style={{ borderColor: c.border }}>
                  <div className="sm:w-56 shrink-0">
                    <code className="font-mono text-sm text-ink break-all">{col.name}</code>
                  </div>
                  <div className="sm:w-40 shrink-0">
                    <span className={`inline-block font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded ${toneBg(reason?.tone)} ${toneText(reason?.tone)}`}>
                      {reason?.label || col.reason}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted leading-relaxed flex-1">{col.detail}</p>
                </div>
              );
            })}
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
        <p className="font-mono text-[11px] text-mutedDim">Data Mining · University Name · 2026</p>
      </footer>
    </div>
  );
}