"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Play, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { StatusBadge } from "@/components/badges";
import type { ScanStatus } from "@/types/security";

export function DemoScan() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ScanStatus>("queued");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setTimeout(() => setStatus("completed"), 1800);
    return () => window.clearTimeout(timer);
  }, [status]);

  function openDialog() { setStatus("queued"); setOpen(true); }

  return <><button type="button" onClick={openDialog} className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"><Play aria-hidden="true" size={16}/>New Scan</button>{open ? <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-slate-950/60 p-4"><button type="button" className="absolute inset-0 cursor-default" onClick={() => setOpen(false)} aria-label="Close demo scan dialog"/><section role="dialog" aria-modal="true" aria-labelledby="demo-scan-title" aria-describedby="demo-scan-description" className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"><div className="flex items-start justify-between gap-4"><div><span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-700">UI simulation</span><h2 id="demo-scan-title" className="mt-3 text-xl font-semibold text-slate-950">Start demo scan</h2></div><button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-600" aria-label="Close dialog"><X aria-hidden="true" size={20}/></button></div><p id="demo-scan-description" className="mt-3 text-sm leading-6 text-slate-600">This local interaction demonstrates product states only. It makes no API call, performs no DNS, HTTP, or TLS requests, and stores nothing.</p><dl className="mt-6 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50 px-4"><Row term="Synthetic target" detail="northstar-demo.invalid" mono/><Row term="Demo profile" detail="External posture baseline"/><Row term="Current state" detail={<StatusBadge status={status}/>}/></dl>{status === "completed" ? <div className="mt-5 flex gap-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800"><CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18}/><p><strong className="block">Simulation complete</strong>No network activity occurred. Reloading resets this state.</p></div> : <div className="mt-5 flex gap-3 rounded-lg bg-sky-50 p-4 text-sm text-sky-800"><AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18}/><p>All progress shown here is temporary client-side presentation.</p></div>}<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Close</button><button type="button" disabled={status === "running" || status === "completed"} onClick={() => setStatus("running")} className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300">{status === "running" ? <LoaderCircle aria-hidden="true" className="animate-spin" size={16}/> : <Play aria-hidden="true" size={16}/>}Start Demo Scan</button></div></section></div> : null}</>;
}

function Row({ term, detail, mono = false }: { term: string; detail: ReactNode; mono?: boolean }) { return <div className="flex items-center justify-between gap-4 py-3"><dt className="text-xs font-medium text-slate-500">{term}</dt><dd className={`text-right text-sm font-medium text-slate-800 ${mono ? "font-mono text-xs" : ""}`}>{detail}</dd></div>; }
