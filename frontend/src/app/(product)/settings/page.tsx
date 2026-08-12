import { DemoSettings } from "@/components/demo-settings";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() { return <div className="space-y-8"><PageHeader title="Settings" description="Local presentation preferences for the product shell. Profile, organisation, membership, and authorization settings are not implemented."/><DemoSettings/></div>; }

