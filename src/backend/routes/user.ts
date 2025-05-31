import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

const router = express.Router();

router.post('signup', async (req, res, next) => {
  const { username, email, password: rawPassword } = req.body;

  const password = await bcrypt.hash(rawPassword, 10);

  const user = new User({
    username,
    email,
    password,
  });

  user
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Your account has been created successfully!',
      });
    })
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    );
});

router.post('login', (req, res, next) => {
  console.log(req);
});

export default router;
