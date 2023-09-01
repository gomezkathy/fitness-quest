from fastapi import APIRouter, Depends, HTTPException
from queries.exercises import (
    ExerciseIn,
    ExerciseOut,
    ExerciseRepository,
    Error,
)
from authenticator import authenticator
from typing import List, Union, Optional

router = APIRouter()


@router.post("/api/exercises", response_model=Union[ExerciseOut, Error])
async def create_exercise(
    exercise: ExerciseIn,  # sets the exercise model
    account_data: dict = Depends(
        authenticator.get_current_account_data
    ),  # verifies user authentication
    repo: ExerciseRepository = Depends(),  # creates an instance of exerciseRepository
):
    # if user is authenticated, creates exercise. Otherwise, returns 401 error
    if account_data:
        return repo.create(exercise)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/api/exercises", response_model=Union[Error, List[ExerciseOut]])
async def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put(
    "/api/exercises/{exercise_id}", response_model=Union[ExerciseOut, Error]
)
async def update_exercise(
    exercise_id: int,
    exercise: ExerciseIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseRepository = Depends(),
) -> Union[Error, ExerciseOut]:
    if account_data:
        return repo.update(exercise_id, exercise)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/api/exercises/{exercise_id}", response_model=bool)
async def delete_exercise(
    exercise_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(exercise_id)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get(
    "/api/exercises/{exercise_id}", response_model=Optional[ExerciseOut]
)
async def get_one_exercise(
    exercise_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ExerciseRepository = Depends(),
) -> ExerciseOut:
    if account_data:
        return repo.get_one(exercise_id)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
