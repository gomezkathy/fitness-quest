from fastapi import APIRouter, Depends
from queries.workouts import WorkoutIn, WorkoutRepository

router = APIRouter()

@router.post("/workouts")
def create_workout(workout: WorkoutIn, repo: WorkoutRepository = Depends()):
    return repo.create(workout)
