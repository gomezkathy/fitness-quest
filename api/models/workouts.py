from pydantic import BaseModel


class WorkoutsIn(BaseModel):
    user_id: int
    name: str
    assigned_date: Optional[date]
    created_at: Optional[date]


class AllWorkouts(BaseModel):
    data: dict


class WorkoutsOut(BaseModel):
    name: str
    assigned_date: Optional[date]
    created_at: Optional[date]


class Status(BaseModel):
    status: int
    message: str
