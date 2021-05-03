import { Context } from 'telegraf';
import { pipe, filter, sortBy, map, sort } from 'remeda';

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

  // const chatKey = `${chatId}`;

  // const chat = await Chats.get(chatKey);

  // console.log(chat);

  // if (!chat) {
  //   return;
  // }

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

  /*
  const userList = await Promise.all(chat.members.map( async(userId) => ({
    value: await StatsTop.get(`${chatId}:${userId}`) || 0,
    userName: await ctx.getChatMember(userId)
    .then((x) => x.user.username || 'Безымянный пидр')
    .catch(() => 'Ливнувший пидр'),
  })));

  const top = sortBy(userList, (x) => x.value)
    .reverse()
    .filter((_, i) => i<=4)
    .map(({value, userName}, i) => `${convertLevel(i+1)} ${userName}: ${value}`)
    .join('\n');

    const userBottomList = await Promise.all(chat.members.map( async(userId) => ({
      value: await StatsBottom.get(`${chatId}:${userId}`) || 0,
      userName: await ctx.getChatMember(userId)
        .then((x) => x.user.username || 'Безымянный пидр')
        .catch(() => 'Ливнувший пидр'),
    })));
  
    const bottom = sortBy(userBottomList, (x) => x.value)
      .filter((_, i) => i<=4)
      .map(({value, userName}, i) => `${convertLevel(i+1)} ${userName}: ${value}`)
      .join('\n');
*/
  ctx.reply('ТОП:\n' + top + '\n\nХУЕТОП:\n' + bottom);

}
