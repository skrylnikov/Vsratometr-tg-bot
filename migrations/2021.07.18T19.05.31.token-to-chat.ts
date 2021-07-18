import { DataTypes } from 'sequelize';
import { Migration } from '../src/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('token_to_chat', {
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
      field: 'token_id',
    },
  });

};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('token_to_chat');
};
