import { GitBranch, MessageCircle, MessagesSquare, PlugZap } from "lucide-react";

import { StatusBadge } from "@/components/badges";
import { PageHeader } from "@/components/page-header";
import { integrations } from "@/lib/mock-data";

const icons = { GitHub: GitBranch, Slack: MessageCircle, Discord: MessagesSquare };

export default function IntegrationsPage() {
  return <div className="space-y-8"><PageHeader title="Integrations" description="Future connection surfaces shown as product-shell examples. OAuth, tokens, webhooks, and external API calls are not implemented."/><div className="rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800"><strong>Demo UI only:</strong> connection states below are synthetic and cannot be configured.</div><section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{integrations.map((integration) => { const Icon = icons[integration.name as keyof typeof icons] ?? PlugZap; return <article key={integration.id} className="flex min-h-60 flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white"><Icon aria-hidden="true" size={21}/></span><StatusBadge status={integration.status}/></div><h2 className="mt-6 text-lg font-semibold text-slate-950">{integration.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{integration.description}</p><button type="button" disabled className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-400">Configuration unavailable in demo</button></article>; })}</section></div>;
}
