from typing import Optional, List, Union
from models.exercises import ExerciseIn, ExerciseOut, Error
from pool import pool


class ExerciseRepository:
    def get_one(self, exercise_id: int) -> Optional[ExerciseOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , name
                            , weight
                            , sets
                            , reps
                            , picture_url
                            , description
                            , created_at
                            , assigned_date
                            , type
                            , muscle
                            , difficulty
                            , equipment
                            , instructions
                        FROM exercises
                        WHERE id = %s
                        """,
                        [exercise_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_exercise_out(record)
        except Exception as e:
            print(e)
            return {"message": "could not get exercise"}

    def delete(self, exercise_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE from exercises
                        WHERE id = %s
                        """,
                        [exercise_id],
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
        self, exercise_id: int, exercise: ExerciseIn
    ) -> Union[ExerciseOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE exercises
                        SET user_id = %s,
                            name = %s,
                            weight = %s,
                            sets = %s,
                            reps = %s,
                            picture_url = %s,
                            description = %s,
                            created_at = %s,
                            assigned_date = %s,
                            type = %s,
                            muscle = %s,
                            difficulty = %s,
                            equipment = %s,
                            instructions = %s
                        WHERE id = %s
                        """,
                        [
                            exercise.user_id,
                            exercise.name,
                            exercise.weight,
                            exercise.sets,
                            exercise.reps,
                            exercise.picture_url,
                            exercise.description,
                            exercise.created_at,
                            exercise.assigned_date,
                            exercise.type,
                            exercise.muscle,
                            exercise.difficulty,
                            exercise.equipment,
                            exercise.instructions,
                            exercise_id,
                        ],
                    )
                    return self.exercise_in_to_out(exercise_id, exercise)
        except Exception as e:
            print(e)
            return {"message": "could not update exercise"}

    def get_all(self) -> Union[Error, List[ExerciseOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            user_id,
                            name,
                            weight,
                            sets,
                            reps,
                            picture_url,
                            description,
                            created_at,
                            assigned_date,
                            type,
                            muscle,
                            difficulty,
                            equipment,
                            instructions
                        FROM exercises
                        ORDER BY assigned_date
                        """
                    )
                    result = []
                    for record in db:
                        exercise = ExerciseOut(
                            id=record[0],
                            user_id=record[1],
                            name=record[2],
                            weight=record[3],
                            sets=record[4],
                            reps=record[5],
                            picture_url=record[6],
                            description=record[7],
                            created_at=record[8],
                            assigned_date=record[9],
                            type=record[10],
                            muscle=record[11],
                            difficulty=record[12],
                            equipment=record[13],
                            instructions=record[14],
                        )
                        result.append(exercise)
                    return result
        except Exception as e:
            print("error:", e)
            return e

    def create(self, exercise: ExerciseIn) -> ExerciseOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO exercises
                        (
                            user_id,
                            name,
                            weight,
                            sets,
                            reps,
                            picture_url,
                            description,
                            created_at,
                            assigned_date,
                            type,
                            muscle,
                            difficulty,
                            equipment,
                            instructions
                            )
                        VALUES
                            (
                            %s, %s, %s, %s, %s,
                            %s, %s, %s, %s, %s,
                            %s, %s, %s, %s
                            )
                        RETURNING id;

                        """,
                        [
                            exercise.user_id,
                            exercise.name,
                            exercise.weight,
                            exercise.sets,
                            exercise.reps,
                            exercise.picture_url,
                            exercise.description,
                            exercise.created_at,
                            exercise.assigned_date,
                            exercise.type,
                            exercise.muscle,
                            exercise.difficulty,
                            exercise.equipment,
                            exercise.instructions,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.exercise_in_to_out(id, exercise)
        except Exception as e:
            print("Error creating exercise:", e)
            return e

    def exercise_in_to_out(self, id: int, exercise: ExerciseIn):
        old_data = exercise.dict()
        return ExerciseOut(id=id, **old_data)

    def record_to_exercise_out(self, record):
        return ExerciseOut(
            id=record[0],
            user_id=record[1],
            name=record[2],
            weight=record[3],
            sets=record[4],
            reps=record[5],
            picture_url=record[6],
            description=record[7],
            created_at=record[8],
            assigned_date=record[9],
            type=record[10],
            muscle=record[11],
            difficulty=record[12],
            equipment=record[13],
            instructions=record[14],
        )
