import { Telegraf } from 'telegraf';

import { token } from './config';

console.log(token);

export const bot = new Telegraf(token,);
