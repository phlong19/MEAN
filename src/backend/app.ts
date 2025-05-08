import express from 'express';
import { Post } from '../app/post.model';
import bodyParser from 'body-parser';

const app = express();

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

  res.status(201).json({
    message: 'Post created successfully',
  });
});

app.get('/posts', (req, res, next) => {
  const posts: Post[] = [
    {
      content: 'instagram chat call in 56 minutes.',
      title: 'some random measurement.',
    },
    { content: 'Other content for testing display.', title: 'Random title!' },
  ];

  res.status(200).json({
    code: 200,
    message: 'Fetched posts successfully!',
    posts,
  });

  next();
});
export default app;
