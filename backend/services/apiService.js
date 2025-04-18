const axios = require("axios");

const BASE_URL = "http://20.244.56.144/evaluation-service";

const fetchUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data.users;
};

const fetchUserPosts = async (userId) => {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`);
  return res.data.posts;
};

const fetchPostComments = async (postId) => {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return res.data.comments;
};

module.exports = {
  fetchUsers,
  fetchUserPosts,
  fetchPostComments
};
