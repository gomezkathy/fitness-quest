from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class Error(BaseModel):
    message: str

class ExerciseIn(BaseModel):
    user_id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    created_at: Optional[datetime]
    assigned_date: Optional[date]
    type: Optional[str]
    muscle: Optional[str]
    difficulty: Optional[str]
    equipment: Optional[str]
    instructions: Optional[str]


class ExerciseOut(BaseModel):
    id: int
    user_id: int
    name: str
    weight: Optional[int]
    sets: Optional[int]
    reps: Optional[int]
    picture_url: Optional[str]
    description: Optional[str]
    created_at: Optional[datetime]
    assigned_date: Optional[date]
    type: Optional[str]
    muscle: Optional[str]
    difficulty: Optional[str]
    equipment: Optional[str]
    instructions: Optional[str]
