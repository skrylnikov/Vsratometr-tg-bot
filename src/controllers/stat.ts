import { Context } from 'telegraf';
import { pipe, filter, sortBy, map } from 'remeda';

import { StatsTop, StatsBottom, Chats } from '../db';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return ' ' + value + '.';
  }
}

export const stats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if(!chatId){
    return;
  }

  const chatKey =`${chatId}`;

  const chat = await Chats.get(chatKey);

  console.log(chat);
  
  if(!chat){
    return;
  }
  
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

  ctx.reply('TOP:\n' + top + '\n\nХУЕТОП:\n' + bottom);

}
