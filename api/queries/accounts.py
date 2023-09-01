from psycopg_pool import ConnectionPool
import os
from models.accounts import (
    AccountOut,
    Account,
    AccountWithPassword,
    AuthenticationException,
)

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountRepository:
    def get_account_by_id(self, pk: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, first_name, last_name,
                        email, password
                    FROM accounts
                    WHERE id = %s;
                    """,
                    [pk],
                )
                ac = cur.fetchone()
                if ac is None:
                    raise AuthenticationException("No account found")
                else:
                    try:
                        return AccountOut(
                            id=ac[0],
                            username=ac[1],
                            first=ac[2],
                            last=ac[3],
                            email=ac[4],
                            password=ac[5],
                        )
                    except Exception as e:
                        raise Exception("Error:", e)

    def get(self, username: int) -> AccountWithPassword | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, first_name, last_name,
                        email, password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],)
                ac = cur.fetchone()
                if ac is None:
                    raise Exception("No account found")
                else:
                    try:
                        print
                        return AccountWithPassword(
                            id=ac[0],
                            username=ac[1],
                            first=ac[2],
                            last=ac[3],
                            email=ac[4],
                            password=ac[5],
                        )
                    except Exception as e:
                        raise Exception("Error:", e)

    def create_account(self, account: Account, password: str) -> int:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO accounts
                    (username, password, first_name,
                        last_name, email)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING ID;
                    """,
                    (
                        account.username,
                        password,
                        account.first,
                        account.last,
                        account.email,
                    ),
                )
                pk = cur.fetchone()[0]
                return pk

    def delete_account(self, pk: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s
                    RETURNING *;
                    """,
                    (pk),
                )
