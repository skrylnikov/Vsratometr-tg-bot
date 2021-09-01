import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from '../server/models/connection';

export const migrator = new Umzug({
  migrations: {
    glob: ['../migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});

export type Migration = typeof migrator._types.migration;

migrator.runAsCLI();
