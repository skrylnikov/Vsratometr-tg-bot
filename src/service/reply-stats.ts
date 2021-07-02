import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours, format, getDay } from 'date-fns';

import { ReplyPost } from '../models';
import { convertMessageType } from './message-type';
import { getUserMap } from './user';
import { convertValueToMedal } from './value-to-medal';


export const getReplyStats = async (chatId: number, lashHours?: number) => {
  const postList = await ReplyPost.findAll({
    where: {
      chatId,
      ...(lashHours ? {
        created: {
          [Op.gte]: subHours(new Date(), lashHours),
        },
      } : {})
    },
  });

  const userMap = await getUserMap(postList.map((x) => x.userId), chatId);

  
  const top = pipe(
    postList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter(({ value }) => value >= 3),
    (x) => x.filter((_, i) => i < (lashHours ? 15 : 30)),
    (x) => x.map(({ value, url, created, userId, type }, i) =>{
      const user = userMap.get(userId);

      const date = created || new Date();
      const dayDiff = getDay(new Date()) - getDay(date);
      const time = `${dayDiff === 2 ? 'позавчера ' : dayDiff === 1 ? 'вчера ' : ''}${format(date, dayDiff > 2 ? 'dd-MM в HH:mm' : 'в HH:mm')}`;

      const name = user?.name || 'Анонимус';

      const shortName = name.length > 10 ? (name.substring(0, 9) + '...') : name;

      return `${convertMessageType(type)} ${shortName} [${time} → ${value}](${url}) ${convertValueToMedal(i + 1)}`
    }),
    (x) => x.join('\n'),
  );


  return `Топ реплаев за ${lashHours ? `последнии ${lashHours} часов` : 'всё время'}:\n\n` +
    (top.length > 0 ? top : 'Пусто :(\n');
}
