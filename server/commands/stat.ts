import { Context } from 'grammy';
import { pipe, sort } from 'remeda';

import { L } from '../../i18n/i18n-node';

import { Minus, Plus } from '../models';
import { getLocale } from '../services';



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

  const locale = getLocale(chatId);

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

  if(top.length === 0 && bottom.length === 0){
    return ctx.reply(L[locale].bot.topEmpty());
  }

  ctx.reply(
    (top.length > 0 ? L[locale].bot.top() + ':\n' + top + '\n\n' : '') +
    (bottom.length > 0 ? L[locale].bot.bottom() + ':\n' + bottom : ''));

}
