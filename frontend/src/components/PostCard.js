import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from '@mui/material';
import { Favorite, ChatBubbleOutline } from '@mui/icons-material';

const PostCard = ({ post, onLike }) => {
  return (
    <Card sx={{ maxWidth: 500, mb: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar>{post.username[0]}</Avatar>}
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />

      {post.image && (
        <CardMedia component="img" height="300" image={post.image} alt="post" />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton onClick={() => onLike && onLike(post._id)}>
          <Favorite color={post.likes.length > 0 ? "error" : "inherit"} />
        </IconButton>
        <Typography variant="body2">{post.likes.length}</Typography>

        <IconButton>
          <ChatBubbleOutline />
        </IconButton>
        <Typography variant="body2">{post.comments.length}</Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard;
