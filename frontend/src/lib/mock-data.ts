import type {
  Asset,
  Finding,
  Integration,
  Report,
  Scan,
  Severity,
  TrendPoint,
} from "@/types/security";

export const DEMO_WORKSPACE = "Northstar Demo";

export const assets: Asset[] = [
  { id: "ast_001", hostname: "app.northstar-demo.invalid", type: "web", technology: "Next.js", environment: "production", state: "online", lastSeen: "2026-08-12T08:42:00Z" },
  { id: "ast_002", hostname: "api.northstar-demo.invalid", type: "api", technology: "FastAPI", environment: "production", state: "online", lastSeen: "2026-08-12T08:41:00Z" },
  { id: "ast_003", hostname: "mail.northstar-demo.invalid", type: "mail", technology: "SMTP", environment: "production", state: "intermittent", lastSeen: "2026-08-12T07:18:00Z" },
  { id: "ast_004", hostname: "staging.northstar-demo.invalid", type: "web", technology: "React", environment: "staging", state: "online", lastSeen: "2026-08-12T06:55:00Z" },
  { id: "ast_005", hostname: "dns.northstar-demo.invalid", type: "dns", technology: "Authoritative DNS", environment: "production", state: "online", lastSeen: "2026-08-12T06:20:00Z" },
  { id: "ast_006", hostname: "archive.northstar-demo.invalid", type: "cloud", technology: "Object storage", environment: "development", state: "not-observed", lastSeen: "2026-08-09T14:10:00Z" },
];

export const findings: Finding[] = [
  { id: "fnd_1042", severity: "critical", title: "Administrative interface publicly reachable", asset: "staging.northstar-demo.invalid", category: "Exposure", status: "open", lastSeen: "2026-08-12T08:35:00Z" },
  { id: "fnd_1038", severity: "high", title: "Legacy TLS protocol observed", asset: "mail.northstar-demo.invalid", category: "Transport security", status: "triaged", lastSeen: "2026-08-12T07:18:00Z" },
  { id: "fnd_1031", severity: "medium", title: "Security header policy incomplete", asset: "app.northstar-demo.invalid", category: "HTTP configuration", status: "open", lastSeen: "2026-08-12T06:54:00Z" },
  { id: "fnd_1029", severity: "low", title: "Verbose server metadata presented", asset: "api.northstar-demo.invalid", category: "Information disclosure", status: "resolved", lastSeen: "2026-08-11T22:03:00Z" },
  { id: "fnd_1024", severity: "info", title: "New externally visible service observed", asset: "dns.northstar-demo.invalid", category: "Inventory", status: "triaged", lastSeen: "2026-08-11T18:47:00Z" },
  { id: "fnd_1019", severity: "high", title: "Development endpoint exposed", asset: "staging.northstar-demo.invalid", category: "Exposure", status: "open", lastSeen: "2026-08-10T15:26:00Z" },
];

export const scans: Scan[] = [
  { id: "scan_8F2A", target: "northstar-demo.invalid", startedAt: "2026-08-12T08:31:00Z", duration: "4m 18s", status: "completed", findingsCount: 3 },
  { id: "scan_8E91", target: "northstar-demo.invalid", startedAt: "2026-08-11T08:30:00Z", duration: "4m 02s", status: "completed", findingsCount: 2 },
  { id: "scan_8D70", target: "staging.northstar-demo.invalid", startedAt: "2026-08-10T15:20:00Z", duration: "2m 41s", status: "completed", findingsCount: 1 },
  { id: "scan_8C11", target: "northstar-demo.invalid", startedAt: "2026-08-09T08:30:00Z", duration: "—", status: "failed", findingsCount: 0 },
  { id: "scan_8B44", target: "northstar-demo.invalid", startedAt: "2026-08-08T08:30:00Z", duration: "3m 56s", status: "completed", findingsCount: 4 },
];

export const reports: Report[] = [
  { id: "rpt_004", name: "External Exposure Summary", period: "Aug 2026", generatedAt: "2026-08-12T09:00:00Z", status: "ready", audience: "Security team" },
  { id: "rpt_003", name: "Weekly Security Posture", period: "5–11 Aug 2026", generatedAt: "2026-08-12T07:00:00Z", status: "ready", audience: "Technical leadership" },
  { id: "rpt_002", name: "Executive Summary", period: "Q3 2026", generatedAt: "2026-08-11T23:00:00Z", status: "generating", audience: "Executive" },
  { id: "rpt_001", name: "Technical Findings Report", period: "Aug 2026", generatedAt: "2026-08-16T00:00:00Z", status: "scheduled", audience: "Engineering" },
];

export const integrations: Integration[] = [
  { id: "int_github", name: "GitHub", description: "Surface repository security context alongside exposure data.", status: "connected" },
  { id: "int_slack", name: "Slack", description: "Route high-priority exposure notifications to a workspace.", status: "available" },
  { id: "int_discord", name: "Discord", description: "Share security updates with approved response channels.", status: "planned" },
];

export const severityDistribution: Record<Severity, number> = {
  critical: 1,
  high: 2,
  medium: 4,
  low: 3,
  info: 2,
};

export const exposureTrend: TrendPoint[] = [
  { label: "6 Aug", value: 17 },
  { label: "7 Aug", value: 15 },
  { label: "8 Aug", value: 16 },
  { label: "9 Aug", value: 14 },
  { label: "10 Aug", value: 15 },
  { label: "11 Aug", value: 13 },
  { label: "12 Aug", value: 12 },
];

