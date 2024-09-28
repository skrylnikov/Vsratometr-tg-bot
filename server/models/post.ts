import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export interface PostAttributes {
  userId: number;
  chatId: number;
  messageId: number;
  plus: number;
  minus: number;
  url: string;
  created: Date;
  type: string;
}

export class Post extends Model<PostAttributes, PostAttributes> {
  public declare userId: number;
  public declare chatId: number;
  public declare messageId: number;
  public declare plus: number;
  public declare minus: number;
  public declare url: string;
  public declare created: Date;
  public declare type: string;
}

Post.init(
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
    plus: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minus: {
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
    tableName: "post",
    sequelize,
  }
);
