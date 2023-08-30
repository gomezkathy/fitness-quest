import unittest
from fastapi import FastAPI
from fastapi.testclient import TestClient

app = FastAPI()
client = TestClient(app)


class TestServerResponse(unittest.TestCase):
    def test_server_response(self):
        response = client.get("/api/comments")

        self.assertEqual(
            response.status_code, 404, "Successfully sent request to server"
        )


if __name__ == "__main__":
    unittest.main()
