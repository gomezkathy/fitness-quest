from fastapi import APIRouter, Depends, Response, HTTPException
from authenticator import authenticator
from typing import List, Union
from queries.workoutvo import (
    WorkoutVORepository,
    Status,
    WorkoutVOIn,
    WorkoutVOOut,
)

router = APIRouter()


@router.post("/", response_model=WorkoutVOOut)
async def create_workoutvo(
    workoutvo_data: WorkoutVOIn,
    response: Response,
    repo: WorkoutVORepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        created_workoutvo = repo.create(workoutvo_data)
        return created_workoutvo
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.get("/", response_model=List[WorkoutVOOut])
async def get_all_workoutvos(
    response: Response,
    repo: WorkoutVORepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        workoutvos = repo.get_all()
        return workoutvos
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.put("/{workoutvo_id}", response_model=WorkoutVOOut)
async def update_workoutvo(
    workoutvo_id: int,
    workoutvo_data: WorkoutVOIn,
    response: Response,
    repo: WorkoutVORepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        updated_workoutvo = repo.update(workoutvo_id, workoutvo_data)
        if updated_workoutvo:
            return updated_workoutvo
        else:
            raise HTTPException(status_code=404, detail="WorkoutVO not found")
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


@router.delete("/{workoutvo_id}", response_model=Status)
async def delete_workoutvo(
    workoutvo_id: int,
    response: Response,
    repo: WorkoutVORepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        deleted = repo.delete(workoutvo_id)
        if deleted:
            return Status(status="Success", message="WorkoutVO deleted")
        else:
            raise HTTPException(status_code=404, detail="WorkoutVO not found")
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )
