import { Request, Response } from 'express';
import { Payroll } from '../models';
import { getSalaryData } from '../utils/salaryUtils';

export const distributePayroll = async (req: Request, res: Response) => {
  try {
    const { employeeId, month } = req.body;

    const salaryData = await getSalaryData(employeeId, month);

    const rec = await Payroll.create({
      employeeId,
      month,
      ...salaryData,
    });

    res.status(201).json(rec);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const payrollHistory = async (req: Request, res: Response) => {
  const month = req.query.month as string;
  const list = await Payroll.findAll({ where: { month } });
  res.json(list);
};
