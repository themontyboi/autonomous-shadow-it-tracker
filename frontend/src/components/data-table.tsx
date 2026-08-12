import type { ReactNode } from "react";

export function DataTable({ children, label }: { children: ReactNode; label: string }) {
  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm" aria-label={label}>{children}</table></div></div>;
}

export function TableHead({ children }: { children: ReactNode }) {
  return <th scope="col" className="border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</th>;
}

export function TableCell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`border-b border-slate-100 px-5 py-4 text-slate-600 last:border-b-0 ${className}`}>{children}</td>;
}

