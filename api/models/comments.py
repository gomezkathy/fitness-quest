from datetime import date
from pydantic import BaseModel


class Error(BaseModel):
    message: str


class CommentIn(BaseModel):
    user_id: int
    comment: str
    assigned_date: date


class CommentOut(BaseModel):
    id: int
    user_id: int
    comment: str
    assigned_date: date
