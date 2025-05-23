import express from 'express';
import Post from '../models/post';
import multer from 'multer';
import { MimeTypeMaps } from '../constant/constant';
const router = express.Router();

const storage = multer.diskStorage({
  destination(_, file, callback) {
    const isValid = MimeTypeMaps.includes(file.mimetype.split('/')?.[1]);
    let error: Error | null = new Error('Invalid MIME type');

    if (isValid) {
      error = null;
    }
    callback(error, 'src/backend/images/');
  },
  filename(_, file, callback) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = file.mimetype.split('/')?.[1];
    callback(null, `${name}-${Date.now()}.${ext}`);
  },
});

router.post('', multer({ storage }).single('image'), async (req, res, next) => {
  console.log(req, res);
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

router.get('', async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    code: 200,
    message: 'Fetched posts successfully!',
    posts,
  });

  next();
});

router.get('/:id', async (req, res, next) => {
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

router.patch('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
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

export default router;
