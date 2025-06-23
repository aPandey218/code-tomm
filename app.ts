import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './src/config/database';
import { authRouter } from './src/routes/auth';
import { employeeRouter } from './src/routes/employees';
import { attendanceRouter } from './src/routes/attendance';
import { salaryRouter } from './src/routes/salary';
import { payrollRouter } from './src/routes/payroll';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/employees', employeeRouter);
app.use('/attendance', attendanceRouter);
app.use('/salary', salaryRouter);
app.use('/payroll', payrollRouter);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}` )
  })
});