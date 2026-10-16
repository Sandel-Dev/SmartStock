import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.main import app


test_engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestSession = sessionmaker(bind=test_engine, autoflush=False, autocommit=False)


def override_get_db():
    db = TestSession()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture()
def client():
    Base.metadata.create_all(bind=test_engine)
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=test_engine)


def test_create_list_update_and_delete_product(client):
    payload = {
        "sku": "CAF-001",
        "name": "Cafe molido",
        "category": "Bebidas",
        "quantity": 12,
        "min_quantity": 5,
        "unit_price": 250,
    }
    created = client.post("/api/products", json=payload)
    assert created.status_code == 201
    product_id = created.json()["id"]

    assert client.get("/api/products").json()[0]["name"] == "Cafe molido"
    updated = {**payload, "quantity": 3}
    assert client.put(f"/api/products/{product_id}", json=updated).json()["quantity"] == 3
    assert len(client.get("/api/products", params={"low_stock_only": "true"}).json()) == 1
    assert client.delete(f"/api/products/{product_id}").status_code == 204
    assert client.get("/api/products").json() == []


def test_reject_duplicate_sku_and_negative_quantity(client):
    payload = {"sku": "LEC-001", "name": "Leche", "quantity": 2, "min_quantity": 1}
    assert client.post("/api/products", json=payload).status_code == 201
    assert client.post("/api/products", json=payload).status_code == 409
    invalid = {"sku": "ERR-001", "name": "Error", "quantity": -1}
    assert client.post("/api/products", json=invalid).status_code == 422
