from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime, date
from pool import pool

class Error(BaseModel):
    message: str

class WorkoutIn(BaseModel):
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
    def get_all(self) -> Union[Error, List[WorkoutOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, weight, sets, reps, picture_url, description, assigned_date
                        FROM exercises
                        ORDER BY assigned_date
                        """
                    )
                    result = []
                    for record in db:
                        workout = WorkoutOut(
                            id=record[0],
                            name=record[1],
                            weight=record[2],
                            sets=record[3],
                            reps=record[4],
                            picture_url=record[5],
                            description=record[6],
                            assigned_date=record[7]
                        )
                        result.append(workout)
                    return result
        except Exception:
            return {"message": "Could not get all comments"}

    def create(self, workout:WorkoutIn) -> WorkoutOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO exercises
                    (name, weight, sets, reps, picture_url, description, assigned_date)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id;

                    """,
                    [
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
