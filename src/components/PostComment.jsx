import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { postComment } from "../utils/api";
import { UserContext } from "../contexts/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function PostComment({ setNewCommentCount }) {
  const [newBody, setNewBody] = useState("");
  const { user } = useContext(UserContext);
  const { review_id } = useParams();
  const [error, setError] = useState("");
  const [err, setErr] = useState(null);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (user.username === "Guest") {
      setError("Please Log In To Comment");
    } else {
      setErr(null);
      postComment(review_id, user.username, newBody)
        .then(() => {
          setNewCommentCount((curr) => {
            return curr + 1;
          });
        })
        .catch((error) => {
          setErr(error);
        });
      setNewBody("");
    }
  };

  return (
    <div>
      <h3>Post Comment</h3>
      <form className="post-comment-form" onSubmit={handlePostComment}>
        <label htmlFor="new-comment">Comment:</label>
        <textarea
          type="text"
          id="newComment"
          required
          value={newBody}
          placeholder="e.g New Comment..."
          onChange={(e) => {
            setNewBody(e.target.value);
          }}
        ></textarea>
        <br />
        <button aria-label="Post">
          <FontAwesomeIcon icon={solid("circle-plus")} beat />
        </button>
        <span>{error}</span>
        <section>
          {err ? <span>Sorry - your comment was not posted</span> : null}
        </section>
      </form>
    </div>
  );
}
