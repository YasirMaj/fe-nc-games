import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/dist";
import { getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("reviews.created_at");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getReviews(slug, sort, order).then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [slug, sort, order]);

  return (
    <main>
      <h3>Reviews List</h3>
      <section>
        <h4>Sort By:</h4>
        <button
          onClick={() => {
            setSort("reviews.created_at");
            setSearchParams({ sort_by: "date" });
          }}
          disabled={sort === "reviews.created_at"}
        >
          Date
        </button>
        <button
          onClick={() => {
            setSort("comment_count");
            setSearchParams({ sort_by: "comment-count" });
          }}
          disabled={sort === "comment_count"}
        >
          comment count
        </button>
        <button
          onClick={() => {
            setSort("reviews.votes");
            setSearchParams({ sort_by: "votes" });
          }}
          disabled={sort === "reviews.votes"}
        >
          votes
        </button>
        <select
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option disabled={order === "desc"}>desc</option>
          <option disabled={order === "asc"}>asc</option>
        </select>
      </section>
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
