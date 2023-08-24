from fastapi import APIRouter, Depends, HTTPException
from queries.workouts import WorkoutIn, WorkoutRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/workouts")
async def create_workout(
    workout: WorkoutIn,  # sets the workout model
    account_data: dict = Depends(authenticator.get_current_account_data),  # verifies user authentication
    repo: WorkoutRepository = Depends()  # creates an instance of WorkoutRepository
):
    # if user is authenticated, creates workout. Otherwise, returns 401 error
    if account_data:
        return repo.create(workout)
    else:
        raise HTTPException(status_code=401, detail="User is not authenticated.")
