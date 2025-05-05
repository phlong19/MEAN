import express from 'express';
import { Post } from '../app/post.model';

const app = express();

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
