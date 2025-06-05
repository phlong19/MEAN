import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res
      .status(401)
      .json({ message: 'Wrong email or password. Please try again!' });
    next();
  } else {
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      user.password!
    );

    if (isSamePassword) {
      const token = jwt.sign(
        { email: user.email, userId: user._id },
        process.env?.['JWT_SECRET'] ?? '',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token });
      next();
    }
  }

  res
    .status(401)
    .json({ message: "We can't find your account. Please try again!" });
});

export default router;
