import { Context } from 'grammy';
import { godId } from '../config';

import { Chat } from '../models';

export const silentOn = async (ctx: Context) => {
  const userId = ctx.message?.from?.id;
  const chatId = ctx.chat?.id;
  if (!userId || !chatId) {
    return;
  }
  try {
    const chatAdmins = await ctx.getChatAdministrators();

    if(!chatAdmins.find((x) => x.user.id === userId && x.status === 'creator') && userId !== godId){
      ctx.reply(`Эта команда только для создателя чата`);
      return;
    }

  const chat = await Chat.findOne({where: { id: chatId }});

  if(!chat){
    return;
  }

  await chat.update('silent', true);

  ctx.reply(`Тихий режим включен`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}

export const silentOff = async (ctx: Context) => {
  const userId = ctx.message?.from?.id;
  const chatId = ctx.chat?.id;
  if (!userId || !chatId) {
    return;
  }
  try {
    const chatAdmins = await ctx.getChatAdministrators();

    if(!chatAdmins.find((x) => x.user.id === userId && x.status === 'creator') && userId !== godId){
      ctx.reply(`Эта команда только для создателя чата`);
      return;
    }

    const chat = await Chat.findOne({where: { id: chatId }});

    if(!chat){
      return;
    }
  
    await chat.update('silent', false);
  
    ctx.reply(`Тихий режим включен`);
  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}
