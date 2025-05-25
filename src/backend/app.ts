import express from 'express';
import bodyParser from 'body-parser';
import postRoute from './routes/post';
import path from 'path';
import { ImageStaticPath } from './constant/constant';

process.loadEnvFile();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(ImageStaticPath)));

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

app.use('/api/post', postRoute);

export default app;
