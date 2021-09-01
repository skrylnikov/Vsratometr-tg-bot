import { Context } from 'telegraf';

import { getPostStats } from '../services';

export const postStatsAll = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  const result = await getPostStats(chatId);

  ctx.reply(result, {parse_mode: 'Markdown'});
}
