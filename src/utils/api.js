import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://games.cyclic.app/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getReviewsById = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review;
  });
};

export const getComments = (review_id) => {
  return gamesApi.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const getUsers = () => {
  return gamesApi.get(`/users`).then((res) => {
    return res.data.users;
  });
};

export const postUser = (username, name, avatar_url) => {
  const postBody = {
    username: username,
    name: name,
    avatar_url: avatar_url,
  };
  return gamesApi.post(`/users`, postBody).then((res) => {
    return res.data.user;
  });
};

export const patchReview = (review_id, inc_votes) => {
  const patchBody = { inc_votes: inc_votes };
  return gamesApi.patch(`/comments/${review_id}`, patchBody).then((res) => {
    return res.data.review;
  });
};
