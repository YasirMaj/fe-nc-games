import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { getReviewsById } from "../utils/api";
import Comments from "./Comments";
import ReviewVotes from "./ReviewVotes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Error from "./Error";

export default function Review() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getReviewsById(review_id)
        .then((reviewFromApi) => {
          setReview(reviewFromApi);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(true);
          setErrorMsg(error.response.status);
        });
    }, 0);
  }, [review_id]);

  if (error) {
    return <Error errorMsg={errorMsg} t="rev" />;
  } else {
    return (
      <main>
        <h3>Review</h3>
        {isLoading ? (
          <h3 id="loading">
            Loading <FontAwesomeIcon icon={solid("spinner")} spin />
          </h3>
        ) : (
          <div>
            <section className="review">
              <h4>{review.title}</h4>
              <p>Designer: {review.designer}</p>
              <p>Category: {review.category}</p>
              <img src={review.review_img_url} alt={review.title} />
              <br />
              <p>Author: {review.owner}</p>
              <p>{review.review_body}</p>
              <p>
                Date Created:
                {moment(review.created_at).utc().format("YYYY-MM-DD")}
              </p>
              <ReviewVotes review={review} />
              <span>Comments: {review.comment_count}</span>
            </section>
            <section className="comments-list">
              <Comments />
            </section>
          </div>
        )}
      </main>
    );
  }
}
