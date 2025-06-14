import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    const decodedToken = verify(token, process.env['JWT_SECRET'] ?? '');
    req.user = { ...(decodedToken as JwtPayload) };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization failed.' });
  }
}
