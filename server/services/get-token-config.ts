import { Chat, Token, TokenAttributes, TokenToChat, sequelize } from '../models';

import { tokenize } from './tokenize';

interface IToken {
  token: string[];
  randomRevertRate?: number;  
}

export interface ITokenConfig{
  plus: IToken[];
  minus: IToken[];
  plusAndMinus: IToken[];
}

export const parseList = (list: TokenAttributes[]) => list.map(({token, repeat, randomRevertRate}) => {
  const parsedToken = tokenize(token);
  if (!repeat) {
    return {token: parsedToken, randomRevertRate} as IToken;
  }
  let result = '';
  const resultArray: IToken[] = [];
  for (let i = 0; i < repeat; i++) {
    result += token;
    resultArray.push({token: tokenize(result), randomRevertRate});
  }

  return resultArray;
}).flat();

const tokenConfigMap = new Map<number, ITokenConfig>();

export const resetTokenConfigCache = () => {
  tokenConfigMap.clear();
}

export const getTokenConfig = async (chatId: number): Promise<ITokenConfig> => {
  if(tokenConfigMap.has(chatId)){
    return tokenConfigMap.get(chatId)!;
  }
    
  const transaction = await sequelize.transaction();

  try {

    let [tokenToChat] = await Promise.all([
      TokenToChat.findAll({where: {chatId}, transaction}),
      Chat.findOrCreate({
        where: {
          id: chatId,
        },
        defaults: {
          id: chatId,
          locale: 'ru',
        },
        transaction,
      }),
    ]);

    if(tokenToChat.length === 0){
      const tokenlist = await Token.findAll({where: {tokenSet: ['symbol', 'emoji', 'ru', 'en']}, transaction});

      tokenToChat = await TokenToChat.bulkCreate(tokenlist.map((token) => ({chatId, tokenId: token.id})), {transaction});
    }

    const tokenList = await Token.findAll({where: {id: tokenToChat.map((x) => x.tokenId)}, transaction});

    
    
    await transaction.commit();

    const tokenConfig = {
      plus: parseList(tokenList.filter((x) => x.type === 'plus')),
      minus: parseList(tokenList.filter((x) => x.type === 'minus')),
      plusAndMinus: parseList(tokenList.filter((x) => x.type === 'plusAndMinus')),
    };

    tokenConfigMap.set(chatId, tokenConfig);

    return tokenConfig;
  } catch (e) {
    await transaction.rollback();
    console.error(e);
    return {
      plus: [],
      minus: [],
      plusAndMinus: [],
    };
  }
};
