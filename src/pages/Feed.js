import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  Avatar, CardMedia, Grid, CircularProgress, 
  Paper, CardHeader, Button 
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import apiService from '../services/apiService';
import { generateAvatarUrl, generateRandomImageUrl } from '../utils/imageUtils';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLatestPosts = async () => {
    try {
      setRefreshing(true);
      const response = await apiService.getLatestPosts();
      setPosts(response.posts || []);
      setRefreshing(false);
      setLoading(false);
    } catch (err) {
      setError('Failed to load latest posts. Please try again later.');
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestPosts();
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchLatestPosts, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchLatestPosts();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, bgcolor: '#ffebee' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1">
          Latest Posts
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<RefreshIcon />} 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Card sx={{ mb: 2 }}>
              <CardHeader
                avatar={
                  <Avatar src={generateAvatarUrl(post.userid)} />
                }
                title={post.username || `User ${post.userid}`}
                subheader={new Date(post.timestamp).toLocaleString()}
              />
              <CardMedia
                component="img"
                height="300"
                image={generateRandomImageUrl(post.id)}
                alt={post.content}
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {post.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {posts.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No posts available yet.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Feed;