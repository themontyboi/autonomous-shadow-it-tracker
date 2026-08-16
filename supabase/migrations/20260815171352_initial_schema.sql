-- Milestone 3 relational foundation. Authentication policies arrive in Milestone 4.

create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    display_name text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint profiles_display_name_not_blank
        check (display_name is null or length(btrim(display_name)) > 0)
);

create table public.organizations (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint organizations_name_not_blank check (length(btrim(name)) > 0),
    constraint organizations_slug_format
        check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.organization_members (
    organization_id uuid not null references public.organizations(id) on delete cascade,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null,
    created_at timestamptz not null default now(),
    primary key (organization_id, user_id),
    constraint organization_members_role
        check (role in ('owner', 'admin', 'member', 'viewer'))
);

create table public.domains (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    hostname text not null,
    verification_status text not null default 'pending',
    verified_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, hostname),
    unique (organization_id, id),
    constraint domains_hostname_normalized
        check (length(hostname) > 0 and hostname = lower(btrim(hostname))),
    constraint domains_verification_status
        check (verification_status in ('pending', 'verified', 'failed')),
    constraint domains_verified_at_consistency
        check (
            (verification_status = 'verified' and verified_at is not null)
            or (verification_status <> 'verified' and verified_at is null)
        )
);

create table public.scans (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    domain_id uuid not null,
    status text not null default 'queued',
    requested_at timestamptz not null default now(),
    started_at timestamptz,
    completed_at timestamptz,
    created_at timestamptz not null default now(),
    unique (organization_id, id),
    constraint scans_domain_tenant_fk
        foreign key (organization_id, domain_id)
        references public.domains (organization_id, id) on delete cascade,
    constraint scans_status
        check (status in ('queued', 'running', 'analysing', 'completed', 'failed')),
    constraint scans_time_order
        check (
            (started_at is null or started_at >= requested_at)
            and (completed_at is null or (started_at is not null and completed_at >= started_at))
        )
);

create table public.assets (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    domain_id uuid,
    asset_type text not null,
    identifier text not null,
    environment text,
    first_seen_at timestamptz not null default now(),
    last_seen_at timestamptz not null default now(),
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, identifier),
    unique (organization_id, id),
    constraint assets_domain_tenant_fk
        foreign key (organization_id, domain_id)
        references public.domains (organization_id, id) on delete cascade,
    constraint assets_type
        check (asset_type in ('web', 'api', 'mail', 'dns', 'cloud')),
    constraint assets_identifier_not_blank check (length(btrim(identifier)) > 0),
    constraint assets_environment
        check (environment is null or environment in ('production', 'staging', 'development')),
    constraint assets_seen_order check (last_seen_at >= first_seen_at),
    constraint assets_metadata_object check (jsonb_typeof(metadata) = 'object')
);

create table public.findings (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    scan_id uuid,
    asset_id uuid,
    severity text not null,
    title text not null,
    category text not null,
    status text not null default 'open',
    first_seen_at timestamptz not null default now(),
    last_seen_at timestamptz not null default now(),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, id),
    constraint findings_scan_tenant_fk
        foreign key (organization_id, scan_id)
        references public.scans (organization_id, id) on delete set null (scan_id),
    constraint findings_asset_tenant_fk
        foreign key (organization_id, asset_id)
        references public.assets (organization_id, id) on delete set null (asset_id),
    constraint findings_severity
        check (severity in ('critical', 'high', 'medium', 'low', 'info')),
    constraint findings_status check (status in ('open', 'triaged', 'resolved')),
    constraint findings_title_not_blank check (length(btrim(title)) > 0),
    constraint findings_category_not_blank check (length(btrim(category)) > 0),
    constraint findings_seen_order check (last_seen_at >= first_seen_at)
);

create table public.evidence (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    finding_id uuid not null,
    source_type text not null,
    source_name text,
    observed_at timestamptz not null default now(),
    data jsonb not null default '{}'::jsonb,
    is_redacted boolean not null default true,
    created_at timestamptz not null default now(),
    constraint evidence_finding_tenant_fk
        foreign key (organization_id, finding_id)
        references public.findings (organization_id, id) on delete cascade,
    constraint evidence_source_type_not_blank check (length(btrim(source_type)) > 0),
    constraint evidence_data_object check (jsonb_typeof(data) = 'object')
);

create table public.remediations (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    finding_id uuid not null,
    status text not null default 'draft',
    guidance jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint remediations_finding_tenant_fk
        foreign key (organization_id, finding_id)
        references public.findings (organization_id, id) on delete cascade,
    constraint remediations_status check (status in ('draft', 'reviewed', 'archived')),
    constraint remediations_guidance_object check (jsonb_typeof(guidance) = 'object')
);

create table public.integrations (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    provider text not null,
    status text not null default 'disabled',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (organization_id, provider),
    constraint integrations_provider
        check (provider in ('github', 'slack', 'discord')),
    constraint integrations_status
        check (status in ('disabled', 'configured', 'error')),
    constraint integrations_metadata_object check (jsonb_typeof(metadata) = 'object')
);

create table public.notifications (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid not null references public.organizations(id) on delete cascade,
    finding_id uuid,
    channel text not null,
    delivery_status text not null default 'pending',
    sent_at timestamptz,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now(),
    constraint notifications_finding_tenant_fk
        foreign key (organization_id, finding_id)
        references public.findings (organization_id, id) on delete set null (finding_id),
    constraint notifications_channel check (channel in ('email', 'slack', 'discord')),
    constraint notifications_delivery_status
        check (delivery_status in ('pending', 'sent', 'failed')),
    constraint notifications_sent_at_consistency
        check ((delivery_status = 'sent' and sent_at is not null) or delivery_status <> 'sent'),
    constraint notifications_metadata_object check (jsonb_typeof(metadata) = 'object')
);

create index organization_members_user_id_idx on public.organization_members (user_id);
create index domains_organization_id_idx on public.domains (organization_id);
create index scans_organization_id_requested_at_idx on public.scans (organization_id, requested_at desc);
create index scans_domain_id_idx on public.scans (domain_id);
create index assets_organization_id_last_seen_at_idx on public.assets (organization_id, last_seen_at desc);
create index assets_domain_id_idx on public.assets (domain_id);
create index findings_organization_id_last_seen_at_idx on public.findings (organization_id, last_seen_at desc);
create index findings_scan_id_idx on public.findings (scan_id);
create index findings_asset_id_idx on public.findings (asset_id);
create index evidence_organization_id_idx on public.evidence (organization_id);
create index evidence_finding_id_idx on public.evidence (finding_id);
create index remediations_organization_id_idx on public.remediations (organization_id);
create index remediations_finding_id_idx on public.remediations (finding_id);
create index integrations_organization_id_idx on public.integrations (organization_id);
create index notifications_organization_id_created_at_idx on public.notifications (organization_id, created_at desc);
create index notifications_finding_id_idx on public.notifications (finding_id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger organizations_set_updated_at before update on public.organizations
for each row execute function public.set_updated_at();
create trigger domains_set_updated_at before update on public.domains
for each row execute function public.set_updated_at();
create trigger assets_set_updated_at before update on public.assets
for each row execute function public.set_updated_at();
create trigger findings_set_updated_at before update on public.findings
for each row execute function public.set_updated_at();
create trigger remediations_set_updated_at before update on public.remediations
for each row execute function public.set_updated_at();
create trigger integrations_set_updated_at before update on public.integrations
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.domains enable row level security;
alter table public.scans enable row level security;
alter table public.assets enable row level security;
alter table public.findings enable row level security;
alter table public.evidence enable row level security;
alter table public.remediations enable row level security;
alter table public.integrations enable row level security;
alter table public.notifications enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.organizations from anon, authenticated;
revoke all on table public.organization_members from anon, authenticated;
revoke all on table public.domains from anon, authenticated;
revoke all on table public.scans from anon, authenticated;
revoke all on table public.assets from anon, authenticated;
revoke all on table public.findings from anon, authenticated;
revoke all on table public.evidence from anon, authenticated;
revoke all on table public.remediations from anon, authenticated;
revoke all on table public.integrations from anon, authenticated;
revoke all on table public.notifications from anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

grant select, insert, update, delete on table public.profiles to service_role;
grant select, insert, update, delete on table public.organizations to service_role;
grant select, insert, update, delete on table public.organization_members to service_role;
grant select, insert, update, delete on table public.domains to service_role;
grant select, insert, update, delete on table public.scans to service_role;
grant select, insert, update, delete on table public.assets to service_role;
grant select, insert, update, delete on table public.findings to service_role;
grant select, insert, update, delete on table public.evidence to service_role;
grant select, insert, update, delete on table public.remediations to service_role;
grant select, insert, update, delete on table public.integrations to service_role;
grant select, insert, update, delete on table public.notifications to service_role;
