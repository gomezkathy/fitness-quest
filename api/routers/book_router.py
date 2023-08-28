from fastapi import APIRouter
from models.book import Book
from queries.book_queries import get_books, add_book

router = APIRouter()


@router.get("/")
async def get_all_books():
    return get_books()


@router.post("/")
async def create_book(book: Book):
    return add_book(book)
