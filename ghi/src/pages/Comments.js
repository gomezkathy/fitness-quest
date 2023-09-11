import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Comments() {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [exerciseNames, setExerciseNames] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { exerciseId } = useParams();
  const exerciseIdAsNumber = parseInt(exerciseId, 10);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { token } = useToken();

  const fetchAccount = async () => {
    const response = await fetch("http://localhost:8000/token", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      const userId = data.account;
      setUserId(userId);
    }
  };

  const fetchAllComments = async () => {
    try {
      let url = "http://localhost:8000/api/comments";

      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);

        const exerciseNamesResponse = await fetch(
          `http://localhost:8000/api/exercises`,
          {
            credentials: "include",
          }
        );

        if (exerciseNamesResponse.ok) {
          const exerciseNames = await exerciseNamesResponse.json();
          const exerciseNameMap = {};
          exerciseNames.forEach((exercise) => {
            exerciseNameMap[exercise.id] = exercise.name;
          });

          setExerciseNames(exerciseNameMap);

          const commentsWithExerciseNames = data.map((comment) => {
            const exerciseName = exerciseNameMap[comment.exercise_id];
            return {
              ...comment,
              exercise_name: exerciseName || "Unknown Exercise",
            };
          });
          setComments(commentsWithExerciseNames);
        }
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchAllComments();
        setDeleteSuccess(true);
      } else {
        console.error(
          "Failed to delete comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while deleting comment:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const payload = {
        user_id: userId,
        exercise_id: exerciseIdAsNumber,
        comment: newComment,
        assigned_date: format(new Date(), "yyyy-MM-dd"),
      };

      const response = await fetch(`http://localhost:8000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchAllComments();
        setNewComment("");
      } else {
        console.error(
          "Failed to add comment:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error while adding comment:", error);
    }
  };

  const callbackFetchAllComments = useCallback(() => {
    fetchAllComments();
  }, [exerciseIdAsNumber]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAccount();
      await callbackFetchAllComments();
    };

    fetchData();
  }, [exerciseIdAsNumber, callbackFetchAllComments]);

  const userComments = comments.filter((comment) => comment.user_id === userId);
  const renderCommentForm = () => {
    if (exerciseId) {
      return (
        <div className="row justify-content-center mb-5">
          <div className="col-8">
            <div className="p-3">
              <div className=" d-flex align-items-center">
                <input
                  className="form-control flex-grow-1"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                  placeholder="Leave a comment..."
                  required
                  type="text"
                  name="comment"
                  id="comment"
                />
                <button
                  className="btn btn-primary ml-3"
                  onClick={handleAddComment}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="container mt-5 mb-5">
      <div className="shadow p-3 mb-5 bg-white rounded">
        {deleteSuccess && (
          <div className="alert alert-danger" role="alert">
            Comment deleted successfully!
          </div>
        )}
        <div className={`row${renderCommentForm() ? "" : " mb-5"}`}>
          <div className="col-10 mt-5 mx-auto">
            <h1>Comments Log</h1>
            <div className="row">
              <div className="col-12">
                <table className="table table-striped mt-4 mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Exercise</th>
                      <th scope="col">Comment</th>
                      <th scope="col">Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userComments.map((comment) => (
                      <tr key={comment.id}>
                        <td>
                          {exerciseNames[comment.exercise_id] || "Unknown"}
                        </td>
                        <td>{comment.comment}</td>
                        <td>{comment.assigned_date}</td>
                        <td>
                          <Link
                            className="btn btn-primary btn-link"
                            to={`/comments/${comment.exercise_id}/${comment.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {renderCommentForm()}
      </div>
    </div>
  );
}

export default Comments;
