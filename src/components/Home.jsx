import React, { useEffect, useState } from "react";
import { getReviews } from "../utils/api";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getReviews().then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, []);

  return (
    <main>
      <h2>Reviews List</h2>
      <select>
        <option
          onChange={() => {
            console.log("here");
          }}
        >
          ascending
        </option>
        <option
          onChange={() => {
            console.log("here");
          }}
        >
          descending
        </option>
      </select>
      {isLoading ? (
        <h3 id="loading">Loading...</h3>
      ) : (
        <ul className="reviews-list">
          {reviews.map((review) => {
            return (
              <li className="review-card" key={review.created_at}>
                <h3>{review.title}</h3>
                <p>{review.designer}</p>
                <img
                  src={review.review_img_url}
                  alt={review.title}
                  width="100"
                  height="100"
                />
                <br />
                <p>{review.owner}</p>
                <span>Votes: {review.votes}</span>
                <span>Comments: {review.comment_count}</span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
