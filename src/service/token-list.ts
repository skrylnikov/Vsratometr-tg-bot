interface IToken {
  token: string;
  randomRevertRate?: number;  
}

interface ITokenConfig extends IToken {
  repeat?: number;
}

const rawPlusList: ITokenConfig[] = [
  {token: '+', repeat: 5},
  {token: '👍', repeat: 5},
  {token: '👍🏻', repeat: 5},
  {token: '👍🏼', repeat: 5},
  {token: '👍🏽', repeat: 5},
  {token: '👍🏾', repeat: 5},
  {token: '👍🏿', repeat: 5},
  {token: '😀', repeat: 5},
  {token: '😃', repeat: 5},
  {token: '😄', repeat: 5},
  {token: '😁', repeat: 5},
  {token: '🤟', repeat: 5},
  {token: '👏', repeat: 5},
  {token: '💪', repeat: 5},
  {token: '❤️', repeat: 5},
  {token: '😍', repeat: 5},
  {token: '😘', repeat: 5},
  {token: '🤣', repeat: 5, randomRevertRate: 10},
  {token: '😂', repeat: 5, randomRevertRate: 10},
  {token: '😆', repeat: 5, randomRevertRate: 10},
  {token: '🤩', repeat: 5, randomRevertRate: 30},
  {token: '🤪', repeat: 5, randomRevertRate: 50},
  {token: '😳', repeat: 5, randomRevertRate: 50},
  {token: '🥴', repeat: 5, randomRevertRate: 50},
  { token: 'лайк'},
  { token: 'ня'},
  { token: 'няшно'},
  { token: 'заебись'},
  { token: 'збс'},
  { token: 'клас'},
  { token: 'класс'},
  { token: 'классно'},
  { token: 'огонь'},
  { token: 'агонь'},
  { token: 'круто'},
  { token: 'крутяк'},
  { token: 'пиздато'},
  { token: 'ахуенно'},
  { token: 'ахуено'},
  { token: 'ахуена'},
  { token: 'ахуенна'},
  { token: 'плюс'},
  { token: 'хорошо'},
  { token: 'сыр'},
  { token: 'каеф'},
  { token: 'плюсую'},
  { token: 'дико плюсую'},
  { token: 'хаха'},
  { token: 'ахах'},
  { token: 'хахах'},
  { token: 'ахаха'},
  { token: 'хахаха'},
  { token: 'ахахах'},
  { token: 'хахахах'},
  { token: 'nya'},
  { token: 'охуенно'},
  { token: 'отлично'},
  { token: 'ор'},
  { token: 'ор выше гор'},
  { token: 'ору'},
  { token: 'орно'},
  { token: 'орнул'},
  { token: 'орево'},
  { token: 'сырно'},
  { token: 'спасибо'},
  { token: 'спс'},
  { token: 'благодарю'},
  { token: 'найс'},
  { token: 'пожалуйста'},
  { token: 'кек'},
  { token: 'лол'},
  { token: 'top'},
  { token: 'топ'},
  { token: 'nice'},
  { token: 'cool'},
  { token: 'класека'},
  { token: 'классека'},
  { token: 'класика'},
  { token: 'классика'},
  { token: 'золото'},
  { token: 'платина'},
  { token: 'кек'},
  { token: 'kek'},
  { token: 'гениально'},
  { token: 'шикарно'},
  { token: 'у меня встал'},
  { token: 'прикольно'},
  { token: 'lol'},
  { token: 'лол'},
  { token: '))'},
  { token: ')))'},
  { token: '))))'},
  { token: ')))))'},
];

const rawMinusList: ITokenConfig[] = [
  { token: '-', repeat: 5},
  { token: '👎', repeat: 5},
  { token: '👎🏻', repeat: 5},
  { token: '👎🏼', repeat: 5},
  { token: '👎🏽', repeat: 5},
  { token: '👎🏾', repeat: 5},
  { token: '👎🏿', repeat: 5},
  { token: '💩', repeat: 5, randomRevertRate: 10},
  { token: '😡', repeat: 5},
  { token: '🤬', repeat: 5},
  { token: '🤯', repeat: 5, randomRevertRate: 25},
  { token: '🙁', repeat: 5},
  { token: '🤢', repeat: 5},
  { token: '🤮', repeat: 5},
  { token: '🤡', repeat: 5, randomRevertRate: 30},
  { token: '👿', repeat: 5, randomRevertRate: 10},
  { token: '😱', repeat: 5, randomRevertRate: 25},
  { token: '😲', repeat: 5, randomRevertRate: 25},
  { token: '😧', repeat: 5, randomRevertRate: 25},
  { token: '😦', repeat: 5, randomRevertRate: 25},
  { token: '🖕', repeat: 5},
  { token: 'дизлайк' },
  { token: 'говно' },
  { token: 'гавно' },
  { token: 'хуйня' },
  { token: 'отстой' },
  { token: 'кринж' },
  { token: 'хуево' },
  { token: 'хуёво' },
  { token: 'мда' },
  { token: 'мдаа' },
  { token: 'мдааа' },
  { token: 'фу' },
  { token: 'бе' },
  { token: 'фуу' },
  { token: 'бее' },
  { token: 'фууу' },
  { token: 'беее' },
  { token: 'минус' },
  { token: 'плохо' },
  { token: 'тугосерно' },
  
];

const parseList = (list: ITokenConfig[]) => list.map(({token, repeat, randomRevertRate}) => {
  if (!repeat) {
    return {token, randomRevertRate} as IToken;
  }
  let result = '';
  const resultArray: IToken[] = [];
  for (let i = 0; i < repeat; i++) {
    result += token;
    resultArray.push({token: result, randomRevertRate});
  }

  return resultArray;
}).flat();

export const plusAndMinusList: IToken[] = [
  {token: '+-'},
  {token: '-+'},
  {token: '±'},
];

export const plusList = parseList(rawPlusList);

export const minusList = parseList(rawMinusList);
