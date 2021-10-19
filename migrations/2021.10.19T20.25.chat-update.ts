import { DataTypes } from 'sequelize';
import { Migration } from '../scripts/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('chat', 'silent', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('chat', 'silent');
};
