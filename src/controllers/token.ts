import { Context } from 'telegraf';

import { Token, TokenToChat, sequelize } from '../models';
import { tokenize } from '../service/tokenize';

export const addToken = async (ctx: Context) => {
  if(!ctx.message){
    return;
  }
  const userId = ctx.message?.from?.id;
  const chatId = ctx.chat?.id;
  const text = 'text' in ctx.message && ctx.message.text;
  if (!userId || !chatId || !text) {
    return;
  }
  const chatAdmins = await ctx.getChatAdministrators();

  if(!chatAdmins.find((x) => x.user.id === userId)){
    ctx.reply(`Эта команда только для администраторы`);
    return;
  }

  const [_, typeStr, ...tokenList] = tokenize(text);

  const tokenStr = tokenList.join(' ');
  const type = typeStr === '+' ? 'plus' : typeStr === '-' ? 'minus' : 'plusAndMinus';

  if(tokenList.length === 0){
    ctx.reply(`Формат добавления токена:\n/add_token + plus`);
    return;
  }

  const transaction = await sequelize.transaction();
  try {

  const [token] = await Token.findOrCreate({
    where: {token: tokenStr},
    defaults: {
      token: tokenStr,
      repeat: 1,
      randomRevertRate: 0,
      type,
    },
    transaction,
  });
  
  await TokenToChat.findOrCreate({
    where: { chatId, tokenId: token.id},
    defaults: { chatId, tokenId: token.id},
    transaction,
  })

  await transaction.commit();
  ctx.reply(`Токен "${tokenStr}" включён`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
    await transaction.rollback();
  }
}

export const removeToken = async (ctx: Context) => {
  if(!ctx.message){
    return;
  }
  const userId = ctx.message?.from?.id;
  const chatId = ctx.chat?.id;
  const text = 'text' in ctx.message && ctx.message.text;
  if (!userId || !chatId || !text) {
    return;
  }
  
  const [_, typeStr, ...tokenList] = tokenize(text);

  const tokenStr = tokenList.join(' ');
  const type = typeStr === '+' ? 'plus' : typeStr === '-' ? 'minus' : 'plusAndMinus';

  if(tokenList.length === 0){
    ctx.reply(`Формат добавления токена:\n/add_token + plus`);
    return;
  }

  const transaction = await sequelize.transaction();
  try {

  const [token] = await Token.findOrCreate({
    where: {token: tokenStr},
    defaults: {
      token: tokenStr,
      repeat: 1,
      randomRevertRate: 0,
      type,
    },
    transaction,
  });
  
  await TokenToChat.destroy({
    where: { chatId, tokenId: token.id},
    transaction,
  })

  await transaction.commit();
  ctx.reply(`Токен "${tokenStr}" выключен`);


  } catch (e) {
    console.error(e);
    ctx.reply(`Кажется что-то сломалось(`);
  }
}
