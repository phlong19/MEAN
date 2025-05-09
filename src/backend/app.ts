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
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.post('/create-post', (req, res, next) => {
  // validate req.body
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  res.status(201).json({
    message: 'Post created successfully',
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
export default app;
