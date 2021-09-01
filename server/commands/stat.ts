import { Context } from 'telegraf';
import { pipe, sort } from 'remeda';

import { Minus, Plus } from '../models';
import { l10n } from '../services';



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

  if(top.length === 0 && bottom.length === 0){
    return ctx.reply(l10n('bot-top-empty'));
  }

  ctx.reply(
    (top.length > 0 ? l10n('bot-top') + ':\n' + top + '\n\n' : '') +
    (bottom.length > 0 ? l10n('bot-bottom') + ':\n' + bottom : ''));

}
