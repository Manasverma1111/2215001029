const { fetchUsers, fetchUserPosts, fetchPostComments } = require("../services/apiService");

const getPosts = async (req, res) => {
  const { type } = req.query;

  try {
    const users = await fetchUsers();
    let allPosts = [];

    for (const userId in users) {
      const posts = await fetchUserPosts(userId);
      allPosts = allPosts.concat(posts);
    }

    if (type === "latest") {
      allPosts.sort((a, b) => b.id - a.id);
      return res.json(allPosts.slice(0, 5));
    }

    if (type === "popular") {
      let postCommentCounts = [];

      for (const post of allPosts) {
        const comments = await fetchPostComments(post.id);
        postCommentCounts.push({ post, count: comments.length });
      }

      const maxCount = Math.max(...postCommentCounts.map(p => p.count));
      const popularPosts = postCommentCounts.filter(p => p.count === maxCount).map(p => p.post);

      return res.json(popularPosts);
    }

    return res.status(400).json({ error: "Invalid query parameter" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getPosts };
