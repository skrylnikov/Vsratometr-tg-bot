import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

interface PostAttributes {
  userId: number;
  chatId: number;
  messageId: number;
  plus: number;
  minus: number;
  url: string;
}

export class Post extends Model<PostAttributes, PostAttributes> {
  public userId!: number;
  public chatId!: number;
  public messageId!: number;
  public plus!: number;
  public minus!: number;
  public url!: string;
}

Post.init(
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
    }
  },
  {
    tableName: "post",
    sequelize,
  }
);
