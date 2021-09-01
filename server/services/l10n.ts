import { getMessage, ILangList } from '../../locales';

import { Chat } from '../models';
import { botContext } from './bot-ctx';


const chatLangMap = new Map<number, string>();

export const reloadChatLang = async () =>{
  try {
    const chatList = await Chat.findAll();

    chatLangMap.clear();

    chatList.forEach((chat) => {
      chatLangMap.set(chat.id, chat.locale);
    })

  } catch (e) {
    console.error(e);
    
  }
}

export const getLocale = (chatId: number) => chatLangMap.get(chatId) as ILangList || 'ru'

export const l10n = (id: string, args?: Record<string, string>) =>{
  const ctx = botContext.getStore();
  const lang = chatLangMap.get(ctx?.chatId || 0)as ILangList || 'ru' ;

  return getMessage(lang, id, args);
}
