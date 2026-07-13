export const c = {
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
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
`;

export const globalCss = `
${fonts}
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
.border-alert { border-color: ${c.alert}; }
.border-safe { border-color: ${c.safe}; }
.border-data { border-color: ${c.data}; }
.bg-alert-10 { background-color: rgba(255,107,74,0.10); }
.bg-safe-10 { background-color: rgba(62,207,142,0.10); }
.bg-data-10 { background-color: rgba(255,200,87,0.10); }

.grid-texture {
  background-image:
    linear-gradient(${c.border}55 1px, transparent 1px),
    linear-gradient(90deg, ${c.border}55 1px, transparent 1px);
  background-size: 42px 42px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 80%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 80%);
}

@keyframes riseIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.rise { animation: riseIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
.rise-1 { animation-delay: 0.05s; }
.rise-2 { animation-delay: 0.15s; }
.rise-3 { animation-delay: 0.25s; }
.rise-4 { animation-delay: 0.35s; }

@media (prefers-reduced-motion: reduce) {
  .rise { animation: none; }
}

.tick { width: 1px; height: 10px; background: ${c.border}; }

a { text-decoration: none; }
`;