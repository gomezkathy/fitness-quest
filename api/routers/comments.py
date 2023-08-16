from fastapi import APIRouter, Depends
from queries.comments import CommentIn, CommentRepository

router = APIRouter()


@router.post("/comments")
def create_comment(
    comment: CommentIn,
    repo: CommentRepository = Depends()
):
    return repo.create(comment)
