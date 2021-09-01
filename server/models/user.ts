import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface UserAttributes {
  userId: number;
  name: string;
}

export class User extends Model<UserAttributes, UserAttributes> {
  public userId!: number;
  public name!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);
