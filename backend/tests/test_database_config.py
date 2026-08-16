import pytest

from app.services.database import DatabaseConfigurationError, SupabaseSettings


def test_missing_database_configuration_lists_variable_names_only() -> None:
    with pytest.raises(DatabaseConfigurationError) as error:
        SupabaseSettings.from_environment({})

    assert "SUPABASE_URL" in str(error.value)
    assert "SUPABASE_SECRET_KEY" in str(error.value)


def test_secret_key_is_preferred_over_local_service_role_fallback() -> None:
    settings = SupabaseSettings.from_environment(
        {
            "SUPABASE_URL": "http://127.0.0.1:54321/",
            "SUPABASE_SECRET_KEY": "preferred-backend-key",
            "SUPABASE_SERVICE_ROLE_KEY": "local-fallback-key",
        }
    )

    assert settings.url == "http://127.0.0.1:54321"
    assert settings.secret_key == "preferred-backend-key"


def test_local_service_role_key_is_supported_as_fallback() -> None:
    settings = SupabaseSettings.from_environment(
        {
            "SUPABASE_URL": "http://127.0.0.1:54321",
            "SUPABASE_SERVICE_ROLE_KEY": "local-fallback-key",
        }
    )

    assert settings.secret_key == "local-fallback-key"


@pytest.mark.parametrize(
    "url", ["postgres://localhost/db", "not-a-url", "https://u:p@example.test"]
)
def test_invalid_or_credential_bearing_urls_are_rejected(url: str) -> None:
    with pytest.raises(DatabaseConfigurationError) as error:
        SupabaseSettings.from_environment(
            {"SUPABASE_URL": url, "SUPABASE_SECRET_KEY": "not-disclosed"}
        )

    assert "not-disclosed" not in str(error.value)
