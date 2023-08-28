from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from pool import pool
from datetime import date


class ExercisesIn(BaseModel):
    user_id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    description: Optional[str]
    assigned_date: Optional[date]
    created_at: Optional[date]
    type: Optional[str]
    muscle: Optional[str]
    difficulty: Optional[str]
    equiptment: Optional[str]
    instructions: Optional[str]


class AllExercises(BaseModel):
    data: dict


class ExercisesOut(BaseModel):
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    description: Optional[str]
    assigned_date: Optional[date]
    created_at: Optional[date]
    type: Optional[str]
    muscle: Optional[str]
    difficulty: Optional[str]
    equiptment: Optional[str]
    instructions: Optional[str]


class Status(BaseModel):
    status: int
    message: str


class ExercisesRepository:
    def create(self, exercise: ExercisesIn) -> Status:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO exercises
                        (user_id, name, weight, sets, reps,
                        description, assigned_date, created_at, type, muscle, difficulty, equiptment, instructions)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
                        """,
                        [
                            exercise.user_id,
                            exercise.name,
                            exercise.weight,
                            exercise.sets,
                            exercise.reps,
                            exercise.description,
                            exercise.assigned_date,
                            exercise.created_at,
                            exercise.type,
                            exercise.muscle,
                            exercise.difficulty,
                            exercise.equiptment,
                            exercise.instructions,
                        ],
                    )
                    return Status(status=200, message="Exercise Saved!")
        except Exception as e:
            print("Error:", e)
            return Status(status=400, message=f"Error: {e}")