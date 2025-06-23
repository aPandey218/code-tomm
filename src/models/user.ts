import { DataTypes, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/database';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role: 'employee' | 'hr' | 'admin';
}
interface UserCreation extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreation>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: 'employee' | 'hr' | 'admin';
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('employee', 'hr', 'admin'),
      allowNull: false,
    },
  },
  { tableName: 'Users', sequelize }
);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});