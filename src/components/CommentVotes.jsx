import React, { useState } from "react";
import { patchComment } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/users";

export default function CommentVotes({ comment }) {
  const [votes, setVotes] = useState(0);
  const [upVote, setUpVote] = useState(false);
  const [resetUpVote, setResetUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [resetDownVote, setResetDownVote] = useState(false);
  const [err, setErr] = useState(null);
  const [error, setError] = useState("");

  const { user } = useContext(UserContext);

  const increaseUpVote = () => {
    if (user.username === "Guest") {
      setError("Please Log In To Vote");
    } else {
      setErr(null);
      setVotes((currVotes) => {
        return currVotes + 1;
      });
      patchComment(comment.comment_id, 1).catch((error) => {
        setErr(error);
      });
      setUpVote(true);
      setResetUpVote(true);
    }
  };

  const decreaseUpVote = () => {
    if (user.username === "Guest") {
      setError("Please Log In To Vote");
    } else {
      setErr(null);
      setVotes((currVotes) => {
        return currVotes - 1;
      });
      patchComment(comment.comment_id, -1).catch((error) => {
        setErr(error);
      });
      setUpVote(false);
      setResetUpVote(null);
    }
  };

  const increaseDownVote = () => {
    if (user.username === "Guest") {
      setError("Please Log In To Vote");
    } else {
      setErr(null);
      setVotes((currVotes) => {
        return currVotes - 1;
      });
      patchComment(comment.comment_id, -1).catch((error) => {
        setErr(error);
      });
      setDownVote(true);
      setResetDownVote(true);
    }
  };

  const decreaseDownVote = () => {
    if (user.username === "Guest") {
      setError("Please Log In To Vote");
    } else {
      setErr(null);
      setVotes((currVotes) => {
        return currVotes + 1;
      });
      patchComment(comment.comment_id, 1).catch((error) => {
        setErr(error);
      });
      setDownVote(false);
      setResetDownVote(null);
    }
  };

  return (
    <div className="comment-votes">
      <section>
        <button
          disabled={resetDownVote}
          onClick={upVote ? decreaseUpVote : increaseUpVote}
        >
          <span aria-label="inc vote for this comment">👍</span>
        </button>
        <button
          disabled={resetUpVote}
          onClick={downVote ? decreaseDownVote : increaseDownVote}
        >
          <span aria-label="dec vote for this comment">👎</span>
        </button>
        <span>{error}</span>
      </section>
      <section>
        {err ? (
          <span>Sorry - your vote was not counted</span>
        ) : (
          <p>Votes: {comment.votes + votes}</p>
        )}
      </section>
    </div>
  );
}
