import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  pool: {
    max: 1,
  },
  define: {
    timestamps: false
  },
});

