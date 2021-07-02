import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours, format, getDay } from 'date-fns';

import { Post, PostAttributes } from '../models';
import { convertMessageType } from './message-type';
import { getUserMap } from './user';
import { convertValueToMedal } from './value-to-medal';


export const getPostStats = async (chatId: number, lashHours?: number) => {
  const postList = await Post.findAll({
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


  const postToString = (type: 'all' | 'plus' | 'minus') => (post: PostAttributes, i: number) => {
    const user = userMap.get(post.userId);

    const date = post.created || new Date();
    const dayDiff = getDay(new Date()) - getDay(date);
    const time = `${dayDiff === 2 ? 'позавчера ' : dayDiff === 1 ? 'вчера ' : ''}в ${format(date, dayDiff > 2 ? 'dd-MM HH:mm' : 'HH:mm')}`;

    const name = user?.name || 'Анонимус';

    const shortName = name.length > 10 ? (name.substring(0, 9) + '...') : name;

    const value = type === 'all' ? post.plus + post.minus : type === 'plus' ? post.plus : post.minus;

    return `${convertMessageType(type)} ${shortName} [${time} → ${value}](${post.url}) ${convertValueToMedal(i + 1)}`;
  };
  
  const superTop = pipe(
    postList,
    sort((a, b) => (b.plus + b.minus) - (a.plus + a.minus)),
    (x) => x.filter(({ plus, minus }) => plus > 1 && minus > 1 && (plus + minus) > 3),
    (x) => x.filter((_, i) => i < (lashHours ? 10 : 20)),
    (x) => x.map(postToString('all')),
    (x) => x.join('\n'),
  );

  const top = pipe(
    postList,
    sort((a, b) => b.plus - a.plus),
    (x) => x.filter(({ plus }) => plus > 1),
    (x) => x.filter((_, i) => i < (lashHours ? 10 : 20)),
    (x) => x.map(postToString('plus')),
    (x) => x.join('\n'),
  );

  const bottom = pipe(
    postList,
    sort((a, b) => b.minus - a.minus),
    (x) => x.filter(({ minus }) => minus > 1),
    (x) => x.filter((_, i) => i < (lashHours ? 10 : 20)),
    (x) => x.map(postToString('minus')),
    (x) => x.join('\n'),
  );


  return `Топ за ${lashHours ? `последнии ${lashHours} часов` : 'всё время'}:\n\n\n` +
  (superTop.length > 0 ? 'Супер блядь топ:\n' + superTop + '\n\n' : 'Супер пиздатых сообщений не было(\n\n') +
  (top.length > 0 ? 'Топ:\n' + top + '\n\n' : 'Пиздатых сообщений не было(\n\n') +
  (bottom.length > 0 ? 'Хуетоп:\n' + bottom + '\n\n' : 'Хуёвых сообщений не было(\n\n');
}
