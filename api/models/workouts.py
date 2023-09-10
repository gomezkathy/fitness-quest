from pydantic import BaseModel
from typing import Optional


class WorkoutIn(BaseModel):
    user_id: int
    workout_name: str
    comment: Optional[str]
    exercise_id: Optional[int]


class WorkoutOut(BaseModel):
    id: int
    user_id: int
    workout_name: str
    comment: Optional[str]
    exercise_id: Optional[int]


class Error(BaseModel):
    message: str
