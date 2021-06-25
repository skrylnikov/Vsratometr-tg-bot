import { getFirstToken } from './tokenize';
import { plusAndMinusList, plusList, minusList } from './token-list';

export enum Action {
  none,
  plus,
  minus,
  plusAndMinus,
}

const randomRevertAction = () => {
  const random = Math.random();
  return random >= 0.1;
};

export const getAction = (text: string): Action => {
  const token = getFirstToken(text);
  const result = token.map((token) => {
    switch (true) {
      case plusAndMinusList.some((x) => token === x):
        return Action.plusAndMinus;
      case plusList.some((x) => token === x):
        return randomRevertAction() ? Action.minus : Action.plus;
      case minusList.some((x) => token === x):
        return randomRevertAction() ? Action.plus : Action.minus;
      default:
        return Action.none;
    }
  });

  return result.isNone() ? Action.none : result.value;
}

