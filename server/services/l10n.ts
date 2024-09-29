import { Chat } from '../models';

const chatLangMap = new Map<number, string>();

export const reloadChatLang = async () =>{
  try {
    const chatList = await Chat.findAll();

    chatLangMap.clear();

    chatList.forEach((chat) => {
      chatLangMap.set(chat.id, chat.locale === 'ru-int' ? 'int' : chat.locale);
    })
    console.log(chatLangMap);
    
  } catch (e) {
    console.error(e);
    
  }
}

reloadChatLang();

export const getLocale = (chatId: number) => chatLangMap.get(chatId) as 'ru' | 'ru-int' || 'ru'

