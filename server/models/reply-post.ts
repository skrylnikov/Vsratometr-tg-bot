import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface ReplyPostAttributes {
  userId: number;
  chatId: number;
  messageId: number;
  value: number;
  url: string;
  created: Date;
  type: string;
}

export class ReplyPost extends Model<ReplyPostAttributes, ReplyPostAttributes> {
  public declare userId: number;
  public declare chatId: number;
  public declare messageId: number;
  public declare value: number;
  public declare url: string;
  public declare created: Date;
  public declare type: string;;
}

ReplyPost.init(
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
    messageId: {
      type: DataTypes.BIGINT,
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
    },
    type: {
      type: DataTypes.STRING(127),
      allowNull: false,
    }
  },
  {
    tableName: "reply_post",
    sequelize,
  }
);
