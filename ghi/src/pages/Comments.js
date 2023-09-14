import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import useToken from "@galvanize-inc/jwtdown-for-react";
import UpdateComment from "./UpdateComment";

function Comments() {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [exerciseNames, setExerciseNames] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { exerciseId } = useParams();
  const exerciseIdAsNumber = parseInt(exerciseId, 10);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { token } = useToken();

  const [isCommentUpdateOpen, setIsCommentUpdateOpen] = useState(false);
  const [selectedCommentId, setCommentId] = useState(null);

  const fetchAccount = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
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
      let url = `${process.env.REACT_APP_API_HOST}/api/comments`;

      const response = await fetch(url, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data);

        const exerciseNamesResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/exercises`,
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
        `${process.env.REACT_APP_API_HOST}/api/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        fetchAllComments();
        setDeleteSuccess(true);
        setTimeout(() => {
          setDeleteSuccess(false);
        }, 1500);
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

      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAccount();
      await callbackFetchAllComments();
    };

    fetchData();
  }, [callbackFetchAllComments]);

  const userComments = comments.filter(
    (comment) =>
      comment.exercise_id === exerciseIdAsNumber && comment.user_id === userId
  );

  const toggleCommentUpdate = (commentId, exerciseId) => {
    setIsCommentUpdateOpen(!isCommentUpdateOpen);
    setCommentId(commentId);
  };

  const renderCommentForm = () => {
    if (exerciseId) {
      return (
        <div className="row justify-content-center mb-3">
          <div className="col-10">
            <div className="d-flex align-items-center">
              <div className="form-floating mx-auto col-11 mt-3">
                <input
                  className="form-control flex-grow-1"
                  onChange={(e) => setNewComment(e.target.value)}
                  value={newComment}
                  placeholder=" "
                  required
                  type="text"
                  name="comment"
                  id="comment"
                />
                <label htmlFor="comment">Leave a comment...</label>
              </div>
              <div className="col-1 pt-3 m-1">
                <button className="btn btn-success" onClick={handleAddComment}>
                  Submit
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
    <div className="container content-container">
      <div className="shadow p-5 mt-3 mb-3">
        <div className={`row${renderCommentForm() ? "" : " mb-"}`}>
          <div className="col-10 mt-3 mx-auto">
            {isCommentUpdateOpen && selectedCommentId !== null && (
              <div className="comment-form-overlay">
                <div className="m-3 comment-form-popup">
                  <UpdateComment
                    onClose={toggleCommentUpdate}
                    commentId={selectedCommentId}
                    exerciseId={exerciseIdAsNumber}
                  />
                </div>
              </div>
            )}
            {exerciseIdAsNumber && (
              <h1 className="d-flex justify-content-between">
                Exercise:{" "}
                {exerciseNames[exerciseIdAsNumber] || "Unknown Exercise"}
              </h1>
            )}
            <h4 className="d-flex justify-content-between">Comments</h4>
            <div className="row">
              <div className="col-12">
                <table className="table table-striped mt-3 mb-0">
                  <thead>
                    <tr>
                      <th scope="col" className="col-6">
                        Comment
                      </th>
                      <th scope="col" className="col-2">
                        Date
                      </th>
                      <th scope="col" className="col-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userComments.map((comment) => (
                      <tr key={comment.id}>
                        <td className="center">{comment.comment}</td>
                        <td className="center">{comment.assigned_date}</td>
                        <td className="center">
                          <button
                            onClick={() =>
                              toggleCommentUpdate(comment.id, exerciseId)
                            }
                            className="btn btn-primary m-1"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger m-1"
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
        {deleteSuccess && (
          <div className="alert alert-danger mb-0" role="alert">
            Comment deleted successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default Comments;
