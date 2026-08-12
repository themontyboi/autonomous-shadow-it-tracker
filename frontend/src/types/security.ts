export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type ScanStatus = "queued" | "running" | "completed" | "failed";

export type FindingStatus = "open" | "triaged" | "resolved";

export type AssetType = "web" | "api" | "mail" | "dns" | "cloud";

export type ObservedState = "online" | "intermittent" | "not-observed";

export interface Asset {
  id: string;
  hostname: string;
  type: AssetType;
  technology: string;
  environment: "production" | "staging" | "development";
  state: ObservedState;
  lastSeen: string;
}

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  asset: string;
  category: string;
  status: FindingStatus;
  lastSeen: string;
}

export interface Scan {
  id: string;
  target: string;
  startedAt: string;
  duration: string;
  status: ScanStatus;
  findingsCount: number;
}

export interface Report {
  id: string;
  name: string;
  period: string;
  generatedAt: string;
  status: "ready" | "generating" | "scheduled";
  audience: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "available" | "planned";
}

export interface TrendPoint {
  label: string;
  value: number;
}

