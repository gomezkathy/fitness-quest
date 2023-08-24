from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from pool import pool


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
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    assigned_date: Optional[date]


class WorkoutRepository:
    def create(self, workout: WorkoutIn) -> WorkoutOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                    (user_id, name, weight, sets, reps, picture_url,
                    description, assigned_date)
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
