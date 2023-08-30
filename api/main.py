from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    comments,
    accounts,
    exercises,
    exercises_workouts,
    workout_workouts,
    workouts,
    workoutvo,
)
from authenticator import authenticator
from fastapi import APIRouter
from pool import pool  # Import the connection pool

app = FastAPI()

# Configure the app to use the authenticator's token settings
app.token_settings = authenticator.token_settings

app.include_router(authenticator.router)
app.include_router(comments.router)
app.include_router(accounts.router)
app.include_router(exercises.router)  # Include exercises router
app.include_router(
    exercises_workouts.router
)  # Include exercises_workouts router
app.include_router(workout_workouts.router)  # Include workout_workouts router
app.include_router(workouts.router)  # Include workouts router
app.include_router(workoutvo.router)  # Include workoutvo router

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
