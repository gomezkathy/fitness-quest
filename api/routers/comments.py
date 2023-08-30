from fastapi import APIRouter, Depends, Response, HTTPException
from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union
from authenticator import authenticator
from queries.comments import (
    Error,
    CommentIn,
    CommentRepository,
    CommentOut,
)

router = APIRouter()


@router.post("/api/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
):
    successful_repo = repo.create(comment)
    if isinstance(successful_repo, CommentOut):
        return successful_repo
    else:
        return ""


@router.get("/api/comments", response_model=Union[Error, List[CommentOut]])
def get_all(
    repo: CommentRepository = Depends(),
):
    return repo.get_all()


@router.delete(
    "/api/comments/{comment_id}", tags=["Comments"], response_model=bool
)
async def delete_comment(
    comment_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentRepository = Depends(),
) -> bool:
    if account_data:
        return repo.delete(comment_id)
    else:
        raise HTTPException(status_code=401)


@router.put(
    "/api/comments/{comment_id}",
    tags=["Comments"],
    response_model=Union[CommentOut, Error],
)
def update_comment(
    comment_id: int,
    comment: CommentIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentRepository = Depends(),
) -> Union[Error, CommentOut]:
    if account_data:
        return repo.update(comment_id, comment)
    else:
        raise HTTPException(status_code=401)
