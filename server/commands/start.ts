import { Context } from 'telegraf';

export const start = (ctx: Context) => {
  console.log('start command')
  ctx.reply('Hello world')
}
