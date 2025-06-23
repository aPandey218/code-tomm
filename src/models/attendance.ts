import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Employee } from './employee';

interface AttendanceAttributes {
  id: number;
  date: string;
  hoursWorked: number;
  employeeId: number;
}
interface AttendanceCreation extends Optional<AttendanceAttributes, 'id'> {}

export class Attendance
  extends Model<AttendanceAttributes, AttendanceCreation>
  implements AttendanceAttributes {
  public id!: number;
  public date!: string;
  public hoursWorked!: number;
  public employeeId!: number;
}

Attendance.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    hoursWorked: { type: DataTypes.INTEGER, allowNull: false },
    employeeId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
  },
  { tableName: 'Attendances', sequelize }
);

Employee.hasMany(Attendance, { foreignKey: 'employeeId' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });

 