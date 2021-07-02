import { Context } from 'telegraf';

import { getPostStats } from '../service';

export const postStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const result = await getPostStats(chatId, 48);

  ctx.reply(result, { parse_mode: 'Markdown' });

}
