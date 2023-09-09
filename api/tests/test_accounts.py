# from fastapi.testclient import TestClient
# from main import app
# from models.accounts import AccountOut, AccountUpdate
# from authenticator import authenticator


# client = TestClient(app)


# class MockAccountRepository:
#     def update_account(self, account_id: int, updated_info: AccountUpdate):
#         return AccountOut(
#             id=account_id,
#             username=updated_info.username,
#             first=updated_info.first,
#             last=updated_info.last,
#             email=updated_info.email,
#             password=None,
#         )


# def fake_get_account_data():
#     return {
#         "id": 1,
#         "username": "mock_username",
#         "first": "Mock",
#         "last": "User",
#         "email": "mock@example.com",
#         "password": "password",
#     }


# def test_update_account():
#     app.dependency_overrides[
#         authenticator.try_get_current_account_data
#     ] = fake_get_account_data
#     updated_info = {
#         "username": "new_username",
#         "first": "New",
#         "last": "Name",
#         "email": "new@example.com",
#         "password": "new_password",
#     }

#     response = client.put("/api/accounts/update/1", json=updated_info)

#     assert response.status_code == 200
#     assert response.json() == {
#         "id": 1,
#         "username": "new_username",
#         "first": "New",
#         "last": "Name",
#         "email": "new@example.com",
#     }
