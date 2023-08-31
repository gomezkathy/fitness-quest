steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            first VARCHAR(100) NOT NULL,
            last VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE exercises (
            id SERIAL NOT NULL PRIMARY KEY,
            user_id INTEGER REFERENCES accounts(id),
            name VARCHAR(100) NOT NULL,
            weight NUMERIC(10, 1),
            reps INTEGER,
            sets INTEGER,
            picture_url VARCHAR(255),
            description TEXT,
            assigned_date DATE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE exercises;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL NOT NULL PRIMARY KEY,
            user_id INTEGER REFERENCES accounts(id),
            comment TEXT NOT NULL,
            assigned_date DATE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """,
    ],
    [
        """
        CREATE TABLE workouts (
            id SERIAL NOT NULL PRIMARY KEY,
            user_id INTEGER REFERENCES accounts(id),
            workout_name VARCHAR(100) NOT NULL,
            comment TEXT,
            exercise_list INTEGER []
        )
        """,
        """
        DROP TABLE workouts;
        """,
    ],
    [
        """
        CREATE TABLE workoutVO (
            assigned_date DATE NOT NULL,
            workout_id INTEGER NOT NULL REFERENCES workouts
        )
        """,
        """
        DROP TABLE workoutVO;
        """,
    ],
]
# migration issue, delete the volume, create the volume again to fix *migration issues usually means to destroy the volume
