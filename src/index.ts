import { Telegraf } from 'telegraf';

import { token } from './config';

import { start, processMessage, top, bottom, stats, postStats, postStatsAll } from './controllers';

const bot = new Telegraf(token);

bot.start(start);

bot.command('/top', top);
bot.command('/bottom', bottom);
bot.command('/stats', stats);
bot.command('/post_stats', postStats);
bot.command('/post_stats_all', postStatsAll);

bot.on('message', processMessage);
bot.on('sticker', processMessage);


bot.launch();
