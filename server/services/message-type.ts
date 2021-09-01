import { Message } from 'typegram';


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

const messageTypeList = Object.keys(messageTypeMap);

export const getMessageType = (message:  Message)=> {
  for(const type of messageTypeList){
    if(type in message){
      return type;
    }
  }

  return 'unknown';
};





export const convertMessageType = (messageType?: string) => messageTypeMap[messageType || ''] || '✉️';
