import React from "react";

const featureChips = [
  { label: "url_length", value: "54" },
  { label: "has_ip_host", value: "false" },
  { label: "hyphen_count", value: "2" },
  { label: "subdomain_depth", value: "3" },
  { label: "uses_https", value: "false" },
  { label: "tld_rarity_score", value: "0.91" },
];

export default function FeatureVector() {
  return (
    <div className="flex flex-wrap gap-2">
      {featureChips.map((f, i) => (
        <div
          key={i}
          className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-hair bg-panel2 text-muted"
        >
          <span className="text-mutedDim">{f.label}</span>
          <span className="text-ink"> = </span>
          <span className="text-ink">{f.value}</span>
        </div>
      ))}
      <div className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-alert bg-alert-10 text-alert">
        prediction = phishing (0.94)
      </div>
    </div>
  );
}