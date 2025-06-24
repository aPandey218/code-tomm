import { Request, Response } from 'express';
import { Op } from 'sequelize'; 
import { Attendance, Employee } from '../models';
import { calculateGross, calculateTax, calculatePF, calculateDailyWage } from '../utils/salaryUtils';

export const calculateSalary  = async (req: Request, res: Response) => {
  try {
    const { employeeId, month } = req.body;

    const emp = await Employee.findByPk(employeeId);
    if (!emp) return res.status(404).json({ error: 'Employee not found' });

    const attendances = await Attendance.findAll({
      where: {
        employeeId,
        date: {
          [Op.like]: `${month}-%` 
        }
      }
    });

    const fullDays = attendances.filter(a => a.hoursWorked >= 8).length;
    const halfDays = attendances.filter(a => a.hoursWorked < 8).length;

    const gross = calculateGross(+emp.basicSalary, +emp.hra, +emp.allowances);
    const tax = calculateTax(gross);
    const pf = calculatePF(+emp.basicSalary);
    const daily = calculateDailyWage(gross);

    const totalSalary = fullDays * daily + halfDays * (daily / 2);
    const net = totalSalary - tax - pf;

    res.json({ gross, tax, pf, fullDays, halfDays, totalSalary, net });
  } catch (error) {
    console.error('Error calculating salary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
