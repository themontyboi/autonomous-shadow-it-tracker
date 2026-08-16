import os
from collections.abc import Mapping
from dataclasses import dataclass
from urllib.parse import urlsplit

from supabase import Client, create_client


class DatabaseConfigurationError(RuntimeError):
    """Raised when backend-only Supabase configuration is unavailable or invalid."""


@dataclass(frozen=True, slots=True)
class SupabaseSettings:
    url: str
    secret_key: str

    @classmethod
    def from_environment(
        cls, environment: Mapping[str, str] | None = None
    ) -> "SupabaseSettings":
        source = os.environ if environment is None else environment
        url = source.get("SUPABASE_URL", "").strip().rstrip("/")
        secret_key = (
            source.get("SUPABASE_SECRET_KEY", "").strip()
            or source.get("SUPABASE_SERVICE_ROLE_KEY", "").strip()
        )

        missing = []
        if not url:
            missing.append("SUPABASE_URL")
        if not secret_key:
            missing.append("SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY")
        if missing:
            raise DatabaseConfigurationError(
                "Missing backend database configuration: " + ", ".join(missing)
            )

        parsed = urlsplit(url)
        if (
            parsed.scheme not in {"http", "https"}
            or not parsed.netloc
            or parsed.username is not None
            or parsed.password is not None
        ):
            raise DatabaseConfigurationError("SUPABASE_URL must be a valid HTTP(S) URL")

        return cls(url=url, secret_key=secret_key)


def create_database_client(settings: SupabaseSettings | None = None) -> Client:
    """Create a backend client lazily so health/startup do not require Supabase."""
    configuration = settings or SupabaseSettings.from_environment()
    return create_client(configuration.url, configuration.secret_key)
