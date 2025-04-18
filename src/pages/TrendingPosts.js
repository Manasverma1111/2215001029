import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  Avatar, CardMedia, Grid, CircularProgress, 
  Paper, CardHeader, Chip 
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import apiService from '../services/apiService';
import { generateAvatarUrl, generateRandomImageUrl } from '../utils/imageUtils';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [maxCommentCount, setMaxCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTrendingPosts();
        setPosts(response.posts || []);
        setMaxCommentCount(response.maxCommentCount || 0);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrendingPosts();
    
    // Refresh data every minute
    const interval = setInterval(fetchTrendingPosts, 60000);
    return () => clearInterval(interval);
  }, []);

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
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1">
          Trending Posts
        </Typography>
        <Chip 
          icon={<CommentIcon />} 
          label={`${maxCommentCount} Comments`} 
          color="primary" 
          variant="outlined" 
        />
      </Box>
      
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={
                  <Avatar src={generateAvatarUrl(post.userid)} />
                }
                title={post.username || `User ${post.userid}`}
                subheader={`Post ID: ${post.id}`}
              />
              <CardMedia
                component="img"
                height="200"
                image={generateRandomImageUrl(post.id)}
                alt={post.content}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body1" gutterBottom>
                  {post.content}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Chip 
                    icon={<CommentIcon />} 
                    label={`${post.commentCount || maxCommentCount} Comments`} 
                    color="primary" 
                    size="small"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {posts.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No trending posts available yet.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TrendingPosts;