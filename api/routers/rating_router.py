from fastapi import APIRouter
from models.rating import Rating
from queries.rating_queries import get_ratings, add_rating

router = APIRouter()


@router.get("/")
async def get_all_ratings():
    return get_ratings()


@router.post("/")
async def create_rating(rating: Rating):
    return add_rating(rating)
