from fastapi import APIRouter, Depends, HTTPException
from queries.workouts import WorkoutIn, WorkoutRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/workouts")
async def create_workout(
    workout: WorkoutIn,  # sets the workout model
    # verifies user authentication
    account_data: dict = Depends(authenticator.get_current_account_data),
    # creates an instance of WorkoutRepository
    repo: WorkoutRepository = Depends(),
):
    # if user is authenticated, creates workout. Otherwise, returns 401 error
    if account_data:
        return repo.create(workout)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
