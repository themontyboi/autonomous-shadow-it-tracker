from typing import Any, Protocol
from uuid import UUID

from pydantic import ValidationError

from app.models.database import (
    DomainCreate,
    DomainRecord,
    OrganizationCreate,
    OrganizationRecord,
)


class DataServiceError(RuntimeError):
    """Raised when the Data API returns an unexpected record shape."""


class TableClient(Protocol):
    def table(self, table_name: str) -> Any: ...


class OrganizationService:
    """Small, explicitly tenant-scoped organization/domain data service."""

    def __init__(self, client: TableClient) -> None:
        self._client = client

    def create_organization(self, name: str, slug: str) -> OrganizationRecord:
        payload = OrganizationCreate(name=name, slug=slug)
        response = (
            self._client.table("organizations").insert(payload.model_dump()).execute()
        )
        return self._one(OrganizationRecord, response.data)

    def get_organization(self, organization_id: UUID) -> OrganizationRecord | None:
        response = (
            self._client.table("organizations")
            .select("id,name,slug,created_at,updated_at")
            .eq("id", str(organization_id))
            .limit(1)
            .execute()
        )
        if not response.data:
            return None
        return self._one(OrganizationRecord, response.data)

    def create_domain(self, organization_id: UUID, hostname: str) -> DomainRecord:
        payload = DomainCreate(organization_id=organization_id, hostname=hostname)
        response = (
            self._client.table("domains")
            .insert(payload.model_dump(mode="json"))
            .execute()
        )
        return self._one(DomainRecord, response.data)

    def list_domains(self, organization_id: UUID) -> list[DomainRecord]:
        response = (
            self._client.table("domains")
            .select(
                "id,organization_id,hostname,verification_status,verified_at,"
                "created_at,updated_at"
            )
            .eq("organization_id", str(organization_id))
            .order("hostname")
            .execute()
        )
        try:
            return [DomainRecord.model_validate(record) for record in response.data]
        except (TypeError, ValidationError) as error:
            raise DataServiceError(
                "Data API returned invalid domain records"
            ) from error

    @staticmethod
    def _one(model: type[Any], data: Any) -> Any:
        record = data[0] if isinstance(data, list) and data else data
        if not isinstance(record, dict):
            raise DataServiceError("Data API did not return the expected record")
        try:
            return model.model_validate(record)
        except ValidationError as error:
            raise DataServiceError("Data API returned an invalid record") from error
