import { AlertTriangle, Boxes, Clock3, SearchCheck } from "lucide-react";

import { StatusBadge, SeverityBadge } from "@/components/badges";
import { SeverityChart, TrendChart } from "@/components/charts";
import { DataTable, TableCell, TableHead } from "@/components/data-table";
import { MetricCard } from "@/components/metric-card";
import { PageHeader } from "@/components/page-header";
import { findings, scans } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Exposure overview" description="A presentation-only view of Northstar Demo’s synthetic external attack surface. No live evidence is shown." />
      <section aria-label="Exposure metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="External Assets" value="24" detail="6 synthetic assets shown" icon={Boxes} />
        <MetricCard label="Open Findings" value="12" detail="Demo findings requiring review" icon={SearchCheck} tone="slate" />
        <MetricCard label="Critical / High" value="3" detail="1 critical · 2 high" icon={AlertTriangle} tone="rose" />
        <MetricCard label="Last Scan" value="4m ago" detail="Completed in 4m 18s" icon={Clock3} tone="amber" />
      </section>
      <div className="grid gap-5 xl:grid-cols-2"><SeverityChart /><TrendChart /></div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="space-y-4"><div><h2 className="text-lg font-semibold text-slate-950">Recent findings</h2><p className="mt-1 text-sm text-slate-500">Latest synthetic observations requiring attention</p></div><DataTable label="Recent demo findings"><thead><tr><TableHead>Severity</TableHead><TableHead>Finding</TableHead><TableHead>Asset</TableHead><TableHead>Status</TableHead></tr></thead><tbody>{findings.slice(0, 4).map((finding) => <tr key={finding.id} className="hover:bg-slate-50"><TableCell><SeverityBadge severity={finding.severity} /></TableCell><TableCell className="font-medium text-slate-900">{finding.title}</TableCell><TableCell><code className="text-xs">{finding.asset}</code></TableCell><TableCell><StatusBadge status={finding.status} /></TableCell></tr>)}</tbody></DataTable></section>
        <section className="space-y-4"><div><h2 className="text-lg font-semibold text-slate-950">Recent scan activity</h2><p className="mt-1 text-sm text-slate-500">Simulated scan history</p></div><div className="rounded-xl border border-slate-200 bg-white shadow-sm">{scans.slice(0, 4).map((scan, index) => <div key={scan.id} className={`flex items-center gap-4 p-4 ${index ? "border-t border-slate-100" : ""}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100"><SearchCheck aria-hidden="true" className="text-slate-600" size={17} /></span><div className="min-w-0 flex-1"><p className="truncate font-mono text-xs font-semibold text-slate-800">{scan.id}</p><p className="mt-1 text-xs text-slate-500">{formatDateTime(scan.startedAt)}</p></div><StatusBadge status={scan.status} /></div>)}</div></section>
      </div>
    </div>
  );
}
