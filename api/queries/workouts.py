from typing import List, Union
from fastapi import HTTPException
from pool import pool
from models.workouts import WorkoutOut, WorkoutIn, Error


class WorkoutRepository:
    def create_workout(self, workout: WorkoutIn) -> WorkoutOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO workouts (
                            user_id,
                            workout_name
                            )
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        [
                            workout.user_id,
                            workout.workout_name,
                        ],
                    )
                    new_id = result.fetchone()[0]
                    return WorkoutOut(id=new_id, **workout.dict())
        except Exception as e:
            print(
                "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT:",
                e,
            )
            raise HTTPException(
                status_code=500, detail="Failed to create workout"
            )

    def get_all_workouts(self) -> Union[Error, List[WorkoutOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            w.id,
                            w.user_id,
                            w.workout_name,
                        FROM workouts w
                        LEFT JOIN accounts a ON w.user_id = a.id
                        """
                    )
                    workouts = []
                    for record in db:
                        workout = WorkoutOut(
                            id=record[0],
                            user_id=record[1],
                            workout_name=record[2],
                        )
                        workouts.append(workout)
                    return workouts
        except Exception as e:
            print("Error:", e)
            raise HTTPException(
                status_code=500, detail="Failed to retrieve workouts"
            )

    def get_workout_by_id(self, workout_id: int) -> Union[WorkoutOut, None]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT user_id, workout_name
                        FROM workouts
                        WHERE id = %s
                        """,
                        [workout_id],
                    )
                    record = db.fetchone()
                    if record:
                        return WorkoutOut(
                            id=workout_id,
                            user_id=record[0],
                            workout_name=record[1],
                        )
                    return None
        except Exception as e:
            print("Error:", e)
            raise HTTPException(
                status_code=500, detail="Failed to retrieve workout"
            )

    def update_workout(
        self, workout_id: int, workout: WorkoutIn
    ) -> Union[WorkoutOut, None]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE workouts
                        SET user_id = %s,
                            workout_name = %s,
                        WHERE id = %s
                        RETURNING user_id,
                            workout_name,
                        """,
                        [
                            workout.user_id,
                            workout.workout_name,
                            workout_id,
                        ],
                    )
                    record = db.fetchone()
                    if record:
                        return WorkoutOut(
                            id=workout_id,
                            user_id=record[0],
                            workout_name=record[1],
                        )
                    return None
        except Exception as e:
            print("Error:", e)
            raise HTTPException(
                status_code=500, detail="Failed to update workout"
            )

    def delete_workout(self, workout_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM workouts
                        WHERE id = %s
                        RETURNING id;
                        """,
                        [workout_id],
                    )
                    record = db.fetchone()
                    if record:
                        return True
                    return False
        except Exception as e:
            print("Error:", e)
            raise HTTPException(
                status_code=500, detail="Unable to delete the workout!"
            )
