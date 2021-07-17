import { Context } from 'telegraf';

import { godId } from '../config';

export const migrate = async (ctx: Context) => {
  const userId = ctx.message?.from.id;
  if (userId !== godId) {
    return;
  }

  try {
  ctx.reply('нечего мигрировать');
  

  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется всё пошло по пизде(`);
  }
}
