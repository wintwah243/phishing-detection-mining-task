import React from "react";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer id="about" className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
      <div className="flex flex-col sm:flex-row justify-between gap-8 border-t border-hair pt-10">
        <div>
          <p className="font-display text-xl text-ink mb-2">WINT WAH KYAW SOE</p>
          <p className="font-body text-sm text-muted max-w-sm leading-relaxed">
            Final year student, Bachelor of Computer Science. This project was
            built for the Data Mining course to explore phishing and anomaly
            detection in URLs.
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-sm">
          <a href="#" className="text-muted hover:text-ink flex items-center gap-2">
            <BookOpen size={14} /> Full project report (PDF)(coming soon)
          </a>
        </div>
      </div>
      <p className="font-mono text-[11px] text-mutedDim mt-10">
        Data & Knowledge Mining · University of Computer Studies, Yangon · 2026
      </p>
    </footer>
  );
}