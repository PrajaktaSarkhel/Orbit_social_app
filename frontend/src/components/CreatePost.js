import React, { useState } from 'react'; // Added React import
import { Box, TextField, Button, Paper } from '@mui/material';
import API from '../api'; // Updated import

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handlePost = async () => {
    if (!text && !image) return;

    const newPost = {
      username: user.username,
      userId: user.userId,
      text,
      image,
    };

    try {
      const res = await API.post('/posts/create', newPost);
      onPostCreated(res.data);
      setText('');
      setImage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 3 }}>
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextField
        fullWidth
        size="small"
        placeholder="Image URL (optional)"
        sx={{ mt: 1 }}
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Box sx={{ textAlign: 'right', mt: 1 }}>
        <Button variant="contained" onClick={handlePost}>
          Post
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePost;