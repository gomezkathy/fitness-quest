from pool import pool
from models.workouts import WorkoutBase, WorkoutOut


class WorkoutRepository:
    def create(self, workout: WorkoutBase) -> int:
        query = """
        INSERT INTO workouts (user_id, workout_name, comment, exercise_list)
        VALUES (%(user_id)s, %(workout_name)s, %(comment)s, %(exercise_list)s)
        RETURNING id;
        """
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, workout.dict())
                return cursor.fetchone()[0]
