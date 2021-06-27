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
  'audio': '🎧',
  'document': '💾',
  'photo': '🖼',
  'poll': '⚖️',
  'sticker': '🦆',
  'video': '📹',
  'video_note': '⚪',
  'voice': '📢',
  'text': '📝',
  'unknown': '❔',
};

export const convertMessageType = (messageType?: string) => messageTypeMap[messageType || ''] || '✉️';
