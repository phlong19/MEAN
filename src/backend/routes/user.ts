import express from 'express';

const router = express.Router();

router.post('login', (req, res, next) => {
  console.log(req);
});

export default router;
