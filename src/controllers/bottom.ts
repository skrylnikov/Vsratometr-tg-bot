import { Context } from 'telegraf';
import { pipe, filter, sortBy, map } from 'remeda';

import { StatsBottom, Chats } from '../db';

export const bottom = async (ctx: Context) => {
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
    value: await StatsBottom.get(`${chatId}:${userId}`) || 0,
    user: await ctx.getChatMember(userId),
  })));

  const top = sortBy(userList, (x) => x.value)
    .filter((_, i) => i<=10)
    .map(({value, user}, i) => `${i+1}. ${user.user.username || 'Безымянный пидр'}: ${value}`)
    .join('\n');

  ctx.reply('Дно: \n' + top);

}
