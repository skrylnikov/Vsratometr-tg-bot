import { Context } from 'telegraf';

import { Token, TokenToChat } from '../models';

export const intellectualsSetOn = async (ctx: Context) => {
  const userId = ctx.message?.from?.id;
  const chatId = ctx.chat?.id;
  if (!userId || !chatId) {
    return;
  }
  try {
  const chatAdmins = await ctx.getChatAdministrators();

  if(!chatAdmins.find((x) => x.user.id === userId)){
    ctx.reply(`Эта команда только для администраторы`);
    return;
  }

  const tokenList = await Token.findAll({where: {tokenSet: 'intellectuals'}});

  await TokenToChat.bulkCreate(tokenList.map((token) =>({chatId, tokenId: token.id})));

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

  if(!chatAdmins.find((x) => x.user.id === userId)){
    ctx.reply(`Эту команду имеют права использовать только администраторы`);
    return;
  }

  const tokenList = await Token.findAll({where: {tokenSet: 'intellectuals'}});

  await TokenToChat.destroy({where: {
    chatId,
    tokenId: tokenList.map((x) => x.id),
  }});

  ctx.reply(`Эта команда только для администраторы`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}
