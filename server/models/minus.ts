import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface MinusAttributes {
  userId: number;
  chatId: number;
  name: string | null;
  value: number;
}

export class Minus extends Model<MinusAttributes, MinusAttributes> {
  public declare userId: number;
  public declare chatId: number;
  public declare name: string;
  public declare value: number;
}

Minus.init(
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
    tableName: "minus",
    sequelize,
  }
);
