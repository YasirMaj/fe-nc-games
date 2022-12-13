import React, { useContext, useState } from "react";
import { postCategory, postReview } from "../utils/api";
import { UserContext } from "../contexts/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function PostReview({ setNewReviewCount, categories }) {
  const [newBody, setNewBody] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDesigner, setNewDesigner] = useState("");
  const [category, setCategory] = useState("strategy");
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [err, setErr] = useState(null);

  const handlePostReview = (e) => {
    e.preventDefault();
    if (user.username === "Guest") {
      setError("Please Log In To Review");
    } else if (category === "New Category") {
      setErr(null);
      postCategory(newCategory, newDescription).then(() => {
        postReview(user.username, newTitle, newBody, newDesigner, newCategory)
          .then(() => {
            setNewReviewCount((curr) => {
              return curr + 1;
            });
          })
          .catch((error) => {
            setErr(error);
          });
        setNewBody("");
        setNewTitle("");
        setNewDesigner("");
      });
    } else {
      setErr(null);
      postReview(user.username, newTitle, newBody, newDesigner, category)
        .then(() => {
          setNewReviewCount((curr) => {
            return curr + 1;
          });
        })
        .catch((error) => {
          setErr(error);
        });
      setNewBody("");
      setNewTitle("");
      setNewDesigner("");
    }
  };

  return (
    <div>
      <h3>Post Review</h3>
      <form className="post-review-form" onSubmit={handlePostReview}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          required
          value={newTitle}
          placeholder="e.g Risk"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        />
        <label htmlFor="designer">Designer:</label>
        <input
          type="text"
          id="designer"
          required
          value={newDesigner}
          placeholder="e.g Albert Lamorisse"
          onChange={(e) => {
            setNewDesigner(e.target.value);
          }}
        />
        <br />
        <select
          id="pick-category"
          required
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {categories.map((category) => {
            return <option key={category.slug}>{category.slug}</option>;
          })}
          <option>New Category</option>
        </select>
        <br />
        {category === "New Category" ? (
          <section className="new-category">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              required
              value={newCategory}
              placeholder="e.g Strategy"
              onChange={(e) => {
                setNewCategory(e.target.value.toLowerCase());
              }}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              id="description"
              required
              value={newDescription}
              placeholder="e.g Category Description..."
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            ></textarea>
          </section>
        ) : null}
        <label htmlFor="new-review">Review:</label>
        <textarea
          type="text"
          id="newReview"
          required
          value={newBody}
          placeholder="e.g New Review..."
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
          {err ? <span>Sorry - your review was not posted</span> : null}
        </section>
      </form>
    </div>
  );
}
