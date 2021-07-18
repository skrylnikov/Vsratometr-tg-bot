import { tokenize } from './tokenize';
import { ITokenConfig } from './get-token-config';

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

const compareToken = (tokenizedText: string[], token: string[])=> {
  for(let i = 0; i< token.length; i++){
    if(token[i] !== tokenizedText[i]){
      return false;
    }
  }
  return true;
}

export const getAction = (config: ITokenConfig, text: string): Action => {
  const tokenizedText = tokenize(text);

  if(config.plusAndMinus.find(({token}) => compareToken(tokenizedText, token))){
    return Action.plusAndMinus;
  }

  const plus = config.plus.find(({token}) => compareToken(tokenizedText, token));

  if(plus){
    return randomRevertAction(plus.randomRevertRate) ? Action.minus : Action.plus;
  }


  const minus = config.minus.find(({token}) => compareToken(tokenizedText, token));

  if(minus){
    return randomRevertAction(minus.randomRevertRate) ? Action.plus : Action.minus;
  }

  return Action.none;

}

