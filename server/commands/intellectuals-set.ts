import { Context } from 'telegraf';
import { godId } from '../config';

import { Token, TokenToChat, Chat } from '../models';

export const intellectualsSetOn = async (ctx: Context) => {
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

  const tokenList = await Token.findAll({where: {tokenSet: 'intellectuals'}});

  await TokenToChat.destroy({where: {
    chatId,
    tokenId: tokenList.map((x) => x.id),
  }});

  await TokenToChat.bulkCreate(tokenList.map((token) =>({chatId, tokenId: token.id})));

  const chat = await Chat.findOne({where: {id: chatId}});

  await chat?.update('locale', 'ru-int');

  ctx.reply(`Набор токенов для интеллектуалов включён`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}

export const intellectualsSetOff = async (ctx: Context) => {
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

  const tokenList = await Token.findAll({where: {tokenSet: 'intellectuals'}});

  await TokenToChat.destroy({where: {
    chatId,
    tokenId: tokenList.map((x) => x.id),
  }});

  const chat = await Chat.findOne({where: {id: chatId}});

  await chat?.update('locale', 'ru');

  ctx.reply(`Набор токенов для интеллектуалов выключен`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}
