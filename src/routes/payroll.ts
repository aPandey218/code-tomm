import { Router } from 'express';

import { distributePayroll, payrollHistory } from '../controllers/payrollController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

export const payrollRouter = Router()
  .post('/distribution', authMiddleware, roleMiddleware(['hr', 'admin']), distributePayroll)
  .get('/history', authMiddleware, roleMiddleware(['hr', 'admin']), payrollHistory);