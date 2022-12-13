import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteComment, getComments } from "../utils/api";
import CommentVotes from "./CommentVotes";
import PostComment from "./PostComment";
import { UserContext } from "../contexts/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();
  const [newCommentCount, setNewCommentCount] = useState(0);
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");

  const handleDelete = (commentToDelete) => {
    const originalComments = comments;
    setComments((currComments) => {
      return currComments.filter((comment) => {
        return comment.comment_id !== commentToDelete.comment_id;
      });
    });
    deleteComment(commentToDelete.comment_id).catch(() => {
      setError("Something went wrong, please try again.");
      setComments(originalComments);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getComments(review_id).then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [review_id, newCommentCount]);

  return (
    <main>
      {isLoading ? (
        <h3 id="loading">
          Loading <FontAwesomeIcon icon={solid("spinner")} spin />
        </h3>
      ) : (
        <div>
          <section className="post-comment">
            <PostComment setNewCommentCount={setNewCommentCount} />
          </section>
          <section>
            <h3>Comments</h3>
            <ul>
              {comments.map((comment) => {
                return (
                  <li className="comment-card" key={comment.comment_id}>
                    <h4>Author: {comment.author}</h4>
                    <p>{comment.body}</p>
                    <p>
                      Date Created:
                      {moment(comment.created_at)
                        .utc()
                        .format("YYYY-MM-DD, h:mm:ss a")}
                    </p>
                    <CommentVotes comment={comment} />
                    <span>{error}</span>
                    <button
                      aria-label="delete"
                      id="delete"
                      onClick={() => {
                        handleDelete(comment);
                      }}
                      disabled={user.username !== comment.author}
                    >
                      <FontAwesomeIcon icon={solid("trash")} shake />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      )}
    </main>
  );
}
