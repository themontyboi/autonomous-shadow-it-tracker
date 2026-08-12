import { DataTable, TableCell, TableHead } from "@/components/data-table";
import { StatusBadge } from "@/components/badges";
import { PageHeader } from "@/components/page-header";
import { assets } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/format";

export default function AssetsPage() {
  return <div className="space-y-8"><PageHeader title="External assets" description="Synthetic inventory used to demonstrate the future attack-surface workflow. No discovery requests are performed." /><div className="grid grid-cols-2 gap-4 sm:grid-cols-4"><Summary label="Total observed" value="24"/><Summary label="Production" value="15"/><Summary label="Staging" value="6"/><Summary label="Not observed" value="3"/></div><DataTable label="Demo external asset inventory"><thead><tr><TableHead>Asset / hostname</TableHead><TableHead>Type</TableHead><TableHead>Technology</TableHead><TableHead>Environment</TableHead><TableHead>Observed state</TableHead><TableHead>Last seen</TableHead></tr></thead><tbody>{assets.map((asset) => <tr key={asset.id} className="hover:bg-slate-50"><TableCell><code className="font-semibold text-slate-900">{asset.hostname}</code><span className="mt-1 block font-mono text-[11px] text-slate-400">{asset.id}</span></TableCell><TableCell className="capitalize">{asset.type}</TableCell><TableCell>{asset.technology}</TableCell><TableCell className="capitalize">{asset.environment}</TableCell><TableCell><StatusBadge status={asset.state}/></TableCell><TableCell>{formatDateTime(asset.lastSeen)}</TableCell></tr>)}</tbody></DataTable></div>;
}

function Summary({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-medium text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold text-slate-950">{value}</p></div>; }

