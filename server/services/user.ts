import { uniq } from 'remeda';

import { User } from '../models';
import { bot } from '../bot';


export const getUserMap = async (rawIdList: number[], chatId: number) => {
  const idList = uniq(rawIdList);

  const userList = await User.findAll({where: { userId: idList }});

  const userMap = new Map(userList.map((x) => [x.userId, x]));

  const notFoundedIdList = idList.filter((x) => !userMap.has(x));

  for(const id of notFoundedIdList){
    try {
    const { user } = await bot.telegram.getChatMember(chatId, id);

    const name = user.first_name || user.last_name || user.username || 'Анонимус';

    const createdUser = await User.create({
      userId: id,
      name,
    });

    userMap.set(id, createdUser);
    } catch (e) {
      console.error(e);
      const createdUser = await User.create({
        userId: id,
        name: 'Анонимус',
      });
  
      userMap.set(id, createdUser);
    }
  }

  return userMap;
};
