
import { bot } from './bot';
import { start, processMessage, stats, postStats, postStatsAll, replyStats, replyStatsAll, migrate, anal } from './controllers';


bot.start(start);

bot.command('/stats', stats);
bot.command('/post_stats', postStats);
bot.command('/post_stats_all', postStatsAll);
bot.command('/reply_stats', replyStats);
bot.command('/reply_stats_all', replyStatsAll);

bot.command('/migrate', migrate);
bot.command('/anal', anal);

bot.on('message', processMessage);
bot.on('sticker', processMessage);

bot.catch((e) => { console.error(e) });

bot.launch();
