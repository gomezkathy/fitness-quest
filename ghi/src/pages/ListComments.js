import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import UpdateComment from "./UpdateComment";
import CommentForm from "./CreateComment";
import { useLocation } from "react-router-dom";

function ListComments() {
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState("");
  const [exerciseNames, setExerciseNames] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const { token } = useToken();
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [exerciseId, setExerciseId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const exerciseIdAsNumber = parseInt(exerciseId, 10);
  const [isCommentUpdateOpen, setIsCommentUpdateOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const location = useLocation();

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

  const toggleCommentForm = () => {
    setIsCommentFormOpen(!isCommentFormOpen);
  };

  const userComments = comments.filter((comment) => comment.user_id === userId);

  const toggleCommentUpdate = (commentId, exerciseId) => {
    setIsCommentUpdateOpen(!isCommentUpdateOpen);
    setCommentId(commentId);
    setExerciseId(exerciseId);
  };

  return (
    <div
      className={`container mt-3 mb-0 ${
        location.pathname === "/comments" ? "content-container" : ""
      }`}
    >
      <div className="shadow p-5 mt-3 mb-3">
        <div className="col-11 mt-3 mx-auto">
          {exerciseId !== null && commentId !== null && (
            <div className="comment-form-overlay">
              <div className="m-3 comment-form-popup">
                <UpdateComment
                  onClose={() => {
                    setExerciseId(null);
                    setCommentId(null);
                  }}
                  exerciseId={exerciseId}
                  commentId={commentId}
                />
              </div>
            </div>
          )}
          {isCommentFormOpen && (
            <div className="comment-form-overlay">
              <div className="m-3 comment-form-popup">
                <CommentForm onClose={toggleCommentForm} />
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mt-0">All Comments</h1>
            <button className="btn btn-success m-0" onClick={toggleCommentForm}>
              Add Comment
            </button>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped mt-3 mb-0">
                <thead>
                  <tr>
                    <th scope="col">Exercise</th>
                    <th scope="col" className="col-6">
                      Comment
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userComments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="center">
                        {exerciseNames[comment.exercise_id] || "Unknown"}
                      </td>
                      <td className="center">{comment.comment}</td>
                      <td className="center">{comment.assigned_date}</td>
                      <td className="center">
                        <button
                          onClick={() =>
                            toggleCommentUpdate(comment.id, comment.exercise_id)
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
          {deleteSuccess && (
            <div className="alert alert-danger mb-0 mt-3" role="alert">
              Comment deleted successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListComments;
