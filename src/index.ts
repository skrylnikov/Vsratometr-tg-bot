import { Telegraf } from 'telegraf';

import { token } from './config';

import { start, processMessage, top } from './controllers';

const bot = new Telegraf(token);

bot.start(start);

bot.command('/top', top);

bot.on('message', processMessage);


bot.launch();