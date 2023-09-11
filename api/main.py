from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import comments, accounts, exercises, workouts
from authenticator import authenticator


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(comments.router)
app.include_router(accounts.router)
app.include_router(exercises.router)
app.include_router(workouts.router)

origins = [
    "http://localhost:3000",
    "https://module3-project-gamma-full-"
    "stack-alchemist-fccc9d4594f7ac41ee30.gitlab.io/",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "You hit the root path!"}


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
