from psycopg_pool import ConnectionPool
import os
from models.accounts import (
    AccountOut,
    AccountIn,
    Account,
    AccountUpdate,
    AccountWithPassword,
    AuthenticationException,
)
import bcrypt

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountRepository:
    def get_account_by_id(self, pk: int) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, first, last,
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
                    SELECT id, username, first, last,
                        email, password
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
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
                    (username, password, first,
                        last, email)
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

    def update_account(
        self, account_id: int, updated_info: AccountUpdate
    ) -> AccountOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                if updated_info.password:
                    hashed_password = bcrypt.hashpw(
                        updated_info.password.encode(), bcrypt.gensalt()
                    )
                    cur.execute(
                        """
                        UPDATE accounts
                        SET username = %s, first = %s, last = %s, email = %s, password = %s
                        WHERE id = %s
                        RETURNING id, username, first, last, email, password;
                        """,
                        (
                            updated_info.username,
                            updated_info.first,
                            updated_info.last,
                            updated_info.email,
                            hashed_password.decode(),
                            account_id,
                        ),
                    )
                else:
                    cur.execute(
                        """
                        UPDATE accounts
                        SET username = %s, first = %s, last = %s, email = %s
                        WHERE id = %s
                        RETURNING id, username, first, last, email, password;
                        """,
                        (
                            updated_info.username,
                            updated_info.first,
                            updated_info.last,
                            updated_info.email,
                            account_id,
                        ),
                    )

                ac = cur.fetchone()
                if ac is None:
                    raise Exception("No account found")

                return AccountOut(
                    id=ac[0],
                    username=ac[1],
                    first=ac[2],
                    last=ac[3],
                    email=ac[4],
                    password=ac[5],
                )
