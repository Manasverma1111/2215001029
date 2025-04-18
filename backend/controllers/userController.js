const { fetchUsers, fetchUserPosts, fetchPostComments } = require("../services/apiService");

const getTopUsers = async (req, res) => {
  try {
    const users = await fetchUsers();
    const userCommentCounts = [];

    for (const userId in users) {
      const posts = await fetchUserPosts(userId);
      let totalComments = 0;

      for (const post of posts) {
        const comments = await fetchPostComments(post.id);
        totalComments += comments.length;
      }

      userCommentCounts.push({
        userId,
        name: users[userId],
        totalComments
      });
    }

    userCommentCounts.sort((a, b) => b.totalComments - a.totalComments);
    const top5Users = userCommentCounts.slice(0, 5);

    res.json(top5Users);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTopUsers };
