import { Context } from 'telegraf';
import { pipe, filter, sortBy, map } from 'remeda';

import { StatsTop, Chats } from '../db';

export const top = async (ctx: Context) => {
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
    .filter((_, i) => i<=10)
    .map(({value, userName}, i) => `${i+1}. ${userName}: ${value}`)
    .join('\n');

  ctx.reply('TOP:\n' + top);

}
