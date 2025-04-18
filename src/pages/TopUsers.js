import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Box, Card, CardContent, 
  Avatar, Grid, Divider, CircularProgress, Paper 
} from '@mui/material';
import apiService from '../services/apiService';
import { generateAvatarUrl, getRandomColor } from '../utils/imageUtils';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.getTopUsers();
        setUsers(response.topUsers || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load top users. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopUsers();
    
    // Refresh data every minute
    const interval = setInterval(fetchTopUsers, 60000);
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
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Top Users with Most Commented Posts
      </Typography>
      
      <Grid container spacing={3}>
        {users.map((user, index) => (
          <Grid item xs={12} key={user.id}>
            <Card sx={{ 
              display: 'flex',
              mb: 2,
              borderLeft: '5px solid',
              borderLeftColor: getRandomColor()
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Typography variant="h4" sx={{ width: 40, textAlign: 'center', fontWeight: 'bold' }}>
                  #{index + 1}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Avatar 
                  src={generateAvatarUrl(user.id)}
                  sx={{ width: 80, height: 80, m: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Total Comments: <strong>{user.totalComments}</strong>
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
        
        {users.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No users data available yet.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TopUsers;