from pool import pool
from models.workoutvo import WorkoutVOBase


class WorkoutVORepository:
    def create(self, workoutvo: WorkoutVOBase):
        query = """
        INSERT INTO workoutVO (assigned_date, workout_id)
        VALUES (%(assigned_date)s, %(workout_id)s);
        """
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, workoutvo.dict())
