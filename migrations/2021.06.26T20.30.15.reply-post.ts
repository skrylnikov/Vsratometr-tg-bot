import { DataTypes } from 'sequelize';
import { Migration } from '../src/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('reply_post', {
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
    }
  });

};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('reply_post');
};
