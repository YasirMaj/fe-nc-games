import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://games.cyclic.app/api",
});

export const getReviews = (slug, sort, order, page) => {
  return gamesApi
    .get("/reviews", {
      params: { category: slug, sort_by: sort, order: order, p: page },
    })
    .then((res) => {
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

export const getCatagories = () => {
  return gamesApi.get("/categories").then((res) => {
    return res.data.categories;
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
  return gamesApi.patch(`/reviews/${review_id}`, patchBody).then((res) => {
    return res.data.review;
  });
};

export const postComment = (review_id, username, body) => {
  const postBody = {
    username: username,
    body: body,
  };
  return gamesApi
    .post(`/reviews/${review_id}/comments`, postBody)
    .then((res) => {
      return res.data.comment;
    });
};

export const patchComment = (comment_id, inc_votes) => {
  const patchBody = { inc_votes: inc_votes };
  return gamesApi.patch(`/comments/${comment_id}`, patchBody).then((res) => {
    return res.data.comment;
  });
};

export const deleteComment = (comment_id) => {
  return gamesApi.delete(`/comments/${comment_id}`).then(() => {});
};

export const postReview = (owner, title, review_body, designer, category) => {
  const postBody = {
    owner: owner,
    title: title,
    review_body: review_body,
    designer: designer,
    category: category,
  };
  return gamesApi.post("/reviews", postBody).then((res) => {
    return res.data.review;
  });
};

export const postCategory = (slug, description) => {
  const postBody = {
    slug: slug,
    description: description,
  };
  return gamesApi.post(`/categories`, postBody).then((res) => {
    return res.data.category;
  });
};

export const deleteReview = (review_id) => {
  return gamesApi.delete(`/reviews/${review_id}`).then(() => {});
};
