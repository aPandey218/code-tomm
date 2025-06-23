import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface EmployeeAttributes {
  id: number;
  name: string;
  basicSalary: number;
  hra: number;
  allowances: number;
}
interface EmployeeCreation extends Optional<EmployeeAttributes, 'id'> {}

export class Employee
  extends Model<EmployeeAttributes, EmployeeCreation>
  implements EmployeeAttributes {
  public id!: number;
  public name!: string;
  public basicSalary!: number;
  public hra!: number;
  public allowances!: number;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    basicSalary: { type: DataTypes.DECIMAL, allowNull: false },
    hra: { type: DataTypes.DECIMAL, defaultValue: 0 },
    allowances: { type: DataTypes.DECIMAL, defaultValue: 0 },
  },
  { tableName: 'Employees', sequelize }
);