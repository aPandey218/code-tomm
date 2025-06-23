import { Request, Response } from 'express';
import { Attendance } from '../models';

export const markAttendance = async (req: Request & { user?: { id: number } }, res: Response) => {
  const { date, hoursWorked } = req.body;
  const record = await Attendance.create({
    date,
    hoursWorked,
    employeeId: req.user!.id,
  });
  res.status(201).json(record);
};