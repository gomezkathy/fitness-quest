from fastapi import APIRouter, Depends, Response, HTTPException
from authenticator import authenticator
from typing import List, Union
from queries.workouts import (
    WorkoutsRepository,
    Status,
    WorkoutsIn,
    WorkoutsOut,
)

router = APIRouter()


@router.post("/", response_model=WorkoutsOut)
async def create_workout(
    workout_data: WorkoutsIn,
    response: Response,
    repo: WorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        created_workout = repo.create(workout_data)
        return created_workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/", response_model=List[WorkoutsOut])
async def get_all_workouts(
    response: Response,
    repo: WorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        workouts = repo.get_all()
        return workouts
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put("/{workout_id}", response_model=WorkoutsOut)
async def update_workout(
    workout_id: int,
    workout_data: WorkoutsIn,
    response: Response,
    repo: WorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        updated_workout = repo.update(workout_id, workout_data)
        if updated_workout:
            return updated_workout
        else:
            raise HTTPException(status_code=404, detail="Workout not found")
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/{workout_id}", response_model=Status)
async def delete_workout(
    workout_id: int,
    response: Response,
    repo: WorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        deleted = repo.delete(workout_id)
        if deleted:
            return Status(status="Success", message="Workout deleted")
        else:
            raise HTTPException(status_code=404, detail="Workout not found")
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
