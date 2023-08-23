steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL NOT NULL PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            created_at TIMESTAMP NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE exercises (
            id SERIAL NOT NULL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            name VARCHAR(150) NOT NULL,
            weight SMALLINT,
            reps SMALLINT,
            sets SMALLINT,
            picture_url VARCHAR(255),
            description TEXT,
            created_at TIMESTAMP,
            assigned_date DATE,
            type VARCHAR(100),
            muscle VARCHAR(100),
            difficulty VARCHAR(100),
            equiptment VARCHAR(200),
            instructions TEXT
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
            user_id INTEGER REFERENCES users(id),
            comment TEXT,
            assigned_date DATE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """,
    ],
]
# migration issue, delete the volume, create the volume again to fix *migration issues usually means to destroy the volume
