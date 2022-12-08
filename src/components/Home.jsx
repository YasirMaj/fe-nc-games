import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/dist";
import { getReviews } from "../utils/api";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getReviews(slug).then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [slug]);

  return (
    <main>
      <h3>Reviews List</h3>
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
                  <h4>{review.title}</h4>
                </Link>
                <p>Designer: {review.designer}</p>
                <Link to={`/categories/${review.category}`}>
                  <p>Category: {review.category}</p>
                </Link>
                <img src={review.review_img_url} alt={review.title} />
                <br />
                <p>Author: {review.owner}</p>
                <span>Comments: {review.comment_count}</span>
                <br />
                <span>Votes: {review.votes}</span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
