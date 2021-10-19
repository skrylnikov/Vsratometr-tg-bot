import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export interface ChatAttributes {
  id: number;
  locale: string;
  silent: boolean;
}

export class Chat extends Model<ChatAttributes, ChatAttributes> {
  public id!: number;
  public locale!: string;
  public silent!: boolean;
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
    silent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "chat",
    sequelize,
  }
);
