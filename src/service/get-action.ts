import { getFirstToken } from './tokenize';
import { plusAndMinusList, plusList, minusList } from './token-list';

export enum Action {
  none,
  plus,
  minus,
  plusAndMinus,
}

const randomRevertAction = (rate?: number) => {
  if(!rate){
    return false;
  }
  const random = Math.random();
  return random <= (0.01 * rate);
};

export const getAction = (text: string): Action => {
  const token = getFirstToken(text);
  const result = token.map((token) => {
    const plus = plusList.find((x) => token === x.token);
    const minus = minusList.find((x) => token === x.token);

    if(plusAndMinusList.some((x) => token === x.token)){
      return Action.plusAndMinus;
    }

    if(plus){
      return randomRevertAction(plus.randomRevertRate) ? Action.minus : Action.plus;
    }

    if(minus){
      return randomRevertAction(minus.randomRevertRate) ? Action.plus : Action.minus;
    }

    return Action.none;
  });

  return result.isNone() ? Action.none : result.value;
}

