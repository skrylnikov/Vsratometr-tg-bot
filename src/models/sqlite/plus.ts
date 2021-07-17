import { Sequelize, Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface PlusAttributes {
  userId: number;
  chatId: number;
  name: string | null;
  value: number;
}

export class Plus extends Model<PlusAttributes, PlusAttributes> {
  public userId!: number;
  public chatId!: number;
  public name!: string;
  public value!: number;
}

Plus.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'chat_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "plus",
    sequelize,
  }
);
