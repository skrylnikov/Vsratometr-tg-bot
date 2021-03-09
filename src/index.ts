import { Telegraf } from 'telegraf';

import { token } from './config';

import { start, processMessage, top, bottom } from './controllers';

const bot = new Telegraf(token);

bot.start(start);

bot.command('/top', top);
bot.command('/bottom', bottom);

bot.on('message', processMessage);
bot.on('sticker', processMessage);


bot.launch();
