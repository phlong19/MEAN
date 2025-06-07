import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    jwt.verify(token, process.env['JWT_SECRET'] ?? '');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed.' });
  }
}
