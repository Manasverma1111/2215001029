import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<DynamicFeedIcon />}
            sx={{ 
              mx: 1, 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}
          >
            Feed
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/top-users"
            startIcon={<PersonIcon />}
            sx={{ 
              mx: 1, 
              backgroundColor: location.pathname === '/top-users' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}
          >
            Top Users
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/trending-posts"
            startIcon={<TrendingUpIcon />}
            sx={{ 
              mx: 1, 
              backgroundColor: location.pathname === '/trending-posts' ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}
          >
            Trending Posts
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;