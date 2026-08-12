import { FindingsTable } from "@/components/findings-table";
import { PageHeader } from "@/components/page-header";

export default function FindingsPage() { return <div className="space-y-8"><PageHeader title="Findings" description="Search and filter synthetic security observations. Status changes and evidence storage are not implemented."/><FindingsTable/></div>; }

