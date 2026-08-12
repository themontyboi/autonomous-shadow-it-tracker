import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, detail, icon: Icon, tone = "teal" }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: "teal" | "rose" | "amber" | "slate" }) {
  const tones = { teal: "bg-teal-50 text-teal-700", rose: "bg-rose-50 text-rose-700", amber: "bg-amber-50 text-amber-700", slate: "bg-slate-100 text-slate-700" };
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4"><p className="text-sm font-medium text-slate-600">{label}</p><span className={`rounded-lg p-2 ${tones[tone]}`}><Icon aria-hidden="true" size={18} /></span></div>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{detail}</p>
    </article>
  );
}

