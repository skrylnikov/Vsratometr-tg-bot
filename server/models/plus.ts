import { Sequelize, Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface PlusAttributes {
  userId: number;
  chatId: number;
  name: string | null;
  value: number;
}

export class Plus extends Model<PlusAttributes, PlusAttributes> {
  public declare userId: number;
  public declare chatId: number;
  public declare name: string;
  public declare value: number;
}

Plus.init(
  {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    chatId: {
      type: DataTypes.BIGINT,
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
