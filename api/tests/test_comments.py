from fastapi import FastAPI, Depends
from fastapi.testclient import TestClient
from queries.comments import CommentRepository

app = FastAPI()
client = TestClient(app)


class EmptyCommentRepository:
    def get_all(self):
        return []


@app.get("/api/comments")
def get_all_comments(
    repo: CommentRepository = Depends(EmptyCommentRepository),
):
    comments = repo.get_all()
    return {"comments": comments}


def test_get_all_comments():
    app.dependency_overrides[CommentRepository] = EmptyCommentRepository
    response = client.get("/api/comments")

    assert response.status_code == 200
    assert response.json() == {"comments": []}
