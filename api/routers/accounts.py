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
    AccountUpdate,
    AccountOut,
    DuplicateAccountError,
    AuthenticationException
)
from authenticator import authenticator


router = APIRouter()


@router.get("/token", tags=["Accounts"], response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountIn = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        access_token = request.cookies[authenticator.cookie_name]
        account_id = account.get("id")
        if account_id is not None:
            token = AccountToken(
                access_token=access_token, type="Bearer", account=account_id
            )
            return token


@router.post(
    "/api/accounts", tags=["Accounts"], response_model=AccountToken | HttpError
)
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


@router.put("/api/accounts/update/{account_id}", response_model=AccountOut | HttpError)
async def update_account(
    account_id: int,
    updated_info: AccountUpdate,
    account: dict = Depends(authenticator.try_get_current_account_data),
    repo: AccountRepository = Depends(),
):
    if not account or account["id"] != account_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this account.",
        )

    try:
        updated_account = repo.update_account(account_id, updated_info)
        return updated_account
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while updating the account: {str(e)}",
        )


@router.get("/api/accounts/{account_id}", response_model=AccountOut | HttpError)
async def get_account_by_id(
    account_id: int,
    repo: AccountRepository = Depends(),
):
    try:
        account = repo.get_account_by_id(account_id)
        return account
    except AuthenticationException as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Account not found: {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving the account: {str(e)}",
        )
