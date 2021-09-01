import { Context } from 'telegraf';

import { Action, getAction, getMessageType, getTokenConfig, getLocale, l10n } from '../services';
import { Minus, Plus, Post, ReplyPost, User, sequelize } from '../models';


const cooldownSet = new Set<string>();

export const processMessage = async (ctx: Context) => {
  if (!ctx.message) {
    return;
  }
  const chatId = ctx.chat?.id;
  const subjectId = ctx.message.from?.id;
  const from = ctx.message.from;
  const locale = getLocale(chatId || 0);

  if(chatId && from && !from.is_bot){
    const transaction = await sequelize.transaction();

    try {
      const name = from.first_name || from.last_name || from.username || 'Анонимус';

      const [user] = await User.findOrCreate({
        where: {
          userId: from.id,
        },
        defaults: {
          userId: from.id,
          name,
        },
        transaction,
      });
      if(user.name !== name){
        await user.update({ name }, { transaction });
      }

      await transaction.commit();
    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }
  }

  if(!chatId){
    return;
  }
  const tokenConfig = await getTokenConfig(chatId);


  if (!('reply_to_message' in ctx.message)) {
    return;
  }

  const text = 'text' in ctx.message ? ctx.message.text : 'sticker' in ctx.message ? ctx.message.sticker.emoji : '';

  const messageId = ctx.message.reply_to_message?.message_id;
  const objectId = ctx.message.reply_to_message?.from?.id;

  if (!text || ! ctx.message.reply_to_message) {
    return;
  }


  if(ctx.message.reply_to_message && ctx.message.reply_to_message?.from?.id !== ctx.message.from.id && chatId && messageId && objectId){

    const url = `https://t.me/c/${chatId.toString().slice(4)}/${messageId}`;
    
    const transaction = await sequelize.transaction();

    try {
      
      const [replyPost] = await ReplyPost.findOrCreate({
        where: {
          userId: objectId,
          chatId: chatId,
          messageId,
        },
        defaults: {
          userId: objectId,
          chatId,
          messageId,
          value: 0,
          url,
          created: new Date(),
          type: getMessageType(ctx.message.reply_to_message),
        },
        transaction,
      });

      await replyPost.increment('value', { transaction });

      await transaction.commit();
    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }
  }


  const action = getAction(tokenConfig, text);

  if (action === Action.none) {
    return;
  }

  if (ctx.message.reply_to_message?.from?.id === ctx.message.from.id) {
    if(locale === 'ru-int'){
      const url = await ctx.tg.getFileLink('CAACAgIAAxkBAAMoYDqZhNYMEOhZMgABZr5tG1bko4MUAAJ2AAMz-LcVOuDuXdTVMogeBA')
      
      if (url?.href) {
        ctx.replyWithSticker({ url: url.href }, { reply_to_message_id: ctx.message.message_id });
      }
    }
    return;
  }

  if (ctx.message.reply_to_message?.from?.id === (await ctx.telegram.getMe()).id) {
    ctx.reply(l10n('bot-ban-me-rate'), { reply_to_message_id: ctx.message.message_id });
    return;
  }

  if(from.is_bot){
    ctx.reply(l10n('bot-ban-bot-rate'), { reply_to_message_id: ctx.message.message_id });
    return;
  }

  console.log(ctx.message.reply_to_message);


  const objectUserName = ctx.message.reply_to_message?.from?.username || 'Анонимус';
  const subjectUserName = ctx.message.from?.username || 'Анонимус';

  if (!chatId || !objectId || !subjectId || !messageId) {
    return;
  }

  const url = `https://t.me/c/${chatId.toString().slice(4)}/${messageId}`;


  const cooldownKey = `${chatId}:${ctx.message.reply_to_message.message_id}:${ctx.message.from.id}`;

  if (cooldownSet.has(cooldownKey)) {
    ctx.reply(l10n('bot-ban-frequency'), { reply_to_message_id: ctx.message.message_id });
    return;
  } else {
    cooldownSet.add(cooldownKey);
    setTimeout(() => cooldownSet.delete(cooldownKey), 60 * 1000);
  }


  if (action === Action.plus) {
    const transaction = await sequelize.transaction();

    try {
      const [[plus], [post]] = await Promise.all([
        Plus.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
          },
          defaults: {
            userId: objectId,
            chatId: chatId,
            name: objectUserName,
            value: 0,
          },
          transaction,
        }),
        Post.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
            messageId,
          },
          defaults: {
            userId: objectId,
            chatId,
            messageId,
            plus: 0,
            minus: 0,
            url,
            created: new Date(),
            type: getMessageType(ctx.message.reply_to_message),
          },
          transaction,
        })
      ]);

      const value = plus.value + 1;

      await plus.update({ value }, { transaction });

      ctx.reply(`${l10n('bot-plus-actin')} ${objectUserName} (${value}) от ${subjectUserName}`);

      const postValue = post.plus + 1;

      await post.update({ plus: postValue, type: getMessageType(ctx.message.reply_to_message) }, { transaction });

      await transaction.commit();

    } catch (e) {
      console.error(e);

      await transaction.rollback();
    }
    return;
  }

  if (action === Action.minus) {
    const transaction = await sequelize.transaction();

    try {
      const [[minus], [post]] = await Promise.all([
        Minus.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
          },
          defaults: {
            userId: objectId,
            chatId: chatId,
            name: objectUserName,
            value: 0,
          },
          transaction,
        }),
        Post.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
            messageId,
          },
          defaults: {
            userId: objectId,
            chatId,
            messageId,
            plus: 0,
            minus: 0,
            url,
            created: new Date(),
            type: getMessageType(ctx.message.reply_to_message),
          },
          transaction,
        })
      ]);

      const value = minus.value + 1;

      await minus.update({ value }, { transaction });

      ctx.reply(`${l10n('bot-minus-action')} ${objectUserName} (-${value}) от ${subjectUserName}`);

      const postValue = post.minus + 1;

      await post.update({ minus: postValue, type: getMessageType(ctx.message.reply_to_message) }, { transaction });

      await transaction.commit();

    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }

    return;
  }

  if (action === Action.plusAndMinus) {
    const transaction = await sequelize.transaction();
    try {
      const [[plus], [minus], [post]] = await Promise.all([
        Plus.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
          },
          defaults: {
            userId: objectId,
            chatId: chatId,
            name: objectUserName,
            value: 0,
          },
          transaction,
        }),
        Minus.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
          },
          defaults: {
            userId: objectId,
            chatId: chatId,
            name: objectUserName,
            value: 0,
          },
          transaction,
        }),
        Post.findOrCreate({
          where: {
            userId: objectId,
            chatId: chatId,
            messageId,
          },
          defaults: {
            userId: objectId,
            chatId,
            messageId,
            plus: 0,
            minus: 0,
            url,
            created: new Date(),
            type: getMessageType(ctx.message.reply_to_message),
          },
          transaction,
        })
      ]);

      const plusValue = plus.value + 1;
      const minusValue = minus.value + 1;

      await Promise.all([
        plus.update({ value: plusValue }, { transaction }),
        minus.update({ value: minusValue }, { transaction }),
      ]);

      ctx.reply(`${l10n('bot-plus-minus-action')} ${objectUserName} (+${plusValue};-${minusValue}) от ${subjectUserName}`);

      const postPlusValue = post.plus + 1;
      const postMinusValue = post.minus + 1;

      await post.update({ plus: postPlusValue, minus: postMinusValue, type: getMessageType(ctx.message.reply_to_message) }, { transaction });

      await transaction.commit();

    } catch (e) {
      console.error(e);
      await transaction.rollback();
    }
    return;
  }

}
