import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../utils/api";
import CommentVotes from "./CommentVotes";
import PostComment from "./PostComment";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { review_id } = useParams();
  const [newCommentCount, setNewCommentCount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getComments(review_id).then((commentsFromApi) => {
        setComments(commentsFromApi);
        setIsLoading(false);
      });
    }, 0);
  }, [review_id, newCommentCount]);

  return (
    <main>
      <h3>Comments</h3>
      {isLoading ? (
        <h3 id="loading">Loading...</h3>
      ) : (
        <div>
          <section>
            <ul>
              {comments.map((comment) => {
                return (
                  <li className="comment-card" key={comment.comment_id}>
                    <h4>Author: {comment.author}</h4>
                    <p>{comment.body}</p>
                    <p>
                      Date Created:
                      {moment(comment.created_at).utc().format("YYYY-MM-DD")}
                    </p>
                    <CommentVotes comment={comment} />
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="post-comment">
            <PostComment setNewComment={setNewCommentCount} />
          </section>
        </div>
      )}
    </main>
  );
}
