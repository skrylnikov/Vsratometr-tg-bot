
import { bot } from './bot';
import {
  start,
  processMessage,
  stats,
  postStats,
  postStatsAll,
  replyStats,
  replyStatsAll,
  migrate,
  anal,
  intellectualsSetOn,
  intellectualsSetOff,
  randomEmojiSetOn,
  randomEmojiSetOff,
  addToken,
  removeToken,
  tokenList,
} from './controllers';


bot.start(start);

bot.command('/stats', stats);
bot.command('/post_stats', postStats);
bot.command('/post_stats_all', postStatsAll);
bot.command('/reply_stats', replyStats);
bot.command('/reply_stats_all', replyStatsAll);

bot.command('/migrate', migrate);
bot.command('/anal', anal);


bot.command('/intellectuals_set_on', intellectualsSetOn);
bot.command('/intellectuals_set_off', intellectualsSetOff);

bot.command('/random_emoji_set_on', randomEmojiSetOn);
bot.command('/random_emoji_set_off', randomEmojiSetOff);


bot.command('/add_token', addToken);
bot.command('/remove_token', removeToken);
bot.command('/token_list', tokenList);


bot.on('message', processMessage);
bot.on('sticker', processMessage);

bot.catch((e) => { console.error(e) });

bot.launch();
