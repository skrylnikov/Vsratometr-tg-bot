import { Context } from 'telegraf';

import { Chat } from '../models';
import { godId } from '../config';


export const spam = async (ctx: Context) => {
  if (!ctx.message) {
    return;
  }
  const chatId = ctx.chat?.id;
  const userId = ctx.message?.from.id;
  if (!chatId) {
    return;
  }

  if (userId !== godId) {
    return;
  }

  if (!chatId) {
    return;
  }
  const chat = await Chat.findOne({ where: { id: chatId } });


  if (!('reply_to_message' in ctx.message) || !chat) {
    return;
  }

  const text = 'text' in ctx.message ? ctx.message.text : 'sticker' in ctx.message ? ctx.message.sticker.emoji : '';

  const messageId = ctx.message.reply_to_message?.message_id;
  const objectId = ctx.message.reply_to_message?.from?.id;

  if (!text || !ctx.message.reply_to_message) {
    return;
  }

  if (!('text' in ctx.message.reply_to_message)) {
    return;
  }

  try {

    const chatList = await Chat.findAll();

    console.log(ctx.message.reply_to_message);

    let success = 0;
    let fail = 0;
    for (const chat of chatList) {
      try {
        await ctx.telegram.sendMessage(chat.id, ctx.message.reply_to_message.text);
        success++;

      } catch (e) {
        fail++;
        console.error(e);
      }

    }

    ctx.reply(`Сообщение отправлено!\nУспешно: ${success}\nНе очень: ${fail}`);

  } catch (e) {
    console.error(e);
  }
}
