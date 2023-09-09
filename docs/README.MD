Fitness Quest

The Team - Fullstack Alchemist

- Dakota Steppe
- Yohan Pak
- Kathy Gomez
- Julius Pagtakhan

Database Diagram

Functionality

- Upon landing on the home page, Users who do not have an account registered will see information about Fitness Quest, including features, about us, and a testimonial.
- Users will be required to Sign Up or Log In to access the app.
- Once logged in, Users can create, view, update, or delete their workout events.
- Within these workouts, Users can create, view, update, or delete exercises within their workouts.
- Users can create, view, update, or delete comment notes tied to each of their listed workouts.

Project Initialization

- To fully enjoy this application on your local machine, please make sure to follow these steps:
- Clone the repository down to your local machine
- CD into the new project directory
- Run docker volume create fastapi-fitness-data
- Run docker compose build
- Run docker compose up
- Exit the container's CLI, and enjoy planning and tracking your workouts!

API Documentation

- For full documentation, visit http://localhost:8000/docs once project is initialized (see above)

Workouts
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List workouts | GET | http://localhost:8000/api/workouts/
| Create a workout | POST | http://localhost:8000/api/workouts/
| Get a specific workout | GET | http://localhost:8000/api/workouts/<int:id>/
| Update a specific workout | PUT | http://localhost:8000/api/workouts/<int:id>/
| Delete a specific workout | DELETE | http://localhost:8000/api/workouts/<int:id>/

Exercises
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List exercises | GET | http://localhost:8000/api/exercises/
| Create an exercise | POST | http://localhost:8000/api/exercises/
| Get a specific exercise | GET | http://localhost:8000/api/exercises/<int:id>/
| Update a specific exercise | PUT | http://localhost:8000/api/exercises/<int:id>/
| Delete a specific exercise | DELETE | http://localhost:8000/api/exercises/<int:id>/

Comments
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List comments | GET | http://localhost:8000/api/comments/
| Create a comment | POST | http://localhost:8000/api/comments/
| Get a specific comment | GET | http://localhost:8000/api/comments/<int:id>/
| Update a specific comment | PUT | http://localhost:8000/api/comments/<int:id>/
| Delete a specific comment | DELETE | http://localhost:8000/api/comments/<int:id>/
