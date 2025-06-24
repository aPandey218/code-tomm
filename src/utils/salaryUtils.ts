import { Op } from 'sequelize';
import { Attendance, Employee } from '../models';

export function calculateGross(basic: number, hra: number, allowances: number): number {
  return basic + hra + allowances;
}

export function calculateTax(gross: number): number {
  if (gross <= 250000) return 0;
  if (gross <= 500000) return gross * 0.05;
  if (gross <= 1000000) return gross * 0.2;
  return gross * 0.3;
}

export function calculatePF(basic: number): number {
  return basic * 0.12;
}

export function calculateDailyWage(gross: number, workingDays = 22): number {
  return gross / workingDays;
}

// ✅ ADD THIS FUNCTION
export async function getSalaryData(employeeId: number, month: string) {
  const emp = await Employee.findByPk(employeeId);
  if (!emp) throw new Error('Employee not found');

  const attendances = await Attendance.findAll({
    where: {
      employeeId,
      date: {
        [Op.like]: `${month}-%`,
      },
    },
  });

  const fullDays = attendances.filter((a) => a.hoursWorked >= 8).length;
  const halfDays = attendances.filter((a) => a.hoursWorked < 8).length;

  const gross = calculateGross(+emp.basicSalary, +emp.hra, +emp.allowances);
  const tax = calculateTax(gross);
  const pf = calculatePF(+emp.basicSalary);
  const daily = calculateDailyWage(gross);

  const totalSalary = fullDays * daily + halfDays * (daily / 2);
  const netSalary = totalSalary - tax - pf;

  return {
    grossSalary: gross,
    taxDeduction: tax,
    pfDeduction: pf,
    netSalary,
    fullDays,
    halfDays,
  };
}
