import { Chat } from '../models';

import { Locales } from '../../i18n/i18n-types';


const chatLangMap = new Map<number, string>();

export const reloadChatLang = async () =>{
  try {
    const chatList = await Chat.findAll();

    chatLangMap.clear();

    chatList.forEach((chat) => {
      chatLangMap.set(chat.id, chat.locale);
    })
    console.log(chatLangMap);
    
  } catch (e) {
    console.error(e);
    
  }
}

reloadChatLang();

export const getLocale = (chatId: number) => chatLangMap.get(chatId) as Locales || 'ru'

