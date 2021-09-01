import { Context } from 'telegraf';

export const start = (ctx: Context) => {
  ctx.reply('Hello world')
}
