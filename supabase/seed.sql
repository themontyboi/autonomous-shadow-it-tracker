-- Synthetic development auth rows for relational seed data. No passwords are seeded,
-- and the application does not use these rows for login in Milestone 3.
insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) values
    (
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-4000-8000-000000000001',
        'authenticated', 'authenticated', 'owner@northstar-demo.invalid', null,
        '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
        '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z'
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '00000000-0000-4000-8000-000000000002',
        'authenticated', 'authenticated', 'viewer@harbor-demo.invalid', null,
        '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
        '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z'
    );

insert into public.profiles (id, display_name, created_at, updated_at) values
    ('00000000-0000-4000-8000-000000000001', 'Northstar Demo Owner', '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z'),
    ('00000000-0000-4000-8000-000000000002', 'Harbor Demo Viewer', '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z');

insert into public.organizations (id, name, slug, created_at, updated_at) values
    ('00000000-0000-4000-8000-000000000101', 'Northstar Demo', 'northstar-demo', '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z'),
    ('00000000-0000-4000-8000-000000000102', 'Harbor Demo', 'harbor-demo', '2026-08-01T00:00:00Z', '2026-08-01T00:00:00Z');

insert into public.organization_members (organization_id, user_id, role) values
    ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'owner'),
    ('00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000002', 'viewer');

insert into public.domains (id, organization_id, hostname, verification_status) values
    ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', 'northstar-demo.invalid', 'pending'),
    ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000102', 'harbor-demo.invalid', 'pending');

insert into public.scans (id, organization_id, domain_id, status, requested_at, started_at, completed_at) values
    ('00000000-0000-4000-8000-000000000301', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000201', 'completed', '2026-08-12T08:30:00Z', '2026-08-12T08:31:00Z', '2026-08-12T08:35:00Z');

insert into public.assets (
    id, organization_id, domain_id, asset_type, identifier, environment,
    first_seen_at, last_seen_at, metadata
) values
    ('00000000-0000-4000-8000-000000000401', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000201', 'web', 'app.northstar-demo.invalid', 'production', '2026-08-01T00:00:00Z', '2026-08-12T08:34:00Z', '{"technology":"Next.js","synthetic":true}'::jsonb),
    ('00000000-0000-4000-8000-000000000402', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000201', 'api', 'api.northstar-demo.invalid', 'production', '2026-08-01T00:00:00Z', '2026-08-12T08:34:00Z', '{"technology":"FastAPI","synthetic":true}'::jsonb),
    ('00000000-0000-4000-8000-000000000403', '00000000-0000-4000-8000-000000000102', '00000000-0000-4000-8000-000000000202', 'web', 'portal.harbor-demo.invalid', 'staging', '2026-08-02T00:00:00Z', '2026-08-11T10:00:00Z', '{"synthetic":true}'::jsonb);

insert into public.findings (
    id, organization_id, scan_id, asset_id, severity, title, category, status,
    first_seen_at, last_seen_at
) values
    ('00000000-0000-4000-8000-000000000501', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000301', '00000000-0000-4000-8000-000000000401', 'medium', 'Synthetic security header observation', 'HTTP configuration', 'open', '2026-08-12T08:34:00Z', '2026-08-12T08:34:00Z');

insert into public.evidence (
    id, organization_id, finding_id, source_type, source_name, observed_at, data, is_redacted
) values
    ('00000000-0000-4000-8000-000000000601', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000501', 'synthetic_fixture', 'milestone_3_seed', '2026-08-12T08:34:00Z', '{"observation":"Demo header policy incomplete","synthetic":true,"contains_secrets":false}'::jsonb, true);

insert into public.remediations (id, organization_id, finding_id, status, guidance) values
    ('00000000-0000-4000-8000-000000000701', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000501', 'draft', '{"summary":"Placeholder for future human-reviewed guidance","synthetic":true}'::jsonb);

insert into public.integrations (id, organization_id, provider, status, metadata) values
    ('00000000-0000-4000-8000-000000000801', '00000000-0000-4000-8000-000000000101', 'github', 'disabled', '{"synthetic":true,"credentials_stored":false}'::jsonb);

insert into public.notifications (
    id, organization_id, finding_id, channel, delivery_status, metadata
) values
    ('00000000-0000-4000-8000-000000000901', '00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000501', 'email', 'pending', '{"synthetic":true,"delivery_attempted":false}'::jsonb);
