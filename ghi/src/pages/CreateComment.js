import React, { useState } from "react";

function CommentForm() {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentUrl = "http://localhost:8000/api/comments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(commentUrl, fetchConfig);
    if (response.ok) {
      setComment("");
    }
  };

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setComment(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="border rounded p-4 mt-4">
          <h1>Comments</h1>
          <form
            onSubmit={handleSubmit}
            id="create-comment"
            className="create-comment"
          >
            <div className="mb-3">
              <input
                onChange={handleCommentChange}
                value={comment}
                placeholder="Leave a comment..."
                required
                type="text"
                name="comment"
                id="comment"
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
