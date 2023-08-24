from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from pool import pool

class Error(BaseModel):
    message: str

class WorkoutIn(BaseModel):
    user_id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    assigned_date: Optional[date]


class WorkoutOut(BaseModel):
    id: int
    user_id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    assigned_date: Optional[date]


class WorkoutRepository:
    def get_all(self) -> Union[Error, List[WorkoutOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, name, weight, sets, reps, picture_url, description, assigned_date
                        FROM exercises
                        ORDER BY assigned_date
                        """
                    )
                    result = []
                    for record in db:
                        workout = WorkoutOut(
                            id=record[0],
                            user_id=record[1],
                            name=record[2],
                            weight=record[3],
                            sets=record[4],
                            reps=record[5],
                            picture_url=record[6],
                            description=record[7],
                            assigned_date=record[8]
                        )
                        result.append(workout)
                    print("results:", result)
                    return result
        except Exception as e:
            print('error:', e)
            return e

    def create(self, workout:WorkoutIn) -> WorkoutOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO exercises
                        (user_id, name, weight, sets, reps, picture_url, description, assigned_date)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;

                        """,
                        [
                            workout.user_id,
                            workout.name,
                            workout.weight,
                            workout.sets,
                            workout.reps,
                            workout.picture_url,
                            workout.description,
                            workout.assigned_date
                        ]

                    )
                    id = result.fetchone()[0]
                    old_data = workout.dict()
                    return WorkoutOut(id=id, **old_data)
        except Exception as e:
            print("Error creating workout:", e)
            return e
