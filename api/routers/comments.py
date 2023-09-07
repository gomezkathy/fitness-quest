from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union, Optional
from models.comments import Error, CommentIn, CommentOut
from queries.comments import CommentRepository
from authenticator import authenticator

router = APIRouter()


@router.post(
    "/api/comments", tags=["Comments"], response_model=Union[CommentOut, Error]
)
def create_comment(
    comment: CommentIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentRepository = Depends(),
):
    if account_data:
        successful_repo = repo.create(comment)
        if isinstance(successful_repo, CommentOut):
            return successful_repo
        else:
            return ""
    else:
        raise HTTPException(status_code=401)


@router.get(
    "/api/comments",
    tags=["Comments"],
    response_model=Union[Error, List[CommentOut]],
)
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentRepository = Depends(),
):
    if account_data:
        return repo.get_all()
    else:
        raise HTTPException(status_code=401)


@router.get(
    "/api/comments/{comment_id}",
    tags=["Comments"],
    response_model=Optional[CommentOut],
)
async def get_one_comment(
    comment_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: CommentRepository = Depends(),
):
    if account_data:
        return repo.get_comment_by_id(comment_id)
    else:
        raise HTTPException(
            status_code=401, detail="User is not authenticated."
        )


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
