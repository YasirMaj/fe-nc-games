import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/dist";
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
              <li className="review-card" key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <h3>{review.title}</h3>
                </Link>
                <p>Designer: {review.designer}</p>
                <img
                  src={review.review_img_url}
                  alt={review.title}
                  width="200"
                  height="200"
                />
                <br />
                <p>Author: {review.owner}</p>
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
