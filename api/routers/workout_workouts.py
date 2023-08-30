from fastapi import APIRouter, Depends, Response, HTTPException
from authenticator import authenticator
from typing import List, Union
from queries.workout_workouts import (
    WorkoutWorkoutsRepository,
    Status,
    WorkoutWorkoutsIn,
    WorkoutWorkoutsOut,
)

router = APIRouter()


@router.post("/", response_model=WorkoutWorkoutsOut)
async def create_workout_workout(
    workout_workout_data: WorkoutWorkoutsIn,
    response: Response,
    repo: WorkoutWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        created_workout_workout = repo.create(workout_workout_data)
        return created_workout_workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/", response_model=List[WorkoutWorkoutsOut])
async def get_all_workout_workouts(
    response: Response,
    repo: WorkoutWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        workout_workouts = repo.get_all()
        return workout_workouts
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put("/{workout_workout_id}", response_model=WorkoutWorkoutsOut)
async def update_workout_workout(
    workout_workout_id: int,
    workout_workout_data: WorkoutWorkoutsIn,
    response: Response,
    repo: WorkoutWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        updated_workout_workout = repo.update(
            workout_workout_id, workout_workout_data
        )
        if updated_workout_workout:
            return updated_workout_workout
        else:
            raise HTTPException(
                status_code=404,
                detail="Workout-Workout relationship not found",
            )
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/{workout_workout_id}", response_model=Status)
async def delete_workout_workout(
    workout_workout_id: int,
    response: Response,
    repo: WorkoutWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        deleted = repo.delete(workout_workout_id)
        if deleted:
            return Status(
                status="Success",
                message="Workout-Workout relationship deleted",
            )
        else:
            raise HTTPException(
                status_code=404,
                detail="Workout-Workout relationship not found",
            )
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
