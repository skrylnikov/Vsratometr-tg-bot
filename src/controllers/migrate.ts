import { Context } from 'telegraf';

import { StatsTop, StatsBottom, Chats } from '../db';
import { Minus, Plus } from '../models';

export const migrate = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  const userId = ctx.message?.from.id;
  if (!chatId || !userId) {
    return;
  }

  if (userId !== 30260375) {
    ctx.reply('Охуел? это команда предназначена только для одного человека!!!!');
    return;
  }

  const chatKey = `${chatId}`;

  const chat = await Chats.get(chatKey);

  if (!chat) {
    ctx.reply('Чата нет в старой базе');
    return;
  }

  const userList = await Promise.all(chat.members.map(async (userId) => ({
    value: await StatsTop.get(`${chatId}:${userId}`) || 0,
    userName: await ctx.getChatMember(userId)
      .then((x) => x.user.username || 'Безымянный пидр')
      .catch(() => 'Ливнувший пидр'),
    userId,
  })));

  const plusResult = await Plus.bulkCreate(userList.map((x) => ({
    userId: x.userId,
    chatId: chatId,
    name: x.userName,
    value: x.value,
  })));

  const userBottomList = await Promise.all(chat.members.map(async (userId) => ({
    value: await StatsBottom.get(`${chatId}:${userId}`) || 0,
    userName: await ctx.getChatMember(userId)
      .then((x) => x.user.username || 'Безымянный пидр')
      .catch(() => 'Ливнувший пидр'),
    userId,
  })));

  const minusResult = await Minus.bulkCreate(userBottomList.map((x) => ({
    userId: x.userId,
    chatId: chatId,
    name: x.userName,
    value: x.value * -1,
  })));

  ctx.reply(`Смигрировал: ${plusResult.length} записей из топ, ${minusResult.length} записей из дна`);
}
