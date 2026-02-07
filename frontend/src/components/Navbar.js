import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#1976d2', boxShadow: 1 }}>
      <Container maxWidth="sm">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0 }}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', fontWeight: 'bold', color: 'inherit' }}>
            Orbit
          </Typography>
          <div>
            {user ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/signup" color="inherit">Signup</Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; // <-- Ensure this is here!