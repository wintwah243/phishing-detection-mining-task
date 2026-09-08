import React, { useState } from "react";
import { ArrowRight, Search, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import UrlAnatomy from "./UrlAnatomy";
import FeatureVector from "./FeatureVector";
import { c } from "../constants/theme";

export default function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://phishing-detection-backend-a1yi.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed. Please check FastAPI backend server.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-texture pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
        <p className="rise rise-1 font-mono text-xs tracking-widest text-mutedDim uppercase mb-5">
          Supervisor - Dr. Hsu Myat Mo
        </p>

        <h1 className="rise rise-2 font-display text-ink text-4xl sm:text-6xl leading-[1.08] max-w-3xl">
          Teaching a model to read{" "}
          <span className="italic text-data">between the lines</span> of a URL.
        </h1>

        <p className="rise rise-3 font-body text-muted text-base sm:text-lg max-w-xl mt-6 leading-relaxed">
          I would like to express my sincere gratitude to my teacher,{" "}
            <span className="text-data font-medium">Dr. Hsu Myat Mo</span>, for her continuous guidance,
            encouragement and patient support in the completion of this project. Her valuable advice and feedbacks as
            well as academic guidance have been a key factor for the successful development of this work.
        </p>

        {/* Real-time Phishing Detection Section */}
        <div className="rise rise-4 mt-8 max-w-2xl">
          <form onSubmit={handlePredict} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedDim" size={18} />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to check (e.g., https://example.com)"
                className="w-full pl-10 pr-4 py-3 bg-panel border border-hair rounded-md text-ink font-mono text-sm placeholder:text-mutedDim focus:outline-none focus:border-data transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 font-mono text-sm px-6 py-3 rounded-md bg-data text-void font-medium hover:brightness-110 transition disabled:opacity-50 shrink-0"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Analyze URL"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 bg-alert/10 border border-alert/30 text-alert font-mono text-xs rounded-md">
              {error}
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="mt-4 p-5 border border-hair rounded-lg bg-panel2 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {result.prediction === 1 ? (
                  <ShieldAlert className="text-alert shrink-0" size={28} />
                ) : (
                  <ShieldCheck className="text-safe shrink-0" size={28} />
                )}
                <div>
                  <h3 className="font-display text-lg text-ink">
                    {result.prediction === 1 ? "⚠️ Phishing URL Detected" : "✅ Legitimate URL"}
                  </h3>
                  <p className="font-mono text-xs text-muted font-bold truncate max-w-md">{result.url}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-hair font-mono text-xs">
                <div>
                  <span className="text-mutedDim uppercase block">Legitimate Prob</span>
                  <span className="text-safe text-base font-semibold">{result.legitimate_prob}%</span>
                </div>
                <div>
                  <span className="text-mutedDim uppercase block">Phishing Prob</span>
                  <span className="text-alert text-base font-semibold">{result.phishing_prob}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rise rise-4 flex flex-wrap gap-3 mt-8">
          <a
            href="#log"
            className="flex items-center gap-2 font-mono text-sm px-5 py-3 rounded-md bg-data text-void font-medium hover:brightness-110 transition"
          >
            Open the mining log <ArrowRight size={15} />
          </a>
          <a
            href="#methodology"
            className="flex items-center gap-2 font-mono text-sm px-5 py-3 rounded-md border border-hair text-ink hover:border-mutedDim transition"
          >
            See the methodology
          </a>
        </div>

        <div className="rise rise-4 mt-14 border border-hair rounded-xl bg-panel p-5 sm:p-7">
          <p className="font-mono text-[11px] text-mutedDim uppercase tracking-wider mb-4">
            Sample input → feature extraction
          </p>
          <UrlAnatomy />
          <div className="h-px bg-hair my-5" style={{ backgroundColor: c.border }} />
          <FeatureVector />
        </div>
      </div>
    </section>
  );
}