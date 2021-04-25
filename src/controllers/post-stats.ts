import { Context } from 'telegraf';
import { pipe, filter, sortBy, map, sort } from 'remeda';

import { StatsTop, StatsBottom, Chats } from '../db';
import { Minus, Plus, Post } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const postStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const postList = await Post.findAll({
    where: {
      chatId,
    },
  });

  const superTop = pipe(
    postList,
    sort((a, b) => (b.plus + b.minus) - (a.plus + a.minus)),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ plus, minus, url }, i) => `${convertLevel(i + 1)} [+${plus},-${minus}]: ${url}`),
    (x) => x.join('\n'),
  );

  const top = pipe(
    postList,
    sort((a, b) => b.plus - a.plus),
    (x) => x.filter(({ plus }) => plus > 0),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ plus, minus, url }, i) => `${convertLevel(i + 1)} [+${plus},-${minus}]: ${url}`),
    (x) => x.join('\n'),
  );

  const bottom = pipe(
    postList,
    sort((a, b) => b.minus - a.minus),
    (x) => x.filter(({ minus }) => minus > 0),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ plus, minus, url }, i) => `${convertLevel(i + 1)} [-${minus},+${plus}]: ${url}`),
    (x) => x.join('\n'),
  );

  ctx.reply('Супер блядь топ:\n' + superTop + '\n\nTOP:\n' + top + '\n\nХУЕТОП:\n' + bottom);

}
