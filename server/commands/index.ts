import { Composer } from "grammy";

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

export const commands = new Composer();

commands.command('start', start);

commands.command('stats', stats);
commands.command('post_stats', postStats);
commands.command('post_stats_all', postStatsAll);
commands.command('reply_stats', replyStats);
commands.command('reply_stats_all', replyStatsAll);

commands.command('migrate', migrate);
commands.command('anal', anal);
commands.command('spam', spam);


commands.command('intellectuals_set_on', intellectualsSetOn);
commands.command('intellectuals_set_off', intellectualsSetOff);

commands.command('random_emoji_set_on', randomEmojiSetOn);
commands.command('random_emoji_set_off', randomEmojiSetOff);

commands.command('silent_on', silentOn);
commands.command('silent_off', silentOff);


commands.command('add_token', addToken);
commands.command('remove_token', removeToken);
commands.command('token_list', tokenList);


commands.on('message', processMessage);
commands.on(':sticker', processMessage);


console.log('Commands loaded');
