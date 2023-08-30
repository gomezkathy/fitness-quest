from pool import pool


class WorkoutVOWorkoutsRepository:
    def create(self, workoutvo_id: int, workout_id: int):
        query = """
        INSERT INTO workoutvo_workouts (workoutvo_id, workout_id)
        VALUES (%s, %s);
        """
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, (workoutvo_id, workout_id))
