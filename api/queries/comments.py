from pydantic import BaseModel
from typing import List, Union
from datetime import date
from pool import pool
from queries.accounts import AccountRepository
from models.comments import CommentOut, CommentIn, Error
from fastapi import HTTPException


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
        except Exception as e:
            print("Error:", e)
            return e

    def create(self, comment: CommentIn) -> CommentOut:
        try:
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
        except Exception as e:
            # Handle the exception appropriately, log it, and possibly return an error response
            print("Error:", e)
            return e

    def delete(self, comment_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id FROM comments
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    result = db.fetchone()

                    if result is None:
                        print(f"Comment with id {comment_id} does not exist.")
                        return False
                    else:
                        db.execute(
                            """
                            DELETE FROM comments
                            WHERE id = %s
                            """,
                            [comment_id],
                        )
                        return True
        except Exception as e:
            print(e)
            return False

    def update(self, comment_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id FROM comments
                        WHERE id = %s
                        """,
                        [comment_id],
                    )
                    result = db.fetchone()

                    if result is None:
                        raise HTTPException(status_code=404, detail=f"Comment with id {comment_id} does not exist.")

                    db.execute(
                        """
                        UPDATE comments
                        SET
                        user_id = %s,
                        comment = %s,
                        assigned_date = %s
                        WHERE id = %s;
                        """,
                        [
                            comment.user_id,
                            comment.comment,
                            comment.assigned_date,
                            comment_id,
                        ],
                    )

            updated_comment = self.get_comment_by_id(comment_id)
            return updated_comment
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            return {"message": "Error updating comment"}

    def get_comment_by_id(self, comment_id: int) -> CommentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT user_id, comment, assigned_date
                    FROM comments
                    WHERE id = %s;
                    """,
                    [comment_id],
                )
                comment_data = db.fetchone()
                if comment_data:
                    return CommentOut(
                        id=comment_id,
                        user_id=comment_data[0],
                        comment=comment_data[1],
                        assigned_date=comment_data[2],
                    )
                else:
                    raise Exception("Comment not found")
