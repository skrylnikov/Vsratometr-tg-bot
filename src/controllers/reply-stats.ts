import { Context } from 'telegraf';
import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours, format, getDay } from 'date-fns';

import { ReplyPost } from '../models';
import { getUserMap, convertMessageType } from '../service';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '💩';
  }
}

export const replyStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  
  
  const postList = await ReplyPost.findAll({
    where: {
      chatId,
      created: {
        [Op.gte]: subHours(new Date(), 48),
      },
    },
  });

  const userMap = await getUserMap(postList.map((x) => x.userId), chatId);


  
  const top = pipe(
    postList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter(({ value }) => value >= 3),
    (x) => x.filter((_, i) => i < 15),
    (x) => x.map(({ value, url, created, userId, type }, i) =>{
      const user = userMap.get(userId);

      const date = created || new Date();
      const time = `${getDay(new Date()) !== getDay(date) ? 'вчера ' : ''}в ${format(date, 'H:m')}`;

      const name = user?.name || 'Анонимус';

      const shortName = name.length > 10 ? (name.substring(0, 9) + '...') : name;

      return `${convertLevel(i + 1)} ${shortName} [${time} → ${value}](${url}), ${convertMessageType(type)}`
    }),
    (x) => x.join('\n'),
  );


  ctx.reply(
    'Топ реплаев за последнии 48 часов:\n\n' +
    (top.length > 0 ? top : 'Пусто :(\n'),
    {parse_mode: 'Markdown'}
  );

}
