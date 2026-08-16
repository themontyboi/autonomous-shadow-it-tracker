from types import SimpleNamespace
from typing import Any
from uuid import UUID

from app.services.organizations import OrganizationService

ORGANIZATION_ID = UUID("00000000-0000-4000-8000-000000000101")
OTHER_ORGANIZATION_ID = UUID("00000000-0000-4000-8000-000000000102")


class FakeQuery:
    def __init__(self, records: list[dict[str, Any]]) -> None:
        self.records = records
        self.filters: list[tuple[str, str]] = []
        self.inserted: dict[str, Any] | None = None

    def select(self, _columns: str) -> "FakeQuery":
        return self

    def insert(self, payload: dict[str, Any]) -> "FakeQuery":
        self.inserted = payload
        return self

    def eq(self, column: str, value: str) -> "FakeQuery":
        self.filters.append((column, value))
        self.records = [
            record for record in self.records if str(record[column]) == value
        ]
        return self

    def limit(self, _count: int) -> "FakeQuery":
        return self

    def order(self, column: str) -> "FakeQuery":
        self.records.sort(key=lambda record: str(record[column]))
        return self

    def execute(self) -> SimpleNamespace:
        return SimpleNamespace(data=self.records)


class FakeClient:
    def __init__(self, records: list[dict[str, Any]]) -> None:
        self.query = FakeQuery(records)
        self.requested_table: str | None = None

    def table(self, table_name: str) -> FakeQuery:
        self.requested_table = table_name
        return self.query


def domain_record(
    identifier: str, organization_id: UUID, hostname: str
) -> dict[str, Any]:
    return {
        "id": identifier,
        "organization_id": str(organization_id),
        "hostname": hostname,
        "verification_status": "pending",
        "verified_at": None,
        "created_at": "2026-08-01T00:00:00Z",
        "updated_at": "2026-08-01T00:00:00Z",
    }


def test_list_domains_always_filters_by_organization() -> None:
    client = FakeClient(
        [
            domain_record(
                "00000000-0000-4000-8000-000000000201",
                ORGANIZATION_ID,
                "northstar-demo.invalid",
            ),
            domain_record(
                "00000000-0000-4000-8000-000000000202",
                OTHER_ORGANIZATION_ID,
                "harbor-demo.invalid",
            ),
        ]
    )

    domains = OrganizationService(client).list_domains(ORGANIZATION_ID)

    assert client.requested_table == "domains"
    assert ("organization_id", str(ORGANIZATION_ID)) in client.query.filters
    assert [domain.hostname for domain in domains] == ["northstar-demo.invalid"]


def test_create_domain_normalizes_hostname_and_keeps_tenant_id() -> None:
    client = FakeClient(
        [
            domain_record(
                "00000000-0000-4000-8000-000000000203",
                ORGANIZATION_ID,
                "api.northstar-demo.invalid",
            )
        ]
    )

    domain = OrganizationService(client).create_domain(
        ORGANIZATION_ID, " API.Northstar-Demo.Invalid. "
    )

    assert domain.organization_id == ORGANIZATION_ID
    assert client.query.inserted == {
        "organization_id": str(ORGANIZATION_ID),
        "hostname": "api.northstar-demo.invalid",
    }
