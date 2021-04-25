import { config } from 'dotenv';

config();

const showError = (msg: string) => {
  throw new Error(msg)
};


export const token = process.env.TOKEN || showError('token not found in .env');
