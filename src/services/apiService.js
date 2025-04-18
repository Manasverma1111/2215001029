import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const apiService = {
  getTopUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching top users:', error);
      throw error;
    }
  },

  getTrendingPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts?type=popular`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trending posts:', error);
      throw error;
    }
  },

  getLatestPosts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts?type=latest`);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      throw error;
    }
  }
};

export default apiService;