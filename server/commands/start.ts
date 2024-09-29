import { Context } from 'grammy';

export const start = (ctx: Context) => {
  console.log('start command')
  ctx.reply('Hello world')
}
