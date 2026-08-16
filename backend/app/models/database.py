from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class OrganizationCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    slug: str = Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=100)

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("organization name must not be blank")
        return normalized


class OrganizationRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: UUID
    name: str
    slug: str
    created_at: datetime
    updated_at: datetime


class DomainCreate(BaseModel):
    organization_id: UUID
    hostname: str = Field(min_length=1, max_length=253)

    @field_validator("hostname")
    @classmethod
    def normalize_hostname(cls, value: str) -> str:
        normalized = value.strip().lower().rstrip(".")
        if not normalized or any(character.isspace() for character in normalized):
            raise ValueError("hostname must be a non-empty DNS-style name")
        return normalized


class DomainRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: UUID
    organization_id: UUID
    hostname: str
    verification_status: str
    verified_at: datetime | None
    created_at: datetime
    updated_at: datetime
