from pydantic import BaseModel
from typing import List, Union
from datetime import date
from queries.pool import pool


class Error(BaseModel):
    message: str


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
    def get_all(self) -> Union[Error, List[CommentOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, comment, assigned_date
                        FROM comments
                        ORDER BY assigned_date
                        """
                    )
                    result = []
                    for record in db:
                        comment = CommentOut(
                            id=record[0],
                            user_id=record[1],
                            comment=record[2],
                            assigned_date=record[3],
                        )
                        result.append(comment)
                    return result
        except Exception:
            return {"message": "Could not get all comments"}

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
