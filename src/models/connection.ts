import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite',
  define: {
    timestamps: false
  },
});

