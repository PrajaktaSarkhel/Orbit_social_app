import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import API from '../api'; // Updated import
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', formData);
      alert("Signup successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5">Sign Up</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;