from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from queries.pool import pool

class WorkoutIn(BaseModel):
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    created_at: Optional[datetime]
    assigned_date: Optional[date]

class WorkoutOut(BaseModel):
    id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    created_at: Optional[datetime]
    assigned_date: Optional[date]


class WorkoutRepository:
    def create(self, workout:WorkoutIn) -> WorkoutOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                    (name, weight, sets, reps, picture_url, description, created_at, assigned_date)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;

                    """,
                    [
                        workout.name,
                        workout.weight,
                        workout.sets,
                        workout.reps,
                        workout.picture_url,
                        workout.description,
                        workout.created_at,
                         workout.assigned_date
                    ]

                )
                id = result.fetchone()[0]
                old_data = workout.dict()
                return WorkoutOut(id=id, **old_data)
