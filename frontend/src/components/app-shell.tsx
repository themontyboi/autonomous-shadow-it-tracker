"use client";

import {
  Boxes,
  Cable,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  Radar,
  SearchCheck,
  Settings,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { ApiStatus } from "@/components/api-status";
import { DEMO_WORKSPACE } from "@/lib/mock-data";

type NavigationItem = { href: string; label: string; icon: LucideIcon };

const primaryNavigation: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assets", label: "Assets", icon: Boxes },
  { href: "/scans", label: "Scans", icon: Radar },
  { href: "/findings", label: "Findings", icon: SearchCheck },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/integrations", label: "Integrations", icon: Cable },
];

const secondaryNavigation: NavigationItem[] = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

function NavLinks({ items, pathname, onNavigate }: { items: NavigationItem[]; pathname: string; onNavigate?: () => void }) {
  return (
    <ul className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return <li key={href}><Link href={href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 ${active ? "bg-teal-500/15 text-teal-300" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}><Icon aria-hidden="true" size={18} /><span>{label}</span>{label === "Findings" ? <span className="ml-auto rounded-full bg-rose-500/15 px-2 py-0.5 text-[10px] font-bold text-rose-300">12</span> : null}</Link></li>;
      })}
    </ul>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500 text-slate-950"><ShieldCheck aria-hidden="true" size={21} /></span>{compact ? <span className="text-sm font-semibold text-slate-900">Shadow IT Tracker</span> : <div><p className="text-sm font-semibold text-white">Shadow IT Tracker</p><p className="text-[11px] text-slate-500">Exposure monitoring</p></div>}</div>;
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return <div className="flex h-full flex-col"><div className="px-5 py-6"><Brand /></div><nav aria-label="Primary navigation" className="flex-1 px-3"><NavLinks items={primaryNavigation} pathname={pathname} onNavigate={onNavigate} /></nav><div className="px-3"><div className="mb-3 border-t border-white/10" /><nav aria-label="Secondary navigation"><NavLinks items={secondaryNavigation} pathname={pathname} onNavigate={onNavigate} /></nav></div><div className="space-y-3 p-4"><ApiStatus /><div className="rounded-lg border border-amber-400/15 bg-amber-400/5 px-3 py-2.5"><p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">Demo data</p><p className="mt-1 text-[11px] leading-4 text-slate-500">No live scanning or evidence collection.</p></div></div></div>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    closeMenuRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-slate-950 lg:block"><SidebarContent pathname={pathname} /></aside>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:ml-64 lg:px-8">
        <div className="flex items-center gap-3"><button type="button" onClick={() => setMenuOpen(true)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 lg:hidden" aria-label="Open navigation menu" aria-expanded={menuOpen}><Menu aria-hidden="true" size={20} /></button><div className="hidden sm:block lg:hidden"><Brand compact /></div><div className="hidden lg:block"><p className="text-xs font-medium uppercase tracking-wider text-slate-400">Workspace</p><p className="mt-0.5 text-sm font-semibold text-slate-800">{DEMO_WORKSPACE}</p></div></div>
        <div className="flex items-center gap-3"><span className="hidden rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 sm:inline-flex">Demo data</span><div className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-bold text-white" aria-label="Northstar Demo workspace">ND</div></div>
      </header>

      {menuOpen ? <div className="fixed inset-0 z-40 lg:hidden"><button type="button" className="absolute inset-0 bg-slate-950/60" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" /><aside role="dialog" aria-modal="true" aria-label="Navigation menu" className="relative h-full w-[min(85vw,18rem)] bg-slate-950 shadow-2xl"><button ref={closeMenuRef} type="button" onClick={() => setMenuOpen(false)} className="absolute right-3 top-4 rounded-md p-2 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400" aria-label="Close navigation menu"><X aria-hidden="true" size={20} /></button><SidebarContent pathname={pathname} onNavigate={() => setMenuOpen(false)} /></aside></div> : null}

      <main className="lg:ml-64"><div className="mx-auto max-w-[1480px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</div></main>
    </div>
  );
}
