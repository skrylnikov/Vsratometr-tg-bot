import { start } from './start';
import { processMessage } from './process-message';
import { stats } from './stat';
import { postStats } from './post-stats';
import { postStatsAll } from './post-stats-all';
import { replyStats } from './reply-stats';
import { replyStatsAll } from './reply-stats-all';
import { migrate } from './migrate';
import { anal } from './anal';
import { intellectualsSetOff, intellectualsSetOn } from './intellectuals-set';
import { randomEmojiSetOff, randomEmojiSetOn } from './random-emoji-set';
import { tokenList, addToken, removeToken } from './token';
import { silentOn, silentOff } from './silent';
import { spam } from './spam';

import { ctxMiddleware } from '../services';

import { bot } from '../bot';

bot.use(ctxMiddleware);

bot.start(start);

bot.command('/stats', stats);
bot.command('/post_stats', postStats);
bot.command('/post_stats_all', postStatsAll);
bot.command('/reply_stats', replyStats);
bot.command('/reply_stats_all', replyStatsAll);

bot.command('/migrate', migrate);
bot.command('/anal', anal);
bot.command('/spam', spam);


bot.command('/intellectuals_set_on', intellectualsSetOn);
bot.command('/intellectuals_set_off', intellectualsSetOff);

bot.command('/random_emoji_set_on', randomEmojiSetOn);
bot.command('/random_emoji_set_off', randomEmojiSetOff);

bot.command('/silent_on', silentOn);
bot.command('/silent_off', silentOff);


bot.command('/add_token', addToken);
bot.command('/remove_token', removeToken);
bot.command('/token_list', tokenList);


bot.on('message', processMessage);
bot.on('sticker', processMessage);

bot.catch((e) => { console.error(e) });
