from fastapi.testclient import TestClient
from main import (
    app,
)  # Replace 'main' with the name of your main FastAPI application file

client = TestClient(app)


def test_create_workout():
    response = client.post("/workouts/", json={"name": "New Workout"})
    assert response.status_code == 200
    assert response.json()["name"] == "New Workout"


def test_get_all_workouts():
    response = client.get("/workouts/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_workout():
    response = client.post("/workouts/", json={"name": "New Workout"})
    workout_id = response.json()["id"]
    response = client.get(f"/workouts/{workout_id}/")
    assert response.status_code == 200
    assert response.json()["id"] == workout_id


def test_update_workout():
    response = client.post("/workouts/", json={"name": "New Workout"})
    workout_id = response.json()["id"]
    response = client.put(
        f"/workouts/{workout_id}/", json={"name": "Updated Workout"}
    )
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Workout"


def test_delete_workout():
    response = client.post("/workouts/", json={"name": "New Workout"})
    workout_id = response.json()["id"]
    response = client.delete(f"/workouts/{workout_id}/")
    assert response.status_code == 200
    assert response.json()["message"] == "Workout deleted successfully"
