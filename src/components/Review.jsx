import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { getReviewsById } from "../utils/api";

export default function Review() {
  const [review, setReview] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getReviewsById(review_id).then((reviewFromApi) => {
        setReview(reviewFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [review_id]);

  return (
    <main>
      <h2>Review</h2>
      {isLoading ? (
        <h3 id="loading">Loading...</h3>
      ) : (
        <section className="review">
          <h3>{review.title}</h3>
          <p>Designer: {review.designer}</p>
          <p>Category: {review.category}</p>
          <img
            src={review.review_img_url}
            alt={review.title}
            width="200"
            height="200"
          />
          <br />
          <p>Author: {review.owner}</p>
          <p>{review.review_body}</p>
          <p>Date Created: {review.created_at}</p>
          <span>Votes: {review.votes}</span>
          <span>Comments: {review.comment_count}</span>
        </section>
      )}
    </main>
  );
}
