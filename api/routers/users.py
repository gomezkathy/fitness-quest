from fastapi import APIRouter, Depends
from queries.users import UserIn, UserOut, UserRepository

router = APIRouter()


@router.post("/users")
def create_user(
    user: UserIn,
    repo: UserRepository = Depends()
):
    return repo.create(user)
