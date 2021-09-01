import { Context } from 'telegraf';

import { Chat, Post, ReplyPost, User } from '../models';
import { godId } from '../config';

export const anal = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  const userId = ctx.message?.from.id;
  if (!chatId) {
    return;
  }
  if (userId !== godId) {
    return;
  }


  const [chats, users, posts, chatPosts, replyPosts, chatReplyPosts] = await Promise.all([
    Chat.count(),
    User.count(),
    Post.count(),
    Post.count({where: {chatId}}),
    ReplyPost.count(),
    ReplyPost.count({where: {chatId}}),
  ]);


  ctx.reply(`В чате:\nПостов с рейтингом - ${chatPosts}\nПостов с реплаями - ${chatReplyPosts}
\nВсего:\nЧатов - ${chats}\nПользователей - ${users}\nПостов с рейтингом - ${posts}\nПостов с реплаями - ${replyPosts}`);

}
