import { Context } from 'grammy';

import { getReplyStats } from '../services';

export const replyStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  const result = await getReplyStats(chatId, 48);

  ctx.reply(result, {parse_mode: 'Markdown'});
}
