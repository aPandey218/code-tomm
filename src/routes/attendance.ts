import { Router } from 'express';
import { markAttendance } from '../controllers/attendanceController';
import { authMiddleware } from '../middleware/authMiddleware';

export const attendanceRouter = Router();

attendanceRouter.post('/mark', authMiddleware, markAttendance);
