from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token


class Account(BaseModel):
    first: str
    last: str
    email: str
    username: str


class AccountWithPassword(Account):
    id: int
    username: str
    password: str


class AccountOut(Account):
    id: int


class AccountIn(Account):
    email: str
    password: str


class AccountUpdate(Account):
    first: str
    last: str
    email: str
    username: str
    password: str


class AccountToken(Token):
    account: int


class AuthenticationException(Exception):
    pass


class DuplicateAccountError(ValueError):
    pass


class AccountForm(BaseModel):
    username: str
    password: str


class HttpError(BaseModel):
    detail: str
