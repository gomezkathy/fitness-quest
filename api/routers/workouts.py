from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from models.workouts import WorkoutIn, WorkoutOut
from queries.workouts import WorkoutRepository
from authenticator import authenticator

router = APIRouter()
repo = WorkoutRepository()


def authenticate_user(
    authenticator=Depends(authenticator.get_account_data_for_cookie),
):
    if authenticator:
        return authenticator
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.post("/api/workouts", response_model=WorkoutOut)
def create_workout(
    workout: WorkoutIn,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
):
    if user:
        new_workout = repo.create_workout(workout)
        return new_workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/api/workouts", response_model=List[WorkoutOut])
def get_all_workouts(
    user: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
):
    if user:
        workouts = repo.get_all()
        return workouts
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/api/workouts/{workout_id}", response_model=Optional[WorkoutOut])
def get_one_workout(
    workout_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
):
    if user:
        workout = repo.get_workout_by_id(workout_id)
        if workout is None:
            raise HTTPException(status_code=404, detail="Workout not found")
        return workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put("/api/workouts/{workout_id}", response_model=WorkoutOut)
def update_workout(
    workout_id: int,
    workout: WorkoutIn,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
):
    if user:
        updated_workout = repo.update_workout(workout_id, workout)
        if updated_workout is None:
            raise HTTPException(status_code=404, detail="Workout not found")
        return updated_workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/api/workouts/{workout_id}", response_model=dict)
def delete_workout(
    workout_id: int,
    user: dict = Depends(authenticator.get_current_account_data),
    repo: WorkoutRepository = Depends(),
):
    if user:
        success = repo.delete_workout(workout_id)
        if not success:
            raise HTTPException(status_code=404, detail="Workout not found")
        return {"message": "Workout deleted successfully"}
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
