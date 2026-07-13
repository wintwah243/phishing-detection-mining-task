import React from "react";

const urlSegments = [
  { text: "http://", tone: "muted", label: "scheme", note: "no TLS" },
  { text: "secure-paypal", tone: "alert", label: "subdomain", note: "brand keyword" },
  { text: ".", tone: "muted", label: "" },
  { text: "verify-login.info", tone: "alert", label: "domain + tld", note: "rare TLD" },
  { text: "/account/update", tone: "muted", label: "path", note: "" },
  { text: "?ref=8841ab2e", tone: "data", label: "query", note: "random token" },
];

const toneClasses = {
  muted: { text: "text-muted", border: "border-hair" },
  alert: { text: "text-alert", border: "border-alert" },
  data: { text: "text-data", border: "border-data" },
};

export default function UrlAnatomy() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-end gap-0 min-w-max font-mono text-sm sm:text-base">
        {urlSegments.map((seg, i) => {
          const t = toneClasses[seg.tone];
          return (
            <div key={i} className="flex flex-col items-start">
              <div className={`px-1 pb-1 border-b-2 ${t.border} ${t.text} whitespace-pre`}>
                {seg.text}
              </div>
              {seg.label ? (
                <div className="flex flex-col items-start mt-1.5 pl-1">
                  <div className="tick" />
                  <span className={`text-[10px] uppercase tracking-wider mt-1 ${t.text}`}>
                    {seg.label}
                  </span>
                  {seg.note ? (
                    <span className="text-[10px] text-mutedDim mt-0.5">{seg.note}</span>
                  ) : null}
                </div>
              ) : (
                <div className="mt-1.5 pl-1">
                  <div className="tick opacity-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}