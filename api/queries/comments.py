from pydantic import BaseModel
from datetime import date
from queries.pool import pool


class CommentIn(BaseModel):
    user_id: int
    comment: str
    assigned_date: date


class CommentOut(BaseModel):
    id: int
    user_id: int
    comment: str
    assigned_date: date


class CommentRepository:
    def create(self, comment: CommentIn) -> CommentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO comments
                        (user_id, comment, assigned_date)
                    VALUES
                        (%s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        comment.user_id,
                        comment.comment,
                        comment.assigned_date
                    ]
                )
                id = result.fetchone()[0]
                old_data = comment.dict()
                return CommentOut(id=id, **old_data)
