from fastapi import APIRouter, Depends, Response, HTTPException
from authenticator import authenticator
from typing import List, Union
from queries.exercises import (
    Status,
    ExercisesIn,
    ExercisesRepository,
    ExercisesOut,
)

router = APIRouter()


@router.post("/", response_model=Status)
def create_exercise(
    comment: ExercisesIn,
    response: Response,
    repo: ExercisesRepository = Depends(),
):
    successful_repo = repo.create(comment)
    if isinstance(successful_repo, ExercisesOut):
        return successful_repo
    else:
        return ""


@router.get("/", response_model=Union[ExercisesOut, Status])
def get_all(
    response: Response,
    repo: ExercisesRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    if account_data:
        result = repo.create()
        if isinstance(result, ExercisesOut):
            response.status_code = 200
            return result
        else:
            response.status_code = result.status
            return result.message
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


# {headers: {Authorization: Bearer ${token}}} front end

# be extremely careful about fetch requests
# if you try to fetch to one of the endpoints but the url doesn't match perfectly down to the slashes, it will try to be rerouted as an htps error 429. make sure 100% identical down to the slashes!
