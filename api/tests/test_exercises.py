from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from queries.exercises import ExerciseRepository

app = FastAPI()
client = TestClient(app)

class EmptyExerciseRepository:
    def get_all(self):
        return []

@app.get("/api/exercises")
def get_all_exercises(repo: ExerciseRepository = Depends(EmptyExerciseRepository)):
    exercises = repo.get_all()
    return {'exercises': exercises}

def test_get_all_exercises():
    app.dependency_overrides[ExerciseRepository] = EmptyExerciseRepository
    response = client.get("/api/exercises")

    assert response.status_code == 200
    assert response.json() == {'exercises': []}


def test_init():
    assert 1 == 1
