import { Context } from 'telegraf';
import { uniq } from 'remeda';

import { isPlus, isMinus } from '../utils';
import { StatsBottom, StatsTop, Chats } from '../db';


const cooldownSet = new Set<string>();

export const processMessage = async (ctx: Context) => {
  if(!ctx.message){
    return;
  }
  if(!('reply_to_message' in ctx.message)){
    return;
  }

  const text = 'text' in ctx.message ? ctx.message.text : 'sticker' in ctx.message ? ctx.message.sticker.emoji : '';

  if(!text){
    return;
  }

  const plus = isPlus(text);
  const minus = isMinus(text);

  if(!plus && !minus){
    return;
  }

  if(ctx.message.reply_to_message?.from?.id === ctx.message.from.id){
    const url = await ctx.tg.getFileLink('CAACAgIAAxkBAAMoYDqZhNYMEOhZMgABZr5tG1bko4MUAAJ2AAMz-LcVOuDuXdTVMogeBA')
  
    if(url?.href){
      ctx.replyWithSticker({url: url.href}, {reply_to_message_id: ctx.message.message_id});
    } else {
      ctx.reply('Ну ты ещё сам себе отсосать бы попробовал. Долбоёб!', {reply_to_message_id: ctx.message.message_id});
    }
    return;
  }

  const chatId = ctx.chat?.id;
  const userId = ctx.message.reply_to_message?.from?.id;
  const userName = ctx.message.reply_to_message?.from?.username;

  if(!chatId || !userId){
    return;
  }

  const cooldownKey = `${chatId}:${userId}:${ctx.message.from.id}`;

  if(cooldownSet.has(cooldownKey)){
    ctx.reply('Иди в жопу', {reply_to_message_id: ctx.message.message_id});
    return;
  } else {
    cooldownSet.add(cooldownKey);
    setTimeout(() => cooldownSet.delete(cooldownKey), 60 * 10 * 1000);
  }

  const userKey = `${chatId}:${userId}`;

  const Stats = (plus ? StatsTop : StatsBottom);

  const statValue = await Stats.get(userKey);
  const value = plus ? 1 : -1;
  const newStat = typeof statValue === 'number' && Number.isFinite(statValue) ? statValue + value : value;

  await Stats.set(userKey, newStat);


  if(!Number.isFinite(statValue)){
    await Stats.set(userKey, value);
    const chatKey =`${chatId}`;

    const chat = await Chats.get(chatKey);
    if(chat){
      await Chats.set(chatKey, {
        ...chat,
        members: uniq([...chat.members, userId]),
      });
    } else {
      await Chats.set(chatKey, {
        id: chatId,
        members: [userId],
      });
    }
  }




  ctx.reply(`${ctx.message.from.username} ${plus ? 'поднял в топе': 'опустил на дно'}  ${userName}(${newStat})`);
  
}
