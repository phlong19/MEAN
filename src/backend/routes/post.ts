import { existsSync, unlinkSync } from 'fs';
import express from 'express';
import Post from '../models/post';
import multer from 'multer';
import { ImageStaticPath, MimeTypeMaps } from '../constant/constant';
import mongoose from 'mongoose';
import checkAuth from '../middlewares/checkAuth';
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

router.post(
  '',
  checkAuth,
  multer({ storage }).single('image'),
  async (req, res, next) => {
    if (req.body && req.file) {
      const url = req.protocol + '://' + req.get('host');

      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        image: url + '/images/' + req.file.filename,
      });

      const count = await Post.countDocuments();
      const createdPost = await post.save();

      res.status(201).json({
        message: 'Post created successfully',
        post: createdPost,
        count,
      });
    } else {
      res.status(400).json({
        message: 'Invalid request',
      });
    }
  }
);

router.get('', checkAuth, async (req, res, next) => {
  const { itemPerPage, page } = req.query;
  const pageSize = Number(itemPerPage);
  const currentPage = Number(page);

  const postsQuery = Post.find();

  if (currentPage && pageSize) {
    postsQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  const count = await Post.countDocuments();
  const posts = await postsQuery;

  res.status(200).json({
    code: 200,
    message: 'Fetched posts successfully!',
    posts,
    count,
  });

  next();
});

router.get('/:id', checkAuth, async (req, res, next) => {
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

router.patch(
  '/:id',
  checkAuth,
  multer({ storage }).single('image'),
  async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const newFile =
        req.protocol +
        '://' +
        req.get('host') +
        '/images/' +
        req.file?.filename;

      const post = await Post.findById(id).session(session);

      if (!post) {
        throw new Error('No post found!');
      }

      // delete old file if new file & old file exist
      const oldPath = `${ImageStaticPath}/${
        post.image?.split('/images/')?.[1]
      }`;
      if (newFile && existsSync(oldPath)) {
        unlinkSync(oldPath);
      }

      // update here
      post.title = title;
      post.content = content;
      post.image = newFile;

      await post.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        code: 201,
        message: 'Updated post successfully!',
        post,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(500).json({
        message: 'Error while updating post',
      });
    }
  }
);

router.delete('/:id', checkAuth, async (req, res, next) => {
  // check if post exist, get name pop in the message if yes, throw an error if can't find any
  const post = await Post.findById(req.params?.['id']);

  if (post) {
    const oldPath = `${ImageStaticPath}/${post.image?.split('/images/')?.[1]}`;

    if (post.image && existsSync(oldPath)) {
      unlinkSync(oldPath);
    }

    await Post.deleteOne({ _id: post.id }).then(() =>
      res.status(200).json({
        message: `Deleted post ${post.title} successfully`,
        id: post._id,
      })
    );
  }
});

export default router;
