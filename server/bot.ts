import { Telegraf } from 'telegraf';

import { token } from './config';

export const bot = new Telegraf(token);
