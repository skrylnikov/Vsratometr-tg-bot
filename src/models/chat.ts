import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export interface ChatAttributes {
  id: number;
  locale: string;
}

export class Chat extends Model<ChatAttributes, ChatAttributes> {
  public id!: number;
  public locale!: string;
}

Chat.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    locale: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
  },
  {
    tableName: "chat",
    sequelize,
  }
);
