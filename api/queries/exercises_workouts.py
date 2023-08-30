from pool import pool


class ExercisesWorkoutsRepository:
    def create(self, workout_id: int, exercise_id: int):
        query = """
        INSERT INTO exercises_workouts (workout_id, exercise_id)
        VALUES (%s, %s);
        """
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, (workout_id, exercise_id))
