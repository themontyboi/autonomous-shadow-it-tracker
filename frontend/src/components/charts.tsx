import { severityDistribution, exposureTrend } from "@/lib/mock-data";
import type { Severity } from "@/types/security";

const severityMeta: Array<{ key: Severity; label: string; color: string }> = [
  { key: "critical", label: "Critical", color: "#e11d48" },
  { key: "high", label: "High", color: "#f97316" },
  { key: "medium", label: "Medium", color: "#f59e0b" },
  { key: "low", label: "Low", color: "#0ea5e9" },
  { key: "info", label: "Info", color: "#64748b" },
];

export function SeverityChart() {
  const total = Object.values(severityDistribution).reduce((sum, value) => sum + value, 0);
  const stops = severityMeta.map(({ key, color }, index) => {
    const start = severityMeta.slice(0, index).reduce((sum, item) => sum + severityDistribution[item.key], 0) / total * 100;
    const end = start + severityDistribution[key] / total * 100;
    return `${color} ${start}% ${end}%`;
  }).join(", ");
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="severity-title">
      <div><h2 id="severity-title" className="font-semibold text-slate-950">Severity distribution</h2><p className="mt-1 text-xs text-slate-500">Open demo findings by severity</p></div>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
        <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${stops})` }} aria-hidden="true"><div className="grid h-24 w-24 place-items-center rounded-full bg-white text-center"><span><strong className="block text-2xl text-slate-950">{total}</strong><span className="text-xs text-slate-500">findings</span></span></div></div>
        <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-3 text-sm">
          {severityMeta.map(({ key, label, color }) => <li key={key} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />{label}</span><strong className="text-slate-900">{severityDistribution[key]}</strong></li>)}
        </ul>
      </div>
    </section>
  );
}

export function TrendChart() {
  const max = Math.max(...exposureTrend.map((point) => point.value));
  const min = Math.min(...exposureTrend.map((point) => point.value));
  const coordinates = exposureTrend.map((point, index) => `${(index / (exposureTrend.length - 1)) * 100},${88 - ((point.value - min) / (max - min || 1)) * 64}`).join(" ");
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="trend-title">
      <div className="flex items-start justify-between"><div><h2 id="trend-title" className="font-semibold text-slate-950">Exposure trend</h2><p className="mt-1 text-xs text-slate-500">Open demo findings over 7 days</p></div><span className="text-sm font-semibold text-emerald-700">−29%</span></div>
      <div className="mt-5 h-36" role="img" aria-label={`Open findings decreased from ${exposureTrend[0].value} to ${exposureTrend.at(-1)?.value} over seven days.`}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible"><defs><linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d9488" stopOpacity="0.24"/><stop offset="1" stopColor="#0d9488" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${coordinates} 100,100`} fill="url(#trend-fill)"/><polyline points={coordinates} fill="none" stroke="#0d9488" strokeWidth="2" vectorEffect="non-scaling-stroke"/></svg>
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-slate-400">{exposureTrend.map((point) => <span key={point.label}>{point.label}</span>)}</div>
    </section>
  );
}
