import { Model, DataTypes } from "sequelize";

import { sequelize } from './connection';

export interface TokenToChatAttributes {
  chatId: number;
  tokenId: number;
}

export class TokenToChat extends Model<TokenToChatAttributes, TokenToChatAttributes> {
  public declare chatId: number;
  public declare tokenId: number;
}

TokenToChat.init(
  {
    chatId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'chat_id'
    },
    tokenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'token_id'
    },
  },
  {
    tableName: "token_to_chat",
    sequelize,
  }
);
