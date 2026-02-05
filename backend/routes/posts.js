const router = require('express').Router();
const Post = require('../models/Post');

// 1. Create Post
router.post('/create', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Get Feed with Pagination (Your Logic)
router.get('/feed', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5; 
  const skip = (page - 1) * limit;
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Post.countDocuments();
    res.status(200).json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. Like / Unlike Post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // If user hasn't liked yet, add username. If they have, remove it (Unlike).
    if (!post.likes.includes(req.body.username)) {
      await post.updateOne({ $push: { likes: req.body.username } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.username } });
      res.status(200).json("The post has been unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. Comment on Post
router.post('/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      username: req.body.username,
      text: req.body.text
    };
    await post.updateOne({ $push: { comments: newComment } });
    res.status(200).json("Comment added");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;