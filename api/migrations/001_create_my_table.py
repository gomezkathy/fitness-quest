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
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE exercises (
            id SERIAL NOT NULL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            name VARCHAR(100) NOT NULL,
            weight NUMERIC(10, 1),
            reps INTEGER,
            sets INTEGER,
            picture_url VARCHAR(255),
            description TEXT,
            created_at TIMESTAMP,
            assigned_date DATE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE exercises;
        """
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
        """
    ]
]
