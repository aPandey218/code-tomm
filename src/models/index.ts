import { sequelize } from '../config/database';
import { User } from './user';
import { Employee } from './employee';
import { Attendance } from './attendance';
import { Payroll } from './payroll';

export { sequelize, User, Employee, Attendance, Payroll };