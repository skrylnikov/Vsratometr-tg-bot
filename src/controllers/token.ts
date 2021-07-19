import { Context } from 'telegraf';
import { groupBy } from 'remeda';

import { Token, TokenToChat, sequelize } from '../models';
import { tokenize } from '../service/tokenize';

export const tokenList = async (ctx: Context) => {
  const chatId = ctx.chat?.id;

  const tokenToChatList = await TokenToChat.findAll({where: {chatId}});

  const tokenList = await Token.findAll({where: { token: tokenToChatList.map((x) => x.tokenId), tokenSet: null }});

  if(tokenList.length === 0){
    ctx.reply(`В чате нет пользовательских токенов`);
    return
  }

  const groupedTokenList = Object.values(groupBy(tokenList, (x) => x.type));

  ctx.reply(`Список пользовательских токенов:\n${
    groupedTokenList.map((tokenList) => 
      `${tokenList[0].type === 'plus' ? '+' : tokenList[0].type === 'minus' ? '-' : '+-'}\n${
        tokenList.map((x) => x.token)
      }`
    ).join('\n')
  }`);

};

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

  if(typeStr !== '+' && typeStr !== '-' && typeStr !== '+-'){
    ctx.reply(`Формат добавления токена:\n/add_token + plus\n/add_token - minus\n/add_token +- plus minus`);
    return;
  }

  const tokenStr = tokenList.join(' ');
  const type = typeStr === '+' ? 'plus' : typeStr === '-' ? 'minus' : 'plusAndMinus';

  if(tokenList.length === 0){
    ctx.reply(`Формат добавления токена:\n/add_token + plus\n/add_token - minus\n/add_token +- plus minus`);
    return;
  }

  const transaction = await sequelize.transaction();
  try {

  const [token] = await Token.findOrCreate({
    where: {token: tokenStr, type},
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

  if(typeStr !== '+' && typeStr !== '-' && typeStr !== '+-'){
    ctx.reply(`Формат удаления токена:\n/remove_token + plus\n/remove_token - minus\n/remove_token +- plus minus`);
    return;
  }

  const tokenStr = tokenList.join(' ');
  const type = typeStr === '+' ? 'plus' : typeStr === '-' ? 'minus' : 'plusAndMinus';

  if(tokenList.length === 0){
    ctx.reply(`Формат удаления токена:\n/remove_token + plus\n/remove_token - minus\n/remove_token +- plus minus`);
    return;
  }

  const transaction = await sequelize.transaction();
  try {

  const token = await Token.findOne({
    where: {token: tokenStr, type},
    transaction,
  });

  if(!token){
    ctx.reply(`Токен "${tokenStr}" не найден`);
    return
  }

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
