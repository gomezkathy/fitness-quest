from pydantic import BaseModel


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
