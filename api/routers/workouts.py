from fastapi import APIRouter, Depends, HTTPException
from queries.workouts import WorkoutIn, WorkoutOut, WorkoutRepository, Error
from authenticator import authenticator
from typing import List, Union

router = APIRouter()


@router.post("/workouts", response_model=Union[WorkoutOut, Error])
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

@router.get("/workouts", response_model=Union[Error, List[WorkoutOut]])
async def get_all(
   account_data: dict = Depends(authenticator.get_current_account_data),
   repo: WorkoutRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
      raise HTTPException(status_code=401, detail="User is not authenticated.")


@router.put("/workouts/{workout_id}", response_model=Union[WorkoutOut, Error])
async def update_workout(
    workout_id: int,
    workout: WorkoutIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
) -> Union[Error, WorkoutOut]:
    if account_data:
        return repo.update(workout_id, workout)
    else:
        raise HTTPException(status_code=401, detail="User is not authenticated.")
