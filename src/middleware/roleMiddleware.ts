import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (allowedRoles: string[]) => {
  return (
    req: Request & { user?: { role: string } },
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
};
