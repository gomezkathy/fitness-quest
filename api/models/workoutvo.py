from pydantic import BaseModel


class WorkoutVOBase(BaseModel):
    assigned_date: date
    workout_id: int


class WorkoutVO(WorkoutVOBase):
    pass
