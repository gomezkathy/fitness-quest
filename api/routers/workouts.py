from fastapi import APIRouter, Depends
from queries.workouts import WorkoutIn, WorkoutRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/workouts")
async def create_workout(
    workout: WorkoutIn, repo: WorkoutRepository = Depends(authenticator.get_current_account_data)
):
    return repo.create(workout)
