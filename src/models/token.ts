import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export type ITokenType = 'plus' | 'minus' | 'plusAndMinus';

export interface TokenAttributes {
  id?: number;
  token: string;
  repeat: number;
  randomRevertRate: number;
  type: ITokenType;
  tokenSet?: string;
}

export class Token extends Model<TokenAttributes, TokenAttributes> {
  id!: number;
  token!: string;
  repeat!: number;
  randomRevertRate!: number;
  type!: ITokenType;
  tokenSet?: string;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(126),
      allowNull: false,
    },
    repeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    randomRevertRate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'random_revert_rate',
    },
    type: {
      type: DataTypes.ENUM('plus', 'minus', 'plusAndMinus'),
      allowNull: false,
    },
    tokenSet: {
      type: DataTypes.STRING(126),
      allowNull: true,
      field: 'set'
    }
  },
  {
    tableName: "token",
    sequelize,
  }
);
