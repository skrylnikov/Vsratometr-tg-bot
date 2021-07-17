import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export interface PostAttributes {
  id: number;
  locale: string;
}

export class Post extends Model<PostAttributes, PostAttributes> {
  public id!: number;
  public locale!: string;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
