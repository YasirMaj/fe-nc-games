import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../utils/api";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getComments(review_id).then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [review_id]);

  return (
    <main>
      <h2>Comments</h2>
      {isLoading ? (
        <h3 id="loading">Loading...</h3>
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <li className="comment-card" key={comment.comment_id}>
                <h3>Author: {comment.author}</h3>
                <p>{comment.body}</p>
                <p>Date Created: {comment.created_at}</p>
                <span>Votes: {comment.votes}</span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
