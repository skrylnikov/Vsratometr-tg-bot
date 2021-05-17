import { Context } from 'telegraf';
import { pipe, sort } from 'remeda';

import { Minus, Plus } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const stats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }

  const [plusList, minusList] = await Promise.all([
    Plus.findAll({
      where: {
        chatId,
      }
    }),
    Minus.findAll({
      where: {
        chatId,
      }
    }),
  ]);

  const top = pipe(
    plusList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ value, name }, i) => `${convertLevel(i + 1)} ${name}: ${value}`),
    (x) => x.join('\n'),
  );

  const bottom = pipe(
    minusList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ value, name }, i) => `${convertLevel(i + 1)} ${name}: -${value}`),
    (x) => x.join('\n'),
  );

  ctx.reply('ТОП:\n' + top + '\n\nХУЕТОП:\n' + bottom);

}
