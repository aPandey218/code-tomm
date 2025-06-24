import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Employee } from './employee';

interface SalaryAttributes {
  id: number;
  employeeId: number;
  month: string;
  gross: number;
  tax: number;
  pf: number;
  totalSalary: number;
  net: number;
  fullDays: number;
  halfDays: number;
}


interface SalaryCreationAttributes extends Optional<SalaryAttributes, 'id'> {}

export class Salary
  extends Model<SalaryAttributes, SalaryCreationAttributes>
  implements SalaryAttributes
{
  public id!: number;
  public employeeId!: number;
  public month!: string;
  public gross!: number;
  public tax!: number;
  public pf!: number;
  public totalSalary!: number;
  public net!: number;
  public fullDays!: number;
  public halfDays!: number;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Salary.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gross: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    tax: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    pf: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    totalSalary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    net: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    fullDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    halfDays: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'Salaries',
    sequelize,
  }
);


Employee.hasMany(Salary, { foreignKey: 'employeeId' });
Salary.belongsTo(Employee, { foreignKey: 'employeeId' });