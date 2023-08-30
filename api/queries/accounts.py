from pool import pool
from models.accounts import AccountCreate, AccountOut, AccountWithPassword


class AccountRepository:
    def get(self, username: str) -> AccountWithPassword:
        query = "SELECT * FROM accounts WHERE username = %s"
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, (username,))
                result = cursor.fetchone()
                if result:
                    return AccountWithPassword(**dict(result))
                return None

    def create(self, account: AccountCreate) -> int:
        query = """
        INSERT INTO accounts (username, password, first_name, last_name, email)
        VALUES (%(username)s, %(password)s, %(first_name)s, %(last_name)s, %(email)s)
        RETURNING id;
        """
        with pool.get_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(query, account.dict())
                return cursor.fetchone()[0]
