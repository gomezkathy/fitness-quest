from fastapi import APIRouter, Depends, Response, HTTPException
from authenticator import authenticator
from typing import List, Union
from queries.exercises_workouts import (
    ExercisesWorkoutsRepository,
    Status,
    ExercisesWorkoutsIn,
    ExercisesWorkoutsOut,
)

router = APIRouter()


@router.post("/", response_model=ExercisesWorkoutsOut)
async def create_exercise_workout(
    exercise_workout_data: ExercisesWorkoutsIn,
    response: Response,
    repo: ExercisesWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        created_exercise_workout = repo.create(exercise_workout_data)
        return created_exercise_workout
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/", response_model=List[ExercisesWorkoutsOut])
async def get_all_exercise_workouts(
    response: Response,
    repo: ExercisesWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        exercise_workouts = repo.get_all()
        return exercise_workouts
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put("/{exercise_workout_id}", response_model=ExercisesWorkoutsOut)
async def update_exercise_workout(
    exercise_workout_id: int,
    exercise_workout_data: ExercisesWorkoutsIn,
    response: Response,
    repo: ExercisesWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        updated_exercise_workout = repo.update(
            exercise_workout_id, exercise_workout_data
        )
        if updated_exercise_workout:
            return updated_exercise_workout
        else:
            raise HTTPException(
                status_code=404,
                detail="Exercise-Workout relationship not found",
            )
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/{exercise_workout_id}", response_model=Status)
async def delete_exercise_workout(
    exercise_workout_id: int,
    response: Response,
    repo: ExercisesWorkoutsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        deleted = repo.delete(exercise_workout_id)
        if deleted:
            return Status(
                status="Success",
                message="Exercise-Workout relationship deleted",
            )
        else:
            raise HTTPException(
                status_code=404,
                detail="Exercise-Workout relationship not found",
            )
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
