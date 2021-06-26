import { Context } from 'telegraf';
import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours } from 'date-fns';;

import { ReplyPost } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const replyStatsAll = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const postList = await ReplyPost.findAll({
    where: {
      chatId,
    },
  });

  const top = pipe(
    postList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter(({ value }) => value > 5),
    (x) => x.filter((_, i) => i < 30),
    (x) => x.map(({ value, url }, i) => `${convertLevel(i + 1)} score: ${value}, url: ${url}`),
    (x) => x.join('\n'),
  );


  ctx.reply(
    'Топ реплаев за всё время:\n\n' +
    (top.length > 0 ? top : 'Пусто :(\n')
  );

}
