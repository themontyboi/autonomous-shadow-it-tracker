import { StatusBadge } from "@/components/badges";
import { DataTable, TableCell, TableHead } from "@/components/data-table";
import { DemoScan } from "@/components/demo-scan";
import { PageHeader } from "@/components/page-header";
import { formatDateTime } from "@/lib/format";
import { scans } from "@/lib/mock-data";

export default function ScansPage() {
  return <div className="space-y-8"><PageHeader title="Scans" description="Presentation-only scan history. New Scan demonstrates local UI states and never initiates network activity." action={<DemoScan/>}/><div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"><strong>Demo mode:</strong> scan records and progress are synthetic and reset locally.</div><DataTable label="Demo scan history"><thead><tr><TableHead>Scan identifier</TableHead><TableHead>Target</TableHead><TableHead>Started</TableHead><TableHead>Duration</TableHead><TableHead>Status</TableHead><TableHead>Findings</TableHead></tr></thead><tbody>{scans.map((scan) => <tr key={scan.id} className="hover:bg-slate-50"><TableCell><code className="font-semibold text-slate-900">{scan.id}</code></TableCell><TableCell><code className="text-xs">{scan.target}</code></TableCell><TableCell>{formatDateTime(scan.startedAt)}</TableCell><TableCell>{scan.duration}</TableCell><TableCell><StatusBadge status={scan.status}/></TableCell><TableCell className="font-semibold text-slate-900">{scan.findingsCount}</TableCell></tr>)}</tbody></DataTable></div>;
}

