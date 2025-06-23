import { Request, Response } from 'express';
import { Employee } from '../models';

export const createEmployee = async (req: Request, res: Response) => {
  const emp = await Employee.create(req.body);
  res.status(201).json(emp);
};

export const getEmployeeById = async (req: Request & { user?: { id: number; role: string } }, res: Response) => {
  const id = Number(req.params.id);
  if (req.user?.role === 'employee' && req.user.id !== id)
    return res.status(403).json({ error: 'Forbidden' });

  const emp = await Employee.findByPk(id);
  if (!emp) return res.status(404).json({ error: 'Not found' });
  res.json(emp);
};