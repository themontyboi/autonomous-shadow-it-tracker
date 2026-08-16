import os
from uuid import uuid4

import pytest
from postgrest.exceptions import APIError
from supabase import Client

from app.services.database import create_database_client
from app.services.organizations import OrganizationService

pytestmark = pytest.mark.integration


def _delete_organizations(client: Client, organization_ids: list[str]) -> None:
    for organization_id in organization_ids:
        client.table("organizations").delete().eq("id", organization_id).execute()


@pytest.mark.skipif(
    os.getenv("RUN_SUPABASE_INTEGRATION") != "1",
    reason="set RUN_SUPABASE_INTEGRATION=1 with local Supabase environment values",
)
def test_create_read_and_tenant_scoped_domain_flow() -> None:
    client = create_database_client()
    service = OrganizationService(client)
    suffix = uuid4().hex[:12]
    organization_ids: list[str] = []

    try:
        first = service.create_organization(
            "Service Validation A", f"service-a-{suffix}"
        )
        organization_ids.append(str(first.id))
        second = service.create_organization(
            "Service Validation B", f"service-b-{suffix}"
        )
        organization_ids.append(str(second.id))

        created = service.create_domain(
            first.id, f"app-{suffix}.northstar-demo.invalid"
        )
        service.create_domain(second.id, f"app-{suffix}.harbor-demo.invalid")

        loaded = service.get_organization(first.id)
        first_domains = service.list_domains(first.id)

        assert loaded is not None and loaded.id == first.id
        assert [domain.id for domain in first_domains] == [created.id]
        assert all(domain.organization_id == first.id for domain in first_domains)
    finally:
        _delete_organizations(client, organization_ids)


@pytest.mark.skipif(
    os.getenv("RUN_SUPABASE_INTEGRATION") != "1",
    reason="set RUN_SUPABASE_INTEGRATION=1 with local Supabase environment values",
)
def test_database_rejects_cross_tenant_scan_domain_reference() -> None:
    client = create_database_client()
    suffix = uuid4().hex[:12]
    first_organization_id = str(uuid4())
    second_organization_id = str(uuid4())
    domain_id = str(uuid4())
    organization_ids: list[str] = []

    try:
        client.table("organizations").insert(
            {
                "id": first_organization_id,
                "name": "Constraint Validation A",
                "slug": f"constraint-a-{suffix}",
            }
        ).execute()
        organization_ids.append(first_organization_id)
        client.table("organizations").insert(
            {
                "id": second_organization_id,
                "name": "Constraint Validation B",
                "slug": f"constraint-b-{suffix}",
            }
        ).execute()
        organization_ids.append(second_organization_id)
        client.table("domains").insert(
            {
                "id": domain_id,
                "organization_id": second_organization_id,
                "hostname": f"domain-{suffix}.harbor-demo.invalid",
            }
        ).execute()

        with pytest.raises(APIError) as error:
            client.table("scans").insert(
                {
                    "organization_id": first_organization_id,
                    "domain_id": domain_id,
                    "status": "queued",
                }
            ).execute()

        assert error.value.code == "23503"
        assert "scans_domain_tenant_fk" in str(error.value)
    finally:
        _delete_organizations(client, organization_ids)
