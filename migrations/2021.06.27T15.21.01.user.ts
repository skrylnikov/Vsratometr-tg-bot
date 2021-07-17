import { DataTypes } from 'sequelize';
import { Migration } from '../src/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('user', {
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('user');
};
