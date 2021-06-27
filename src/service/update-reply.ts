import { ReplyPost } from '../models';
import { bot } from '../bot';

export const updateReply = async (postList: ReplyPost[]) => {

  for(const post of postList){
    if(post.type !== ''){
      continue;
    }

    // const a = await bot.telegram.callApi('get')

  }

};
