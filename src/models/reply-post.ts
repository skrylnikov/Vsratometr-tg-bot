import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface ReplyPostAttributes {
  userId: number;
  chatId: number;
  messageId: number;
  value: number;
  url: string;
  created: Date;
}

export class ReplyPost extends Model<ReplyPostAttributes, ReplyPostAttributes> {
  public userId!: number;
  public chatId!: number;
  public messageId!: number;
  public value!: number;
  public url!: string;
  public created?: Date;
}

ReplyPost.init(
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
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'message_id',
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "reply_post",
    sequelize,
  }
);
