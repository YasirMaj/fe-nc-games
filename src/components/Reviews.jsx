import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom/dist";
import { deleteReview, getCatagories, getReviews } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import Error from "./Error";
import PostReview from "./PostReview";
import { UserContext } from "../contexts/users";

export default function Reviews({ categories, setCategories }) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { slug } = useParams();
  const [order, setOrder] = useState("desc");
  const [sort, setSort] = useState("reviews.created_at");
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [err, setErr] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [newReviewCount, setNewReviewCount] = useState(0);
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(1);

  const handleDelete = (reviewToDelete) => {
    const originalReview = reviews;
    setReviews((currReviews) => {
      return currReviews.filter((review) => {
        return review.review_id !== reviewToDelete.review_id;
      });
    });
    deleteReview(reviewToDelete.review_id).catch(() => {
      setErr("Something went wrong, please try again.");
      setReviews(originalReview);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      Promise.all([getReviews(slug, sort, order, page), getCatagories()])
        .then(([reviewsFromApi, categoriesFromApi]) => {
          setReviews(reviewsFromApi);
          setCategories(categoriesFromApi);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(true);
          setErrorMsg(error.response.status);
        });
    }, 0);
  }, [setCategories, slug, sort, order, searchParams, newReviewCount, page]);

  if (error) {
    return <Error errorMsg={errorMsg} t="cat" />;
  } else {
    return (
      <main>
        <section className="sort-by">
          <h3>Sort By:</h3>
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
            <option>desc</option>
            <option>asc</option>
          </select>
        </section>

        {isLoading ? (
          <h3 id="loading">
            Loading <FontAwesomeIcon icon={solid("spinner")} spin />
          </h3>
        ) : (
          <div>
            <section>
              <PostReview
                setNewReviewCount={setNewReviewCount}
                categories={categories}
              />
            </section>
            <h3>Reviews List</h3>
            <section>
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
                      <p>Author: {review.owner}</p>
                      <span>Comments: {review.comment_count}</span>
                      <span>Votes: {review.votes}</span>
                      <span>{err}</span>
                      <button
                        aria-label="delete"
                        id="delete"
                        onClick={() => {
                          handleDelete(review);
                        }}
                        disabled={user.username !== review.owner}
                      >
                        <FontAwesomeIcon icon={solid("trash")} shake />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="pagination">
              <button
                onClick={() => {
                  setPage((currentPage) => currentPage - 1);
                }}
                disabled={page === 1}
                aria-label="previous-page"
              >
                <FontAwesomeIcon icon={solid("backward")} fade />
              </button>
              <button
                onClick={() => {
                  setPage((currentPage) => currentPage + 1);
                }}
                disabled={reviews.length + 1 < 10}
                aria-label="next-page"
              >
                <FontAwesomeIcon icon={solid("forward")} fade />
              </button>
            </section>
          </div>
        )}
      </main>
    );
  }
}
