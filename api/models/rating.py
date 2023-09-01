from pydantic import BaseModel


class Rating(BaseModel):
    id: int
    volume_id: str
    value: int
