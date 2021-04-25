import { DataTypes } from 'sequelize';
import { Migration } from '../src/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('plus', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  await sequelize.getQueryInterface().createTable('minus', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  await sequelize.getQueryInterface().createTable('post', {
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
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('plus');
  await sequelize.getQueryInterface().dropTable('minus');
  await sequelize.getQueryInterface().dropTable('post');
};
