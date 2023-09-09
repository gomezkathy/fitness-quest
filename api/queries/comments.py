from typing import List, Union, Optional
from pool import pool
from models.comments import CommentOut, CommentIn, CommentOutExerciseId, Error
from fastapi import HTTPException


class CommentRepository:
    def get_all(
        self, account_data: dict, exercise_id: Optional[int] = None
    ) -> Union[Error, List[Union[CommentOut, CommentOutExerciseId]]]:
        try:
            user_id = account_data.get("id")
            if user_id is None:
                raise HTTPException(
                    status_code=401, detail="User is not authenticated."
                )

            with pool.connection() as conn:
                with conn.cursor() as db:
                    if exercise_id is not None:
                        query = """
                            SELECT id, user_id, exercise_id, comment,
                            assigned_date
                            FROM comments
                            WHERE user_id = %s AND exercise_id = %s
                            ORDER BY assigned_date
                        """
                        db.execute(query, [user_id, exercise_id])
                    else:
                        query = """
                            SELECT id, user_id, exercise_id, comment,
                            assigned_date
                            FROM comments
                            WHERE user_id = %s
                            ORDER BY assigned_date
                        """
                        db.execute(query, [user_id])
                    result = []
                    for record in db:
                        comment = CommentOutExerciseId(
                            id=record[0],
                            user_id=record[1],
                            exercise_id=record[2],
                            comment=record[3],
                            assigned_date=record[4],
                        )
                        result.append(comment)
                    return result
        except Exception as e:
            print("Error:", e)
            return e

    def create(self, comment: CommentIn, exercise_id: int) -> CommentOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (user_id, exercise_id, comment, assigned_date)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comment.user_id,
                            exercise_id,
                            comment.comment,
                            comment.assigned_date,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = comment.dict()
                    return CommentOut(id=id, **old_data)
        except Exception as e:
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

    def update(
        self, exercise_id: int, comment_id: int, comment: CommentIn
    ) -> Union[CommentOut, Error]:
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
                        raise HTTPException(
                            status_code=404,
                            detail=f"""Comment with id
                            {comment_id} does not exist.""",
                        )

                    db.execute(
                        """
                        UPDATE comments
                        SET
                        user_id = %s,
                        exercise_id = %s,
                        comment = %s,
                        assigned_date = %s
                        WHERE id = %s;
                        """,
                        [
                            comment.user_id,
                            exercise_id,
                            comment.comment,
                            comment.assigned_date,
                            comment_id,
                        ],
                    )

            updated_comment = self.get_comment_by_id(exercise_id, comment_id)
            return updated_comment
        except HTTPException as e:
            raise e
        except Exception as e:
            print(e)
            return {"message": "Error updating comment"}

    def get_comment_by_id(
        self, exercise_id: int, comment_id: int
    ) -> CommentOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    SELECT user_id, comment, assigned_date
                    FROM comments
                    WHERE id = %s
                    AND exercise_id = %s;
                    """,
                    [comment_id, exercise_id],
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
