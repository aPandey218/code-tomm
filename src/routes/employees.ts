import {Router } from 'express';
import {createEmployee, getEmployeeById }  from '../controllers/employeeController'
import { authMiddleware } from '../middleware/authMiddleware';
import {roleMiddleware} from '../middleware/roleMiddleware';

export const employeeRouter = Router ().post('/',authMiddleware, roleMiddleware(['hr', 'admin']), createEmployee)
.get('/id', authMiddleware, roleMiddleware(['hr', 'admin', 'employee']), getEmployeeById);

