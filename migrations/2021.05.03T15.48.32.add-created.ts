import { DataTypes } from 'sequelize';
import { Migration } from '../scripts/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('post', 'created', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('post', 'created');
};
