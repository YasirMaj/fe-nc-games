import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { patchReview } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function ReviewVotes({ review }) {
  const [votes, setVotes] = useState(0);
  const [upVote, setUpVote] = useState(false);
  const [resetUpVote, setResetUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [resetDownVote, setResetDownVote] = useState(false);
  const [err, setErr] = useState(null);
  const [error, setError] = useState("");
  const { review_id } = useParams();
  const { user } = useContext(UserContext);

  const increaseUpVote = () => {
    if (user.username === "Guest") {
      setError("Please Log In To Vote");
    } else {
      setErr(null);
      setVotes((currVotes) => {
        return currVotes + 1;
      });
      patchReview(review_id, 1).catch((error) => {
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
      patchReview(review_id, -1).catch((error) => {
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
      patchReview(review_id, -1).catch((error) => {
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
      patchReview(review_id, 1).catch((error) => {
        setErr(error);
      });
      setDownVote(false);
      setResetDownVote(null);
    }
  };

  return (
    <div className="review-votes">
      <button
        aria-label="Increment"
        disabled={resetDownVote}
        onClick={upVote ? decreaseUpVote : increaseUpVote}
      >
        <FontAwesomeIcon icon={regular("thumbs-up")} flip />
      </button>

      {err ? (
        <span>Sorry - your vote was not counted</span>
      ) : (
        <p>Votes: {review.votes + votes}</p>
      )}

      <button
        aria-label="Decrement"
        disabled={resetUpVote}
        onClick={downVote ? decreaseDownVote : increaseDownVote}
      >
        <FontAwesomeIcon icon={regular("thumbs-down")} flip />
      </button>
      <span>{error}</span>
    </div>
  );
}
