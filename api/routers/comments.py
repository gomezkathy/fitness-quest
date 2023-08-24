from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.comments import (
    Error,
    CommentIn,
    CommentRepository,
    CommentOut,
)

router = APIRouter()


@router.post("/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
):
    successful_repo = repo.create(comment)
    if isinstance(successful_repo, CommentOut):
        return successful_repo
    else:
        return ("")


@router.get("/comments", response_model=Union[Error, List[CommentOut]])
def get_all(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()
