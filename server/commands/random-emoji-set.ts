import { Context } from 'grammy';
import { godId } from '../config';

import { Token, TokenToChat } from '../models';

export const randomEmojiSetOn = async (ctx: Context) => {
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

  const tokenList = await Token.findAll({where: {tokenSet: 'random_emoji'}});

  await TokenToChat.destroy({where: {
    chatId,
    tokenId: tokenList.map((x) => x.id),
  }});

  await TokenToChat.bulkCreate(tokenList.map((token) =>({chatId, tokenId: token.id})));

  ctx.reply(`Набор токенов с рандомными emoji включён \n${tokenList.map((x) => x.token).join(' ')}`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}

export const randomEmojiSetOff = async (ctx: Context) => {
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

  const tokenList = await Token.findAll({where: {tokenSet: 'random_emoji'}});

  await TokenToChat.destroy({where: {
    chatId,
    tokenId: tokenList.map((x) => x.id),
  }});

  ctx.reply(`Набор токенов с рандомными emoji выключен`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}
