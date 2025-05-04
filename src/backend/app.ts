import express from 'express';

const app = express();

app.use((req, res, next) => {
  res.end('say hi');
  next();
});

export default app;
