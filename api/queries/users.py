from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool


class UserIn(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: str
    created_at: datetime


class UserOut(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    email: str
    created_at: datetime


class UserRepository:
    def create(self, user: UserIn) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (username, first_name, last_name, email, created_at)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [user.username, user.first_name, user.last_name, user.email, user.created_at]
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOut(id=id, **old_data)
