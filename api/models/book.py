from pydantic import BaseModel


class Book(BaseModel):
    id: int  # This field might be assigned by the database, so it's not required here
    volume_id: str
    title: str
    authors: str
    thumbnail: str
    state: int
    rating: int
