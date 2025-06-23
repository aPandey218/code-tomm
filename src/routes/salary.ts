import {Router } from 'express';

import {calculateSalary} from '../controllers/salaryControllers'
import {authMiddleware} from '../middleware/authMiddleware'
import  {roleMiddleware} from '../middleware/roleMiddleware'

export const salaryRouter = Router ()

.post('calculate', authMiddleware, roleMiddleware (['hr', 'admin']), calculateSalary)

.get ('/employee/:employeeId', authMiddleware, roleMiddleware(['hr', 'admin', 'employee']),calculateSalary);




