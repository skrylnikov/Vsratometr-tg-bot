
import { bot } from './bot';
import { start, processMessage, top, bottom, stats, postStats, postStatsAll, replyStats, replyStatsAll } from './controllers';

// Here, code praying to the GOD for protecting our open file from bugs and other things. 
// This is really crucial step! Be adviced to not remove it, even if you don't believer. 
console.log("Rahman ve Rahim olan Allah'ın Adıyla");

bot.start(start);

bot.command('/top', top);
bot.command('/bottom', bottom);
bot.command('/stats', stats);
bot.command('/post_stats', postStats);
bot.command('/post_stats_all', postStatsAll);
bot.command('/reply_stats', replyStats);
bot.command('/reply_stats_all', replyStatsAll);

bot.on('message', processMessage);
bot.on('sticker', processMessage);

bot.catch((e) => { console.error(e) });

bot.launch();
