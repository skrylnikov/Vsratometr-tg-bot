import { DataTypes } from 'sequelize';
import { Migration } from '../scripts/migrate';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('post', 'type', {
    type: DataTypes.STRING(126),
    allowNull: false,
    defaultValue: '',
  });
  await sequelize.getQueryInterface().addColumn('reply_post', 'type', {
    type: DataTypes.STRING(126),
    allowNull: false,
    defaultValue: '',
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('post', 'type');
  await sequelize.getQueryInterface().removeColumn('reply_post', 'type');
};
