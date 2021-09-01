import { Context } from 'telegraf';

import { getReplyStats } from '../services';

export const replyStatsAll = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  const result = await getReplyStats(chatId);
  
  ctx.reply(result, {parse_mode: 'Markdown'});
}
