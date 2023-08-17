from fastapi import FastAPI
from routers import users, workouts

app = FastAPI()
app.include_router(users.router)
app.include_router(workouts.router)
