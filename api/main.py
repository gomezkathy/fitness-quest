from fastapi import FastAPI

# import routers here
from fastapi.middleware.cors import CORSMiddleware

from routers import book_router, rating_router
import os
from routers import comments, accounts, workouts, exercises
from authenticator import authenticator
from fastapi import APIRouter

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(comments.router)
app.include_router(accounts.router)
app.include_router(workouts.router)
app.include_router(book_router.router, prefix="/books", tags=["books"])
app.include_router(rating_router.router, prefix="/ratings", tags=["ratings"])
app.include_router(exercises.router, prefix="/exercises", tags=["exercises"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
