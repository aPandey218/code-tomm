import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Employee } from './employee';

interface PayrollAttributes {
  id: number;
  month: string;
  grossSalary: number;
  taxDeduction: number;
  pfDeduction: number;
  netSalary: number;
  fullDays: number;
  halfDays: number;
  employeeId: number;
}
interface PayrollCreation extends Optional<PayrollAttributes, 'id'> {}

export class Payroll
  extends Model<PayrollAttributes, PayrollCreation>
  implements PayrollAttributes {
  public id!: number;
  public month!: string;
  public grossSalary!: number;
  public taxDeduction!: number;
  public pfDeduction!: number;
  public netSalary!: number;
  public fullDays!: number;
  public halfDays!: number;
  public employeeId!: number;
}

Payroll.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    month: { type: DataTypes.STRING, allowNull: false },
    grossSalary: { type: DataTypes.DECIMAL, allowNull: false },
    taxDeduction: { type: DataTypes.DECIMAL, allowNull: false },
    pfDeduction: { type: DataTypes.DECIMAL, allowNull: false },
    netSalary: { type: DataTypes.DECIMAL, allowNull: false },
    fullDays: { type: DataTypes.INTEGER, defaultValue: 0 },
    halfDays: { type: DataTypes.INTEGER, defaultValue: 0 },
    employeeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { tableName: 'Payrolls', sequelize }
);

Employee.hasMany(Payroll, { foreignKey: 'employeeId' });
Payroll.belongsTo(Employee, { foreignKey: 'employeeId' });