import type { FindingStatus, ObservedState, ScanStatus, Severity } from "@/types/security";

const severityStyles: Record<Severity, string> = {
  critical: "border-rose-200 bg-rose-50 text-rose-700",
  high: "border-orange-200 bg-orange-50 text-orange-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-sky-200 bg-sky-50 text-sky-700",
  info: "border-slate-200 bg-slate-50 text-slate-600",
};

const statusStyles: Record<string, string> = {
  open: "bg-rose-50 text-rose-700",
  triaged: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
  queued: "bg-slate-100 text-slate-700",
  running: "bg-sky-50 text-sky-700",
  completed: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
  online: "bg-emerald-50 text-emerald-700",
  intermittent: "bg-amber-50 text-amber-700",
  "not-observed": "bg-slate-100 text-slate-600",
  ready: "bg-emerald-50 text-emerald-700",
  generating: "bg-sky-50 text-sky-700",
  scheduled: "bg-violet-50 text-violet-700",
  connected: "bg-emerald-50 text-emerald-700",
  available: "bg-sky-50 text-sky-700",
  planned: "bg-slate-100 text-slate-600",
};

function label(value: string): string {
  return value.replaceAll("-", " ").replace(/^./, (character) => character.toUpperCase());
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${severityStyles[severity]}`}>{label(severity)}</span>;
}

export function StatusBadge({ status }: { status: FindingStatus | ScanStatus | ObservedState | "ready" | "generating" | "scheduled" | "connected" | "available" | "planned" }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}>{label(status)}</span>;
}

