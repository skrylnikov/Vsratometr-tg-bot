import { AsyncLocalStorage } from 'async_hooks';

import {Context} from 'telegraf';
import { Update } from 'typegram';

interface IContext {
  chatId: number;
}

export const botContext = new AsyncLocalStorage<IContext>();

export const ctxMiddleware = (ctx: Context<Update>, next: () => Promise<void>) => {
  if(!ctx.chat?.id){
    return next();
  }
  
  botContext.run({chatId: ctx.chat.id}, next);
}
