import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: number;
  role: 'employee' | 'hr' | 'admin';
}

export const authMiddleware = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
): void => {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  const token = auth.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};
