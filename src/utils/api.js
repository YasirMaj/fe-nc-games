import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://games.cyclic.app/api",
});

export const getReviews = () => {
  return gamesApi.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};
