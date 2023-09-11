from pydantic import BaseModel
from typing import Optional


class WorkoutIn(BaseModel):
    user_id: int
    workout_name: str


class WorkoutOut(BaseModel):
    id: int
    user_id: int
    workout_name: str


class Error(BaseModel):
    message: str
