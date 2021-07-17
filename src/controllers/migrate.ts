import { Context } from 'telegraf';

import { godId } from '../config';
import * as sqlite from '../models/sqlite';
import { Minus, Plus } from '../models';

export const migrate = async (ctx: Context) => {
  const userId = ctx.message?.from.id;
  if (userId !== godId) {
    return;
  }

  try {
  const plusList = await sqlite.Plus.findAll();
  ctx.reply(`plus: ${plusList.length}`);

  
  const minusList = await sqlite.Minus.findAll();
  ctx.reply(`minus: ${minusList.length}`);

  const postList = await sqlite.Post.findAll();
  ctx.reply(`post: ${postList.length}`);

  const replyPostList = await sqlite.ReplyPost.findAll();
  ctx.reply(`reply post: ${replyPostList.length}`);

  const userList = await sqlite.User.findAll();
  ctx.reply(`user: ${userList.length}`);

  const chatSet = new Set([
    ...plusList.map((x) => x.chatId),
    ...minusList.map((x) => x.chatId),
    ...postList.map((x) => x.chatId),
    ...replyPostList.map((x) => x.chatId),
  ]);

  const chatList = Array.from(chatSet);

  ctx.reply(`chat: ${chatList.length}`);
  

  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется всё пошло по пизде(`);
  }
}
