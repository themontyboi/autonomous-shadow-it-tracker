import { CalendarClock, Eye, FileBarChart } from "lucide-react";

import { StatusBadge } from "@/components/badges";
import { PageHeader } from "@/components/page-header";
import { formatDateTime } from "@/lib/format";
import { reports } from "@/lib/mock-data";

export default function ReportsPage() {
  return <div className="space-y-8"><PageHeader title="Reports" description="Mock reporting workspace for demonstrating information hierarchy. No files are generated or available for download."/><section className="grid gap-5 md:grid-cols-2">{reports.map((report) => <article key={report.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><span className="rounded-lg bg-teal-50 p-2.5 text-teal-700"><FileBarChart aria-hidden="true" size={20}/></span><StatusBadge status={report.status}/></div><h2 className="mt-5 font-semibold text-slate-950">{report.name}</h2><p className="mt-1 text-sm text-slate-500">{report.audience}</p><dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs"><div><dt className="text-slate-400">Reporting period</dt><dd className="mt-1 font-medium text-slate-700">{report.period}</dd></div><div><dt className="text-slate-400">Generated</dt><dd className="mt-1 font-medium text-slate-700">{formatDateTime(report.generatedAt)}</dd></div></dl><button type="button" disabled={report.status !== "ready"} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"><Eye aria-hidden="true" size={16}/>{report.status === "ready" ? "Preview layout" : <><CalendarClock aria-hidden="true" size={16}/>Preview unavailable</>}</button><p className="mt-2 text-center text-[11px] text-slate-400">Presentation only · no PDF or download</p></article>)}</section></div>;
}

