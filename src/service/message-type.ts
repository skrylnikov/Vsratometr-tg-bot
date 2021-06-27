import { Message } from 'typegram';

export const getMessageType = (message:  Message)=> {
  if('animation' in message){
    return 'animation';
  }
  if('audio' in message){
    return 'audio';
  }
  if('document' in message){
    return 'document';
  }
  if('photo' in message){
    return 'photo';
  }
  if('poll' in message){
    return 'poll';
  }
  if('sticker' in message){
    return 'sticker';
  }
  if('video' in message){
    return 'video';
  }
  if('video_note' in message){
    return 'video_note';
  }
  if('voice' in message){
    return 'voice';
  }
  if('text' in message){
    return 'text';
  }

  return 'unknown';
};


const messageTypeMap: Record<string, string> = {
  'animation': 'анимация',
  'audio': 'музыка',
  'document': 'файл',
  'photo': 'фото',
  'poll': 'опрос',
  'sticker': 'стикер',
  'video': 'видео',
  'video_note': 'кружочек',
  'voice': 'войс',
  'text': 'текст',
  'unknown': 'неизвестный пост',
};

export const convertMessageType = (messageType?: string) => messageTypeMap[messageType || ''] || 'Сообщение';
