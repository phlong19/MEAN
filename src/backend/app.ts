import express from 'express';
import bodyParser from 'body-parser';
import Post from './models/post';
import mongoose from 'mongoose';

process.loadEnvFile();
const app = express();

mongoose
  .connect(process.env?.['URI'] ?? '')
  .then(() => console.log('Connected to DB'))
  .catch((e) => console.error(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/create-post', async (req, res, next) => {
  // validate req.body
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  const createdPost = await post.save();

  res.status(201).json({
    message: 'Post created successfully',
    post: createdPost,
  });
});

app.get('/posts', async (req, res, next) => {
  // const post:typeof Post[] = new Post()
  const posts = await Post.find();

  res.status(200).json({
    code: 200,
    message: 'Fetched posts successfully!',
    posts,
  });

  next();
});

app.get('/post/:id', async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (post) {
    res.status(200).json({
      post,
      message: 'Fetch post by Id successfully',
    });
  } else {
    res.status(400).json({
      message: 'Post not found',
    });
  }
});

app.patch('/post/:id', async (req, res, next) => {
  const { id } = req.params;

  const updatedPost = new Post({ ...req.body, _id: id });

  const post = await Post.updateOne({ _id: id }, updatedPost, {
    returnDocument: 'after',
  });

  res.status(201).json({
    code: 201,
    message: 'Updated post successfully!',
    post,
  });
});

app.delete('/post/:id', async (req, res, next) => {
  // check if post exist, get name pop in the message if yes, throw an error if can't find any
  const post = await Post.findById(req.params.id);

  if (post) {
    await Post.deleteOne({ _id: post.id }).then(() =>
      res.status(200).json({
        message: `Deleted post ${post.title} successfully`,
        id: post._id,
      })
    );
  }
});

export default app;
