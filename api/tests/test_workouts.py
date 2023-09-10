from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from queries.workouts import WorkoutRepository


app = FastAPI()
client = TestClient(app)


class EmptyWorkoutRepository:
    def get_all(self):
        return []


@app.get("/api/workouts")
def get_all_workouts(
    repo: WorkoutRepository = Depends(EmptyWorkoutRepository),
):
    workouts = repo.get_all()
    return {"workouts": workouts}


def test_get_all_workouts():
    app.dependency_overrides[WorkoutRepository] = EmptyWorkoutRepository
    response = client.get("/api/workouts")

    assert response.status_code == 200
    assert response.json() == {"workouts": []}
