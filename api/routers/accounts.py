from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
    Request,
)
from queries.accounts import (
    AccountRepository,
)
from models.accounts import (
    AccountToken,
    HttpError,
    AccountForm,
    AccountIn,
    AccountOut,
    DuplicateAccountError,
)
from authenticator import authenticator


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# from pool import pool
# from models.accounts import AccountCreate, AccountOut, AccountWithPassword

# class AccountRepository:
#     def get(self, username: str) -> AccountWithPassword:
#         query = "SELECT * FROM accounts WHERE username = %s"
#         with pool.get_connection() as connection:
#             with connection.cursor() as cursor:
#                 cursor.execute(query, (username,))
#                 result = cursor.fetchone()
#                 if result:
#                     return AccountWithPassword(**dict(result))
#                 return None

#     def create(self, account: AccountCreate) -> int:
#         query = """
#         INSERT INTO accounts (username, password, first_name, last_name, email)
#         VALUES (%(username)s, %(password)s, %(first_name)s, %(last_name)s, %(email)s)
#         RETURNING id;
#         """
#         with pool.get_connection() as connection:
#             with connection.cursor() as cursor:
#                 cursor.execute(query, account.dict())
#                 return cursor.fetchone()[0]
