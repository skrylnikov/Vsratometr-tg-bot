import { Context } from 'telegraf';
import { uniq } from 'remeda';

import { StatsBottom, StatsTop, Chats } from '../db';
import { Action, getAction } from '../service';
import { Minus, Plus, Post } from '../models';


const cooldownSet = new Set<string>();

export const processMessage = async (ctx: Context) => {
  if (!ctx.message) {
    return;
  }
  if (!('reply_to_message' in ctx.message)) {
    return;
  }

  const text = 'text' in ctx.message ? ctx.message.text : 'sticker' in ctx.message ? ctx.message.sticker.emoji : '';

  if (!text) {
    return;
  }

  const action = getAction(text)

  if (action === Action.none) {
    return;
  }

  if (ctx.message.reply_to_message?.from?.id === ctx.message.from.id) {
    const url = await ctx.tg.getFileLink('CAACAgIAAxkBAAMoYDqZhNYMEOhZMgABZr5tG1bko4MUAAJ2AAMz-LcVOuDuXdTVMogeBA')

    if (url?.href) {
      ctx.replyWithSticker({ url: url.href }, { reply_to_message_id: ctx.message.message_id });
    } else {
      ctx.reply('Ну ты ещё сам себе отсосать бы попробовал. Долбоёб!', { reply_to_message_id: ctx.message.message_id });
    }
    return;
  }

  if (ctx.message.reply_to_message?.from?.id === (await ctx.telegram.getMe()).id) {
    ctx.reply('А ты случаем не ахуел меня оценивать??? Долбоёб!', { reply_to_message_id: ctx.message.message_id });
  }

  const chatId = ctx.chat?.id;
  const objectId = ctx.message.reply_to_message?.from?.id;
  const messageId = ctx.message.reply_to_message?.message_id;
  console.log(ctx.message.reply_to_message);


  const subjectId = ctx.message.from?.id;
  const objectUserName = ctx.message.reply_to_message?.from?.username || 'Безымянный пидр';
  const subjectUserName = ctx.message.from?.username || 'Безымянный пидр';

  if (!chatId || !objectId || !subjectId || !messageId) {
    return;
  }

  const url = `https://t.me/c/${chatId.toString().slice(4)}/${messageId}`;


  const cooldownKey = `${chatId}:${objectId}:${ctx.message.from.id}`;

  if (cooldownSet.has(cooldownKey)) {
    ctx.reply('Иди в жопу', { reply_to_message_id: ctx.message.message_id });
    return;
  } else {
    cooldownSet.add(cooldownKey);
    setTimeout(() => cooldownSet.delete(cooldownKey), 60 * 1000);
  }


  if (action === Action.plus) {
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
        }
      })
    ]);

    const value = plus.value + 1;

    await plus.update({ value });

    ctx.reply(`${subjectUserName} поднял(a) в топе ${objectUserName}(${value})`);

    const postValue = post.plus + 1;

    await post.update({ plus: postValue });

    return;
  }

  if (action === Action.minus) {
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
        }
      })
    ]);

    const value = minus.value + 1;

    await minus.update({ value });

    ctx.reply(`${subjectUserName} опустил(a) на дно ${objectUserName}(${value})`);

    const postValue = post.minus + 1;

    await post.update({ minus: postValue });

    return;
  }

  if (action === Action.plusAndMinus) {
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
        }
      })
    ]);

    const plusValue = plus.value + 1;
    const minusValue = minus.value + 1;

    await Promise.all([
      plus.update({ value: plusValue }),
      minus.update({ value: minusValue }),
    ]);

    ctx.reply(`${subjectUserName} отсосал/отсосала/отлизал/отлизала ${objectUserName}(+${plusValue};-${minusValue})`);

    const postPlusValue = post.plus + 1;
    const postMinusValue = post.minus + 1;

    await post.update({ plus: postPlusValue, minus: postMinusValue });

    return;
  }

  /*
  const userKey = `${chatId}:${objectId}`;

  const Stats = (plus ? StatsTop : StatsBottom);

  const statValue = await Stats.get(userKey);
  const value = plus ? 1 : -1;
  const newStat = typeof statValue === 'number' && Number.isFinite(statValue) ? statValue + value : value;

  await Stats.set(userKey, newStat);


  if(!Number.isFinite(statValue)){
    await Stats.set(userKey, value);
    const chatKey =`${chatId}`;

    const chat = await Chats.get(chatKey);
    if(chat){
      await Chats.set(chatKey, {
        ...chat,
        members: uniq([...chat.members, objectId]),
      });
    } else {
      await Chats.set(chatKey, {
        id: chatId,
        members: [objectId],
      });
    }
  }




  ctx.reply(`${ctx.message.from.username || 'Безымянный пидр'} ${plus ? 'поднял в топе': 'опустил на дно'}  ${objectUserName}(${newStat})`);
  */
}
