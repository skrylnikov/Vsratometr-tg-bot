import { Sequelize } from 'sequelize';
import { readFileSync } from 'fs';

import { db } from '../config';
import * as pg from 'pg'

pg.defaults.parseInt8 = true

export const sequelize = new Sequelize({
  
  dialect: 'postgres',
  host: db.host,
  port: db.port,
  database: db.name,
  username: db.username,
  password: db.password,
  dialectOptions: {
    ssl: {

      rejectUnauthorized: false,
      ca: readFileSync('./ca-certificate.crt').toString(),
    },
  },
  pool: {
    max: db.maxPool,
  },
  define: {
    timestamps: false
  },
});

