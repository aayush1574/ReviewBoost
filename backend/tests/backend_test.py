"""Backend API tests for ReviewBoost"""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://qr-biz-rating.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@reviewboost.com"
ADMIN_PASSWORD = "admin123"


@pytest.fixture(scope="session")
def auth_token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and isinstance(data["token"], str) and len(data["token"]) > 10
    assert data["user"]["email"] == ADMIN_EMAIL
    assert data["user"]["role"] == "admin"
    return data["token"]


@pytest.fixture
def headers(auth_token):
    return {"Authorization": f"Bearer {auth_token}", "Content-Type": "application/json"}


# --- AUTH TESTS ---
class TestAuth:
    def test_login_invalid(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"}, timeout=10)
        assert r.status_code == 401

    def test_login_valid_sets_cookie(self):
        r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=10)
        assert r.status_code == 200
        # httpOnly cookie
        assert "access_token" in r.cookies

    def test_me_with_bearer(self, headers):
        r = requests.get(f"{BASE_URL}/api/auth/me", headers=headers, timeout=10)
        assert r.status_code == 200
        assert r.json()["user"]["email"] == ADMIN_EMAIL

    def test_me_unauthenticated(self):
        r = requests.get(f"{BASE_URL}/api/auth/me", timeout=10)
        assert r.status_code == 401

    def test_logout(self, headers):
        r = requests.post(f"{BASE_URL}/api/auth/logout", headers=headers, timeout=10)
        assert r.status_code == 200


# --- PLACE CRUD ---
class TestPlaceCRUD:
    place_id = None
    slug = None

    def test_01_create_place(self, headers):
        payload = {
            "name": "TEST_Cafe_Delight",
            "category": "restaurant",
            "description": "A lovely test cafe",
            "address": "123 Test St",
            "google_review_url": "https://g.page/r/TEST",
            "image_url": "",
        }
        r = requests.post(f"{BASE_URL}/api/places", json=payload, headers=headers, timeout=10)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["category"] == "restaurant"
        assert "id" in data and "slug" in data
        assert isinstance(data["reviews"], list) and len(data["reviews"]) > 0
        assert data["total_scans"] == 0
        # MongoDB _id must not leak
        assert "_id" not in data
        TestPlaceCRUD.place_id = data["id"]
        TestPlaceCRUD.slug = data["slug"]

    def test_02_get_place_by_id(self, headers):
        assert TestPlaceCRUD.place_id
        r = requests.get(f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}", headers=headers, timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["id"] == TestPlaceCRUD.place_id
        assert "_id" not in data

    def test_03_list_places(self, headers):
        r = requests.get(f"{BASE_URL}/api/places", headers=headers, timeout=10)
        assert r.status_code == 200
        places = r.json()
        assert isinstance(places, list)
        assert any(p["id"] == TestPlaceCRUD.place_id for p in places)
        for p in places:
            assert "_id" not in p

    def test_04_update_place(self, headers):
        r = requests.put(
            f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}",
            json={"description": "Updated description"},
            headers=headers,
            timeout=10,
        )
        assert r.status_code == 200
        assert r.json()["description"] == "Updated description"

    def test_05_regenerate_reviews(self, headers):
        r = requests.post(
            f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}/regenerate-reviews",
            headers=headers,
            timeout=10,
        )
        assert r.status_code == 200
        assert len(r.json()["reviews"]) > 0

    def test_06_public_place_by_slug_tracks_scan(self):
        assert TestPlaceCRUD.slug
        r = requests.get(f"{BASE_URL}/api/public/place/{TestPlaceCRUD.slug}", timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "TEST_Cafe_Delight"
        assert "reviews" in data
        assert "google_review_url" in data

    def test_07_copy_event_tracks(self):
        r = requests.post(f"{BASE_URL}/api/public/place/{TestPlaceCRUD.slug}/copy", timeout=10)
        assert r.status_code == 200

    def test_08_scan_copy_counters_updated(self, headers):
        # small delay to ensure writes settled
        time.sleep(0.5)
        r = requests.get(f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}", headers=headers, timeout=10)
        assert r.status_code == 200
        data = r.json()
        assert data["total_scans"] >= 1
        assert data["total_copies"] >= 1

    def test_09_places_require_auth(self):
        r = requests.get(f"{BASE_URL}/api/places", timeout=10)
        assert r.status_code == 401

    def test_10_public_place_not_found(self):
        r = requests.get(f"{BASE_URL}/api/public/place/nonexistent-slug-xyz", timeout=10)
        assert r.status_code == 404

    def test_11_delete_place(self, headers):
        r = requests.delete(f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}", headers=headers, timeout=10)
        assert r.status_code == 200
        # verify 404 after delete
        r2 = requests.get(f"{BASE_URL}/api/places/{TestPlaceCRUD.place_id}", headers=headers, timeout=10)
        assert r2.status_code == 404


# --- ANALYTICS ---
class TestAnalytics:
    def test_overview_requires_auth(self):
        r = requests.get(f"{BASE_URL}/api/analytics/overview", timeout=10)
        assert r.status_code == 401

    def test_overview_returns_keys(self, headers):
        r = requests.get(f"{BASE_URL}/api/analytics/overview", headers=headers, timeout=10)
        assert r.status_code == 200
        data = r.json()
        for k in ["total_places", "total_scans", "total_copies", "recent_scans_7d", "recent_copies_7d", "top_places"]:
            assert k in data
        assert isinstance(data["top_places"], list)
